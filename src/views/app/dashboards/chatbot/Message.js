import React from 'react';
import Classes from './style.module.css';
import classes from './style.module.css';

const Message = props => {
  return (
    <div
      className={`${
        props.speaks === 'bot'
          ? 'card  lighten-2 z-depth-1 left'
          : 'card lighten-2 z-depth-1 right '
      }`}
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        minHeight: '60px',
        margin: 10,

        maxWidth: '330px',
      }}
    >
      <div className={`${Classes.message}`}>
        {props.speaks === 'bot' && (
          <div className={` col s2 ${Classes.chat_message}`}>
            <img
              src={require('../../../../assets/images/bot.png')}
              className={Classes.chat_img}
            />
          </div>
        )}

        {props.speaks === 'me' && (
          <div className={Classes.text_me}>
            <span className={Classes.text_text_me}>{props.text}</span>
          </div>
        )}
        {props.speaks === 'bot' && (
          <div className={` col 10 ${Classes.text_bot}`}>
            <span style={{ color: '#fff', fontSize: '18px' }}>
              {props.text}
            </span>
          </div>
        )}

        {props.speaks === 'me' && (
          <div className={` col s2 ${Classes.me_message}`} s>
            <a
              className="btn-floating btn-small waves-effect waves-light left black"
              style={{
                fontSize: '13px',
                color: 'white',
                fontWeight:'bold'
              }}
            >
              {props.speaks}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
