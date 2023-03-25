import { FunctionComponent, useEffect, useState } from 'react';
import { getProjects } from './api/projects';
import './App.css';
import { Sidebar } from './components/sidebar';
import { Topbar } from './components/topbar';
import { Project } from './types/project';

const App: FunctionComponent = () => {
  const [currentProject, setCurrentProject] = useState<Project | undefined>();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  useEffect(() => {
    getProjects().then(setAllProjects);
  }, []);
  return (
    <div className='App'>
      <Topbar currentProject={currentProject} setCurrentProject={setCurrentProject} allProjects={allProjects} />
      <div className='main-body'>
        <Sidebar />
        <div className='tab-area'></div>
      </div>
    </div>
  );
}

export default App;
