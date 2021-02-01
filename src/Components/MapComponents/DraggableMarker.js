import React, {useState, useRef, useMemo} from 'react'
import {Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import {useSelector, useDispatch} from 'react-redux'
import {setPokemonStats, setMarkerList, setTurnInfo, setMessage ,setAttackMode, setAttacker, setDefender} from '../../actions'

const nameList = ["Charmander", "Bullbasaur", "Eevee", "Psyduck", "Snorlax", "Meowth"]


const DraggableMarker = ({icon, pos, pokeId, faction}) =>{

  const pokemonStats = useSelector(state=>state.pokemonStats)
  const markerList = useSelector(state=>state.markerList)
  const turnInfo = useSelector(state=>state.turnInfo)
  const simIsStarted = useSelector(state=>state.simIsStarted)
  const attackMode = useSelector(state=>state.attackMode)
  const combaters = useSelector(state=>state.combaters)
  const [iconPos, setIconPos] = useState(pos);  
  const [hpVal, setHpVal] = useState(0);  
  const [atkVal, setAtkVal] = useState(0);  
  const [defVal, setDefVal] = useState(0);
  const dispatch = useDispatch()  
  const [valueInputsDone, setValueInputsDone] = useState(false); 
  const [markerDraggable, setMarkerDraggable] = useState(false); 
  const markerRef = useRef(null)

  const markerIcon = L.icon({
    iconUrl: icon,
    iconSize:     [45, 45], 
    iconAnchor:   [22, 45], 
    popupAnchor:  [-3, -76] 
  });

  const setNoInput = ()=>{
    if(!valueInputsDone){
      const newArr = markerList.map(item=>{
        if(item.id === pokeId){
          item.noInput = true
        }
        return item
      })
      dispatch(setMarkerList(newArr))
    }
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        let oldPos
        if (marker != null) {
          setIconPos(marker.getLatLng())
          if(pokemonStats.length>0){
            pokemonStats.map((item)=>{
              if(item.id === pokeId){
                oldPos = item.position
                item.position = marker.getLatLng()
              }
              dispatch(setMessage(`${nameList[pokeId-1]} moved from ${oldPos} to ${item.position}`))
              return item
            })
            dispatch(setPokemonStats(pokemonStats))
          }
          setMarkerDraggable(false)
        }
      },
      add() {
        const marker = markerRef.current
        if (marker != null) {
          marker.openPopup()
        }
      },
    }),
    [],
  )

  const handleChange = (e) =>{
    const input = e.target.value > 0? e.target.value : 0
    const val = parseInt(input, 10)
    switch (e.target.name) {
      case "HealthPoints":
        setHpVal(val)
        break;
      case "AtkPower":
        setAtkVal(val)
        break;
      case "DefPower":
        setDefVal(val)
        break;
    
      default:
        break;
    }
 
  }

  const handleMove = ()=>{
    if(turnInfo.faction === faction){
      dispatch(setTurnInfo())
      setMarkerDraggable(true)
    }else if(attackMode){
      dispatch(setMessage("You can't move during an incomplete attack order!"))
    }else{
      dispatch(setMessage("It's not this factions's turn!"))
    }
    const marker = markerRef.current
    marker.closePopup()
  }

  const handleAttack = () =>{
    if(turnInfo.faction === faction){
      dispatch(setAttacker({id:pokeId, faction}))
      dispatch(setAttackMode(true))
      const markers = document.getElementsByClassName("leaflet-marker-icon")
      for (let i = 0; i < markers.length; i++) {
        const marker = markerList.find(el=> el.icon == markers[i].src);
        if(!(marker.icon === icon||marker.faction === faction)){
          markers[i].style.border = "red solid 2px"
        }
      }
      dispatch(setTurnInfo())
    }else{
      dispatch(setMessage("It's not this factions's turn!"))
    }
  }

  const handleAttackOrder = () =>{
    dispatch(setDefender({id:pokeId, faction}))
    const markers = document.getElementsByClassName("leaflet-marker-icon")
    for (let i = 0; i < markers.length; i++) {
      const marker = markers[i];
      marker.style.border = "none"
    }
    const attacker = pokemonStats.find((el) =>el.id === combaters.attacker.id)
    const defender = pokemonStats.find((el) =>el.id === combaters.defender.id)
    const distance = Math.abs(attacker.position.lat - defender.position.lat) + Math.abs(attacker.position.lng - defender.position.lng)
    const damageDealt = attacker.atk*2 - (defender.def-Math.floor(distance/20))
    const damageReceived = (defender.atk*2+Math.floor(distance/20)) - attacker.def
    defender.hp = defender.hp - damageDealt
    attacker.hp  = attacker.hp - damageReceived
    const newStats = pokemonStats
    newStats.map((el)=>{
      if(el.id === attacker.id){
        el = attacker
      }else if(el.id === defender.id){
        el = defender
      }
      return el
    })
    dispatch(setMessage(`${nameList[attacker.id-1]} attacked ${nameList[defender.id-1]}, received ${damageReceived}HP damage, dealt ${damageDealt}HP damage to its opponent. `))
    setHpVal(hpVal)
    dispatch(setPokemonStats(newStats))
    const faction1 = pokemonStats.filter(el=>el.faction === 1)
    const faction2 = pokemonStats.filter(el=>el.faction === 2)
    if(faction1.every((el)=>el.hp<=0)){
      dispatch(setMessage("Faction 2 has Won!!!"))
    }
    if(faction2.every((el)=>el.hp<=0)){
      dispatch(setMessage("Faction 1 has Won!!!"))
    }
    if(faction2.every((el)=>el.hp<=0)&&faction1.every((el)=>el.hp<=0)){
      dispatch(setMessage("It's a draw!!!"))
    }
    dispatch(setAttackMode(false))
  }

  const buttonClick = () => {
    if(hpVal>0&&atkVal>0&&defVal>0){
      const marker = markerRef.current
      pokemonStats.push({id:pokeId, hp:hpVal, atk: atkVal, def:defVal, position:marker.getLatLng(), faction, inputsDone:true})
      setValueInputsDone(true)
      dispatch(setPokemonStats(pokemonStats))
    }else{
      dispatch(setMessage("Please set all stats above 0!"))
    }
  }

  const closeBtn = ()=>{
    const marker = markerRef.current
    marker.closePopup()

  }

  return (
    (!valueInputsDone||(pokemonStats.find((el) =>el.id === pokeId)).hp>0)&&<Marker
      icon ={markerIcon}
      draggable = {markerDraggable}
      eventHandlers={eventHandlers}
      position={iconPos}
      ref={markerRef}>
        {valueInputsDone?
        (<Popup>
          <div id="pokeStats">
            <span id="closeBtn" onClick={closeBtn}>X</span>
            <p>Health Points:{(pokemonStats.find((el) =>el.id === pokeId)).hp}</p>
            <p>Attack Power:{atkVal}</p>
            <p>Defense Power:{defVal}</p>
            {attackMode&&!(pokeId == combaters.attacker.id)&&!(faction == combaters.attacker.faction)?
            <div id ="orderBtns">
              <button onClick={handleAttackOrder}>Attack This Pokemon!</button>
              </div> :  
              simIsStarted&&<div id ="orderBtns">
                <button className = "popBtn" onClick={handleMove}>Move</button>      
                <button className = "popBtn" onClick={handleAttack}>Attack</button>   
              </div>}
          </div>
        </Popup>):
        (<Popup 
         closeButton = {false}
         autoClose = {false}
         onClose={setNoInput}
         className="pop">
          <h3>Please enter the stats for your Pokemon</h3>
          <label>Health Points
          <input type="number" id="hp" name="HealthPoints" onChange={handleChange} value={hpVal}/>
          </label><br/>
          <label>Attack Power
          <input type="number" id="atk" name="AtkPower" onChange={handleChange} value={atkVal}/>
          </label><br/>
          <label>Defense Power
          <input type="number" id="def" name="DefPower" onChange={handleChange} value={defVal}/>
          </label><br/>
          <button className = "popBtn" id="subBtn" onClick={buttonClick}>Submit Stats</button>
        </Popup>)
       }
    </Marker>
  )
}

export default DraggableMarker
