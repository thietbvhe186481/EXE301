const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:4000';

export async function fetchWithAuth(url, options = {}) {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...defaultOptions,
    ...options
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed with status ${response.status}`);
  }
  return response.json();
}

export const apiService = {
  // Auth
  async login(credentials) {
    return fetchWithAuth('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },
  async register(data) {
    return fetchWithAuth('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  async getMe() {
    return fetchWithAuth('/api/auth/me');
  },
  async logout() {
    return fetchWithAuth('/api/auth/logout', { method: 'POST' });
  },

  // Student Reviews (MongoDB)
  async getReviews() {
    try {
      return await fetchWithAuth('/api/reviews');
    } catch {
      return [];
    }
  },
  async createReview(reviewData) {
    return fetchWithAuth('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  },

  // VIP Upgrade Orders (MongoDB)
  async upgradeSubscription(orderData) {
    return fetchWithAuth('/api/subscriptions/upgrade', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  // Contact Inquiries (MongoDB)
  async sendInquiry(inquiryData) {
    return fetchWithAuth('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData)
    });
  },

  // Founders (MongoDB)
  async getFounders() {
    try {
      return await fetchWithAuth('/api/founders');
    } catch {
      return [];
    }
  },

  // Majors & Challenges (MongoDB)
  async getMajors() {
    return fetchWithAuth('/api/majors');
  },
  async getChallenges(params = {}) {
    const query = new URLSearchParams(params).toString();
    return fetchWithAuth(`/api/challenges${query ? `?${query}` : ''}`);
  },
  async getChallenge(id) {
    return fetchWithAuth(`/api/challenges/${id}`);
  },
  async createChallenge(data) {
    return fetchWithAuth('/api/challenges', { method: 'POST', body: JSON.stringify(data) });
  },
  async updateChallenge(id, data) {
    return fetchWithAuth(`/api/challenges/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  async updateChallengeStatus(id, status) {
    return fetchWithAuth(`/api/challenges/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
  },
  async deleteChallenge(id) {
    return fetchWithAuth(`/api/challenges/${id}`, { method: 'DELETE' });
  },

  // Users CRUD
  async getUsers(params = {}) {
    const query = new URLSearchParams(params).toString();
    return fetchWithAuth(`/api/users${query ? `?${query}` : ''}`);
  },
  async getUser(id) {
    return fetchWithAuth(`/api/users/${id}`);
  },
  async createUser(data) {
    return fetchWithAuth('/api/users', { method: 'POST', body: JSON.stringify(data) });
  },
  async updateUser(id, data) {
    return fetchWithAuth(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  async updateUserStatus(id, status, reason = '') {
    return fetchWithAuth(`/api/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, reason }) });
  },
  async deleteUser(id) {
    return fetchWithAuth(`/api/users/${id}`, { method: 'DELETE' });
  },

  // Mentors CRUD
  async getMentors(params = {}) {
    const query = new URLSearchParams(params).toString();
    return fetchWithAuth(`/api/mentors${query ? `?${query}` : ''}`);
  },
  async getMentor(id) {
    return fetchWithAuth(`/api/mentors/${id}`);
  },
  async createMentor(data) {
    return fetchWithAuth('/api/mentors', { method: 'POST', body: JSON.stringify(data) });
  },
  async updateMentor(id, data) {
    return fetchWithAuth(`/api/mentors/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  async updateMentorStatus(id, status, warningReason = '') {
    return fetchWithAuth(`/api/mentors/${id}/status`, { method: 'PUT', body: JSON.stringify({ status, warningReason }) });
  },
  async deleteMentor(id) {
    return fetchWithAuth(`/api/mentors/${id}`, { method: 'DELETE' });
  },

  // Submissions CRUD
  async getSubmissions(params = {}) {
    const query = new URLSearchParams(params).toString();
    return fetchWithAuth(`/api/submissions${query ? `?${query}` : ''}`);
  },
  async getSubmission(id) {
    return fetchWithAuth(`/api/submissions/${id}`);
  },
  async createSubmission(data) {
    return fetchWithAuth('/api/submissions', { method: 'POST', body: JSON.stringify(data) });
  },
  async updateSubmission(id, data) {
    return fetchWithAuth(`/api/submissions/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  async updateSubmissionStatus(id, status, note = '') {
    return fetchWithAuth(`/api/submissions/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, note }) });
  },
  async deleteSubmission(id) {
    return fetchWithAuth(`/api/submissions/${id}`, { method: 'DELETE' });
  },

  // Reviews CRUD
  async updateReview(id, data) {
    return fetchWithAuth(`/api/reviews/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  async updateReviewStatus(id, status, reason = '') {
    return fetchWithAuth(`/api/reviews/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, reason }) });
  },
  async deleteReview(id) {
    return fetchWithAuth(`/api/reviews/${id}`, { method: 'DELETE' });
  },

  // Subscriptions & Orders
  async getSubscriptionOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    return fetchWithAuth(`/api/subscriptions/orders${query ? `?${query}` : ''}`);
  },
  async updateSubscriptionOrderStatus(orderId, status, note = '') {
    return fetchWithAuth(`/api/subscriptions/orders/${orderId}/status`, { method: 'PATCH', body: JSON.stringify({ status, note }) });
  },
  async deleteSubscriptionOrder(orderId) {
    return fetchWithAuth(`/api/subscriptions/orders/${orderId}`, { method: 'DELETE' });
  },

  // Resources CRUD
  async getResources(params = {}) {
    const query = new URLSearchParams(params).toString();
    return fetchWithAuth(`/api/resources${query ? `?${query}` : ''}`);
  },
  async createResource(data) {
    return fetchWithAuth('/api/resources', { method: 'POST', body: JSON.stringify(data) });
  },
  async updateResource(id, data) {
    return fetchWithAuth(`/api/resources/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  async deleteResource(id) {
    return fetchWithAuth(`/api/resources/${id}`, { method: 'DELETE' });
  },

  // Inquiries CRUD
  async getInquiries(params = {}) {
    const query = new URLSearchParams(params).toString();
    return fetchWithAuth(`/api/inquiries${query ? `?${query}` : ''}`);
  },
  async updateInquiryStatus(inquiryId, status, adminNotes = '') {
    return fetchWithAuth(`/api/inquiries/${inquiryId}/status`, { method: 'PATCH', body: JSON.stringify({ status, adminNotes }) });
  },
  async deleteInquiry(inquiryId) {
    return fetchWithAuth(`/api/inquiries/${inquiryId}`, { method: 'DELETE' });
  },

  // Premium Plans CRUD
  async getPremiumPlans() {
    return fetchWithAuth('/api/premium-plans');
  },
  async createPremiumPlan(data) {
    return fetchWithAuth('/api/premium-plans', { method: 'POST', body: JSON.stringify(data) });
  },
  async updatePremiumPlan(id, data) {
    return fetchWithAuth(`/api/premium-plans/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  async deletePremiumPlan(id) {
    return fetchWithAuth(`/api/premium-plans/${id}`, { method: 'DELETE' });
  },

  // Market Data CRUD
  async getMarketData(params = {}) {
    const query = new URLSearchParams(params).toString();
    return fetchWithAuth(`/api/market-data${query ? `?${query}` : ''}`);
  },
  async createMarketData(data) {
    return fetchWithAuth('/api/market-data', { method: 'POST', body: JSON.stringify(data) });
  },
  async updateMarketData(id, data) {
    return fetchWithAuth(`/api/market-data/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  async deleteMarketData(id) {
    return fetchWithAuth(`/api/market-data/${id}`, { method: 'DELETE' });
  }
};
