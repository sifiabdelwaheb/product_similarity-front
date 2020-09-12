function Similarity(similarity) {
  this.similarity = similarity;
}

function SimilarityForm() {
  return new Similarity({
    marque: {
      elementType: 'Input',
      elementConfig: {
        type: 'text',
        label: 'Marque:',
        name: 'marque',
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    prix: {
      elementType: 'Input',
      elementConfig: {
        type: 'text',
        label: 'Prix :',
        name: 'prix',
        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    ecran: {
      elementType: 'Input',
      elementConfig: {
        type: 'text',
        label: 'Ecran : ',
        // prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    ram: {
      elementType: 'Input',
      elementConfig: {
        type: 'text',
        label: 'RAM :',
        name: 'ram',
        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    rom: {
      elementType: 'Input',
      elementConfig: {
        type: 'text',
        label: 'ROM :',
        name: 'rom',
        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    couleur: {
      elementType: 'Input',
      elementConfig: {
        type: 'text',
        label: 'Couleur :',
        name: 'couleur',
        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
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

export default SimilarityForm;
