import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

 class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser : {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
      value: ''
    };

    this.createNewMessage = this.createNewMessage.bind(this);
  }


  createNewMessage(event) {
    const newMessage = {
      id: this.state.messages.length + 1,
      username: event.username,
      content: event.content
    }
    const message = this.state.messages.concat(newMessage)
    this.setState({messages: message})

  }


  render() {
    console.log("Rendering")
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList
        messages={this.state.messages}
        />
        <ChatBar
        addMessage={this.createNewMessage}
        />
      </div>
    );
  }
}

export default App;
