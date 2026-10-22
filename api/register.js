/**
 * Serverless API: /api/register
 * Member Onboarding & Admin Status Controls
 * Author: MD. Mahamudul Hasan
 */

import { getDatabase, initialMembers } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed. Use POST.' });
  }

  const { action = 'register', orgName, type, sector, person, designation, email, phone, address, memberCode, newStatus } = req.body || {};

  try {
    const db = await getDatabase();

    if (action === 'register') {
      if (!orgName || !email || !phone) {
        return res.status(422).json({
          status: 'error',
          message: 'Organization name, corporate email, and contact phone are required.'
        });
      }

      const randCode = 'BSREA-' + (type || 'CORP').substring(0, 4).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900);
      const today = new Date().toISOString().split('T')[0];
      const nextYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const newMember = {
        code: randCode,
        name: orgName,
        type: type || 'Corporate Member',
        sector: sector || 'Solar Energy',
        person: person || 'Representative',
        designation: designation || 'Representative',
        email,
        phone,
        address: address || 'Dhaka, Bangladesh',
        registered: today,
        renewal: nextYear,
        feeStatus: 'Due',
        status: 'Pending Approval',
        createdAt: new Date()
      };

      if (db) {
        await db.collection('members').insertOne(newMember);
      } else {
        initialMembers.unshift(newMember);
      }

      return res.status(201).json({
        status: 'success',
        message: 'Membership application submitted successfully. Pending Secretariat review.',
        data: newMember
      });
    } else if (action === 'update_status') {
      if (!memberCode) {
        return res.status(400).json({ status: 'error', message: 'memberCode is required.' });
      }

      if (db) {
        await db.collection('members').updateOne(
          { code: memberCode },
          { $set: { status: newStatus || 'Active', feeStatus: 'Paid', updatedAt: new Date() } }
        );
      } else {
        const mem = initialMembers.find(m => m.code === memberCode);
        if (mem) {
          mem.status = newStatus || 'Active';
          mem.feeStatus = 'Paid';
        }
      }

      return res.status(200).json({
        status: 'success',
        message: `Member ${memberCode} updated to ${newStatus || 'Active'}.`
      });
    }

    return res.status(400).json({ status: 'error', message: 'Unknown action.' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}
