import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    console.log("Rendering")
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList />
        <ChatBar />
      </div>
    );
  }
}
export default App;
