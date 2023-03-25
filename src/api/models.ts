import { Project } from '../types/project';
import { Model } from '../types/model';
import { baseUrl, headers } from './api';

export async function getModelsForProject(project: Project): Promise<Model[]> {
  const res = await fetch(baseUrl + '/aigateway/models/?' + new URLSearchParams({
    project_id: project.id.toString()
  })).then(res => res.json()).then(res => res.models);
  return res;
}

export async function saveModel(model: Model | Omit<Model, 'model_id'>): Promise<Model> {
  const res = await fetch(baseUrl + '/aigateway/models/', {
    method: 'post',
    headers,
    body: JSON.stringify(model)
  }).then(res => res.json()).then(res => res.models[0]);
  return res;
}
