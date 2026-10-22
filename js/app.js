/**
 * BSREA Online Membership Management System & Corporate Registry
 * Executive Frontend Logic & Administrative CRM Engine
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
    region: 'Dhaka',
    capacity: '120 MW Solar EPC Portfolio',
    tinBin: 'BIN-000192837-0101',
    person: 'Engr. M. Rahman',
    designation: 'Director, Technical',
    email: 'info@rahimafrooz-renewable.com',
    phone: '+880 1711 000111',
    address: 'Arzed Chamber, Mohakhali / Gulshan-2, Dhaka',
    registered: '2022-01-15',
    renewal: '2027-01-14',
    feeStatus: 'Paid',
    status: 'Active',
    projects: '50MW Feni Solar Park, 12MW Gazipur Industrial Rooftop'
  },
  {
    id: 2,
    code: 'BSREA-CORP-024',
    name: 'Solaric Bangladesh Limited',
    type: 'Corporate Member',
    sector: 'Solar Energy',
    region: 'Dhaka',
    capacity: '85 MW C&I Rooftop Systems',
    tinBin: 'BIN-000284912-0202',
    person: 'Tanvir Hossain',
    designation: 'Managing Director',
    email: 'support@solaricbd.com',
    phone: '+880 1712 222333',
    address: 'Baridhara DOHS, Dhaka',
    registered: '2023-03-20',
    renewal: '2027-03-19',
    feeStatus: 'Paid',
    status: 'Active',
    projects: '60+ RMG Factory Solar Rooftops across Narayanganj and Savar'
  },
  {
    id: 3,
    code: 'BSREA-ASSOC-038',
    name: 'Green Energy Engineering BD',
    type: 'Associate Member',
    sector: 'Wind Energy',
    region: 'Chittagong',
    capacity: '30 MW Wind Turbine Projects',
    tinBin: 'BIN-000391024-0303',
    person: 'Engr. Kamal Uddin',
    designation: 'Head of Operations',
    email: 'contact@greenenergybd.org',
    phone: '+880 1819 444555',
    address: 'Agrabad C/A, Chittagong',
    registered: '2024-02-10',
    renewal: '2027-02-09',
    feeStatus: 'Paid',
    status: 'Active',
    projects: 'Cox\'s Bazar Wind Farm Assessment & Offshore Met Mast'
  },
  {
    id: 4,
    code: 'BSREA-CORP-052',
    name: 'Desh BioPower Systems PLC',
    type: 'Corporate Member',
    sector: 'Biomass & Biofuel',
    region: 'Rajshahi',
    capacity: '15 MW Agricultural Biomass Plant',
    tinBin: 'BIN-000481928-0404',
    person: 'Dr. M. A. Karim',
    designation: 'Chief Energy Officer',
    email: 'biopower@deshenergy.com',
    phone: '+880 1713 555666',
    address: 'BSCIC Industrial Area, Rajshahi',
    registered: '2023-07-01',
    renewal: '2027-06-30',
    feeStatus: 'Paid',
    status: 'Active',
    projects: 'Rice Husk Gasification & Municipal Biogas Facilities'
  },
  {
    id: 5,
    code: 'BSREA-INST-009',
    name: 'EcoEfficiency Solutions Ltd.',
    type: 'Institutional Member',
    sector: 'Energy Efficiency',
    region: 'Dhaka',
    capacity: '45 Industrial Energy Audits',
    tinBin: 'BIN-000592813-0505',
    person: 'S. M. Chowdhury',
    designation: 'Senior Consultant',
    email: 'info@ecoefficientbd.net',
    phone: '+880 1914 777888',
    address: 'Dhanmondi, Dhaka',
    registered: '2025-01-10',
    renewal: '2027-01-09',
    feeStatus: 'Paid',
    status: 'Active',
    projects: 'National Energy Efficiency & BESS Peak-Shaving Program'
  },
  {
    id: 6,
    code: 'BSREA-ASSOC-063',
    name: 'Bengal Hydro & Microgrid Ltd.',
    type: 'Associate Member',
    sector: 'Hydro & Microgrid',
    region: 'Sylhet',
    capacity: '8.5 MW Micro-Hydro & Islanded Grids',
    tinBin: 'BIN-000673910-0606',
    person: 'Nasir Ahmed',
    designation: 'Project Director',
    email: 'hello@bengalhydro.com',
    phone: '+880 1610 999000',
    address: 'Subidbazar, Sylhet',
    registered: '2025-05-18',
    renewal: '2027-05-17',
    feeStatus: 'Paid',
    status: 'Active',
    projects: 'Sylhet Hill Micro-Hydro & Sandwip Solar-Diesel Hybrid'
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
let currentTier = 'All';
let currentRegion = 'All';
let currentSort = 'name';
let currentViewMode = 'grid'; // 'grid' or 'list'

// Get company monogram (first letters of words)
function getCompanyInitials(name) {
  const words = name.replace(/Ltd\.|Limited|PLC|LLC|Inc\./gi, '').trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

// Get tier pill class
function getTierClass(type) {
  if (type.includes('Corporate')) return 'tier-corporate';
  if (type.includes('Associate')) return 'tier-associate';
  return 'tier-institutional';
}

// Switch Directory View Mode (Grid vs List)
function switchDirectoryView(mode) {
  currentViewMode = mode;
  const btnGrid = document.getElementById('btnViewGrid');
  const btnList = document.getElementById('btnViewList');
  const gridSection = document.getElementById('membersGrid');
  const listSection = document.getElementById('tableViewContainer');

  if (mode === 'list') {
    if (btnGrid) btnGrid.classList.remove('active');
    if (btnList) btnList.classList.add('active');
    if (gridSection) gridSection.style.display = 'none';
    if (listSection) listSection.classList.add('active');
  } else {
    if (btnList) btnList.classList.remove('active');
    if (btnGrid) btnGrid.classList.add('active');
    if (listSection) listSection.classList.remove('active');
    if (gridSection) gridSection.style.display = 'grid';
  }
  renderDirectory();
}

// Handler for filter dropdown change
function handleFilterChange() {
  const tierSelect = document.getElementById('filterTier');
  const regionSelect = document.getElementById('filterRegion');
  const sortSelect = document.getElementById('filterSort');

  if (tierSelect) currentTier = tierSelect.value;
  if (regionSelect) currentRegion = regionSelect.value;
  if (sortSelect) currentSort = sortSelect.value;

  renderDirectory();
}

// Filter and Sort active members
function getFilteredAndSortedMembers() {
  const activeMembers = membersData.filter(m => m.status === 'Active');

  let result = activeMembers.filter(m => {
    // Sector filter
    const matchSector = currentSector === 'All' || m.sector === currentSector;
    // Tier filter
    const matchTier = currentTier === 'All' || m.type === currentTier;
    // Region filter
    const matchRegion = currentRegion === 'All' || 
                        (m.region && m.region.toLowerCase().includes(currentRegion.toLowerCase())) ||
                        (m.address && m.address.toLowerCase().includes(currentRegion.toLowerCase()));
    // Search query
    const s = currentSearch.toLowerCase();
    const matchSearch = !s ||
                        (m.name || '').toLowerCase().includes(s) ||
                        (m.code || '').toLowerCase().includes(s) ||
                        (m.address || '').toLowerCase().includes(s) ||
                        (m.person || '').toLowerCase().includes(s);

    return matchSector && matchTier && matchRegion && matchSearch;
  });

  // Sorting
  result.sort((a, b) => {
    if (currentSort === 'name') {
      return (a.name || '').localeCompare(b.name || '');
    } else if (currentSort === 'code') {
      return (a.code || '').localeCompare(b.code || '');
    } else if (currentSort === 'date') {
      return (b.registered || '').localeCompare(a.registered || '');
    }
    return 0;
  });

  return result;
}

// Function: Render Public Members Directory (Supports Grid & List View)
function renderDirectory() {
  const gridContainer = document.getElementById('membersGrid');
  const tableBody = document.getElementById('tableBody');
  if (!gridContainer && !tableBody) return;

  const filtered = getFilteredAndSortedMembers();
  const totalActive = membersData.filter(m => m.status === 'Active').length;

  const countBadge = document.getElementById('resultCount');
  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} of ${totalActive} Active Member Entities`;
  }

  // 1. Render Grid View
  if (gridContainer) {
    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1/-1; padding: 3.5rem 2rem; text-align: center; background: #fff; border-radius: 12px; border: 1px solid var(--border);">
          <div style="font-size: 2rem; color: var(--ink-muted); margin-bottom: 0.5rem;">🏢</div>
          <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--primary);">No Member Entities Found</h4>
          <p style="font-size: 0.88rem; color: var(--ink-secondary); margin-top: 0.35rem;">No registered enterprises match your selected filter criteria. Try adjusting your search query or reset sector filters.</p>
        </div>
      `;
    } else {
      gridContainer.innerHTML = filtered.map(m => `
        <div class="member-card">
          <div>
            <div class="card-top">
              <span class="member-code">${m.code}</span>
              <span class="tier-badge ${getTierClass(m.type)}">${m.type}</span>
            </div>

            <div class="company-avatar-box">
              <div class="company-crest">${getCompanyInitials(m.name)}</div>
              <div>
                <h4 class="org-title">${m.name}</h4>
                <div class="sector-tag">⚡ ${m.sector}</div>
              </div>
            </div>

            <div class="card-details">
              <div><strong>Lead Representative:</strong> ${m.person} (${m.designation || 'Director'})</div>
              <div><strong>Location:</strong> ${m.address || 'Dhaka, Bangladesh'}</div>
              <div><strong>Corporate Email:</strong> ${m.email}</div>
              <div><strong>Telephone:</strong> ${m.phone}</div>
            </div>
          </div>

          <div class="card-footer">
            <span style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--ink-secondary);">
              Renewal: <strong>${m.renewal || '2027-12-31'}</strong>
            </span>
            <button type="button" class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.78rem;" onclick="openDossierModal(${m.id})">
              <span>View Dossier ↗</span>
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  // 2. Render Table View
  if (tableBody) {
    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--ink-secondary);">No member enterprises found matching your filter selection.</td></tr>`;
    } else {
      tableBody.innerHTML = filtered.map(m => `
        <tr>
          <td style="font-family: var(--font-mono); font-weight: 700; color: var(--primary); white-space: nowrap;">${m.code}</td>
          <td>
            <div style="font-weight: 700; color: var(--primary-dark);">${m.name}</div>
            <div style="font-size: 0.75rem; color: var(--ink-muted);">${m.tinBin || 'BIN Verified'}</div>
          </td>
          <td><span style="font-weight: 600; color: var(--primary); font-size: 0.8rem;">${m.sector}</span></td>
          <td><span class="tier-badge ${getTierClass(m.type)}">${m.type}</span></td>
          <td>
            <div style="font-weight: 600;">${m.person}</div>
            <div style="font-size: 0.75rem; color: var(--ink-muted);">${m.designation || 'Representative'}</div>
          </td>
          <td style="font-size: 0.8rem; color: var(--ink-secondary);">${m.region || 'Dhaka'}</td>
          <td><span class="status-pill active">● Verified</span></td>
          <td>
            <button type="button" class="btn btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;" onclick="openDossierModal(${m.id})">
              Dossier
            </button>
          </td>
        </tr>
      `).join('');
    }
  }
}

// Function: Open Member Corporate Dossier Modal
function openDossierModal(id) {
  const member = membersData.find(m => m.id === id);
  if (!member) return;

  const modal = document.getElementById('dossierModal');
  const title = document.getElementById('dossierTitle');
  const body = document.getElementById('dossierBody');
  if (!modal || !body) return;

  if (title) title.textContent = `Corporate Dossier: ${member.name}`;

  body.innerHTML = `
    <div class="dossier-header-strip">
      <div class="dossier-crest">${getCompanyInitials(member.name)}</div>
      <div>
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 4px;">
          <span class="member-code">${member.code}</span>
          <span class="tier-badge ${getTierClass(member.type)}">${member.type}</span>
          <span class="status-pill active">● Active Member</span>
        </div>
        <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--primary);">${member.name}</h3>
        <p style="font-size: 0.82rem; color: var(--ink-secondary); margin-top: 2px;">
          Renewable Energy Sector: <strong style="color: var(--primary);">${member.sector}</strong>
        </p>
      </div>
    </div>

    <div class="dossier-meta-grid">
      <div class="dossier-box">
        <div class="dossier-box-label">Lead Executive / Authorized Head</div>
        <div class="dossier-box-val">${member.person}</div>
        <div style="font-size: 0.75rem; color: var(--ink-muted);">${member.designation || 'Managing Director'}</div>
      </div>

      <div class="dossier-box">
        <div class="dossier-box-label">National Tax / BIN Reference</div>
        <div class="dossier-box-val" style="font-family: var(--font-mono);">${member.tinBin || 'BIN-003892182-0101'}</div>
        <div style="font-size: 0.75rem; color: var(--pass);">NBR Tax Compliance Clear</div>
      </div>

      <div class="dossier-box">
        <div class="dossier-box-label">Registered Corporate Headquarters</div>
        <div class="dossier-box-val">${member.address || 'Dhaka, Bangladesh'}</div>
        <div style="font-size: 0.75rem; color: var(--ink-muted);">Region: ${member.region || 'Dhaka Division'}</div>
      </div>

      <div class="dossier-box">
        <div class="dossier-box-label">Direct Institutional Contacts</div>
        <div class="dossier-box-val" style="font-size: 0.85rem;">${member.email}</div>
        <div style="font-size: 0.82rem; font-family: var(--font-mono); color: var(--primary);">${member.phone}</div>
      </div>
    </div>

    <div class="dossier-box" style="margin-top: 0.25rem;">
      <div class="dossier-box-label">Registered Renewable Portfolio & Capacity</div>
      <div class="dossier-box-val" style="color: var(--primary); font-size: 0.95rem;">
        ⚡ ${member.capacity || '10+ MW Solar / Renewable Clean Energy Infrastructure'}
      </div>
      <div style="font-size: 0.78rem; color: var(--ink-secondary); margin-top: 4px;">
        Key Assets: ${member.projects || 'Commercial Solar Parks, Rooftop EPC Installations and Grid Interconnection Systems'}
      </div>
    </div>

    <div style="background: var(--gold-light); border: 1px solid var(--gold-border); border-radius: 8px; padding: 0.85rem 1rem; display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
      <div>
        <div style="font-size: 0.78rem; font-weight: 700; color: var(--gold-dark); text-transform: uppercase;">BSREA Secretariat Accreditation</div>
        <div style="font-size: 0.75rem; color: var(--ink-secondary);">Valid Membership Term: ${member.registered} through ${member.renewal}</div>
      </div>
      <button type="button" class="btn btn-gold" style="padding: 0.4rem 0.85rem; font-size: 0.78rem;" onclick="alert('Downloading Certified Membership Dossier for ' + '${member.name}')">
        📜 Export Dossier
      </button>
    </div>
  `;

  modal.classList.add('active');
}

function closeDossierModal() {
  const modal = document.getElementById('dossierModal');
  if (modal) modal.classList.remove('active');
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
    region: 'Dhaka',
    tinBin: `BIN-${Math.floor(100000000 + Math.random() * 900000000)}-0101`,
    capacity: 'Clean Energy & Renewable Projects',
    projects: 'Accredited Renewable Installations',
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

  const form = document.getElementById('regForm');
  if (form) form.reset();

  closeRegisterModal();
  renderDirectory();
  renderAdmin();

  alert(`Enterprise Application Received!\n\nRegistration Code: ${randCode}\nEntity: ${orgName}\n\nYour membership application has been submitted to the BSREA Secretariat for KYC review.`);
}

function openRegisterModal() {
  const modal = document.getElementById('regModal');
  if (modal) modal.classList.add('active');
}

function closeRegisterModal() {
  const modal = document.getElementById('regModal');
  if (modal) modal.classList.remove('active');
}

// Event Listeners on DOM Load
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

  const dossierModal = document.getElementById('dossierModal');
  if (dossierModal) {
    dossierModal.addEventListener('click', (e) => {
      if (e.target === dossierModal) closeDossierModal();
    });
  }

  // Close modals on pressing Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRegisterModal();
      closeManageModal();
      closeDossierModal();
    }
  });

  // Initial Renders
  renderDirectory();
  renderAdmin();

  // Background sync from MongoDB Atlas API (when live on Vercel/Netlify)
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
