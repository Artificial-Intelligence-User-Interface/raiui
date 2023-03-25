import { Project } from '../types/project';
import { baseUrl, fileUploadHeaders } from './api';

export async function saveDataset(datasetFile: File, name: string, project: Project): Promise<{ project_id: number }> {
  const formData = new FormData();
  formData.append('file', datasetFile);
  formData.append('name', name);
  formData.append('project_id', project.id.toString());

  const res = await fetch(baseUrl + '/aigateway/dataset/', {
    method: 'post',
    headers: fileUploadHeaders,
    body: formData
  }).then(res => res.json());
  return res;
}
