import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import moment from 'moment';
import { FormGroup, Label } from 'reactstrap';
import IntlMessages from '../helpers/IntlMessages';
// eslint-disable-next-line no-unused-vars
import { FormikDatePicker } from '../containers/form-validations/FormikFields';
import DatePicker from 'react-datepicker';
class FormikCustomWithTopLabels extends Component {
  render() {
    return (
      <Formik>
        {({ values, errors, touched }) => {
          console.log("this.props.value", values);
          return (
            <Form className="av-tooltip tooltip-label-bottom">
              <FormGroup className="form-group has-float-label">
                <Label className="d-block">
                  <IntlMessages id={this.props.label} />
                </Label>
                <DatePicker
                  id="date"
                  name="date"
                  placeholderText=""
                  selected={values.date}
                  onChange={this.props.onChange}
                  value={
                    this.props.value ? moment(this.props.value).format("L") : ''
                  }
                />
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    );
  }
}
export default FormikCustomWithTopLabels;
