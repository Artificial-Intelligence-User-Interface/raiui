import { Project } from '../types/project';
import { baseUrl, headers } from './api';

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(baseUrl + '/aigateway/projects/').then(res => res.json()).then(res => res.projects);
  res.created = new Date(res.created);
  res.last_updated = new Date(res.last_updated);
  return res;
}

export async function saveProject(project: Omit<Project, 'id' | 'created' | 'last_updated'>): Promise<Project> {
  const res = await fetch(baseUrl + '/aigateway/projects/', {
    method: 'post',
    headers,
    body: JSON.stringify(project)
  }).then(res => res.json()).then(res => res.projects[0]);
  res.created = new Date(res.created);
  res.last_updated = new Date(res.last_updated);
  return res;
}
