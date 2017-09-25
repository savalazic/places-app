import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { onSortingChange } from '../actions';
import SidebarSelect from './SidebarSelect';

const Filter = ({ onSortingChange, places }) => {
  return (
    <ul className="filter-container">
      <li className="filter-heading">
        <h3>Places</h3>
        <i
          role="button"
          tabIndex="0"
          className={`icon location ${places.sorting === 'distance' ? 'active' : ''}`
          }
          onClick={() => {
            onSortingChange('distance');
          }}
        />
        <i
          role="button"
          tabIndex="0"
          className={`icon popularity ${places.sorting === 'popularity' ? 'active' : ''}`
          }
          onClick={() => {
            onSortingChange('popularity');
          }}
        />
      </li>
      <li className="filter-showing">
        <span>Showing:</span>
        <SidebarSelect />
      </li>
    </ul>
  );
};

Filter.propTypes = {
  onSortingChange: PropTypes.func.isRequired,
  places: PropTypes.shape({
    places: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    places: state.places,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onSortingChange,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
