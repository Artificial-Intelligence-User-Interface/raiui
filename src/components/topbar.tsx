import { AppBar, Grid, MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { Project } from '../types/project';
import './topbar.css';

export const Topbar: FunctionComponent<{
  currentProject: Project | undefined,
  setCurrentProject: React.Dispatch<React.SetStateAction<Project | undefined>>,
  allProjects: Project[]
}> = (
  { currentProject, setCurrentProject, allProjects }
) => {
  function onProjectSelect(event: SelectChangeEvent<string>) {
    const id = event.target.value;
    setCurrentProject(allProjects.find(p => p.id === id));
  }
  return (
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
          <Select
            value={currentProject?.id !== undefined ? currentProject.id : ''}
            onChange={onProjectSelect}
          >
            {allProjects.map(p => {
              return (
                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
              );
            })}
          </Select>
        </span>
      </div>
    </Toolbar>
  );
};
