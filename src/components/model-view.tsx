import { Button, SvgIcon, Toolbar, Typography } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { Model } from '../types/model';
import { ModelInterface } from './model-interface';
import { Train } from '@mui/icons-material';

import './model-view.css';
import { Project } from '../types/project';
import { trainModel } from '../api/models';

export const ModelView: FunctionComponent<{
  model: Model,
  project: Project
}> = ({ model, project }) => {
  const [trainingAccuracy, setTrainingAccuracy] = useState<number | undefined>();
  return (
    <div className='model-view-container'>
      <div className='model-view-main-body'>
        <Toolbar>
          <div style={{
            flex: '1 1 auto'
          }}>
            <Typography>{`Type: ${model.type_model}`}</Typography>
            {trainingAccuracy !== undefined ? (
              <Typography>{`Training accuracy: ${trainingAccuracy}`}</Typography>
            ) : null}
          </div>
          <Button onClick={() => {
            trainModel(project, model).then(res => {
              console.log(res);
              return res;
            }).then(res => setTrainingAccuracy(res.accuracy));
          }}>
            <SvgIcon component={Train} />
          </Button>
        </Toolbar>
      </div>
      <ModelInterface model={model} project={project} />
    </div>
  );
};
