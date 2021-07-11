import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userBox: this.props.username,
      messageBox: ""
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
    this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({userBox: event.target.value})
  }

  handleChangeMessage(event) {
    this.setState({messageBox: event.target.value})
  }

  handleSubmitMessage(event) {
    if (event.which === 13) {
      let message = {
        content: this.state.messageBox,
        username: this.state.userBox,
        type: "postMessage"
      }
      this.props.addMessage(message);
      this.setState({messageBox: ''});
    }
  }

  // nice touch to make this be called on blur and on keyup
  handleSubmitUsername(event) {
      let message = {
        content: this.props.username + " has changed to " + this.state.userBox,
        username: this.state.userBox,
        type: "postNotification"  // the message type is something that the socket cares about. you could have a cleaner separation of concerns by letting the App component
                                  // build the message. The content could even be set by the server.
      }
      this.props.addMessage(message);
  }

  render() {
    return (
            <footer>

                <input
                  onChange={this.handleChangeUsername}
                  value={this.state.userBox}
                  onKeyPress={
                    (evt) => {
                      // +1 for how you are reusing the handleSubmitUsername in two places
                      if (evt.which ===13) {
                      this.handleSubmitUsername
                      }
                    }
                  }
                  onBlur={this.handleSubmitUsername}
                  id="username"
                  type="text"
                  placeholder="Your Name (Optional)"
                />

                <input
                  onChange={this.handleChangeMessage}
                  value={this.state.messageBox}
                  onKeyPress={this.handleSubmitMessage}
                  id="new-message"
                  type="text"
                  placeholder="Type a message and hit ENTER"
                />

            </footer>
    );
  }
}
export default ChatBar;





