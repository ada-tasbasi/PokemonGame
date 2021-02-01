import {useSelector, useDispatch} from 'react-redux'
import {changeIsDragging, setMarkerList} from '../../actions'
import {useMapEvents} from 'react-leaflet'

const  MouseOver = ({callBack})=> {
  const isDragging = useSelector(state=>state.isDragging)
  const draggedPoke= useSelector(state=>state.draggedPoke)
  const markerList = useSelector(state=>state.markerList)
  const dispatch = useDispatch()

  const map = useMapEvents({
    mouseover: (e) => {
      if(isDragging){
        const currentMarkers = markerList.filter(item=>item.id !== draggedPoke.id)
        const position = {lat:e.latlng.lat-0.5, lng: e.latlng.lng+0.1}
        currentMarkers.push({icon:draggedPoke.icon, pos:position, id:draggedPoke.id, faction:draggedPoke.faction, noInput:false})
        dispatch(setMarkerList(currentMarkers))
        callBack(true)
      }
      dispatch(changeIsDragging(false))

    },
  })
  return null
}

export default MouseOver