
function Incapacity(incapacityForm) {
  this.incapacityForm = incapacityForm;
}

export function incapacityForm(edit, value, arrayofvalues) {
  return {
    type: {
      elementType: "Select",
      elementConfig: {
        type: "text",
        label: "incapacity.name"
        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value && value.type && value.type.name : "",
      validation: {
        required: edit ? false : true
      },
      valid: edit ? true : false,
      touched: false,
      options: arrayofvalues
    },
    beginDate: {
      elementType: "Date",
      elementConfig: {
        type: "text",
        label: "Pack.beginDate"
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value && value.beginDate : "",
      validation: {
        required: edit ? false : true
      },
      valid: edit ? true : false,
      touched: false
    },
    endDate: {
      elementType: "Date",
      elementConfig: {
        type: "text",
        label: "Pack.endDate"
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value && value.endDate : "",
      validation: {
        required: edit ? false : true
      },
      valid: edit ? true : false,
      touched: false
    },
    details: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "users.details"
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit? value && value.details : "",
      validation: {
        required: edit ? false : true
      },
      valid: edit ? true : false,
      touched: false
    }
  };
}
