function addPack(addPack) {
  this.addPack = addPack;
}

function addPackForm(edit, value) {
  return new addPack({
    username: {
      elementType: 'Input',
      elementConfig: {
        type: 'text',
        label: 'name',
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value.name : '',
      validation: {
        required: true,
      },
      valid: edit ? true : false,
      touched: false,
    },
    password: {
      elementType: 'Input',
      elementConfig: {
        type: 'text',
        label: 'password',
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
      },
      valid: edit ? true : false,
      touched: false,
    },

    adresse: {
      elementType: 'Input',
      elementConfig: {
        type: 'text',
        label: 'adresse',
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
      },
      valid: edit ? true : false,
      touched: false,
    },

    useremail: {
      elementType: 'Date',
      elementConfig: {
        type: 'email',
        label: 'useremail',
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value && value.beginDate : '',
      validation: {
        required: true,
      },
      valid: edit ? true : false,
      touched: false,
    },
  });
}

export default addPackForm;
