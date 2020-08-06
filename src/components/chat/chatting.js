import React, { Component } from "react";
import { GiftedChat, Composer, Send } from 'react-web-gifted-chat';
import ls from 'local-storage'
import Loader from 'react-loader-spinner'
import { db, storage } from '../../config/firebase'
const chatRef = db.collection("CHAT");

export default class Chatting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatID: props.chatID,
      designer: ls.get('user'),
      loading: true,
      img: "",
      uploading: false,
      text: "",
      file: ""
    }
  }

  componentDidMount() {
    let { chatID } = this.state;
    this.fetchChat(chatID);
  }

  componentDidUpdate(prevProps) {
    if(this.props.chatID !== prevProps.chatID) {
      this.setState({
        chatID: this.props.chatID
      })
      this.fetchChat(this.props.chatID);
    }
  }

  fetchChat(chatID) {
    chatRef
      .doc(chatID)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc")
      .onSnapshot((data) => {
        const list = data.docs.map((documentSnapshot) => {
          return {
          ...documentSnapshot.data(),
          };
        });
        this.setState({
          messages: list,
          loading: false,
        });
      });
  }

  // File select
  fileSelect = (e) => {
    let fullPath = e.target.files[0];
    console.log(fullPath)
    if(fullPath != null) {
      const name = fullPath.name;
      const type = fullPath.type;
      const lastDot = name.lastIndexOf('.');

      const fileName = name.substring(0, lastDot);
      const ext = type.split('/');
      console.log('name => ', fileName, ' => ',' extension', ext[0])
      if(ext[0] == 'image'){
        this.setState({
          img: fullPath,
          text: `Image(${fileName})`,
        });
      } else {
        this.setState({
          file: fullPath,
          text: `File(${fileName})`,
        });
      }
    }
  };
  // Uploading image to firebase
  uploadImage = async (image) => {
    const imageRef = storage.ref(`/chat-img/${image.name}`);
    await imageRef.put(image).catch((error) => {
      throw error;
    });
    const url = await imageRef.getDownloadURL().catch((error) => {
      throw error;
    });
    return url;
  };

  // Uploading file to firebase
  uploadFile = async (file) => {
    const fileRef = storage.ref(`/chat-file/${file.name}`);
    await fileRef.put(file).catch((error) => {
      throw error;
    });
    const url = await fileRef.getDownloadURL().catch((error) => {
      throw error;
    });
    return url;
  };

  //send chat message
  sendMessage = (data, id) => {
    return chatRef
      .doc(id)
      .collection("MESSAGES")
      .add(data)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return false;
      });
  };

  onSend(messages = []) {
    let { chatID, img, designer, file } = this.state;
    // let client = JSON.parse(localStorage.getItem("logged"));
    // console.log('IM', fileName, 'PA', img, messages)
    if (img.length === 0 && file.length === 0) {
      messages.forEach((item) => {
        const message = {
          id: item.id,
          text: item.text,
          createdAt: new Date().getTime(),
          user: {
            id: designer.id,
            name: designer.name,
            avatar: designer.image == null ? "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png" :designer.image,
          },
          type: "text",
          image: "",
        };
        this.sendMessage(message, chatID).then((msg) => {
            // console.log('MESG', msg)
          })
          .catch((err) => {
            // console.log('ERR', err)
          });
      });
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
    } else if (file.length !== 0 && img.length === 0 ) {
      this.setState({ uploading: true });
      console.log("uploading file......")
      this.uploadFile(file).then((url) => {
        messages.forEach((item) => {
          const message = {
            id: item.id,
            text: url,
            createdAt: new Date().getTime(),
            user: {
              id: designer.id,
              name: designer.name,
              avatar: designer.image == null ? "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png" :designer.image,
            },
            type: "text",
            image: "",
          };
          this.sendMessage(message, chatID).then((msg) => {});
          
          this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
            file: "",
            text: "",
          }));
        });
        this.setState({ uploading: false });
      });
    } else {
      this.setState({ uploading: true });
      this.uploadImage(img).then((url) => {
        messages.forEach((item) => {
          const message = {
            id: item.id,
            text: item.text,
            createdAt: new Date().getTime(),
            user: {
              id: designer.id,
              name: designer.name,
              avatar: designer.image == null ? "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png" :designer.image,
            },
            type: "image",
            image: url,
          };
          this.sendMessage(message, chatID).then((msg) => {});
          
          this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
            img: "",
            text: "",
          }));
        });
        this.setState({ uploading: false });
      });
    }
  }

  renderSend = (props) => {
    if (!props.text.trim()) {
      return (
        <i
          class="fa fa-paper-plane"
          style={{ fontSize: "25px", color: "#FF9944", paddingRight: 10, marginBottom: 9 }}
        />
      );
    }
    if (this.state.uploading) {
      return <Loader type="ThreeDots" color="FF8084" height={40} width={40} />;
    }
    return (
      <Send {...props}>
        <div style={{ paddingRight: 10 }}>
          <i
            class="fa fa-paper-plane"
            style={{ fontSize: "25px", color: "#FF9944" }}
          />
        </div>
      </Send>
    );
  };

  renderComposer = (props) => {
    return (
      <div className="composer">
        <div className="file-upload">
          <label for="file-input">
            <i
              class="fa fa-paperclip"
              style={{ fontSize: "25px", color: "#FF9944", paddingLeft: 10 }}
            />
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/*,.doc,.docx,.pdf,application/msword,application/pdf,text/plain"
            onChange={this.fileSelect}
          />
        </div>
        <Composer {...props} />
      </div>
    );
  };

  handleUrlPress(url, matchIndex /*: number*/) {
    window.open(url, "_blank")
  }

  render() {
    let {loading} = this.state
    console.log('render called');
    return (
      <>
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
              <>
                <GiftedChat
                  text={this.state.text}
                  onInputTextChanged={(text) =>
                    this.state.uploading
                      ? this.setState({ text: "Sending..." })
                      : this.setState({ text })
                  }
                  messages={this.state.messages}
                  onSend={(messages) => this.onSend(messages)}
                  renderSend={this.renderSend}
                  renderComposer={this.renderComposer}
                  parsePatterns={(linkStyle) => [
                    { type: 'url', style: linkStyle, onPress: this.handleUrlPress },
                  ]}
                  user={{
                    id: this.state.designer.id,
                  }}
                />
                {this.state.uploading && (
                  <div style={{ paddingLeft: "10px", color: "green" }}>
                    Sending...
                  </div>
                )}
              </>
        }
      </>
    )
  }
}