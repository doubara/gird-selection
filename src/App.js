import style from './App.module.css';
import Wrapper from './Components/Wrapper/Wrapper';
import GridCell from './Components/GridCell/GridCell';
import {useState, useReducer} from 'react';
import Selector from './Components/Selector';

const reducerFunction = (state, action) =>{
  let newState = {};
  switch(action.type){
    case 'setDimensions':
      newState = {...state, dimensions: action.value}
      break
    case 'holdDimensions':
      newState = {...state, holdDimensions: action.value};
      break
    case 'positionData':
      newState = {...state, positionData: action.value};
      break
    case 'isClicked':
      newState = {...state, isClicked: action.value};
      break
    default:
      throw new Error('invalid action');
  }
  return newState;
}
function App() {
  //adding a reducer to handle multiple states
  const initialAppState = {
    dimensions: {x: 1, y: 1}, 
    positionData: {x: 0, y: 0},
    holdDimensions: {},
    isClicked: false,
  }
  const [appState, appDispatch] = useReducer(reducerFunction, initialAppState);
  //stores the selector boundin g client rect value
  const [selectorRect, setSelectorRect] = useState({});
  //holds the wrapper  bounding client rect value
  const [wrapperRect, setWrapperRect] = useState({});
  //holds wrapper dimensions
  const [borderObj, setBorderObj] = useState({});


  const setSelectorDimensions = (clientx, clienty) =>{
    if (!appState.isClicked){
      appDispatch(
        {type: 'setDimensions',
        name: 'dimensions',
        value: {x: 1, y: 1}}
        );
      appDispatch(
        {type: 'positionData',
        name: 'positionData',
        value: {x: clientx, y: clienty}});
      appDispatch({
        type: 'holdDimensions',
        name: 'holdDimensions',
        value: {x: clientx, y: clienty}
      })
      appDispatch({
        type: 'isClicked',
        value: true,
      })
      console.log(appState)
      return
    }
    appDispatch({
      type: 'setDimensions',
      name: 'dimensions',
      value: {
        x: clientx-appState.holdDimensions.x, 
        y: clienty-appState.holdDimensions.y},
    })
    console.log(appState)
  }
  function updateWrapperRect(data){
    setWrapperRect(data);
  }
  function updateSelectorRect(data){
    setSelectorRect(data);
  }
  function recieveBorderObj(data){
    setBorderObj(data);
  }
  return (
    <div className={style.app}>
      <Wrapper
      cordinates={setSelectorDimensions}
      updateDimensions={updateWrapperRect}>
        <Selector 
        width={appState.dimensions.x} 
        height={appState.dimensions.y}
        top={appState.positionData.y}
        left={appState.positionData.x}
        updateDimensions={updateSelectorRect}
        wrapperRect={wrapperRect}
        passBorderObj={recieveBorderObj}></Selector>

        <div className={`${style.grid}`}>
          {new Array(100).fill(1).map((value, index)=>{
            return <GridCell 
            borderObj={borderObj} 
            key={`${index}`}
            wrapperRect={wrapperRect}
            isClicked={appState.isClicked}></GridCell>
          })}
        </div>
      </Wrapper>
    </div>
  );
}

export default App;
