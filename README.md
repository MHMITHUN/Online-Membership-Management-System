# Online Membership Management & Digital Directory System

A web-based organizational membership management platform and public directory designed for the **Bangladesh Sustainable and Renewable Energy Association (BSREA)**.

Developed by **MD. Mahamudul Hasan** (IT Officer Candidate).

---

## 🌟 Key Features

1. **Public Digital Directory**: Fast, responsive member directory searchable by company name, representative, sector, and location.
2. **Renewable Energy Sector Filtering**: Instant filtering across Bangladesh renewable energy sectors (Solar Energy, Wind Power, Biomass & Biofuel, Energy Efficiency, Hydro & Microgrid).
3. **Online Member Onboarding**: Digital application form capturing organization details, designated representatives, corporate email, phone, and membership tiers.
4. **Administrative Backoffice Dashboard**: Administrative control panel for the Secretariat to review pending applications, update membership status (Active, Suspended, Expired), and monitor renewal fees.
5. **Relational MySQL Database Schema**: Structured tables with foreign key relationships, audit tracking, and automated renewal logs.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (BSREA Emerald Design System), JavaScript (ES6+).
- **Backend**: PHP 8.2 (RESTful JSON APIs, PDO secure queries).
- **Database**: MySQL / MariaDB (`tbl_members`, `tbl_sectors`, `tbl_renewals`).

---

## 🚀 How to Run Locally

### Option 1: Standalone Browser Mode (Zero Setup)
Open `index.html` (Public Directory) or `admin.html` (Administrative Console) directly in any web browser. Features an embedded client-side database engine with full interactive search, filtering, and approval capabilities.

### Option 2: Full PHP & MySQL Setup
1. Import `backend/schema.sql` into MySQL:
   ```sql
   mysql -u root -p < backend/schema.sql
   ```
2. Configure database credentials in `backend/db_connect.php`:
   ```php
   $host     = 'localhost';
   $db_name  = 'bsrea_membership_system';
   $username = 'your_username';
   $password = 'your_password';
   ```
3. Start PHP development server:
   ```bash
   php -S localhost:8080
   ```
4. Access the portal at `http://localhost:8080/`.

---

## 📂 Project Structure

```
Online_Membership_Management_System/
├── index.html               # Public member directory & application portal
├── admin.html               # Secretariat backoffice administration console
├── css/
│   └── styles.css           # Modern directory and admin dashboard styling
├── js/
│   └── app.js              # Reactive search, category filter, and admin actions
├── backend/
│   ├── schema.sql           # Complete MySQL relational database schema
│   ├── db_connect.php       # PDO database connection
│   └── api/
│       ├── members.php      # Member search & query endpoint
│       └── register.php     # Member onboarding & approval endpoint
└── README.md                # Documentation and setup instructions
```

---

## 🔗 How to Push to GitHub

To publish this repository to your GitHub profile (`github.com/MHMITHUN`):

```bash
git init
git add .
git commit -m "feat: initial commit of BSREA Online Membership Management System"
git branch -M main
git remote add origin https://github.com/MHMITHUN/Online-Membership-Management-System.git
git push -u origin main
```
