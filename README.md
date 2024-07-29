# CyPark Smart Parking System

CyPark is a smart parking system that utilizes React.js for the frontend, Firebase for the backend, and various sensors to monitor parking spot occupancy. The system aims to provide real-time parking availability to users, enhancing the efficiency of parking management.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

CyPark is designed to make parking management more efficient by providing real-time updates on parking spot availability. Users can check the availability of parking spots through a web interface, which is kept up-to-date with data from sensors deployed in the parking area.

## Features

- Real-time parking spot occupancy detection
- User-friendly web interface
- Booking system
- Easy integration with various sensors
- Secure and scalable backend

## Tech Stack

- **Frontend**: React.js, Material-UI, HTML, CSS
- **Backend**: Firebase Firestore, Firebase Authentication
- **Sensors**: Ultrasonic sensors connected to ESP8266
- **Other Tools**: Node-RED for data integration

## Installation

### Prerequisites

- Node.js and npm installed on your machine
- Firebase account set up
- Node-RED installed and configured

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cypark.git
   cd cypark
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project and configure Firestore and Authentication.
   - Obtain your Firebase configuration object and create a `.env` file in the `client` directory:
     ```plaintext
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

4. **Start the frontend server:**
   ```bash
   npm start
   ```

5. **Configure and start Node-RED:**
   - Import the provided Node-RED flow into your Node-RED instance.
   - Ensure the sensors are properly configured to send data to the Node-RED server.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up or log in using the Firebase Authentication.
3. View real-time parking spot availability on the dashboard.

## Project Structure

```plaintext
cypark/
├── client/               # React.js frontend
│   ├── public/           # Public assets
│   ├── src/              # Source files
│   │   ├── components/   # React components
│   │   ├── firebase/     # Firebase configuration
│   │   ├── pages/        # React pages
│   │   ├── styles/       # CSS styles
│   │   ├── App.js        # Main App component
│   │   ├── index.js      # Entry point
│   └── package.json      # Frontend dependencies
├── node-red/             # Node-RED flows and configurations
│   └── flow.json         # Node-RED flow configuration
└── README.md             # Project documentation
```

## Contributing

We welcome contributions to CyPark! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch with your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Create a pull request to merge your changes into the main repository.

