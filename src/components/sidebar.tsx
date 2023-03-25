import { FunctionComponent } from 'react';
import { TreeItem, TreeView } from '@mui/lab';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import { Model } from '../types/model';
import './sidebar.css';
import { SvgIcon } from '@mui/material';

export const Sidebar: FunctionComponent<{
  models: Model[]
}> = ({ models }) => {
  return (
    <div className='sidebar'>
      <TreeView
        defaultCollapseIcon={<SvgIcon component={KeyboardArrowDown} />}
        defaultExpandIcon={<SvgIcon component={KeyboardArrowRight} />}
      >
        <TreeItem nodeId='models' label='Models'>
          {models.map(m => {
            return (
              <TreeItem key={m.model_id} nodeId={m.model_id.toString()} label={m.name} />
            );
          })}
        </TreeItem>
      </TreeView>
    </div>
  );
};
