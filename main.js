  //importing components
import { Map } from "./map.js";
import { bars} from "./count_race.js"
import {bars_pop} from "./count_pop.js"
import {bars_m} from './mari_count.js'

let map, count_race, pop_race, mari_race;

// global state
let state = {
  geojson: null,
  arrests: null,
  count_race: null,
  pop_race: null,
  mari_race: null,
  grade_selected: null,
  rating_selected: null
};


Promise.all([
  d3.csv("NYPD_Arrest_Data.csv", d3.autoType),
  d3.csv("count_race.csv",d3.autoType),
  d3.csv("pop_count.csv",d3.autoType),
  d3.csv("mari_race.csv", d3.autoType)
]).then(([arrests,count_race, pop_race, mari_race]) => {
  // + SET STATE WITH DATA
  state.arrests = arrests;
  state.count_race = count_race;
  state.pop_race = pop_race;
  state.mari_race = mari_race;
  console.log("state: ", state);
  init();
});


function init() {
  map = new Map(state, setGlobalState)
  count_race = new bars(state, setGlobalState)
  pop_race = new bars_pop(state,setGlobalState)
  mari_race = new bars_m(state,setGlobalState)
  draw();
}


 //yellow CDAA59
      //blue 2D5781
      //ornage D3381B
      //light orange F78D5C

function draw() {
  map.draw(state,setGlobalState);
  count_race.draw(state,setGlobalState)
  pop_race.draw(state,setGlobalState)
  mari_race.draw(state,setGlobalState)
  // barA.draw(state, setGlobalState)
  // barB.draw(state, setGlobalState)
  // barC.draw(state, setGlobalState)
  // barP.draw(state, setGlobalState)
  console.log("called")
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}

