# CodersHouse - Real-time Voice Chat Application

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-17-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green.svg)](https://mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.7+-black.svg)](https://socket.io/)
[![WebRTC](https://img.shields.io/badge/WebRTC-Enabled-orange.svg)](https://webrtc.org/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue.svg)](https://docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A full-stack MERN application for real-time voice communication with WebRTC technology. Users can create voice rooms, join conversations, and communicate with others through high-quality audio streaming.

## 🚀 Features

- **Real-time Voice Communication**: Powered by WebRTC for peer-to-peer audio streaming
- **User Authentication**: Phone number-based OTP authentication with Twilio integration
- **Room Management**: Create and join voice rooms with custom topics
- **Audio Controls**: Mute/unmute functionality for all participants
- **Responsive Design**: Modern UI with React components
- **Socket.io Integration**: Real-time signaling and room management
- **Docker Support**: Containerized development and production environments

## 🛠️ Tech Stack

### Frontend

- **React 17** - UI framework
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Socket.io Client** - Real-time communication
- **WebRTC** - Peer-to-peer audio streaming

### Backend

- **Node.js & Express** - Server framework
- **Socket.io** - WebSocket communication
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Twilio** - OTP service
- **Jimp** - Image processing

### DevOps

- **Docker & Docker Compose** - Containerization
- **MongoDB** - Database container

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Docker & Docker Compose (optional)
- Twilio account for OTP service

## 🚀 Quick Start

### Option 1: Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd codershouse-mern
   ```
2. **Set up environment variables**

   ```bash
   # Backend environment
   cp backend/.env.example backend/.env.dev
   # Edit backend/.env.dev with your configuration

   # Frontend environment  
   cp frontend/.env.example frontend/.env.dev
   # Edit frontend/.env.dev with your configuration
   ```
3. **Start with Docker Compose**

   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

### Option 2: Manual Setup

1. **Backend Setup**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your .env file
   npm run dev
   ```
2. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Configure your .env file
   npm start
   ```
3. **Database Setup**

   - Ensure MongoDB is running on your system
   - Update connection string in backend/.env

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=5500
MONGODB_URI=mongodb://localhost:27017/codershouse
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
BASE_URL=http://localhost:5500
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_SERVICE_SID=your_service_sid_here
```

### Frontend (.env)

```env
REACT_APP_BASE_URL=http://localhost:5500
REACT_APP_SOCKET_URL=http://localhost:5500
```

## 📱 Application Flow

1. **Authentication**: Users register/login with phone number + OTP
2. **Activation**: Complete profile setup with name and avatar
3. **Room Creation**: Create or join voice rooms
4. **Voice Communication**: Real-time audio streaming with WebRTC
5. **Room Management**: Mute/unmute controls and participant management

## 🏗️ Project Structure

```
codershouse-mern/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── models/         # Database models
│   ├── middlewares/    # Authentication middleware
│   ├── services/       # Business logic
│   ├── routes.js       # API routes
│   └── server.js       # Express server
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── store/      # Redux store
│   │   └── socket/     # Socket.io client
│   └── public/         # Static assets
├── deploy/             # Nginx configuration
└── docker-compose files
```

## 🔌 API Endpoints

- `POST /api/send-otp` - Send OTP to phone number
- `POST /api/verify-otp` - Verify OTP and authenticate
- `POST /api/activate` - Activate user account
- `GET /api/refresh` - Refresh authentication token
- `POST /api/logout` - User logout
- `POST /api/rooms` - Create new room
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get specific room

## 🐳 Docker Commands

```bash
# Development
docker-compose -f docker-compose.dev.yml up --build

# Production
docker-compose -f docker-compose.prod.yml up --build

# Stop containers
docker-compose down
```

## 🚀 Deployment

The application includes production-ready Docker configurations:

- **Development**: `docker-compose.dev.yml`
- **Production**: `docker-compose.prod.yml`
- **Nginx**: Included in `deploy/` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- WebRTC for peer-to-peer communication
- Socket.io for real-time signaling
- Twilio for OTP services
- React and Node.js communities

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Note**: This application requires proper WebRTC support in browsers and may need HTTPS in production environments for WebRTC to function correctly.
