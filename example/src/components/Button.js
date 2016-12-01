import React from 'react';
import { HollowButton, SolidButton } from '../../../index';
import TemplateRightBar from './templateRightBar';

const md = `
  ## Page

  ### Code

  \`\`\`js
  <HollowButton
    onClick={() => alert('click')}
    style={{
      width: '240px',
      height: '54px',
    }}
  />

  <SolidButton
    onClick={() => alert('click')}
    style={{
      width: '240px',
      height: '54px',
    }}
  />
  \`\`\`
`;

export default () => (
  <TemplateRightBar md={md}>
    <div
      style={{
        display: 'flex',
      }}
    >
      <HollowButton
        onClick={() => alert('click')}
        style={{
          width: '240px',
          height: '54px',
        }}
      />
      <div style={{ width: '50px' }} />
      <SolidButton
        onClick={() => alert('click')}
        style={{
          width: '240px',
          height: '54px',
        }}
      />
    </div>
  </TemplateRightBar>
);
