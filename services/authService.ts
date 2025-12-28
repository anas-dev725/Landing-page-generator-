import { User } from '../types';

const USERS_KEY = 'launchcopy_users';
const SESSION_KEY = 'launchcopy_session';

export const register = (username: string, password: string): User => {
  const usersStr = localStorage.getItem(USERS_KEY);
  const users: User[] = usersStr ? JSON.parse(usersStr) : [];
  
  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim();

  // Case insensitive check
  if (users.find(u => u.username.toLowerCase() === cleanUsername)) {
    throw new Error('Username already exists');
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    username: username.trim(), // Store original casing for display, but use lower for checks
    password: cleanPassword // Mock only
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // Auto login
  localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  return newUser;
};

export const login = (username: string, password: string): User => {
  const usersStr = localStorage.getItem(USERS_KEY);
  const users: User[] = usersStr ? JSON.parse(usersStr) : [];
  
  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim();
  
  // Case insensitive lookup for username
  const user = users.find(u => 
    u.username.toLowerCase() === cleanUsername && 
    u.password === cleanPassword
  );
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Save session immediately
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getCurrentUser = (): User | null => {
  const sessionStr = localStorage.getItem(SESSION_KEY);
  return sessionStr ? JSON.parse(sessionStr) : null;
};