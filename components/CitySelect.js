import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

import { onShowingChangeCity } from '../actions';

const categories = [
  'Beograd',
  'Novi Sad',
  'Pancevo',
];

class CitySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
  }

  handleChange = (event, index, values) => {
    this.setState({
      values,
    }, () => {
      this.props.onShowingChangeCity(values);
    });
  }

  menuItems = values => categories.map(val => (
    <MenuItem
      className={'select-item'}
      key={val}
      insetChildren
      checked={values && values.indexOf(val) > -1}
      value={val}
      primaryText={val}
      style={{
        fontSize: 14,
        color: 'rgba(0,0,0,.5)',
      }}
    />
  ));

  render() {
    const { values } = this.state;

    return (
      <div className="select-field">
        <SelectField
          id="type-select"
          autoWidth
          hintText="Select city"
          value={values}
          onChange={this.handleChange}
          style={{
            height: 'auto',
            marginLeft: 5,
            color: 'black',
            width: '100%',
            paddingRight: 10,
            lineHeight: '28px',
          }}
          hintStyle={{
            color: 'rgba(0,0,0,.85)',
            fontSize: 14,
          }}
          labelStyle={{
            paddingTop: 6,
            paddingRight: 0,
            fontSize: 14,
          }}
          dropDownMenuProps={{
            autoWidth: false,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
        >
          {this.menuItems(values)}
        </SelectField>
      </div>
    );
  }
}

CitySelect.propTypes = {
  onShowingChangeCity: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onShowingChangeCity,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(CitySelect);
