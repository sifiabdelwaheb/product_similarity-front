import React from 'react';
import { Label, Input, FormGroup, Dropdown } from 'reactstrap';
import IntlMessages from '../helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from '../components/common/CustomSelectInput';
import DropzoneExample from '../containers/forms/DropzoneExample';
import DatePicker from './datePicker';
import './style.scss';
import PropTypes from 'prop-types';
const editor = ({
  elementConfig,
  elementType,
  onChange,
  clicked,
  valid,
  value,
  error,
  options,
  type,
  list,
  title,
  edit,
  onClick,
}) => {
  let inputElement = null;
  switch (elementType) {
    case 'Input':
      inputElement = (
        <FormGroup>
          <label className="text-primary">
            <IntlMessages id={elementConfig.label} />
          </label>
          <Input
            style={
              (!valid && clicked) || (clicked && error && error !== null)
                ? { border: 'red 1px solid' }
                : { border: null }
            }
            onChange={onChange}
            {...elementConfig}
            value={value}
            type={type}
            name={elementConfig.name}
          />
          {(!valid && clicked) || (clicked && error && error !== null) ? (
            <span style={{ color: 'red' }}>
              {' '}
              <IntlMessages id={'input.invalid'} />
            </span>
          ) : null}
        </FormGroup>
      );
      break;
    case 'Select':
      inputElement = (
        <FormGroup>
          <label className="text-primary">
            <IntlMessages id={elementConfig.label} />
          </label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            name="form-field-name"
            options={options}
            onChange={(e) => onChange(e)}
            value={value}
            style={{ width: '70%' }}
            // defaultInputValue={value}
          />
          {!valid && clicked && <p className="text-danger" />}
        </FormGroup>
      );

      break;

    case 'Avatar':
      inputElement = (
        <>
          {edit && value !== '' ? (
            <div
              style={{
                backgroundImage: 'url(' + value + ')',
                backgroundSize: 'cover',
                height: '175px',
              }}
            />
          ) : null}
          <DropzoneExample
            className={
              !valid && clicked
                ? 'react-select__border__red'
                : 'DropzoneExample'
            }
            eventHandlers={{ addedfile: (e) => onChange(e) }}
          />
          {(!valid && clicked) || (clicked && error && error !== null) ? (
            <span style={{ color: 'red' }}>
              {' '}
              <IntlMessages id={'input.invalid'} />
            </span>
          ) : null}
        </>
      );

      break;
    case 'Date':
      inputElement = (
        <DatePicker
          id="date"
          name="date"
          selected={value}
          onChange={onChange}
          value={value}
          label={elementConfig.label}
        />
      );
      break;
    case 'Theme':
      inputElement = (
        <>
          <label className="text-primary">
            <IntlMessages id={elementConfig.label} />
          </label>
          <div className={`theme-colors theme_user_theme shown`}>
            <div className="p-4">
              <p className="text-muted mb-2">Light Theme</p>
              <div className="d-flex flex-row justify-content-between mb-4">
                {['purple', 'blue', 'green', 'orange', 'red'].map((color) => (
                  <span
                    name={color}
                    key={color}
                    href={`#light.${color}`}
                    className={`theme-color theme-color-${color} active `}
                    onClick={() => onChange(`light.${color}`)}
                    style={{
                      background: value === `light.${color}` ? color : '#fff',
                    }}
                  >
                    <span>`light.${color}`</span>
                  </span>
                ))}
              </div>
              <p className="text-muted mb-2">Dark Theme</p>
              <div className="d-flex flex-row justify-content-between">
                {['purple', 'blue', 'green', 'orange', 'red'].map((color) => (
                  <span
                    name={color}
                    key={`dark.${color}`}
                    href={`#dark.${color}`}
                    className={`theme-color theme-color-${color} `}
                    style={{
                      background: value === `dark.${color}` ? color : '#fff',
                    }}
                    onClick={(e) => onChange(`dark.${color}`)}
                  >
                    <span>`dark.${color}`</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      );
      break;
    default:
      inputElement = <Input onChange={onChange} />;
  }

  return inputElement;
};
editor.propTypes = {
  isvalid: PropTypes.number,
};
export default editor;
