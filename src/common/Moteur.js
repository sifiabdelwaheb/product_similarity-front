function Recheche(recheche) {
  this.recheche = recheche;
}

function RechecheForm() {
  const options = [
    { value: 'blues', label: 'Blues' },
    { value: 'rock', label: 'Rock' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'orchestra', label: 'Orchestra' },
  ];
  return new Recheche({
    twitters: {
      elementType: 'Input',
      elementConfig: {
        type: 'text',
        label: 'Product:',
        name: 'product',
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
   
  });
}

export default RechecheForm;
