import { Project } from '../types/Project';
import { baseUrl } from './api';

export async function getProjects(): Promise<Project[]> {
  return await fetch(baseUrl + '/aigateway/projects').then(res => res.json());
}
