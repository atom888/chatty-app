import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

 class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      currentUser : {name: "Bob"},
      messages: [],
      value: '',
      userCounter: ''
    };
    this.createNewMessage = this.createNewMessage.bind(this);
  }

  createNewMessage(event) {
    const newMessage = {
      username: event.username,
      content: event.content,
      type: event.type
    }
    this.setState({currentUser: {name: newMessage.username}})
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {

    let maSocket = new WebSocket('ws://localhost:4000');
    this.socket = maSocket;
    this.socket.onopen = (event) => {
        this.socket.onmessage = (event) => {
         const receivedData = JSON.parse(event.data);
          switch(receivedData.type) {
            case "incomingMessage":
            case "incomingNotification":
              const updatedMessage = receivedData;
              const newMessages = this.state.messages.concat(updatedMessage);
              this.setState({messages: newMessages});
              break;
            case "clientCounter":
              const clientCount = receivedData.content
              this.setState({userCounter: clientCount});
              break;
            default:
              throw new Error("Unknown event type " + receivedData);
          }
        };
    } // fat arrow acts as a regular function but with .bind this after
  }

  render() {
    console.log("Rendering")
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
          <h3>{this.state.userCounter} users online</h3>
        </nav>
        <MessageList
        messages={this.state.messages}
        />
        <ChatBar
        username={this.state.currentUser.name}
        addMessage={this.createNewMessage}
        />
      </div>
    );
  }
}

export default App;
