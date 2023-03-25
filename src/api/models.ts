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

export async function trainModel(project: Project, model: Model): Promise<{
  accuracy: number,
  project_id: number,
  model_id: number
}> {
  const res = await fetch(baseUrl + '/aigateway/train/', {
    method: 'post',
    headers,
    body: JSON.stringify({
      project_id: project.id,
      model_id: model.model_id
    })
  }).then(res => res.json());
  return res;
}

export async function runModel(project: Project, model: Model, parameters: number[]): Promise<{
  project_id: number,
  model_id: number,
  result: number[]
}> {
  const res = await fetch(baseUrl + '/aigateway/output/', {
    method: 'post',
    headers,
    body: JSON.stringify({
      project_id: project.id,
      model_id: model.model_id,
      parameters
    })
  }).then(res => res.json());
  return res;
}
