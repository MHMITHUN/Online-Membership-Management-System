# BSREA Online Membership Management System & Digital Directory

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-emerald?style=for-the-badge&logo=github)](https://mhmithun.github.io/Online-Membership-Management-System/)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-forestgreen?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/cloud/atlas)
[![Serverless](https://img.shields.io/badge/Serverless-Vercel%20%2F%20Netlify-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

An enterprise institutional membership platform and corporate directory hub developed for the **Bangladesh Sustainable and Renewable Energy Association (BSREA)**. Enables corporate member onboarding, multi-facet sector categorization, annual renewal tracking, detailed corporate dossiers, and public member verification.

Engineered with an **Executive Ivory & British Racing Green / Sovereign Gold Design System**, dual Card Grid vs Table Ledger view switcher, and interactive company profile dossiers.

Developed by **MD. Mahamudul Hasan**.

---

## 🌐 Live Access & Deployment

- **Public Live Application**: [https://mhmithun.github.io/Online-Membership-Management-System/](https://mhmithun.github.io/Online-Membership-Management-System/)
- **GitHub Repository**: [https://github.com/MHMITHUN/Online-Membership-Management-System](https://github.com/MHMITHUN/Online-Membership-Management-System)
- **Production Database**: MongoDB Atlas Dedicated Cluster (`bsrea_portal` database with IP whitelist `0.0.0.0/0`)
- **Serverless API Ready**: Supports Vercel & Netlify Serverless Node.js runtime (`api/members.js`, `api/register_member.js`)

---

## 🌟 Key Features

1. **Dual Directory Display Engine**:
   - **Executive Cards Grid**: Visual company cards featuring corporate initial crests, sector tags, executive contacts, and direct dossier triggers.
   - **Enterprise Ledger Table**: Dense tabular data view with instant sorting, status indicators, and column filters.
2. **Executive Industry KPI Metrics**: High-level telemetry displaying registered enterprises (148), cumulative capacity (2,450 MW), sector capitalization ($1.45B), and regulatory compliance (100%).
3. **Interactive Corporate Dossier**: Comprehensive corporate profile modal showcasing executive board leadership, NBR tax BIN verification, registered renewable project portfolio, and accreditation records.
4. **Multi-Dimensional Filter & Search**: Instant filtering by Renewable Sector, Membership Class (Corporate, Associate, Institutional), District/Region, and real-time text query.
5. **Secretariat Backoffice Console (`admin.html`)**: Complete administrative CRM for reviewing new member applications, approving/suspending memberships, and managing renewal terms.
6. **Dual Cloud & Relational Database**:
   - **MongoDB Atlas Cloud**: Document store hosting member profiles, renewable classifications, and subscription timestamps.
   - **MySQL / MariaDB**: Relational schema with index optimizations on membership codes, status, and fee tracking.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5 Semantic markup, Executive Ivory & British Racing Green CSS3, Typography (`Cinzel` & `Plus Jakarta Sans`), JavaScript (ES6+).
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

## 👨‍💻 Author & Maintainer

- **Developer**: MD. Mahamudul Hasan (Mithun)
- **GitHub**: [github.com/MHMITHUN](https://github.com/MHMITHUN)
- **LinkedIn**: [linkedin.com/in/mahamudul0](https://linkedin.com/in/mahamudul0)
- **Email**: mhmmithun1@gmail.com
