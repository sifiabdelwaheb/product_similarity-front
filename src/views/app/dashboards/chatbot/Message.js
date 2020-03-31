import React from 'react';

const Message = props => {
  return (
    <div
      className="col s12 m8 offset-m2 l6 offset-l3"
      style={{
        height: '100px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
      }}
    >
      <div
        className="card-panel  lighten-2 z-depth-1"
        style={{ height: '100px', backgroundColor: '#ffffff' }}
      >
        <div className="row valign-wrapper" style={{ height: '100%' }}>
          {props.speaks === 'bot' && (
            <div className="col s8">
              <a
                className="btn-floating btn-large waves-effect waves-light red"
                style={{
                  width: '50px',
                  height: '50px',
                  fontSize: '14px',
                  color: 'white',
                  marginRight: '40%',
                }}
              >
                {props.speaks}
              </a>
            </div>
          )}
          <div className="col s8">
            <span style={{ color: '#000000', fontSize: '18px' }}>
              {props.text}
            </span>
          </div>

          {props.speaks === 'me' && (
            <div className="col s2">
              <a
                className="btn-floating btn-large waves-effect waves-light left blue"
                style={{
                  width: '50px',
                  height: '50px',
                  fontSize: '14px',
                  color: 'white',
                  marginLeft: '80%',
                }}
              >
                {props.speaks}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
