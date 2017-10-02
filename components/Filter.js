import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { onSortingChange } from '../actions';
import TypeSelect from './TypeSelect';
import CitySelect from './CitySelect';

const Filter = ({ onSortingChange, events }) => {
  return (
    <ul className="filter-container">
      <li className="filter-showing">
        <div className="filter-item">
          <span>City:</span>
          <CitySelect />
        </div>
        <div className="filter-item">
          <span>Type:</span>
          <TypeSelect />
        </div>
      </li>
    </ul>
  );
};

Filter.propTypes = {
  events: PropTypes.shape({
    events: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onSortingChange,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
