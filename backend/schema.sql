-- BSREA Online Membership Management System Database Schema
-- Database: bsrea_membership_system
-- Author: MD. Mahamudul Hasan (IT Officer Candidate)

CREATE DATABASE IF NOT EXISTS `bsrea_membership_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bsrea_membership_system`;

-- 1. Renewable Energy Sectors
CREATE TABLE IF NOT EXISTS `tbl_sectors` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `sector_name` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT,
  `is_active` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Members Table
CREATE TABLE IF NOT EXISTS `tbl_members` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `member_code` VARCHAR(50) NOT NULL UNIQUE,
  `organization_name` VARCHAR(255) NOT NULL,
  `membership_type` ENUM('Corporate Member', 'Associate Member', 'Institutional Member', 'Honorary Member') NOT NULL DEFAULT 'Corporate Member',
  `sector_id` INT NOT NULL,
  `contact_person` VARCHAR(150) NOT NULL,
  `designation` VARCHAR(100) NOT NULL,
  `contact_email` VARCHAR(150) NOT NULL UNIQUE,
  `contact_phone` VARCHAR(50) NOT NULL,
  `website_url` VARCHAR(255) DEFAULT NULL,
  `office_address` TEXT NOT NULL,
  `registration_date` DATE NOT NULL,
  `renewal_date` DATE NOT NULL,
  `annual_fee_status` ENUM('Paid', 'Due', 'Waived') DEFAULT 'Paid',
  `status` ENUM('Active', 'Pending Approval', 'Suspended', 'Expired') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_member_sector` FOREIGN KEY (`sector_id`) REFERENCES `tbl_sectors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Membership Renewal Log
CREATE TABLE IF NOT EXISTS `tbl_renewals` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `member_id` INT NOT NULL,
  `renewal_year` YEAR NOT NULL,
  `fee_amount` DECIMAL(10,2) NOT NULL,
  `payment_receipt_no` VARCHAR(100) NOT NULL,
  `payment_date` DATE NOT NULL,
  `approved_by` VARCHAR(100) DEFAULT 'IT Officer / Admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_renewal_member` FOREIGN KEY (`member_id`) REFERENCES `tbl_members` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Sectors
INSERT INTO `tbl_sectors` (`sector_name`, `description`) VALUES
('Solar Energy', 'Solar PV, Commercial Rooftop, Solar Irrigation, Grid-Tied Systems'),
('Wind Energy', 'Onshore & Offshore Wind Turbines, Resource Assessment'),
('Biomass & Biofuel', 'Agricultural Biomass, Biogas Plants, Waste-to-Energy'),
('Energy Efficiency', 'Energy Auditing, Industrial Power Quality, Smart Storage'),
('Hydro & Microgrid', 'Mini-Hydro Systems, Rural Island Microgrids'),
('Electric Mobility', 'EV Charging Stations, Solar-Powered EV Infrastructure');

-- Seed Registered Members
INSERT INTO `tbl_members` 
(`member_code`, `organization_name`, `membership_type`, `sector_id`, `contact_person`, `designation`, `contact_email`, `contact_phone`, `website_url`, `office_address`, `registration_date`, `renewal_date`, `annual_fee_status`, `status`) 
VALUES
('BSREA-CORP-011', 'Rahimafrooz Renewable Energy Ltd.', 'Corporate Member', 1, 'Engr. M. Rahman', 'Director, Technical', 'info@rahimafrooz-renewable.com', '+880 1711 000111', 'https://rahimafrooz-renewable.com', 'Mohakhali / Gulshan, Dhaka', '2022-01-15', '2027-01-14', 'Paid', 'Active'),
('BSREA-CORP-024', 'Solaric Bangladesh Limited', 'Corporate Member', 1, 'Tanvir Hossain', 'Managing Director', 'support@solaricbd.com', '+880 1712 222333', 'https://solaricbd.com', 'Baridhara DOHS, Dhaka', '2023-03-20', '2027-03-19', 'Paid', 'Active'),
('BSREA-ASSOC-038', 'Green Energy Engineering BD', 'Associate Member', 2, 'Engr. Kamal Uddin', 'Head of Operations', 'contact@greenenergybd.org', '+880 1819 444555', 'https://greenenergybd.org', 'Sector-4, Uttara, Dhaka', '2024-02-10', '2027-02-09', 'Paid', 'Active'),
('BSREA-CORP-052', 'Desh BioPower Systems PLC', 'Corporate Member', 3, 'Dr. M. A. Karim', 'Chief Energy Officer', 'biopower@deshenergy.com', '+880 1713 555666', 'https://deshenergy.com', 'Tejgaon I/A, Dhaka', '2023-07-01', '2027-06-30', 'Paid', 'Active'),
('BSREA-INST-009', 'EcoEfficiency Solutions Ltd.', 'Institutional Member', 4, 'S. M. Chowdhury', 'Senior Consultant', 'info@ecoefficientbd.net', '+880 1914 777888', 'https://ecoefficientbd.net', 'Dhanmondi, Dhaka', '2025-01-10', '2027-01-09', 'Paid', 'Active'),
('BSREA-ASSOC-063', 'Bengal Hydro & Microgrid Ltd.', 'Associate Member', 5, 'Nasir Ahmed', 'Project Director', 'hello@bengalhydro.com', '+880 1610 999000', 'https://bengalhydro.com', 'Mirpur DOHS, Dhaka', '2025-05-18', '2027-05-17', 'Paid', 'Active');
