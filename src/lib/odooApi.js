const DEFAULT_API_BASE_URL = "";

const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
);

const buildApiUrl = (path) => `${API_BASE_URL}${path}`;

const parseResponse = async (response) => {
  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const errorMessage =
      payload?.error || payload?.message || "The Odoo API request failed.";
    throw new Error(errorMessage);
  }

  return payload;
};

export const fetchPortfolioProjects = async (signal) => {
  const response = await fetch(buildApiUrl("/api/portfolio/projects"), {
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  const payload = await parseResponse(response);
  return payload?.data || [];
};

export const submitPortfolioContact = async (contact) => {
  const response = await fetch(buildApiUrl("/api/portfolio/contact"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  return parseResponse(response);
};
