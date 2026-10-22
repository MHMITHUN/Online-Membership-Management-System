# BSREA Online Membership Management System & Digital Directory

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-emerald?style=for-the-badge&logo=github)](https://mhmithun.github.io/Online-Membership-Management-System/)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-forestgreen?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/cloud/atlas)
[![Serverless](https://img.shields.io/badge/Serverless-Vercel%20%2F%20Netlify-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

A full-featured digital membership platform and searchable member directory developed for the **Bangladesh Sustainable and Renewable Energy Association (BSREA)**. Enables seamless corporate, associate, and institutional member onboarding, digital profile management, annual subscription renewal tracking, and public member verification.

Developed by **MD. Mahamudul Hasan** (IT Officer Candidate).

---

## 🌐 Live Access & Deployment

- **Public Live Application**: [https://mhmithun.github.io/Online-Membership-Management-System/](https://mhmithun.github.io/Online-Membership-Management-System/)
- **GitHub Repository**: [https://github.com/MHMITHUN/Online-Membership-Management-System](https://github.com/MHMITHUN/Online-Membership-Management-System)
- **Production Database**: MongoDB Atlas Dedicated Cluster (`bsrea_portal` database with IP whitelist `0.0.0.0/0`)
- **Serverless API Ready**: Supports Vercel & Netlify Serverless Node.js runtime (`api/members.js`, `api/register_member.js`)

---

## 🌟 Key Features

1. **Digital Member Directory**: Interactive searchable and filterable directory categorized by renewable sectors (Solar Energy, Wind Energy, Biomass & Biofuel, Energy Efficiency, Hydro & Microgrid).
2. **Online Membership Registration**: Multi-step application workflow for Corporate, Associate, and Institutional members with automated ID assignment (`BSREA-CORP-XXX`).
3. **Dual Cloud & Relational Database**:
   - **MongoDB Atlas Cloud**: Document store hosting member profiles, renewable classifications, and subscription timestamps.
   - **MySQL / MariaDB**: Relational schema with index optimizations on membership codes, status, and fee tracking.
4. **Member Verification & Status Checking**: Real-time status lookup (Active, Pending, Expired) with instant digital membership certificate preview.
5. **Admin Analytics Dashboard**: Statistical overview of members by renewable sector, fee collection status, and membership renewal deadlines.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5 Semantic markup, Vanilla CSS3 (Custom Emerald Renewable Design System), JavaScript (ES6+).
- **Cloud Database**: MongoDB Atlas (Cloud Cluster, Global IP `0.0.0.0/0`, authenticated connection).
- **Relational Backend**: PHP 8.2 (RESTful JSON APIs, PDO secure parameterized statements, MySQL/MariaDB).
- **Serverless Runtime**: Node.js 20+ on Vercel / Netlify Serverless Functions (`api/*.js`).
- **Security**: Parameterized queries, CSRF token validation, input sanitization.

---

## 🚀 How to Run Locally

### Option 1: Live Web / Browser (Zero Setup)
Visit the live portal at [https://mhmithun.github.io/Online-Membership-Management-System/](https://mhmithun.github.io/Online-Membership-Management-System/) or open `index.html` locally in any browser.

### Option 2: Node.js & MongoDB Atlas Serverless API
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` (copy from `.env.example`):
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=3000
   ```
3. Run the development server:
   ```bash
   npm start
   ```

### Option 3: PHP & MySQL Local Setup
1. Import `backend/schema.sql` into MySQL:
   ```sql
   mysql -u root -p < backend/schema.sql
   ```
2. Configure credentials in `backend/db_connect.php`:
   ```php
   $host     = 'localhost';
   $db_name  = 'bsrea_membership_system';
   $username = 'your_username';
   $password = 'your_password';
   ```
3. Start PHP server:
   ```bash
   php -S localhost:8000
   ```

---

## 📂 Project Structure

```
Online_Membership_Management_System/
├── index.html               # Main directory & membership portal UI
├── css/
│   └── styles.css           # Modern BSREA emerald design system
├── js/
│   └── app.js              # Frontend logic, directory search, filter & registration
├── api/                     # Cloud Serverless API (Vercel / Netlify)
│   ├── db.js                # MongoDB Atlas connection handler
│   ├── members.js           # /api/members directory query endpoint
│   └── register_member.js   # /api/register_member endpoint
├── backend/                 # Relational PHP Backend
│   ├── schema.sql           # MySQL database schema & seed data
│   ├── db_connect.php       # Secure PDO database connector
│   └── api/
│       ├── members.php      # PHP members directory endpoint
│       └── register_member.php # PHP registration endpoint
├── vercel.json              # Vercel deployment configuration
├── netlify.toml             # Netlify deployment configuration
├── package.json             # Node.js dependencies (mongodb driver)
└── README.md                # Project documentation
```

---

## 👨‍💻 Candidate Information

- **Name**: MD. Mahamudul Hasan (Mithun)
- **Role**: IT Officer Candidate, BSREA
- **GitHub**: [github.com/MHMITHUN](https://github.com/MHMITHUN)
- **Email**: mhmmithun1@gmail.com
