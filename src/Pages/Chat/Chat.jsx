import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MainContent from "../../Components/MainContent/MainContent";
import "./Chat.style.scss";
import ChatMessage from "../../Components/ChatMessage/ChatMessage";
// import io from "socket.io-client";
// let socket = io.connect("http://localhost:4001");

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  sendChat = (e, message) => {
    e.preventDefault();
    // socket.emit("message", message);
    this.setState({ message: "" });
  };

  render() {
    const messages = this.props.chat.map((msg, i) => {
      return <ChatMessage key={i} msg={msg} user={this.props} />;
    });
    return (
      <div className="chat-container">
        <Sidebar loggedUser={this.props.userData} showHomeBtn={true} />
        <MainContent padding={0}>
          <div className="main-chat-container">
            <h2 data-aos="fade-down" data-aos-duration="500">
              codeTalk
            </h2>
            <h5>Welcome to codeTalk!</h5>
            <div className="chat-description">
              <p>
                Chat with other DevMountain students about whatever you want.
                This is a place for advice, technical help and anything else you
                can think of.
              </p>
            </div>
            <div className="chat-box">
              <div className="chat-input-box">
                <div className="chat">{messages}</div>
                <input
                  value={this.state.message}
                  onChange={e => this.setState({ message: e.target.value })}
                  type="text"
                  placeholder="Chat"
                />
                <button onClick={e => this.sendChat(e, this.state.message)}>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </MainContent>
      </div>
    );
  }
}
export default Chat;
