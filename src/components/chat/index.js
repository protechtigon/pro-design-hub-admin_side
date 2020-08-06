import React, { Component, Fragment} from "react";
import Breadcrumb from '../common/breadcrumb';
import Conversation from "./conversations";
import Chatting from "./chatting";
import UserDetail from "./userDetail";
import Loader from 'react-loader-spinner'
import "./styles.css";
import ls from 'local-storage'
import {db} from '../../config/firebase'
const chatRef = db.collection("CHAT");

export default class Messages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: false,
      conversation: [],
      designer: ls.get('user'),
      loading: false,
      chatID: '',
      clientID: '',
      name: '',
      img: ''
    };
  }

  componentDidMount() {
    this.getAllChat();
  }

  getAllChat = () => {
    let {designer} = this.state
    this.setState({ loading: true }, () => {
      chatRef.where('designerId', '==', designer.id).get().then(async(data) => {
        console.log(data)
        if(data.empty) {
          console.log('Chat Not Found!');
        }
          await data.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              let conversation = {
                chatID: doc.id,
                clientID: doc.data().clientId,
                name: doc.data().client.name,
                img: doc.data().client.image
              }
              this.state.conversation.push(conversation)
          
              // return doc;
          });
          this.setState({
            loading: false
          })
  
      }).catch(err => {
          // return err;
          // console.log(err);
      })
    })
    
  }

  render() {
    let {loading} = this.state
    return (
      <Fragment>
        <Breadcrumb title="Message" parent="Message" />
        <div className="container">
          <div className="flex-container">
            <div className="conversation">
            <div className="c-list">
            {loading ?
              <div
                style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
              >
                <Loader type="ThreeDots" color="#FF8084" height="100" width="100" />

              </div> : 
            <div>
              {this.state.conversation.map((item, index) => (
                <div className="c-item" onClick={() => this.setState({
                  chatID: item.chatID, 
                  clientID: item.clientID, 
                  name: item.name, 
                  img: item.img})}>
                  <div style={{ display: "flex" }}>
                    <img src={item.img ? item.img : "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"} className="c-img" alt=""/>
                    <div style={{marginLeft:'10px', marginTop:'10px'}}>
                      <p style={{ fontWeight: "bold", color: "#000" }}>
                        {item.name}
                      </p>
                      <p>{item.msg ? item.msg : "Click to See Messages!"}</p>
                    </div>
                  </div>
                  <p>{item.last_msg ? item.last_msg : "just now"}</p>
                </div>
              ))}
            </div>
            }
            </div>
            </div>
            <div className="chatting">
              {this.state.chatID !== "" && <Chatting chatID={this.state.chatID}/>}
            </div>
            <div className="user-detail">
              {this.state.clientID !== "" &&  
                <UserDetail 
                  clientID={this.state.clientID} 
                  name={this.state.name} 
                  img={this.state.img} 
                /> 
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}