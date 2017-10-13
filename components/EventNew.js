import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Router from 'next/router';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createEvent, fetchPlaces } from '../actions';

import asyncValidate from '../util//asyncValidate';

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'name',
    'from',
    'to',
    'description',
    'place',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>
  (<TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />);

const renderCheckbox = ({ input, label }) =>
  (<Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />);

const renderRadioGroup = ({ input, ...rest }) =>
  (<RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />);

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) =>
  (<SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />);

class EventNew extends Component {
  componentDidMount() {
    this.props.fetchPlaces();
  }

  onSubmit = (values) => {
    this.props.createEvent(values, () => {
      Router.push('/admin');
    });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, places } = this.props;

    return (
      <div className="post-new">
        <h1>Add new event</h1>
        <form className="post-form" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="fields">
            <div>
              <Field
                name="name"
                component={renderTextField}
                label="Name"
              />
            </div>
            <div>
              <Field
                name="from"
                component={renderTextField}
                label="From"
              />
            </div>
            <div>
              <Field
                name="to"
                component={renderTextField}
                label="To"
              />
            </div>
            <div>
              <Field
                name="description"
                component={renderTextField}
                label="Description"
                multiLine
                rows={3}
              />
            </div>
            <div>
              <Field
                name="place"
                component={renderSelectField}
                label="Place"
              >
                {
                  places.map(place => (
                    <MenuItem value={`${place._id}`} primaryText={`${place.name}`} />
                  ))
                }
              </Field>
            </div>
            <div className="form-buttons">
              <RaisedButton
                type="submit"
                label="Submit"
                disabled={pristine || submitting}
                fullWidth
                style={{
                  marginBottom: 10,
                }}
              />
              <RaisedButton
                label="Clear Values"
                disabled={pristine || submitting}
                onClick={reset}
                fullWidth
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.places.places,
  };
}

export default reduxForm({
  form: 'EventNew',
  validate,
  asyncValidate,
})(
  connect(mapStateToProps, { createEvent, fetchPlaces })(EventNew)
);
