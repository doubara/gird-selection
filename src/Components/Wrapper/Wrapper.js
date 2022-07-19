import React, {useState, useEffect, useRef} from 'react';
import style from './Wrapper.module.css';

const Wrapper = (props) =>{
    //holds state for mouse click event. this state is used to set the width of our selector is App.js component
    const [mouseClicked, setMouseClicked] = useState(false)
    //selects the DOM element of our component pn which getBoundingClientRect() is applied on
    const wrapperRef = useRef();
    //passes the dimensions over to app to be used in gridCell.js component
    useEffect(()=>{
        props.updateDimensions({height: wrapperRef.current.getBoundingClientRect().height, width: wrapperRef.current.getBoundingClientRect().width});
    }, [])
    const dragSelector = (event) =>{
        setMouseClicked(true);
        props.onMouseRegistered(true);
        props.cordinates(event.clientX, event.clientY);
    }

    return <div 
    onClick={dragSelector}
    className={`${style.wrapper}`}
    ref={wrapperRef}>{props.children}</div>
}
export default Wrapper;