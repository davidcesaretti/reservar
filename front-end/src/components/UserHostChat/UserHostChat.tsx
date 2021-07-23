import React from "react";
import MenuAppBar from "../Nav/Nav2";
import { Conversation2 } from "./Conversation2";
import { MessageChat } from "./Message";
import "./messenger.css";

export const UserHostChat = () => {
  return (
    <>
      <MenuAppBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            <Conversation2 />
            <Conversation2 />
            <Conversation2 />
            <Conversation2 />
            <Conversation2 />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">Box</div>
          <div className="chatBoxTop">
            <MessageChat own={true} />
            <MessageChat own={false} />
            <MessageChat own={true} />
            <MessageChat own={true} />
            <MessageChat own={false} />
            <MessageChat own={true} />
            <MessageChat own={true} />
            <MessageChat own={false} />
            <MessageChat own={true} />
            <MessageChat own={true} />
            <MessageChat own={false} />
            <MessageChat own={true} />
            <MessageChat own={true} />
            <MessageChat own={false} />
            <MessageChat own={true} />
            <MessageChat own={true} />
            <MessageChat own={false} />
            <MessageChat own={true} />
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="write you msg..."
            ></textarea>
            <button className="chatSubmitButton">Send</button>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">Online</div>
        </div>
      </div>
    </>
  );
};
