import React, { Component } from 'react';
import Message from './Message';
import axios from 'axios/index';

class Chatbot extends Component {
  messageEnd;
  constructor(props) {
    super(props);
    this.handleonkeyPress = this.handleonkeyPress.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.state = {
      message: [],
      showBot: false,
    };
  }
  async df_text_query(text) {
    try {
      let says = {
        speaks: 'me',
        msg: {
          text: {
            text: text,
          },
        },
      };
      this.setState({ message: [...this.state.message, says] });
      const res = await await axios.post(
        'http://localhost:5000/api/df_text_query',
        { text },
      );
      console.log('responssssssssssssssss', res);
      for (let msg of res.data.fulfillmentMessages) {
        says = {
          speaks: 'bot',
          msg: msg,
        };
        this.setState({ message: [...this.state.message, says] });
      }
    } catch (e) {}
  }

  componentDidMount() {
    this.df_text_query('hi');
  }
  componentDidUpdate() {
    this.messageEnd.scrollIntoView({ behaviour: 'smooth' });
  }

  RenderMessage(stateMessage) {
    if (stateMessage) {
      return stateMessage.map((message, i) => {
        return (
          <Message
            key={i}
            speaks={message.speaks}
            text={message.msg.text.text}
          />
        );
      });
    } else {
      return null;
    }
  }
  show(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showBot: true });
  }

  hide(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showBot: false });
  }
  handleonkeyPress(e) {
    if (e.key === 'Enter') {
      this.df_text_query(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    if (this.state.showBot) {
      return (
        <div
          className="card"
          style={{
            height: 400,
            width: 400,
            float: 'right',
            marginTop: '20%',
            marginRight: '-20%',
            borderRadius: '12px',
          }}
        >
          <nav>
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">
                ChatBot
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="/" onClick={this.hide}>
                    Close
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div
            id="chatbot"
            style={{
              height: '100%',
              width: '100%',
              overflow: 'auto',
              alignItems: 'center',
              borderRadius: '12px',
            }}
          >
            {this.RenderMessage(this.state.message)}
            <div
              ref={el => {
                this.messageEnd = el;
              }}
              style={{ float: 'left', clear: 'both' }}
            ></div>
            <input type="text" onKeyPress={this.handleonkeyPress} />
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            minHeight: 40,
            maxHeight: 500,
            width: 400,
            position: 'absolute',
            bottom: 0,
            right: 0,
            border: '1px solid lightgray',
          }}
        >
          <nav>
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">
                ChatBot
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="/" onClick={this.show}>
                    Show
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div
            ref={el => {
              this.messagesEnd = el;
            }}
            style={{ float: 'left', clear: 'both' }}
          ></div>
        </div>
      );
    }
  }
}

export default Chatbot;
