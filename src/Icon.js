import React from 'react'

const Icon = ({iconSrc, altName, id, dragStart, dragEnd})=>{

  return(
    <img 
      src={iconSrc}  
      alt={altName}
      draggable={true}
      id={id}
      className="icon" 
      width="45" 
      height="45"
      onDragStart={dragStart} 
      onDragEnd={dragEnd}>
  </img>
  )
}

export default Icon