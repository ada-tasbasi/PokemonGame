import React, {useState, useEffect} from 'react'
import Icon from './Icon'
import './Toolbox.css'
import {useSelector, useDispatch} from 'react-redux'
import {changeIsDragging, setDraggedPoke, setSimStart, setMessage} from './actions'

const Toolbox = ({iconList}) =>{

  const markerList = useSelector(state=>state.markerList)
  const pokemonStats = useSelector(state=>state.pokemonStats)
  const dispatch = useDispatch()
  const [validDrop, setValidDrop] = useState(true);

  const dragStart = (e) =>{
    setValidDrop(true)
    e.target.style.opacity = "0.4";
    const targetFaction = iconList.find(icon=>icon.id == e.target.id).faction 
    dispatch(changeIsDragging(true))
    dispatch(setDraggedPoke({icon:e.target.src, id:e.target.id, faction:targetFaction}))
  }

useEffect(()=>{
  markerList.forEach(elem => {
    if(elem.noInput){
      const element = document.getElementById(elem.id)
      element.style.visibility = "visible"
      element.style.opacity = "1"
    }
  });
}, [markerList])

  const dragEnd = (e)=>{
    if(validDrop){
      e.target.style.visibility = "hidden"
    }else{
      e.target.style.opacity = "1";
    }
  }

  const toolBoxDrop = () =>{
    setValidDrop(false)
    dispatch(changeIsDragging(false))
  }

  const handleSimulation = ()=>{
    if(pokemonStats.find(poke => poke.faction === 1)&&pokemonStats.find(poke => poke.faction === 2)){
      dispatch(setSimStart(true))
      dispatch(setMessage("You can now order your Pokemons to attack or move. Each Faction can perform 2 actions per turn."))
    }else{
      alert("You need at least 1 Pokemon from each faction to start!")
    }
  }

  return(
    <div id="ToolboxContainer" onDrop={toolBoxDrop}>
      <div className="row">
        <h3>Magicthorn League</h3>
        <div className="icons"> 
        {iconList.map((icon)=>(
        icon.faction === 1&&<Icon 
          key={icon.id} 
          id = {icon.id} 
          iconSrc = {icon.img} 
          altName={icon.name}
          dragStart={dragStart} 
          dragEnd={dragEnd} />
        ))} 
        </div>
      </div>
      <button id="startBtn" onClick={handleSimulation}>Start Simulation</button>
      <div className="row">
      <h3>Steelvale Alliance</h3>
      <div className="icons"> 
        {iconList.map((icon)=>(
        icon.faction === 2&&<Icon 
          key={icon.id} 
          id = {icon.id} 
          iconSrc = {icon.img} 
          altName={icon.name}
          dragStart={dragStart} 
          dragEnd={dragEnd} />
        ))} 
        </div>    
      </div>
    </div>
  )
}

export default Toolbox