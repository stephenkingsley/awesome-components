import React from 'react';
import { Button } from '../../../index';
import TemplateRightBar from './templateRightBar';

const md = `
  ## Page

  ### Code

  \`\`\`js
  <Button
    onClick={() => alert('click')}
    style={{
      width: '240px',
      height: '40px',
    }}
  />
  \`\`\`
`;

export default () => (
  <TemplateRightBar md={md}>
    <Button
      onClick={() => alert('click')}
      style={{
        width: '240px',
        height: '40px',
      }}
    />
  </TemplateRightBar>
);
