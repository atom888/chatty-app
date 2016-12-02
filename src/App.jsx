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
      value: ''
    };

    this.createNewMessage = this.createNewMessage.bind(this);
  }

  createNewMessage(event) {
    console.log('gonna send new msg', event);
    const newMessage = {
      // id: this.state.messages.length + 1,
      username: event.username,
      content: event.content,
      type: event.type
    }
    this.setState({currentUser: {name: newMessage.username}})
    // const message = this.state.messages.concat(newMessage)
    this.socket.send(JSON.stringify(newMessage));
  }


  componentDidMount() {

    let maSocket = new WebSocket('ws://localhost:4000');
    this.socket = maSocket;
    this.socket.onopen = (event) => {
        this.socket.onmessage = (event) => {
          console.log("event", event)
         const receivedData = JSON.parse(event.data);
         console.log("receivedData", receivedData)
         console.log("RD type", receivedData.type)
          switch(receivedData.type) {
            case "incomingMessage":
            case "incomingNotification":
               const updatedMessage = receivedData;
               const newMessages = this.state.messages.concat(updatedMessage);
               this.setState({messages: newMessages})
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
