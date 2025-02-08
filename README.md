# Event Management System

## Overview

The **Event Management System** is a web application built using **Express.js** (backend) and **React.js** (frontend). It provides a seamless platform for managing events, including creating, updating, and deleting events while tracking them with timelines. The system includes a **clear UI with a dashboard**, **mailing features**, and **database connectivity**.

## Features

- **User-friendly Dashboard**: Intuitive interface for managing events.
- **Event CRUD Operations**: Create, Read, Update, and Delete events easily.
- **Timelines**: Track event progress and deadlines.
- **Mailing Feature**: Send notifications and updates via email.
- **Database Connectivity**: Securely store and retrieve event data.

## Tech Stack

### Backend

- **Express.js** (Node.js Framework)
- **MongoDB / MySQL** (Database)
- **Nodemailer** (Email Sending)
- **JWT Authentication** (Secure Access)
- **express-uploader**
- **BCRYPTJS**
- **jsonwebtoken / jwt**

### Frontend

- **React.js** (UI Framework)
- **React Router** (Navigation)
- **Redux / Context API** (State Management)
- **TailwindCSS / Material UI** (Styling)

## Installation

### Prerequisites

- Node.js installed
- MongoDB

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/sugga-cloud/ems
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file and add:
     ```env
     PORT=5000
     DB_URI=your_database_connection_string
     JWT_SECRET=your_jwt_secret
     SEND_MAIL=your_email
     SEND_PASS=your_email_password
     ```
4. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

## Usage

1. Sign up or log in as an event organizer.
2. Create new events and define timelines.
3. Update or delete events as needed.
4. Receive email notifications regarding events.
5. Track event progress via the dashboard.

## API Endpoints

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/auth/login`    | User Login         |
| POST   | `/api/auth/register` | User Registration  |
| GET    | `/api/events`        | Get all events     |
| POST   | `/api/events`        | Create a new event |
| PUT    | `/api/events/:id`    | Update an event    |
| DELETE | `/api/events/:id`    | Delete an event    |

## Contribution

Contributions are welcome! Feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.

## Contact

For inquiries, contact [Sazid husain](mailto\:sazidhusain2004@gmail.com).

