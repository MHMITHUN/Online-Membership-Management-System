/**
 * BSREA Online Membership Management System
 * Frontend Application Engine
 * Author: MD. Mahamudul Hasan (IT Officer Candidate)
 */

let membersData = [
  {
    id: 1,
    code: 'BSREA-CORP-011',
    name: 'Rahimafrooz Renewable Energy Ltd.',
    type: 'Corporate Member',
    sector: 'Solar Energy',
    person: 'Engr. M. Rahman',
    designation: 'Director, Technical',
    email: 'info@rahimafrooz-renewable.com',
    phone: '+880 1711 000111',
    address: 'Arzed Chamber, Mohakhali / Gulshan, Dhaka',
    registered: '2022-01-15',
    renewal: '2027-01-14',
    feeStatus: 'Paid',
    status: 'Active'
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

let currentSector = 'All';
let currentSearch = '';

// Function: Render Public Members Directory
function renderDirectory() {
  const container = document.getElementById('membersGrid');
  if (!container) return;

  const filtered = membersData.filter(m => {
    const matchSector = currentSector === 'All' || m.sector === currentSector;
    const matchSearch = m.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                        m.code.toLowerCase().includes(currentSearch.toLowerCase()) ||
                        m.address.toLowerCase().includes(currentSearch.toLowerCase()) ||
                        m.person.toLowerCase().includes(currentSearch.toLowerCase());
    return matchSector && matchSearch && m.status === 'Active';
  });

  const countBadge = document.getElementById('resultCount');
  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} of ${membersData.filter(m => m.status === 'Active').length} Active Members`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; padding: 3rem; text-align: center; background: #fff; border-radius: 8px; border: 1px solid var(--border);">
        <p style="font-size: 0.95rem; color: var(--ink-secondary);">No active member organizations match your search filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(m => `
    <div class="member-card">
      <div>
        <div class="card-top">
          <span class="member-code">${m.code}</span>
          <span class="status-pill active">● ${m.status}</span>
        </div>
        <h4 class="org-title">${m.name}</h4>
        <p class="sector-tag">⚡ ${m.sector}</p>
        
        <div class="card-details">
          <div><strong style="color: var(--ink);">Type:</strong> ${m.type}</div>
          <div><strong style="color: var(--ink);">Representative:</strong> ${m.person} (${m.designation})</div>
          <div><strong style="color: var(--ink);">Location:</strong> ${m.address}</div>
          <div><strong style="color: var(--ink);">Contact:</strong> ${m.email} &bull; ${m.phone}</div>
        </div>
      </div>

      <div style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; font-family: var(--font-mono); color: var(--ink-secondary);">
        <span>Valid: ${m.renewal}</span>
        <span style="color: var(--primary); font-weight: 600;">BSREA Verified ✓</span>
      </div>
    </div>
  `).join('');
}

// Function: Render Admin Backoffice Table
function renderAdmin() {
  const tableBody = document.getElementById('adminTableBody');
  if (!tableBody) return;

  const totalEl = document.getElementById('totalCount');
  const activeEl = document.getElementById('activeCount');
  const pendingEl = document.getElementById('pendingCount');

  if (totalEl) totalEl.textContent = membersData.length;
  if (activeEl) activeEl.textContent = membersData.filter(m => m.status === 'Active').length;
  if (pendingEl) pendingEl.textContent = membersData.filter(m => m.status === 'Pending Approval').length;

  tableBody.innerHTML = membersData.map(m => `
    <tr>
      <td style="font-family: var(--font-mono); font-weight: 700; color: var(--primary);">${m.code}</td>
      <td>
        <strong style="color: var(--ink);">${m.name}</strong>
        <div style="font-size: 0.75rem; color: var(--ink-secondary);">${m.person} &bull; ${m.email}</div>
      </td>
      <td>${m.sector}</td>
      <td>${m.type}</td>
      <td>
        <span class="status-pill ${m.status === 'Active' ? 'active' : 'pending'}">${m.status}</span>
      </td>
      <td style="font-family: var(--font-mono); font-size: 0.75rem;">${m.renewal}</td>
      <td>
        ${m.status === 'Pending Approval' ? `
          <button onclick="approveMember(${m.id})" class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;">Approve</button>
        ` : `
          <button onclick="toggleStatus(${m.id})" class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;">Manage</button>
        `}
      </td>
    </tr>
  `).join('');
}

function approveMember(id) {
  const member = membersData.find(m => m.id === id);
  if (member) {
    member.status = 'Active';
    member.feeStatus = 'Paid';
    renderAdmin();
    alert(`Member [${member.name}] has been approved and published to directory!`);
  }
}

function toggleStatus(id) {
  const member = membersData.find(m => m.id === id);
  if (member) {
    const nextStatus = member.status === 'Active' ? 'Suspended' : 'Active';
    member.status = nextStatus;
    renderAdmin();
    alert(`Status updated to ${nextStatus}.`);
  }
}

// Function: Handle Member Registration Form
function handleRegister(e) {
  e.preventDefault();

  const orgName = document.getElementById('regOrg').value.trim();
  const type = document.getElementById('regType').value;
  const sector = document.getElementById('regSector').value;
  const person = document.getElementById('regPerson').value.trim();
  const desig = document.getElementById('regDesig').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const address = document.getElementById('regAddress').value.trim();

  if (!orgName || !email || !phone) {
    alert('Please fill all required fields.');
    return;
  }

  const randCode = 'BSREA-' + type.substring(0, 4).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900);
  const today = new Date().toISOString().split('T')[0];
  const nextYear = new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0];

  const newMember = {
    id: Date.now(),
    code: randCode,
    name: orgName,
    type: type,
    sector: sector,
    person: person,
    designation: desig || 'Representative',
    email: email,
    phone: phone,
    address: address || 'Dhaka, Bangladesh',
    registered: today,
    renewal: nextYear,
    feeStatus: 'Due',
    status: 'Pending Approval'
  };

  membersData.unshift(newMember);
  closeRegisterModal();
  alert(`Application submitted! Registration code: ${randCode}. Awaiting Secretariat review.`);
  renderDirectory();
  renderAdmin();
}

function openRegisterModal() {
  const modal = document.getElementById('regModal');
  if (modal) modal.classList.add('active');
}

function closeRegisterModal() {
  const modal = document.getElementById('regModal');
  if (modal) modal.classList.remove('active');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderDirectory();
    });
  }

  document.querySelectorAll('.sector-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.sector-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentSector = e.target.dataset.sector;
      renderDirectory();
    });
  });

  const form = document.getElementById('regForm');
  if (form) form.addEventListener('submit', handleRegister);

  renderDirectory();
  renderAdmin();
});
