import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Source, Feature } from 'react-mapbox-gl';
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

import { createPlace } from '../actions';

import asyncValidate from '../util//asyncValidate';

import { token, styles } from '../config.json';

const Map = ReactMapboxGl({ accessToken: token });

const mapStyle = {
  height: '100vh',
  width: '70vw',
};

const POSITION_CIRCLE_PAINT = {
  'circle-stroke-width': 4,
  'circle-radius': 10,
  'circle-blur': 0.15,
  'circle-color': '#3770C6',
  'circle-stroke-color': 'white',
};

const InitialUserPostion = [20.494431799999998, 44.812046499999996];

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'name',
    'city',
    'address',
    'email',
    'from',
    'to',
    'telephone',
    'description',
    'image1',
    'image2',
    'image3',
    'image4',
    'category',
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

class PlaceNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosition: InitialUserPostion,
      mapCenter: InitialUserPostion,
    };
  }

  onDragEnd = ({ lngLat }) => {
    this.setState({
      userPosition: [lngLat.lng, lngLat.lat],
    }, () => {
      console.log(this.state.userPosition);
    });
  }

  onSubmit = (values) => {
    const images = [];
    images.push(values.image1, values.image2, values.image3, values.image4);

    values.images = images;

    delete values.image1;
    delete values.image2;
    delete values.image3;
    delete values.image4;

    values.lng = this.state.userPosition[1];
    values.lat = this.state.userPosition[0];

    const features = [];

    if (values.debitCard) {
      features.push('debit card');
    }

    if (values.creditCard) {
      features.push('credit card');
    }

    if (values.parking) {
      features.push('parking');
    }

    if (values.wifi) {
      features.push('wifi');
    }

    delete values.wifi;
    delete values.parking;
    delete values.creditCard;
    delete values.debitCard;

    values.features = features;

    console.log(values);

    this.props.createPlace(values);

    Router.push('/admin');
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { userPosition, mapCenter } = this.state;

    return (
      <div className="post-new">
        <h1>Add new place</h1>
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
                name="city"
                component={renderSelectField}
                label="City"
              >
                <MenuItem value="Beograd" primaryText="Beograd" />
                <MenuItem value="Novi Sad" primaryText="Novi Sad" />
                <MenuItem value="Pancevo" primaryText="Pancevo" />
              </Field>
            </div>
            <div>
              <Field
                name="address"
                component={renderTextField}
                label="Address"
              />
            </div>
            <div>
              <Field
                name="email"
                component={renderTextField}
                label="Email"
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
                name="telephone"
                component={renderTextField}
                label="Phone Number"
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
                name="fbLink"
                component={renderTextField}
                label="Facebook Link"
              />
            </div>
            <div>
              <Field
                name="image1"
                component={renderTextField}
                label="Image 1"
              />
            </div>
            <div>
              <Field
                name="image2"
                component={renderTextField}
                label="Image 2"
              />
            </div>
            <div>
              <Field
                name="image3"
                component={renderTextField}
                label="Image 3"
              />
            </div>
            <div>
              <Field
                name="image4"
                component={renderTextField}
                label="Image 4"
              />
            </div>
            <div>
              <Field
                name="category"
                component={renderSelectField}
                label="Category"
              >
                <MenuItem value="59d17df5b94b5e432c866e44" primaryText="club" />
                <MenuItem value="59d17df5b94b5e432c866e45" primaryText="bar" />
                <MenuItem value="59d17df5b94b5e432c866e46" primaryText="cafe" />
                <MenuItem value="59d17df5b94b5e432c866e47" primaryText="restaurant" />
              </Field>
            </div>
            <h3>Features</h3>
            <div>
              <Field name="creditCard" component={renderCheckbox} label="Credit Card" />
              <Field name="debitCard" component={renderCheckbox} label="Debit Card" />
              <Field name="parking" component={renderCheckbox} label="Parking" />
              <Field name="wifi" component={renderCheckbox} label="Wi-Fi" />
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
          <Map
            style={styles.light}
            containerStyle={mapStyle}
            center={mapCenter}
            className="setLocationMap"
          >
            <Layer type="circle" id="position-marker" paint={POSITION_CIRCLE_PAINT}>
              <Feature
                coordinates={userPosition}
                draggable
                onDragEnd={this.onDragEnd}
              />
            </Layer>
          </Map>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'PlaceNew',
  validate,
  asyncValidate,
})(
  connect(null, { createPlace })(PlaceNew)
);
