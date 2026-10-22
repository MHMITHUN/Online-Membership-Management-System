/**
 * Serverless API: /api/members
 * Query, Search & Filter Member Directory
 * Author: MD. Mahamudul Hasan
 */

import { getDatabase, initialMembers } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { q = '', sector = 'All', status = 'Active' } = req.query || {};

  try {
    const db = await getDatabase();
    let members = [];

    if (db) {
      const collection = db.collection('members');
      const count = await collection.countDocuments();
      if (count === 0) {
        await collection.insertMany(initialMembers);
      }

      const queryObj = {};
      if (status && status !== 'All') {
        queryObj.status = status;
      }
      if (sector && sector !== 'All') {
        queryObj.sector = sector;
      }
      if (q) {
        queryObj.$or = [
          { name: { $regex: q, $options: 'i' } },
          { code: { $regex: q, $options: 'i' } },
          { person: { $regex: q, $options: 'i' } },
          { address: { $regex: q, $options: 'i' } }
        ];
      }

      members = await collection.find(queryObj).sort({ name: 1 }).toArray();
    } else {
      // In-memory fallback
      members = initialMembers.filter(m => {
        const matchStatus = status === 'All' || m.status === status;
        const matchSector = sector === 'All' || m.sector === sector;
        const matchQ = !q || m.name.toLowerCase().includes(q.toLowerCase()) ||
                             m.code.toLowerCase().includes(q.toLowerCase()) ||
                             m.person.toLowerCase().includes(q.toLowerCase());
        return matchStatus && matchSector && matchQ;
      });
    }

    return res.status(200).json({
      status: 'success',
      count: members.length,
      data: members,
      gateway: 'BSREA Vercel Serverless Directory'
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
