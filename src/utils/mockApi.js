import { ROLES } from "./constants";

/**
 * This is a FRONTEND mock API:
 * - stores users in localStorage
 * - returns Promises like a real backend call
 */

const USERS_KEY = "SAB_USERS_V1";

// Seed admin (fixed)
const ADMIN_USER = {
  id: "admin-1",
  name: "Admin",
  email: "admin@sab.com",
  password: "admin123", // demo
  role: ROLES.ADMIN,
};

function readUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    const seeded = [ADMIN_USER];
    localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    const parsed = JSON.parse(raw);
    // ensure admin exists
    const hasAdmin = parsed.some((u) => u.role === ROLES.ADMIN);
    if (!hasAdmin) {
      const merged = [ADMIN_USER, ...parsed];
      localStorage.setItem(USERS_KEY, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify([ADMIN_USER]));
    return [ADMIN_USER];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function delay(ms = 350) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function signupUser(payload) {
  // payload: { name, email, password, role }
  await delay();

  const { name, email, password, role } = payload;

  if (!name || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  if (role === ROLES.ADMIN) {
    throw new Error("Admin signup is not allowed");
  }

  const users = readUsers();
  const emailLower = email.trim().toLowerCase();

  const already = users.find((u) => u.email.toLowerCase() === emailLower);
  if (already) throw new Error("Email already registered");

  const newUser = {
    id: `u-${Date.now()}`,
    name: name.trim(),
    email: emailLower,
    password,
    role,
  };

  writeUsers([...users, newUser]);

  // return safe user (no password)
  const { password: _, ...safe } = newUser;
  return safe;
}

export async function loginUser({ email, password, role }) {
  await delay();

  const users = readUsers();
  const emailLower = (email || "").trim().toLowerCase();

  const found = users.find(
    (u) =>
      u.email.toLowerCase() === emailLower &&
      u.password === password &&
      u.role === role,
  );

  if (!found) throw new Error("Invalid credentials / role");

  const { password: _, ...safe } = found;
  return safe;
}

export async function listUsersDebug() {
  await delay(150);
  return readUsers().map(({ password, ...rest }) => rest);
}