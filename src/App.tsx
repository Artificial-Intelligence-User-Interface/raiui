import { FunctionComponent, useEffect, useState } from 'react';
import { getModelsForProject } from './api/models';
import { getProjects } from './api/projects';
import './App.css';
import { ModelView } from './components/model-view';
import { Sidebar } from './components/sidebar';
import { Topbar } from './components/topbar';
import { Model } from './types/model';
import { Project } from './types/project';

const App: FunctionComponent = () => {
  const [currentProject, setCurrentProject] = useState<Project | undefined>();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [projectModels, setProjectModels] = useState<Model[]>([]);
  const [currentModel, setCurrentModel] = useState<Model | undefined>();
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
        <Sidebar
          currentProject={currentProject}
          models={projectModels}
          setModels={setProjectModels}
          currentModel={currentModel}
          setCurrentModel={setCurrentModel}
        />
        <div className='tab-area'>
          {currentModel && currentProject ? <ModelView model={currentModel} project={currentProject} /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
