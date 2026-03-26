const TRACKERR_HOST = import.meta.env.VITE_TRACKERR_HOST;

// ─── Token Helpers ─────────────────────────────────────────────────────────────

export const getAccessToken = () => localStorage.getItem('access');
export const getUserId = () => localStorage.getItem('userId');

const saveTokens = (access: string, refresh: string, userId: string) => {
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
  localStorage.setItem('userId', userId);
};

/**
 * Removes every localStorage key that belongs to the current user.
 * Keys are matched by the prefix pattern `user:{userId}:` that your
 * cache helpers write (e.g. "user:42:profile", "user:42:shipments").
 * Auth tokens are removed unconditionally afterwards.
 */
const clearUserCache = (userId: string | null) => {
  if (userId) {
    const prefix = `user:${userId}:`;
    const keysToRemove = Object.keys(localStorage).filter((k) =>
      k.startsWith(prefix)
    );
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  }

  // Always clear auth tokens
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  localStorage.removeItem('userId');
};

// ─── Login ─────────────────────────────────────────────────────────────────────

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${TRACKERR_HOST}/auth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail ?? 'Authentication failed');
  }

  const data = await response.json();
  saveTokens(data.access, data.refresh, data.id);
  return data;
};

// ─── Logout ────────────────────────────────────────────────────────────────────

export const logoutUser = async () => {
  const refresh = localStorage.getItem('refresh');
  const userId = getUserId();

  if (refresh) {
    try {
      await fetch(`${TRACKERR_HOST}/auth/token/blacklist/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });
    } catch {
      // Network failure is non-fatal — cache and tokens are cleared below
    }
  }

  clearUserCache(userId);
  window.location.href = '/login';
};
