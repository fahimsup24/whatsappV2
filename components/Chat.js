import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, EmojiEmotions, Mic, MoreHoriz, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../css/Chat.css'
import { selectChatId, selectChatName } from '../features/chatSlice'
import me from '../images/me.jpg'
import bkg from '../images/bkg.jpg'
import Message from './Message'
import  db from '../firebase'
import firebase from 'firebase'
import { selectUser } from '../features/userSlice'

function Chat({ photo }) {
  const user = useSelector(selectUser)
  const chatName = useSelector(selectChatName)
  const chatId = useSelector(selectChatId)
  

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (chatId) {
      db.collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => (
        setMessages(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
          }))
        )
      ))
    }
  }, [chatId])
  console.log(messages)

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('chats').doc(chatId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
      uid: user.uid

    })
    setInput('')
  }
  return (
    <div className='chat'>
      
      
      <div className="chat__header">
        <div className="chat__headerLeft">
          <IconButton>
            <Avatar src={chatId ? (messages[0]?.data.photo) : user.photo}/>
          </IconButton>
            {chatId ? (
            <h4>To: {chatName}</h4>
          ) : (
            <h4>{user.displayName}</h4>
          )}
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </div>
      </div>

      
        {chatId ? (
          <div className="chat__body">
              <div className="chat__bodyMessage">
              {messages.map(({ id, data}) => (
                <Message key={id} contents={data}/>
              ))}
              </div>
          </div>
        ) : (
          <div className="chat__bodyNoId">
            <div className="chat__bodyNoIdContainer">
              <img src={bkg} alt=""/>
              <p>Thanks for joining WhatsHappennin!</p>
              <p>Join an existing chat room or create one yourself by clicking the plus icon.</p>
              <p>Have fun!</p>
            </div>
          </div>
        )}
        


      <div className="chat__footer">
        <IconButton>
          <EmojiEmotions />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <div className="chat__input">
          <form>
            <div className="chat__inputContainer">
              <input value={input} onChange={e => setInput(e.target.value)} placeholder='Type a message' type="text"/>
              <button onClick={sendMessage} type='submit'></button>
            </div>
          </form>
        </div>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
