import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Router from 'next/router';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteEvent, fetchEvents } from '../actions';

import asyncValidate from '../util//asyncValidate';

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'name',
    'from',
    'to',
    'description',
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

class EventEdit extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  onDelete = () => {
    console.log(this.props.event._id);
    // const id = this.props.event._id;
    // this.props.deleteEvent(id, () => {
    //   Router.push('/admin');
    // });
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
        <h1>Edit event</h1>
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
            <RaisedButton
              label="Remove"
              onClick={this.onDelete}
              fullWidth
              style={{
                marginTop: 10,
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'EventEdit',
  validate,
  asyncValidate,
  initialValues: {
    name: 'Test',
    from: 10,
  },
  enableReinitialize: true,
})(
  connect(null, { fetchEvents, deleteEvent })(EventEdit)
);
