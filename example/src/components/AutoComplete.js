import React from 'react';
import { AutoComplete } from '../../../index';
import TemplateRightBar from './templateRightBar';

const md = `
  ## AutoComplete
  🚀 Unlock the full power of the Amazon autocompletion engine right into your search input ✏️

  ### Code

  \`\`\`js
  <AutoComplete
    placeholder="hello awesome-components"
  />
  \`\`\`
`;

export default () => (
  <TemplateRightBar md={md}>
    <AutoComplete placeholder="hello awesome-components" />
  </TemplateRightBar>
);
