export function getStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const stored = window.localStorage.getItem(key);
  if (!stored) {
    return fallback;
  }

  try {
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
}

export function setStoredValue<T>(key: string, value: T): T {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("mcmc-demo-state-change"));
  }

  return value;
}

export function removeStoredValue(key: string) {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new Event("mcmc-demo-state-change"));
  }
}

