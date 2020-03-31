import React, { Component } from 'react';
import * as d3 from 'd3';
import Chatbot from './chatbot/chatbot';
import Header from './Header';

class DefaultDashboard extends Component {
  render() {
    return (
      <div>
        <Chatbot />
      </div>
    );
  }
}
export default DefaultDashboard;
