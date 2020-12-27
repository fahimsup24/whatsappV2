import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/SidebarChat.css'
import me from '../images/me.jpg'
import { setChat } from '../features/chatSlice'
import db from '../firebase'
import { selectUser, userSlice } from '../features/userSlice'
import time from '../util'
import * as timeago from 'timeago.js'


function SidebarChat({ id, chatName }) {
  const user = useSelector(selectUser)

  const [chatInfo, setChatInfo] = useState('')
  const dispatch = useDispatch('')

  useEffect(() => {
    db.collection('chats').doc(id).collection('messages')
    .orderBy('timestamp', 'desc').onSnapshot(snapshot => (
      setChatInfo(snapshot.docs.map(doc => doc.data()
      ))
    ))
  }, [id])
  return (
    <div onClick={() => {
      dispatch(setChat({
        chatId: id,
        chatName: chatName,
      }))
    }} className='sidebarChat'>
      <Avatar style={{ height: '50px', width: '50px' }} src={chatInfo[0]?.photo}/>
      <div className="sidebarChat__info">
        <h3 className="name">{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
      </div>
      <p className='sidebarChat__time'>{timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}</p>
    </div>
  )
}

export default SidebarChat
