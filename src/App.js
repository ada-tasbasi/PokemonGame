import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import Toolbox from './Components/Toolbox'
import Map from './Components/MapComponents/Map'
import MessageWindow from './Components/MessageWindow'
import charmander from './assets/charmander.png'
import bullbasaur from './assets/bullbasaur.png'
import eevee from './assets/eevee.png'
import psyduck from './assets/psyduck.png'
import snorlax from './assets/snorlax.png'
import meowth from './assets/meowth.png'

const icons = [
  {id:1, name:"charmander", img:charmander, faction:1},
  {id:2, name:"bullbasaur", img:bullbasaur, faction:1},
  {id:3, name:"eevee", img:eevee, faction:1},
  {id:4, name:"psyduck", img:psyduck, faction:2},
  {id:5, name:"snorlax", img:snorlax, faction:2},
  {id:6, name:"meowth", img:meowth, faction:2}
]


const App = () => {

  const simIsStarted = useSelector(state=>state.simIsStarted)

  useEffect(()=>{document.addEventListener('dragover', (e)=>{e.preventDefault()})}, [])

  return (
    <div id="container">
    {!simIsStarted&&<Toolbox iconList={icons} />}
    <div id="test">
      <Map />
      <MessageWindow/>
    </div>
    </div>
  );
}

export default App;
