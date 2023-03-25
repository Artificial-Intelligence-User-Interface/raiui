import { FunctionComponent, useState } from 'react';
import './App.css';
import { Topbar } from './components/topbar';
import { Project } from './types/Project';

const App: FunctionComponent = () => {
  const [currentProject, setCurrentProject] = useState<Project>();
  const [allProjects, setAllProjects] = useState<Project[]>([{
    id: 'test',
    created: 0,
    last_updated: 0,
    name: 'test'
  }]);
  return (
    <div className='App'>
      <Topbar currentProject={currentProject} setCurrentProject={setCurrentProject} allProjects={allProjects}></Topbar>
    </div>
  );
}

export default App;
