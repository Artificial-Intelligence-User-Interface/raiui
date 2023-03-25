import { Button, Input, SvgIcon, Toolbar, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';
import { FunctionComponent, useState } from 'react';
import { Model } from '../types/model';

import './model-interface.css';
import { runModel } from '../api/models';
import { Project } from '../types/project';

export const ModelInterface: FunctionComponent<{
  model: Model,
  project: Project
}> = ({ model, project }) => {
  const [aiInput, setAIInput] = useState('');
  const [aiOutput, setAIOutput] = useState<string[]>([]);
  function onModelOut(out: string) {
    setAIOutput([...aiOutput, out]);
  }
  function sendInput() {
    setAIInput('');
    const input: number[] = [];
    const rawInput = aiInput.split(',');
    for (const val of rawInput) {
      const asInt = parseInt(val);
      if (isNaN(asInt)) continue;
      input.push(asInt);
    }
    runModel(project, model, input).then(console.log);
  }
  return (
    <div className='interface-container'>
      <div className="interface-output">
        {aiOutput.map((out, i) => {
          return (
            <Typography key={i}>{out}</Typography>
          );
        })}
      </div>
      <div className="interface-input">
        <Toolbar>
          <Input value={aiInput} onChange={e => setAIInput(e.target.value)} style={{
            flex: '1 1 auto'
          }} />
          <Button onClick={sendInput}><SvgIcon component={Send} /></Button>
        </Toolbar>
      </div>
    </div>
  );
};
