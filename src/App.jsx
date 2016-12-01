import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

 class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser : {name: "Bob"},
      messages: [],
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
    // this.setState({messages: message})

    this.socket.send(JSON.stringify(newMessage));

  }




  componentDidMount() {

    let maSocket = new WebSocket('ws://localhost:4000');
    this.socket = maSocket;
    this.socket.onopen = (event) => {
        this.socket.onmessage = (event) => {
        console.log("Test", JSON.parse(event.data));
        let updatedMessage = JSON.parse(event.data);
        const newMessages = this.state.messages.concat(updatedMessage)
        this.setState({messages: newMessages})
      } // fat arrow acts as a regular function but with .bind this after
    }

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
