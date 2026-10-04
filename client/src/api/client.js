const API_BASE = '/api';

export async function submitPartnerLead(formData) {
  const response = await fetch(`${API_BASE}/leads/partner`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit franchise partner form');
  }
  return data;
}

export async function submitLandlordLead(formData) {
  const response = await fetch(`${API_BASE}/leads/landlord`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit landlord property form');
  }
  return data;
}

export async function fetchPartnerLeads(params = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE}/leads/partner?${query}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch partner leads');
  return data;
}

export async function updatePartnerLead(id, updates) {
  const response = await fetch(`${API_BASE}/leads/partner/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update partner lead');
  return data;
}

export async function deletePartnerLead(id) {
  const response = await fetch(`${API_BASE}/leads/partner/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to delete partner lead');
  return data;
}

export async function fetchLandlordLeads(params = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE}/leads/landlord?${query}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch landlord leads');
  return data;
}

export async function updateLandlordLead(id, updates) {
  const response = await fetch(`${API_BASE}/leads/landlord/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update landlord lead');
  return data;
}

export async function deleteLandlordLead(id) {
  const response = await fetch(`${API_BASE}/leads/landlord/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to delete landlord lead');
  return data;
}


export async function checkHealth() {
  const response = await fetch(`${API_BASE}/health`);
  return await response.json();
}
