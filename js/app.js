/**
 * BSREA Online Membership Management System
 * Frontend Application & Administrative Backoffice Engine
 * Author: MD. Mahamudul Hasan
 */

const STORAGE_KEY = 'bsrea_members_registry_v1';

const defaultMembers = [
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

function loadMembers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading from localStorage:', e);
  }
  return [...defaultMembers];
}

function saveMembers(data) {
  membersData = data;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Error writing to localStorage:', e);
  }
}

let membersData = loadMembers();
let currentSector = 'All';
let currentSearch = '';

// Function: Render Public Members Directory
function renderDirectory() {
  const container = document.getElementById('membersGrid');
  if (!container) return;

  const activeMembers = membersData.filter(m => m.status === 'Active');

  const filtered = activeMembers.filter(m => {
    const matchSector = currentSector === 'All' || m.sector === currentSector;
    const matchSearch = (m.name || '').toLowerCase().includes(currentSearch.toLowerCase()) ||
                        (m.code || '').toLowerCase().includes(currentSearch.toLowerCase()) ||
                        (m.address || '').toLowerCase().includes(currentSearch.toLowerCase()) ||
                        (m.person || '').toLowerCase().includes(currentSearch.toLowerCase());
    return matchSector && matchSearch;
  });

  const countBadge = document.getElementById('resultCount');
  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} of ${activeMembers.length} Active Members`;
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
          <div><strong style="color: var(--ink);">Representative:</strong> ${m.person} (${m.designation || 'Representative'})</div>
          <div><strong style="color: var(--ink);">Location:</strong> ${m.address || 'Dhaka, Bangladesh'}</div>
          <div><strong style="color: var(--ink);">Contact:</strong> ${m.email} &bull; ${m.phone}</div>
        </div>
      </div>

      <div style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; font-family: var(--font-mono); color: var(--ink-secondary);">
        <span>Renewal: ${m.renewal || '2027-12-31'}</span>
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

  const total = membersData.length;
  const active = membersData.filter(m => m.status === 'Active').length;
  const pending = membersData.filter(m => m.status === 'Pending Approval').length;

  if (totalEl) totalEl.textContent = total;
  if (activeEl) activeEl.textContent = active;
  if (pendingEl) pendingEl.textContent = pending;

  if (membersData.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--ink-secondary);">No member records found.</td></tr>`;
    return;
  }

  tableBody.innerHTML = membersData.map(m => {
    const isPending = m.status === 'Pending Approval';
    const isSuspended = m.status === 'Suspended';
    let pillClass = 'active';
    if (isPending) pillClass = 'pending';
    if (isSuspended) pillClass = 'suspended';

    return `
      <tr style="${isPending ? 'background: #fffbeb;' : ''}">
        <td style="font-family: var(--font-mono); font-weight: 700; color: var(--primary);">${m.code}</td>
        <td>
          <strong style="color: var(--ink);">${m.name}</strong>
          <div style="font-size: 0.75rem; color: var(--ink-secondary);">${m.person} &bull; ${m.email}</div>
        </td>
        <td>${m.sector}</td>
        <td>${m.type}</td>
        <td>
          <span class="status-pill ${pillClass}">● ${m.status}</span>
        </td>
        <td style="font-family: var(--font-mono); font-size: 0.75rem;">${m.renewal}</td>
        <td>
          <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
            ${isPending ? `
              <button type="button" onclick="approveMember(${m.id})" class="btn btn-primary" style="padding: 0.35rem 0.65rem; font-size: 0.72rem; background: var(--pass);">
                Approve
              </button>
              <button type="button" onclick="rejectMember(${m.id})" class="btn btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.72rem; color: #dc2626; border-color: #fca5a5;">
                Reject
              </button>
            ` : ''}
            <button type="button" onclick="openManageModal(${m.id})" class="btn btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.72rem;">
              Manage
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function approveMember(id) {
  const member = membersData.find(m => m.id === id);
  if (member) {
    member.status = 'Active';
    member.feeStatus = 'Paid';
    saveMembers(membersData);
    renderAdmin();
    renderDirectory();

    // Sync to MongoDB Atlas API in background
    try {
      fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_status',
          memberCode: member.code,
          newStatus: 'Active'
        })
      }).catch(() => {});
    } catch(e) {}

    alert(`Success: [${member.name}] has been approved and is now active in the public directory!`);
  }
}

// Function: Reject Member
function rejectMember(id) {
  const member = membersData.find(m => m.id === id);
  if (member) {
    if (confirm(`Are you sure you want to reject the application for "${member.name}"?`)) {
      membersData = membersData.filter(m => m.id !== id);
      saveMembers(membersData);
      renderAdmin();
      renderDirectory();
      alert(`Application for [${member.name}] has been rejected.`);
    }
  }
}

// Function: Open Detailed Manage Modal
function openManageModal(id) {
  const member = membersData.find(m => m.id === id);
  if (!member) return;

  const modal = document.getElementById('manageModal');
  if (!modal) return;

  document.getElementById('mngId').value = member.id;
  document.getElementById('mngCode').textContent = member.code;
  document.getElementById('mngName').value = member.name || '';
  document.getElementById('mngSector').value = member.sector || 'Solar Energy';
  document.getElementById('mngTier').value = member.type || 'Corporate Member';
  document.getElementById('mngPerson').value = member.person || '';
  document.getElementById('mngDesig').value = member.designation || '';
  document.getElementById('mngEmail').value = member.email || '';
  document.getElementById('mngPhone').value = member.phone || '';
  document.getElementById('mngAddress').value = member.address || '';
  document.getElementById('mngStatus').value = member.status || 'Active';
  document.getElementById('mngFee').value = member.feeStatus || 'Paid';
  document.getElementById('mngRenewal').value = member.renewal || '';

  modal.classList.add('active');
}

function closeManageModal() {
  const modal = document.getElementById('manageModal');
  if (modal) modal.classList.remove('active');
}

// Function: Save Managed Member Changes
function handleManageSave(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('mngId').value, 10);
  const member = membersData.find(m => m.id === id);
  if (!member) return;

  member.name = document.getElementById('mngName').value.trim();
  member.sector = document.getElementById('mngSector').value;
  member.type = document.getElementById('mngTier').value;
  member.person = document.getElementById('mngPerson').value.trim();
  member.designation = document.getElementById('mngDesig').value.trim();
  member.email = document.getElementById('mngEmail').value.trim();
  member.phone = document.getElementById('mngPhone').value.trim();
  member.address = document.getElementById('mngAddress').value.trim();
  member.status = document.getElementById('mngStatus').value;
  member.feeStatus = document.getElementById('mngFee').value;
  member.renewal = document.getElementById('mngRenewal').value;

  saveMembers(membersData);
  closeManageModal();
  renderAdmin();
  renderDirectory();
  alert(`Member record [${member.code} - ${member.name}] updated successfully!`);
}

// Function: Delete Member Record from Manage Modal
function deleteMemberRecord() {
  const id = parseInt(document.getElementById('mngId').value, 10);
  const member = membersData.find(m => m.id === id);
  if (!member) return;

  if (confirm(`WARNING: Are you sure you want to permanently delete member record [${member.code} - ${member.name}]?`)) {
    membersData = membersData.filter(m => m.id !== id);
    saveMembers(membersData);
    closeManageModal();
    renderAdmin();
    renderDirectory();
    alert(`Member record deleted successfully.`);
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

  if (!orgName || !email || !phone || !person) {
    alert('Please fill all required fields.');
    return;
  }

  const prefix = type.includes('Corporate') ? 'CORP' : (type.includes('Associate') ? 'ASSOC' : 'INST');
  const randNum = Math.floor(100 + Math.random() * 900);
  const randCode = `BSREA-${prefix}-${randNum}`;
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
    address: address || 'Gulshan / Dhaka, Bangladesh',
    registered: today,
    renewal: nextYear,
    feeStatus: 'Due',
    status: 'Pending Approval'
  };

  membersData.unshift(newMember);
  saveMembers(membersData);

  // Sync to MongoDB Atlas API in background
  try {
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'register',
        orgName,
        type,
        sector,
        person,
        designation: desig || 'Representative',
        email,
        phone,
        address
      })
    }).catch(() => {});
  } catch(e) {}

  // Reset form
  const form = document.getElementById('regForm');
  if (form) form.reset();

  closeRegisterModal();
  renderDirectory();
  renderAdmin();

  alert(`Application Submitted Successfully!\n\nRegistration Code: ${randCode}\nCompany: ${orgName}\n\nYour application has been received and is now pending Secretariat review in the Admin Dashboard.`);
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
  // Public directory search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderDirectory();
    });
  }

  // Sector filter buttons
  document.querySelectorAll('.sector-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.sector-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentSector = e.target.dataset.sector;
      renderDirectory();
    });
  });

  // Registration Form Submit
  const regForm = document.getElementById('regForm');
  if (regForm) regForm.addEventListener('submit', handleRegister);

  // Manage Form Submit
  const mngForm = document.getElementById('manageForm');
  if (mngForm) mngForm.addEventListener('submit', handleManageSave);

  // Close modals on clicking backdrop
  const regModal = document.getElementById('regModal');
  if (regModal) {
    regModal.addEventListener('click', (e) => {
      if (e.target === regModal) closeRegisterModal();
    });
  }

  const mngModal = document.getElementById('manageModal');
  if (mngModal) {
    mngModal.addEventListener('click', (e) => {
      if (e.target === mngModal) closeManageModal();
    });
  }

  // Close modals on pressing Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRegisterModal();
      closeManageModal();
    }
  });

  // Initial Renders
  renderDirectory();
  renderAdmin();

  // Background sync from MongoDB Atlas API (when running with server / Vercel)
  try {
    fetch('/api/members')
      .then(res => res.ok ? res.json() : null)
      .then(json => {
        if (json && json.data && Array.isArray(json.data) && json.data.length > 0) {
          saveMembers(json.data);
          renderDirectory();
          renderAdmin();
        }
      })
      .catch(() => {});
  } catch(e) {}
});
