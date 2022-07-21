import React, {useRef, useEffect, useState} from 'react';
import style from './GridCell.module.css'

//This component renders a grid cell
const GridCell = (props) => {
    //This state holds the grid cell dimensions
    const [cellDimensions, setCellDimensions] = useState({});

    //This state holds a boolean whcih is used to color the grid cells blue when selected
    const [selected, setSelected] = useState(false);
    
    //useRef returns a DOM element in reference to our rendered cell. this is what we use to apply the getBoundingCLientRect() method  in other to get the dimensions of each cell
    const gridRef = useRef();

    //
    useEffect(()=>{
        const gridObj = gridRef.current.getBoundingClientRect()
        //updates our cell dimension state
        setCellDimensions(
            {x1: gridObj.x, 
            x2: props.wrapperRect.width - (gridObj.x + gridObj.width),
            y2: props.wrapperRect.height - (gridObj.y + gridObj.height),
            y1: gridObj.y, 
            width: gridObj.width, 
            height: gridObj.height})

        //check to see if the cell is inside the selected area
        if ((props.borderObj.x1 <= cellDimensions.x1 && props.borderObj.x2 <= cellDimensions.x2) && (props.borderObj.y1 <= cellDimensions.y1 && props.borderObj.y2 <= cellDimensions.y2)){
            //update selected state to color the boxes
            setSelected(true);
        }
        //removes previously selected cells when new cells are selected
        return ()=> setSelected(false);
    }, [props.borderObj])
    return <div className={`${selected ? style.highlight : ''} ${style.grid__cell}`} ref={gridRef}></div>;
}

export default GridCell;