import { Avatar } from '@material-ui/core'
import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../css/Message.css'
import { selectUser } from '../features/userSlice';
import me from '../images/me.jpg'
import time from '../util'


const Message = forwardRef(({ id, contents: {
  timestamp, displayName, message, photo, email, uid
} }, ref) => {
  const user = useSelector(selectUser)
  return (
    <div ref={ref} className={`message ${user.email === email && 'message__sender'}`}>
      <Avatar className='message__photo' src={photo} />
      <small className={`message__name ${user.email === email && 'sender__name'}`}>{displayName}</small>
      <p>{message}</p>
      <small className={`message__timestamp ${user.email === email && 'sender__timestamp'}`}>{time(timestamp)}</small>
    </div>
  )
})

export default Message
