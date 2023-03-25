import { FunctionComponent } from 'react';
import { Model } from '../types/model';
import { ModelInterface } from './model-interface';

import './model-view.css';

export const ModelView: FunctionComponent<{
  model: Model
}> = ({ model }) => {
  return (
    <div className='model-view-container'>
      <div className='model-view-main-body'></div>
      <ModelInterface model={model} />
    </div>
  );
};
