function Sentiment(sentiment) {
  this.sentiment = sentiment;
}

function SentimentForm() {
  return new Sentiment({
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

export default SentimentForm;
