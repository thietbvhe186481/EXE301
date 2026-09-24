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
  }
};
