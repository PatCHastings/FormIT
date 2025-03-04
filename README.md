# FormIT - Client Acquisition Platform

FormIT is a client acquisition and software solutions platform designed to streamline the process of onboarding new clients, managing registrations, and providing tailored software services. This application is deployed on AWS and utilizes PostgreSQL, Node.js (Express), and React.

## 📌 Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Security & AWS Configuration](#security--aws-configuration)

---

## 🚀 Tech Stack
- **Frontend**: React.js (hosted on AWS CloudFront)
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL (AWS RDS)
- **Authentication**: JWT-based authentication
- **Deployment**: AWS Lightsail (backend), AWS RDS (database), AWS CloudFront (frontend)
- **Reverse Proxy**: AWS Route 53 and ACM for SSL

---

## 📂 Project Structure
```sh
FormIT/
 ├── frontend/       # React Frontend (CloudFront Hosted)
 ├── backend/        # Express.js Backend (AWS Lightsail)
 │   ├── routes/     # API Routes
 │   ├── models/     # Sequelize ORM Models
 │   ├── services/   # Email & Auth Services
 │   ├── db.js       # Database Connection
 │   ├── server.js   # Express Server
 │   ├── .env        # Environment Variables
 ├── README.md       # Project Documentation
```

---

## 🛠 Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/FormIT.git
cd FormIT
```

### 2️⃣ Install Dependencies
```sh
cd backend && npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in `backend/` with the following:
```sh
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_NAME=database-formit-aws
DB_HOST=database-formit-aws.citg7zznvjrx.us-east-2.rds.amazonaws.com
DB_PORT=5432
DB_DIALECT=postgres
JWT_SECRET=your-secret-key
EMAIL_SERVICE=smtp
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password
```

---

## 🚀 Running the Application
### 1️⃣ Start the Backend
```sh
cd backend
node server.js
```
Or using PM2 (for production environments):
```sh
pm install -g pm2
pm run start:prod
```

### 2️⃣ Start the Frontend (Local Testing)
```sh
cd frontend
npm start
```

---

## 🚀 Deployment
### 1️⃣ Deploy Backend to AWS Lightsail
1. SSH into Lightsail instance
2. Pull latest code:
   ```sh
   git pull origin main
   ```
3. Restart backend service:
   ```sh
   pm2 restart formit-backend
   ```

### 2️⃣ Deploy Frontend to AWS CloudFront
1. Build frontend:
   ```sh
   cd frontend
   npm run build
   ```
2. Upload files to S3 bucket used by CloudFront.

---

## 🔍 Troubleshooting
### ✅ Common Issues & Fixes
| Issue | Solution |
|--------|----------|
| **Backend fails to start** | Ensure `.env` is correctly configured and database is reachable |
| **Frontend API calls fail** | Verify `CORS` settings and backend URL |
| **Database Connection Refused** | Check AWS RDS security group rules and ensure inbound rules allow connections from backend |
| **Email Not Sending** | Verify email credentials and SMTP service configuration |
| **SSL Certificate Issues** | Ensure ACM certificate is properly assigned to API domain |

---

## 🔒 Security & AWS Configuration
### ✅ AWS Resources Used
| Service | Purpose |
|---------|---------|
| **Lightsail** | Hosts backend (Express.js) |
| **RDS** | PostgreSQL Database |
| **CloudFront** | Frontend hosting (React) |
| **Route 53** | DNS and subdomains |
| **ACM** | SSL Certificate |

### ✅ Security Groups Configuration
| Type | Protocol | Port | Source |
|------|---------|------|--------|
| **Backend (Lightsail)** | TCP | 5000 | 0.0.0.0/0 |
| **Database (RDS)** | TCP | 5432 | Lightsail Public IP |
| **SSH Access** | TCP | 22 | Your IP Only |

---

## 🎯 Summary
This README provides a comprehensive guide for setting up, deploying, and troubleshooting the **FormIT** platform. If issues persist, refer to AWS logs (`pm2 logs` for backend) and ensure all environment variables are correctly configured.

🚀 Happy Coding!

