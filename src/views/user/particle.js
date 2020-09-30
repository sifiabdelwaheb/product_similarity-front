import React, { Component } from 'react';
import Particles from 'react-particles-js';

class particle extends Component {
  render() {
    return (
      <Particles
        height="320px"
        style={{
          width: '100%',
          backgroundColor: '#496E93',
        }}
        params={{
          height: '100px',
          particles: {
            number: {
              value: 80,
            },
            color: {
              value: '#ccc',
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 1,
                color: '#fff',
              },
            },
          },
        }}
      />
    );
  }
}

export default particle;
