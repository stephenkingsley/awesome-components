import React from 'react';
import { Page } from '../../../index';
import TemplateRightBar from './templateRightBar';

const md = `
  ## Page

  ### Code

  \`\`\`js
  <Page
    style={{
      width: '400px',
      height: '400px',
    }}
    zIndex={3}
  />
  \`\`\`
`;

export default () => (
  <TemplateRightBar md={md}>
    <Page
      style={{
        width: '400px',
        height: '400px',
      }}
      zIndex={3}
    />
  </TemplateRightBar>
);
