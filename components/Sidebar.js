import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ children }) => (
  <div className="sidebar">
    {children}
  </div>
);

Sidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Sidebar;
