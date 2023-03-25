import { MenuItem, Select, SelectChangeEvent, Toolbar, Typography, SvgIcon, Button, AppBar } from '@mui/material';
import { Input } from '@mui/material';
import { Add } from '@mui/icons-material';
import React, { FunctionComponent, useRef } from 'react';
import { Project } from '../types/project';
import { saveProject, getProjects } from '../api/projects';
import './topbar.css';

export const Topbar: FunctionComponent<{
  currentProject: Project | undefined,
  setCurrentProject: React.Dispatch<React.SetStateAction<Project | undefined>>,
  allProjects: Project[],
  setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>
}> = (
  { currentProject, setCurrentProject, allProjects, setAllProjects }
) => {
  function onProjectSelect(event: SelectChangeEvent<string>) {
    const id = event.target.value;
    setCurrentProject(allProjects.find(p => p.id.toString() === id));
  }
  let newModelName = useRef('');
  function onNewModelNameChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    newModelName.current = event.target.value;
  }
  async function createProject() {
    const project = await saveProject({
      name: newModelName.current
    });
    getProjects().then(setAllProjects).then(() => {
      setCurrentProject(project);
    });
  }
  return (
    <div className='topbar'>
      <Toolbar>
        <div style={{
          width: '100%'
        }}>
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%)'
          }}>
            <Typography variant='h6'>AIUI</Typography>
          </div>
          <span style={{
            float: 'right'
          }}>
            <Input placeholder='project-name' onChange={onNewModelNameChange} />
            <Button onClick={createProject}>
              <SvgIcon component={Add} />
            </Button>
            <Select
              value={currentProject?.id !== undefined ? currentProject.id.toString() : ''}
              onChange={onProjectSelect}
            >
              {allProjects.map(p => {
                return (
                  <MenuItem key={p.id} value={p.id.toString()}>{p.name}</MenuItem>
                );
              })}
            </Select>
          </span>
        </div>
      </Toolbar>
    </div>
  );
};
