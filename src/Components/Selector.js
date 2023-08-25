import style from './Selector.module.css'
import {useState, useRef, useEffect} from 'react';

//component for creating a selection area
//this component is rendered in App.js component
const Selector = (props) =>{
    //this state holds the dimensions pf the selector, such as the distatnce between the selector top line of top page (x), the distance between the selector bottom line and the bottom of our page(y), the height and width of the selector
    //this data is used in ridCell.js  component to determine whether a component is within the selsction area
    const [selectorDimensions, setSelectorDimensions] = useState({width: 0, height: 0});
    
    //useRef returns a DOM element in reference to our selector div. this is what we used to apply the getBoundingCLientRect() method  in other to get the dimensions of the element
    const selectorRef = useRef();
    //this use effect code which renders once after component mouths and repeatedly for every change in the dependecy props.width is used to update the selector dimension state
    useEffect(()=>{
        // props.updateDimensions(selectorRef.current.getBoundingClientRect().y)
        const dimension = selectorRef.current.getBoundingClientRect()
        setSelectorDimensions({x: dimension.x, y: dimension.y, width: dimension.width, 
        height: dimension.height})
    }, [props.width])
     //the use effect code which renders once after component mouths and repeatedly for every change in the dependecy {height and width of selector} is used to pass the selector dimension state up to our application. updating was done seperatly from passing on the data because more data was sent than was updated(x2, y2),
    useEffect(()=>{

        props.passBorderObj({x1: selectorDimensions.x, x2: props.wrapperRect.width - (selectorDimensions.x + selectorDimensions.width), y1: selectorDimensions.y, y2: props.wrapperRect.height - (selectorDimensions.y + selectorDimensions.height)})
    }, [selectorDimensions.height, selectorDimensions.width])
    return (
        <div 
        className={style.selector} 
        style={{width: `${props.width}px`, height: `${props.height}px`, top: `${props.top}px`, left: `${props.left}px`}}
        ref={selectorRef}></div>
    )
}

export default Selector;