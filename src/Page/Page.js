import React, { PropTypes } from 'react';

const Page = (props) => {
  const pageStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    border: '1px solid #eee',
    boxShadow: `${props.zIndex || 3}px ${props.zIndex || 3}px ${props.zIndex || 3}px ${props.zIndex || 3}px #eee`,
    borderRadius: '4px',
    padding: '10px',
  };
  return (
    <div style={Object.assign(pageStyle, props.style)}>this is page</div>
  );
};

Page.propTypes = {
  style: PropTypes.shape({}),
  zIndex: PropTypes.num,
};

export default Page;
