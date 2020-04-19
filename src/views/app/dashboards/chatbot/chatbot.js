import React, { Component } from 'react';
import Message from './Message';
import axios from 'axios/index';
import classes from './style.module.css';

import './materialize.min.css';
class Chatbot extends Component {
  messageEnd;
  constructor(props) {
    super(props);
    this.handleonkeyPress = this.handleonkeyPress.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.state = {
      message: [],
      showBot: true,
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
        console.log('statemassage', stateMessage);

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
        <div className={` card ${classes.card_container}`}>
          <nav className={classes.card_nav} onClick={this.hide}>
            Travel Assitant
          </nav>
          <div id="chatbot" className={classes.render_message}>
            {this.RenderMessage(this.state.message)}
            <div
              ref={(el) => {
                this.messageEnd = el;
              }}
              style={{ float: 'left', clear: 'both' }}
            ></div>

            <input
              type="text"
              onKeyPress={this.handleonkeyPress}
              style={{
                margin: 0,
                color: 'black',
                paddingLeft: '1%',
                paddingRight: '1%',
                width: '98%',
                paddingTop: '40%',
              }}
              placeHolder="any Questions"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="card"
          style={{
            minHeight: '57px',
            height: '40px',
            width: 300,
            position: 'absolute',
            bottom: -12,
            right: 10,
            border: '1px solid lightgray',
          }}
        >
          <nav className={classes.card_nav} onClick={this.show}>
            Travel Assitant
          </nav>
          <div
            ref={(el) => {
              this.messageEnd = el;
            }}
            style={{ float: 'left', clear: 'both' }}
          ></div>
        </div>
      );
    }
  }
}

export default Chatbot;
