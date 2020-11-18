function Similarity(similarity) {
  this.similarity = similarity;
}

function SimilarityForm() {
  return new Similarity({
    marque: {
      elementType: 'Select',
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
      options: [
        { label: 'Infinix', id: 'Infinix' },
        { label: 'Oppo', id: 'Oppo' },
        { label: 'Nokia', id: 'Nokia' },
        { label: 'Samsung', id: 'Samsung' },
        { label: 'Iku', id: 'Iku' },
        { label: 'Huawei', id: 'Huawei' },
        { label: 'Evertek', id: 'Evertek' },
        { label: 'Logicom', id: 'Logicom' },
        { label: 'ZTE', id: 'ZTE' },
      ],
    },
    prix: {
      elementType: 'InputNumber',
      elementConfig: {
        type: 'number',
        label: 'Prix :',
        name: 'prix',
        // prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
      },
      value: '',
      validation: {
        required: true,
        isNumber: true,
      },
      valid: false,
      touched: false,
    },

    ecran: {
      elementType: 'Select',
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
      options: [
        { label: '1.77', id: '1.77' },
        { label: '2.4', id: '2.4' },
        { label: '4.0', id: '4.0' },
        { label: '5.7', id: '5.7' },
        { label: '6.01', id: '6.01' },
        { label: '6.39', id: '6.39' },
        { label: '6.4', id: '6.4' },
        { label: '6.52', id: '6.52' },
        { label: '6.5', id: '6.5' },
        { label: '6.6', id: '6.6' },
        { label: '6.7', id: '6.7' },
        { label: '6.82', id: '6.82' },
        { label: '6.09', id: '6.09' },
        { label: '6.95', id: '6.95' },
        { label: '7.0', id: '7.0' },
      ],
    },
    ram: {
      elementType: 'Select',
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
      options: [
        { label: '2', id: '2' },
        { label: '3', id: '3' },
        { label: '4', id: '4' },
        { label: '6', id: '6' },
        { label: '16', id: '16' },
      ],
    },
    rom: {
      elementType: 'Select',
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
      options: [
        { label: '4', id: '4' },
        { label: '6', id: '6' },
        { label: '8', id: '8' },
        { label: '16', id: '16' },
        { label: '32', id: '32' },
        { label: '64', id: '64' },
        { label: '128', id: '128' },
      ],
    },
    couleur: {
      elementType: 'Select',
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
      options: [
        { label: 'Black', id: 'Black' },
        { label: 'Noir', id: 'Noir' },
        { label: 'Rouge', id: 'Rouge' },
        { label: 'Blanc', id: 'Blanc' },
        { label: 'Rose', id: 'Rose' },
        { label: 'Gold', id: 'Gold' },
        { label: 'Vert', id: 'Vert' },
        { label: 'Cyan', id: 'Cyan' },
        { label: 'Purple', id: 'Purple' },
        { label: 'Bleu', id: 'Bleu' },
        { label: 'Aurora Blue', id: 'Aurora Blue' },
        { label: 'Bleu Prisme', id: 'Bleu Prisme' },
        { label: 'Vacation Blue', id: 'Vacation Blue' },
        { label: 'Forest Green', id: 'Forest Green' },
        { label: 'Ice Jadeite', id: 'Ice Jadeite' },
        { label: 'Space Purple', id: 'Space Purple' },
        { label: 'Sakura Pink', id: 'Sakura Pink' },
        { label: 'Emerald Green', id: 'Emerald Green' },
        { label: 'Shoal Gold', id: 'Shoal Gold' },
        { label: 'sunrise orange', id: 'sunrise orange' },
        { label: 'Jadeite Ice', id: 'Jadeite Ice' },
        { label: 'Breathing Crysta', id: 'Breathing Crysta' },
        { label: 'Midnight Black', id: 'Midnight Blackk' },
        { label: 'Violet', id: 'Violet' },
      ],
    },
  });
}

export default SimilarityForm;
