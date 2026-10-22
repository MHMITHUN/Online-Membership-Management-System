/**
 * MongoDB Connection Handler for Vercel / Netlify Serverless Functions
 * BSREA Online Membership Management System
 */

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
let client = null;
let clientPromise = null;

export const initialMembers = [
  {
    code: 'BSREA-CORP-011',
    name: 'Rahimafrooz Renewable Energy Ltd.',
    type: 'Corporate Member',
    sector: 'Solar Energy',
    person: 'Engr. M. Rahman',
    designation: 'Director, Technical',
    email: 'info@rahimafrooz-renewable.com',
    phone: '+880 1711 000111',
    address: 'Mohakhali / Gulshan, Dhaka',
    registered: '2022-01-15',
    renewal: '2027-01-14',
    feeStatus: 'Paid',
    status: 'Active'
  },
  {
    code: 'BSREA-CORP-024',
    name: 'Solaric Bangladesh Limited',
    type: 'Corporate Member',
    sector: 'Solar Energy',
    person: 'Tanvir Hossain',
    designation: 'Managing Director',
    email: 'support@solaricbd.com',
    phone: '+880 1712 222333',
    address: 'Baridhara DOHS, Dhaka',
    registered: '2023-03-20',
    renewal: '2027-03-19',
    feeStatus: 'Paid',
    status: 'Active'
  },
  {
    code: 'BSREA-ASSOC-038',
    name: 'Green Energy Engineering BD',
    type: 'Associate Member',
    sector: 'Wind Energy',
    person: 'Engr. Kamal Uddin',
    designation: 'Head of Operations',
    email: 'contact@greenenergybd.org',
    phone: '+880 1819 444555',
    address: 'Sector-4, Uttara, Dhaka',
    registered: '2024-02-10',
    renewal: '2027-02-09',
    feeStatus: 'Paid',
    status: 'Active'
  },
  {
    code: 'BSREA-CORP-052',
    name: 'Desh BioPower Systems PLC',
    type: 'Corporate Member',
    sector: 'Biomass & Biofuel',
    person: 'Dr. M. A. Karim',
    designation: 'Chief Energy Officer',
    email: 'biopower@deshenergy.com',
    phone: '+880 1713 555666',
    address: 'Tejgaon I/A, Dhaka',
    registered: '2023-07-01',
    renewal: '2027-06-30',
    feeStatus: 'Paid',
    status: 'Active'
  },
  {
    code: 'BSREA-INST-009',
    name: 'EcoEfficiency Solutions Ltd.',
    type: 'Institutional Member',
    sector: 'Energy Efficiency',
    person: 'S. M. Chowdhury',
    designation: 'Senior Consultant',
    email: 'info@ecoefficientbd.net',
    phone: '+880 1914 777888',
    address: 'Dhanmondi, Dhaka',
    registered: '2025-01-10',
    renewal: '2027-01-09',
    feeStatus: 'Paid',
    status: 'Active'
  },
  {
    code: 'BSREA-ASSOC-063',
    name: 'Bengal Hydro & Microgrid Ltd.',
    type: 'Associate Member',
    sector: 'Hydro & Microgrid',
    person: 'Nasir Ahmed',
    designation: 'Project Director',
    email: 'hello@bengalhydro.com',
    phone: '+880 1610 999000',
    address: 'Mirpur DOHS, Dhaka',
    registered: '2025-05-18',
    renewal: '2027-05-17',
    feeStatus: 'Paid',
    status: 'Active'
  }
];

export async function getDatabase() {
  if (!uri) {
    console.warn('MONGODB_URI not provided. Using in-memory fallback.');
    return null;
  }

  if (!clientPromise) {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    clientPromise = client.connect();
  }

  const connectedClient = await clientPromise;
  return connectedClient.db('bsrea_membership_system');
}
