function addSociety(edit, value) {
  return {
    logo: {
      elementType: "Avatar",
      elementConfig: {
        type: "file",
        label: "user.logo"
        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value:
        edit && value.logo
          ? "https://api-mobilar.wereact.co/" + value.logo
          : "",
      validation: {
        required: false,
        isFile: true
      },
      valid: true,
      touched: false
    },

    language: {
      elementType: "Select",
      elementConfig: {
        type: "text",
        label: "user.language"
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true
      },
      valid: edit ? true : false,
      touched: false,
      options: [
        { label: "De", id: "de" },
        { label: "En", id: "en" }
      ]
    },
    name: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "user.name"
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value.name : "",
      validation: {
        required: true
      },
      valid: edit ? true : false,
      touched: false
    },
    username: {
      elementType: "Input",
      elementConfig: {
        type: "text",
        label: "user.username"
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value.username : "",
      validation: {
        required: true
      },
      valid: edit ? true : false,
      touched: false
    },
    email: {
      elementType: "Input",
      elementConfig: {
        type: "email",
        label: "user.email"
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value.email : "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: edit ? true : false,
      touched: false
    },
    role: {
      elementType: "Select",
      elementConfig: {
        type: "text",
        label: "user.role"
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true
      },
      valid: edit ? true : false,
      touched: false,
      options: [
        { label: "reseller", id: "reseller" },
        { label: "consumer", id: "consumer" }
      ]
    },
    password: {
      elementType: "Input",
      elementConfig: {
        type: "password",
        label: "user.password"
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true
      },
      valid: edit ? true : false,
      touched: false
    },
    confirmPassword: {
      elementType: "Input",
      elementConfig: {
        type: "password",
        label: "user.confirmPassword"
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: "",
      validation: {
        required: true
      },
      valid: edit ? true : false,
      touched: false
    },
    theme: {
      elementType: "Theme",
      elementConfig: {
        type: "text",
        label: "user.theme"
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: edit ? value.theme : "",
      validation: {
        required: false
      },
      valid: true,
      touched: false
    }
  };
}

export default addSociety;
