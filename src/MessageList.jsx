import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div id="message-list">
      {this.props.messages.map(function(msg) {
        return <Message key={msg.id} username={msg.username} content={msg.content} />
      })}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </div>
    );
  }
}
export default MessageList;
