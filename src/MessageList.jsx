import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div id="message-list">
      {this.props.messages.map(function(msg) {
        return <Message key={msg.id} type={msg.type} username={msg.username} content={msg.content} />
      })}
        <div className="message system">
          This is not a private chat.
        </div>
      </div>
    );
  }
}
export default MessageList;
