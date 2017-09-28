import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const categories = [
  'Club',
  'Restaurant',
  'Cafe',
  'Bar',
];

class TypeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
  }

  handleChange = (event, index, values) => this.setState({ values });

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
          multiple
          autoWidth
          hintText="All"
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

export default TypeSelect;
