import React, {Component} from 'react';


class Message extends Component {
  render() {
    // In the assignment specs user name change notifications show up differently from
    // user name change messages.
    return (
      <div>
        <div className="message">
          <span className="username">
            {this.props.username}
          </span>
          <span className="content">
            {this.props.content}
          </span>
        </div>
      </div>
    );
  }
}
export default Message;



