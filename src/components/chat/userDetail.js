import React, { Component } from "react";
import "./styles.css";
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.clientID,
      name: this.props.name,
      img: this.props.img,
      des: "Hi, I'm from pakistan. professional designer",

    };
  }
  componentDidUpdate(prevProps) {
    if(this.props.clientID !== prevProps.clientID) {
      this.setState({
        id: this.props.clientID,
        name: this.props.name,
        img: this.props.img,
      })
    }
  }
  render() {
    let {
      id,
      name,
      img,
      des
    } = this.state
    return (
      <div className="user-detail">
        <div className="d-box">
            <div className="d-item">
              <img src={img ? img : "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"} className="d-img" alt=""/>
              <div
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#000",
                    textAlign: "center",
                  }}
                >
                  {name}
                </p>
                <p>{des}</p>
                {/* <p>Language: {item.lang}</p> */}
              </div>
            </div>

        </div>
      </div>
    );
  }
}