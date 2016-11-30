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

    // message.forEach(message) {
    //   message.length + 1
    //   //find latest index value and display username and content

    // }
    this.socket.send(JSON.stringify(newMessage));

  }




  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);


    this.socket = new WebSocket('ws://localhost:4000');
    this.socket.onopen = function(event) {
      console.log("connected to server", event);
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
