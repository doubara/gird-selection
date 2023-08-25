import React, {useEffect, useRef} from 'react';
import style from './Wrapper.module.css';

const Wrapper = (props) =>{
    const wrapperRef = useRef();
    //passes the dimensions over to app to be used in gridCell.js component
    useEffect(()=>{
        props.updateDimensions({height: wrapperRef.current.getBoundingClientRect().height, width: wrapperRef.current.getBoundingClientRect().width});
    }, [])
    const dragSelector = (event) =>{
        props.cordinates(event.clientX, event.clientY);
    }

    return <div 
    onClick={dragSelector}
    className={`${style.wrapper}`}
    ref={wrapperRef}>{props.children}</div>
}
export default Wrapper;