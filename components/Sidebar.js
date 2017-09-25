import React from 'react';
import PropTypes from 'prop-types';

import Filter from './Filter';

const Sidebar = ({ children }) => (
  <div className="sidebar">
    <Filter />
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
