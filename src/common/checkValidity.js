export function checkValidity(value, rules) {
  let isValid = true;

  if (rules.required || typeof value === String) {
    isValid = value.trim().length !== 0 && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    const minLength = 5;
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isNumber) {
    isValid = !isNaN(value) && isValid;
  }
  if (rules.isPassword) {
    const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@-`{-~]).{6,64}$/;
    isValid = passReg.test(value) && isValid;
  }
  // console.log("identifier[password.value === identifierconfirmPassword .value", identifier["password"].value === identifier["confirmPassword"].value)
  if (rules.isFile) {
    isValid = value.name.match(/.(jpg|jpeg|png|gif|svg)$/i) && isValid;
  }

  return isValid;
}
