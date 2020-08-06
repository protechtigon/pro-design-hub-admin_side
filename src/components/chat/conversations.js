import React, { Component } from "react";
import "./styles.css";
export default class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      conversation: [
        {
          id: 1,
          name: "Jhon vick",
          img:
            "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
          msg: "Hi, are you available?",
          last_msg: "just now",
        },
        {
          id: 2,
          name: "Jack faram",
          img:
            "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
          msg: "i'm desinger",
          last_msg: "just now",
        },
        {
          id: 3,
          name: "Andersan",
          img:
            "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
          msg: "Hi, are you available?",
          last_msg: "just now",
        },
      ],
    };
  }
  render() {
    return (
      <div className="conversation">
        <div className="c-header">
          <div class="input-group">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search Designer"
            />
            <div class="input-group-btn">
              <button class="btn btn-default" type="button">
                <i class="fa fa-search" />
              </button>
            </div>
          </div>
        </div>
        <div className="c-list">
          {this.state.conversation.map((item, index) => (
            <div className="c-item">
              <div style={{ display: "flex" }}>
                <img src={item.img} className="c-img" />
                <div style={{marginLeft:'10px', marginTop:'10px'}}>
                  <p style={{ fontWeight: "bold", color: "#000" }}>
                    {item.name}
                  </p>
                  <p>{item.msg}</p>
                </div>
              </div>
              <p>{item.last_msg}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}