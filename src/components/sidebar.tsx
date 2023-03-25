import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { TreeItem, TreeView } from '@mui/lab';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import { Model } from '../types/model';
import './sidebar.css';
import { Input, SvgIcon, Button, Select, MenuItem, Drawer } from '@mui/material';
import { Add } from '@mui/icons-material';
import { saveModel } from '../api/models';
import { Project } from '../types/project';
import { saveDataset } from '../api/dataset';

export const Sidebar: FunctionComponent<{
  currentProject: Project | undefined,
  models: Model[],
  setModels: React.Dispatch<React.SetStateAction<Model[]>>,
  currentModel: Model | undefined,
  setCurrentModel: React.Dispatch<React.SetStateAction<Model | undefined>>
}> = ({ currentProject, models, setModels, currentModel, setCurrentModel }) => {
  const [newModelName, setNewModelName] = useState('');
  const [newModelType, setNewModelType] = useState('svm');
  const modelTypes = ['svm', 'mlp'];
  function newModelNameChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setNewModelName(e.target.value);
  }
  async function createModel() {
    setNewModelName('');
    if (!currentProject) return;
    const model = await saveModel({
      project_id: currentProject.id,
      name: newModelName,
      type_model: newModelType
    });
    setModels([...models, model]);
  }
  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !currentProject) return;
    const file = e.target.files[0];
    saveDataset(file, file.name, currentProject);
  }
  return (
    <div className='sidebar'>
      <TreeView
        defaultCollapseIcon={<SvgIcon component={KeyboardArrowDown} />}
        defaultExpandIcon={<SvgIcon component={KeyboardArrowRight} />}
      >
        <TreeItem nodeId="dataset" label="Dataset">
          <TreeItem nodeId='add' label={<div>
            <Button
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={onFileChange}
              />
            </Button>
          </div>} />
        </TreeItem>
        <TreeItem nodeId='models' label='Models'>
          {models.map(m => {
            return (
              <TreeItem key={m.model_id} nodeId={m.model_id.toString()} label={m.name} onClick={e => setCurrentModel(m)} />
            );
          })}
          <TreeItem nodeId='add' label={<div>
            <Input onChange={newModelNameChange} value={newModelName} />
            <Select
              value={newModelType}
              onChange={e => setNewModelType(e.target.value)}
            >
              {modelTypes.map((t, i) => {
                return (
                  <MenuItem key={i} value={t}>{t}</MenuItem>
                );
              })}
            </Select>
            <Button onClick={createModel}>
              <SvgIcon component={Add} />
            </Button>
          </div>} />
        </TreeItem>
      </TreeView>
    </div>
  );
};
