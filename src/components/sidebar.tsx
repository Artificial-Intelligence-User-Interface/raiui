import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { TreeItem, TreeView } from '@mui/lab';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import { Model } from '../types/model';
import './sidebar.css';
import { Input, SvgIcon, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { saveModel } from '../api/models';
import { Project } from '../types/project';

export const Sidebar: FunctionComponent<{
  currentProject: Project | undefined,
  models: Model[],
  setModels: React.Dispatch<React.SetStateAction<Model[]>>
}> = ({ currentProject, models, setModels }) => {
  const [newModelName, setNewModelName] = useState('');
  function newModelNameChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setNewModelName(e.target.value);
  }
  async function createModel() {
    setNewModelName('');
    if (!currentProject) return;
    const model = await saveModel({
      project_id: currentProject.id,
      name: newModelName,
      model_type: 'blarg'
    });
    setModels([...models, model]);
  }
  return (
    <div className='sidebar'>
      <TreeView
        defaultCollapseIcon={<SvgIcon component={KeyboardArrowDown} />}
        defaultExpandIcon={<SvgIcon component={KeyboardArrowRight} />}
      >
        <TreeItem nodeId='models' label='Models'>
          {models.map(m => {
            return (
              <TreeItem key={m.model_id} nodeId={m.model_id.toString()} label={m.name} />
            );
          })}
          <TreeItem nodeId='add' label={<div>
            <Input onChange={newModelNameChange} value={newModelName} />
            <Button onClick={createModel}>
              <SvgIcon component={Add} />
            </Button>
          </div>} />
        </TreeItem>
      </TreeView>
    </div>
  );
};
