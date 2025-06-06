import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

interface Parent {
    _id: string;
    name: string;
    email: string;
    phone: string;
    occupation: string;
}

const Parents: React.FC = () => {
    const [parents, setParents] = useState<Parent[]>([]);
    const [editingParent, setEditingParent] = useState<Parent | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        occupation: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchParents();
    }, [navigate]);

    const fetchParents = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${API_URL}/api/parents`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setParents(response.data);
        } catch (error) {
            console.error('Error fetching parents:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingParent) {
                await axios.put(
                    `${API_URL}/api/parents/${editingParent._id}`,
                    formData,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }
                );
            } else {
                await axios.post(`${API_URL}/api/parents`, formData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            }
            fetchParents();
            setFormData({ name: '', email: '', phone: '', occupation: '' });
            setEditingParent(null);
        } catch (error) {
            console.error('Error saving parent:', error);
        }
    };

    const handleEdit = (parent: Parent) => {
        setEditingParent(parent);
        setFormData({
            name: parent.name,
            email: parent.email,
            phone: parent.phone,
            occupation: parent.occupation
        });
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this parent?')) {
            try {
                await axios.delete(`${API_URL}/api/parents/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                fetchParents();
            } catch (error) {
                console.error('Error deleting parent:', error);
            }
        }
    };

    return (
        <div className="parents-container">
            <h2>Parent Information</h2>

            <form onSubmit={handleSubmit} className="parent-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Occupation:</label>
                    <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">
                    {editingParent ? 'Update Parent' : 'Add Parent'}
                </button>
            </form>

            <table className="parents-table">
                <thead>
                    <tr>
                        <th>Parent Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Occupation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parents.map((parent) => (
                        <tr key={parent._id}>
                            <td>{parent.name}</td>
                            <td>{parent.email}</td>
                            <td>{parent.phone}</td>
                            <td>{parent.occupation}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(parent)}
                                    className="edit-btn"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(parent._id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Parents; 