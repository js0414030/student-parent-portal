# Student Parent Information Portal

A web application for managing student and parent information, built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- Student Authentication (Register/Login)
- Parent Information Management (CRUD operations)
- Secure API with JWT Authentication
- Responsive Design

## Tech Stack

- **Frontend**: React, TypeScript, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install Backend Dependencies
```bash
npm install
```

3. Install Frontend Dependencies
```bash
cd client
npm install
```

4. Create Environment Variables
- Create a `.env` file in the root directory:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Running the Application

1. Start the Backend Server
```bash
npm run dev
```

2. Start the Frontend Application
```bash
cd client
npm start
```

The application will be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.tsx       # Main App component
│   │   └── index.tsx     # Entry point
│   └── package.json
├── routes/                # Backend API routes
├── models/                # MongoDB models
├── server.js             # Express server setup
└── package.json
```

## API Endpoints

### Auth Routes
- POST /api/auth/register - Register a new student
- POST /api/auth/login - Login student

### Parent Routes
- GET /api/parents - Get all parents
- POST /api/parents - Add new parent
- PUT /api/parents/:id - Update parent
- DELETE /api/parents/:id - Delete parent

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 