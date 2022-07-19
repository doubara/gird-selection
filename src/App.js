import style from './App.module.css';
import Wrapper from './Components/Wrapper/Wrapper';
import GridCell from './Components/GridCell/GridCell';
import {useState, useEffect} from 'react';
import Selector from './Components/Selector';

function App() {
  //holds the state for the dimensions of our selector
  const [dimensions, setDimensions] = useState({x:0, y:0});
  //holds the x, y values used for setting the starting position of our selector
  const [positionData, setPositionData] = useState({x: 0, y: 0});
  //holds the initial x, y vaalue of our data. this is used to compute the selector width and height
  const [holdDimensions, setHoldDimensions] = useState({});
  //checks for a mouse click event
  const [isClicked, setIsClicked] = useState(false)
  //stores the selector boundin g client rect value
  const [selectorRect, setSelectorRect] = useState({});
  //holds the wrapper  bounding client rect value
  const [wrapperRect, setWrapperRect] = useState({});
  //holds wrapper dimensions
  const [borderObj, setBorderObj] = useState({});


  const setSelectorDimensions = (clientx, clienty) =>{
    if (!isClicked){
      // if the user is clikcing for the first time
      //the selector box should be a 1px by 1px square box
      setDimensions({x: 1, y: 1});
      //the selector box should start at the place where the mouse was clicked
      setPositionData({x: clientx, y: clienty});
      //hold the initial x, y values of the mouse in order to compute the width and height of the selector
      setHoldDimensions({x: clientx, y: clienty});
      return
    }
    if (clientx < holdDimensions.x){
      // setHoldDimensions({x: clientx, y: clienty})
      setIsClicked(false);
    }
    setDimensions({x: clientx-holdDimensions.x, y: clienty-holdDimensions.y})
    // setIsClicked(false);
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
      onMouseRegistered={(data)=>{setIsClicked(data)}} 
      cordinates={setSelectorDimensions}
      updateDimensions={updateWrapperRect}>
        <Selector 
        width={dimensions.x} 
        height={dimensions.y}
        top={positionData.y}
        left={positionData.x}
        updateDimensions={updateSelectorRect}
        wrapperRect={wrapperRect}
        passBorderObj={recieveBorderObj}></Selector>

        <div className={`${style.grid}`}>
          {new Array(100).fill(1).map((value, index)=>{
            return <GridCell 
            borderObj={borderObj} 
            key={`${index}`}
            wrapperRect={wrapperRect}
            isClicked={isClicked}></GridCell>
          })}
        </div>
      </Wrapper>
    </div>
  );
}

export default App;
