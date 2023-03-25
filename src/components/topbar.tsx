import { AppBar, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import { Project } from "../types/Project";

export const Topbar: FunctionComponent<{
  currentProject: Project | undefined,
  setCurrentProject: React.Dispatch<React.SetStateAction<Project | undefined>>,
  allProjects: Project[]
}> = (
  { currentProject, setCurrentProject, allProjects }
) => {
  function onProjectSelect(event: SelectChangeEvent<string>) {
    const id = event.target.value;
    setCurrentProject(allProjects.find(p => p.id == id));
  }
  return (
    <AppBar>
      <Typography variant="h6">AIUI</Typography>
      <Select
        value={currentProject?.id}
        onChange={onProjectSelect}
      >
        {allProjects.map(p => {
          return (
            <MenuItem value={p.id}>{p.name}</MenuItem>
          );
        })}
      </Select>
    </AppBar>
  );
};
