import axios from 'axios';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Router from 'next/router';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import config from '../config.json';
const API_URL = config.apiUrl;

import { deletePlace, editPlace } from '../actions';

import asyncValidate from '../util//asyncValidate';

const validate = (values) => {
  const errors = {};
  const requiredFields = [];
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

class PlaceEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { id: '' };
  }

  componentDidMount() {
    const id = window.location.pathname.split('/')[2];
    this.setState({ id });

    const request = axios.get(`${API_URL}/places/${id}`)
      .then((e) => {
        this.props.initialValues.name = e.data.name;
        this.props.initialValues.from = e.data.from;
        this.props.initialValues.to = e.data.to;
        this.props.initialValues.description = e.data.description;
        this.props.initialValues.email = e.data.email;
        this.props.initialValues.telephone = e.data.telephone;
        this.props.initialValues.fbLink = e.data.fbLink;
      });
  }

  onDelete = () => {
    const id = window.location.pathname.split('/')[2];
    this.props.deletePlace(id, () => {
      Router.push('/admin');
    });
  }

  onSubmit = (values) => {
    const id = window.location.pathname.split('/')[2];
    this.props.editPlace(id, values, () => {
      Router.push('/admin');
    });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, places } = this.props;

    return (
      <div className="post-new container formWidth">
        <h1>Edit place</h1>
        <form className="post-form" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="fields">
            <div>
              <Field
                name="name"
                component={renderTextField}
                label="Name"
                fullWidth
              />
            </div>
            <div>
              <Field
                name="city"
                component={renderSelectField}
                label="City"
                fullWidth
              >
                <MenuItem value="Beograd" primaryText="Beograd" />
                <MenuItem value="Novi Sad" primaryText="Novi Sad" />
                <MenuItem value="Pancevo" primaryText="Pancevo" />
              </Field>
            </div>
            <div>
              <Field
                name="email"
                component={renderTextField}
                label="Email"
                fullWidth
              />
            </div>
            <div>
              <Field
                name="telephone"
                component={renderTextField}
                label="Phone"
                fullWidth
              />
            </div>
            <div>
              <Field
                name="from"
                component={renderTextField}
                label="From"
                fullWidth
              />
            </div>
            <div>
              <Field
                name="to"
                component={renderTextField}
                label="To"
                fullWidth
              />
            </div>
            <div>
              <Field
                name="description"
                component={renderTextField}
                label="Description"
                multiLine
                rows={3}
                fullWidth
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
  form: 'PlaceEdit',
  validate,
  asyncValidate,
  initialValues: {},
  enableReinitialize: true,
})(
  connect(null, { editPlace, deletePlace })(PlaceEdit)
);
