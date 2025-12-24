import { Project } from '../types';
import { getCurrentUser } from './authService';

const STORAGE_KEY = 'launchcopy_projects';

export const getProjects = (): Project[] => {
  try {
    const user = getCurrentUser();
    if (!user) return [];

    const data = localStorage.getItem(STORAGE_KEY);
    const allProjects: Project[] = data ? JSON.parse(data) : [];
    
    // Filter by user ID
    return allProjects.filter(p => p.userId === user.id);
  } catch (e) {
    console.error("Failed to load projects", e);
    return [];
  }
};

export const saveProject = (project: Project) => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    // Ensure project has the correct userId
    const projectToSave = { ...project, userId: user.id };

    const data = localStorage.getItem(STORAGE_KEY);
    const allProjects: Project[] = data ? JSON.parse(data) : [];

    const index = allProjects.findIndex(p => p.id === projectToSave.id);
    if (index >= 0) {
      allProjects[index] = { ...projectToSave, updatedAt: Date.now() };
    } else {
      allProjects.unshift({ ...projectToSave, createdAt: Date.now(), updatedAt: Date.now() });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProjects));
  } catch (e) {
    console.error("Failed to save project", e);
  }
};

export const getProject = (id: string): Project | undefined => {
  const projects = getProjects(); // This is already filtered by user
  return projects.find(p => p.id === id);
};

export const deleteProject = (id: string) => {
  try {
    const user = getCurrentUser();
    if (!user) return;

    const data = localStorage.getItem(STORAGE_KEY);
    let allProjects: Project[] = data ? JSON.parse(data) : [];

    // Only delete if it belongs to user
    allProjects = allProjects.filter(p => !(p.id === id && p.userId === user.id));
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProjects));
  } catch (e) {
    console.error("Failed to delete project", e);
  }
}
