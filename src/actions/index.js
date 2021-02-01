export const changeIsDragging = (val) => {
  return {
    type: "DRAGGING",
    payload: val,
  };
};
export const changeIsDraggable = (val) => {
  return {
    type: "MOVEOPTION",
    payload: val,
  };
};
export const setDraggedPoke = (info) => {
  return {
    type: "DRAGICON",
    payload: info,
  };
};
export const setIconPos = (pos) => {
  return {
    type: "ICONPOS",
    payload: pos,
  };
};
export const setMarkerList = (markers) => {
  return {
    type: "MARKERS",
    payload:markers,
  };
};
export const setPokemonStats = (stats) => {
  return {
    type: "STATS",
    payload:stats,
  };
};
export const setSimStart = (val) => {
  return {
    type: "SIMSTART",
    payload:val,
  };
};
export const setTurnInfo = () => {
  return {
    type: "TURN",
  };
};
export const setMessage = (val) => {
  return {
    type: "MESSAGE",
    payload:val,
  };
};

export const setAttackMode = (val) => {
  return {
    type: "ATTACKMODE",
    payload:val,
  };
};
export const setAttacker = (val) => {
  return {
    type: "ATTACKER",
    payload:val,
  };
};
export const setDefender = (val) => {
  return {
    type: "DEFENDER",
    payload:val,
  };
};
