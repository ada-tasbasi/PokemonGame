import { combineReducers } from "redux";

const isDragging = (state = false, action) => {
  switch (action.type) {
    case "DRAGGING":
      return action.payload;
    default:
      return state;
  }
};

const isDraggable = (state = false, action) => {
  switch (action.type) {
    case "MOVEOPTION":
      return action.payload;
    default:
      return state;
  }
};
const draggedPoke = (state = {}, action) => {
  switch (action.type) {
    case "DRAGICON":
      return action.payload;
    default:
      return state;
  }
};
const iconPosition = (state = "", action) => {
  switch (action.type) {
    case "ICONPOS":
      return action.payload;
    default:
      return state;
  }
};
const markerList = (state = [], action) => {
  switch (action.type) {
    case "MARKERS":
      return action.payload;
    default:
      return state;
  }
};
const pokemonStats = (state = [], action) => {
  switch (action.type) {
    case "STATS":
      return action.payload;
    default:
      return state;
  }
};
const simIsStarted = (state = false, action) => {
  switch (action.type) {
    case "SIMSTART":
      return action.payload;
    default:
      return state;
  }
};
const turnInfo = (state = {faction:1, actions:2}, action) => {
  switch (action.type) {
    case "TURN":
      const turn = state.actions === 1?{faction:-(state.faction-3), actions:2}:{faction:state.faction, actions:state.actions-1} 
      return turn;
    default:
      return state;
  }
};
const message = (state = "Drag & Drop Pokemons to the map and set their stats to start simulation.", action) => {
  switch (action.type) {
    case "MESSAGE":
      return action.payload;
    default:
      return state;
  }
};
const attackMode = (state = false, action) => {
  switch (action.type) {
    case "ATTACKMODE":
      return action.payload;
    default:
      return state;
  }
};
const combaters = (state = {}, action) => {
  const combaters = state
  switch (action.type) {
    case "ATTACKER":
      combaters.attacker = action.payload
      return combaters;
    case "DEFENDER":
      combaters.defender = action.payload
      return combaters;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  isDragging,
  isDraggable,
  draggedPoke,
  iconPosition,
  pokemonStats,
  simIsStarted,
  turnInfo,
  message,
  attackMode,
  combaters,
  markerList
})

export default allReducers
