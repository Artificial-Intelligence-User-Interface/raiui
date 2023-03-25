import { FunctionComponent, useEffect, useState } from 'react';
import { getModelsForProject } from './api/models';
import { getProjects } from './api/projects';
import './App.css';
import { Sidebar } from './components/sidebar';
import { Topbar } from './components/topbar';
import { Model } from './types/model';
import { Project } from './types/project';

const App: FunctionComponent = () => {
  const [currentProject, setCurrentProject] = useState<Project | undefined>();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [projectModels, setProjectModels] = useState<Model[]>([]);
  useEffect(() => {
    getProjects().then(setAllProjects);
  }, []);
  useEffect(() => {
    setProjectModels([]);
    if (currentProject) {
      let promiseRelevant = true;
      getModelsForProject(currentProject).then(models => {
        if (promiseRelevant) setProjectModels(models);
      });
      return () => {
        promiseRelevant = false;
      };
    }
  }, [currentProject]);
  return (
    <div className='App'>
      <Topbar currentProject={currentProject} setCurrentProject={setCurrentProject} allProjects={allProjects} setAllProjects={setAllProjects} />
      <div className='main-body'>
        <Sidebar models={projectModels} />
        <div className='tab-area'></div>
      </div>
    </div>
  );
}

export default App;
