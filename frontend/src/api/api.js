// src/api/api.js

const BASE_URL = import.meta.env.VITE_API_URL;

// Returns headers including Authorization token if available
function getHeaders() {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Handles all API responses
async function handleResponse(res) {
  if (res.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login page
    window.location.href = '/login';
    return;
  }

  return res.json();
}

// ======================
// AUTH API
// ======================

export const authAPI = {
  signup: (data) =>
    fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  login: (data) =>
    fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// ======================
// EXPENSE API
// ======================

export const expenseAPI = {
  categorize: (description) =>
    fetch(`${BASE_URL}/api/categorize`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ description }),
    }).then(handleResponse),

  getAll: () =>
    fetch(`${BASE_URL}/api/expenses`, {
      headers: getHeaders(),
    }).then(handleResponse),

  getById: (id) =>
    fetch(`${BASE_URL}/api/expenses/${id}`, {
      headers: getHeaders(),
    }).then(handleResponse),

  create: (data) =>
    fetch(`${BASE_URL}/api/expenses`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  update: (id, data) =>
    fetch(`${BASE_URL}/api/expenses/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  delete: (id) =>
    fetch(`${BASE_URL}/api/expenses/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    }).then(handleResponse),
};