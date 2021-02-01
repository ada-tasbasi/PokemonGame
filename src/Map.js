import React, {useState, useEffect, Fragment} from 'react'
import { MapContainer, TileLayer} from 'react-leaflet'
import DraggableMarker from './DraggableMarker'
import MouseOver from './MouseOver'
import './Map.css'
import {useSelector, useDispatch} from 'react-redux'

const Map = () =>{
  const markerList = useSelector(state=>state.markerList)
  const [callParent, callParentComp] = useState(false);
  useEffect(()=>{callParentComp(false)}, [callParent])
  
  return(
    <MapContainer 
    center={[51.505, -0.09]}
    zoom={5}
    scrollWheelZoom={true}
    id="map">
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MouseOver callBack={callParentComp}/>
    {markerList.length>0&&markerList.map((marker)=>(
      !marker.noInput&&
      <Fragment key={marker.icon.concat(markerList.indexOf(marker))}>
        <DraggableMarker icon = {marker.icon} pos= {marker.pos} pokeId = {marker.id} faction = {marker.faction}/>
      </Fragment>
    )
    )}
    </MapContainer>
  )
}
export default Map


