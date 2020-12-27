import React, { useEffect, useState } from 'react'
import '../css/Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core'
import { DonutLarge, Add, MoreHoriz, SearchOutlined } from '@material-ui/icons'
import me from '../images/me.jpg'
import SidebarChat from './SidebarChat'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import db, { auth } from '../firebase'
 

function Sidebar() {
  const user = useSelector(selectUser)
  const [chats, setChats] = useState([])

  useEffect(() => {
    db.collection('chats').onSnapshot(snapshot => (
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }))) // when something in the database collection of chats changes, we receive a snapshot and chats is updated
    ))
  }, [])

  const addChat = () => {
    const chatName = prompt('Please enter a chat name');

    if (chatName) {
      db.collection('chats').add({
      chatName: chatName,
      })
    }
  }
  return (
    <div className='sidebar'>
      <div className="sidebar__header">
        <IconButton>
          <Avatar src={user.photo} onClick={() => auth.signOut()}/>
        </IconButton>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Add onClick={addChat}/>
          </IconButton>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder='Search or start a new chat' type="text"/>
        </div>
      </div>
      <div className="sidebar__sidebarChat">
        {chats.map(({id, data: { chatName }})=> (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
