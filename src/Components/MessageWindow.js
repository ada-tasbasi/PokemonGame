import React from 'react'
import {useSelector} from 'react-redux'

const MessageWindow = () =>{
  const message = useSelector(state=>state.message)

  return(
    <div id="msgWindow">
      <p id="msgTxt">{message}</p>
    </div>
  )
}

export default MessageWindow