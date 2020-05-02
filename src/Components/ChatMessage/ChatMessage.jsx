import React from "react";
import "./ChatMessage.style.scss";
export default function ChatMessage(props) {
  return <div className="single-message">{props.msg}</div>;
}
