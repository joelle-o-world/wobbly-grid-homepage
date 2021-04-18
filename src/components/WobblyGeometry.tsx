import React, {createContext, ReactNode, useContext, useRef, useState} from 'react';
import {FunctionComponent} from 'react';
import useElementPosition from '../hooks/useElementPosition';

import {useRelativeMousePosition} from '../hooks/useMousePosition'

const sq = (x: number) => x * x

export interface Coordinate {
  x: number;
  y: number;
}

const RainbowPattern = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
];

const WobblyContext = createContext({
  //bulgeFocus: {x:0, y:0},
  //bulgeSize: 0,
  //mapX: (x:number) => x,
  //mapY: (y: number) => y,
  mapPoint: (x:number, y:number) => ({x,y}),
  bulgeX: 0,
  bulgeY: 0,
})

export interface WobblyGeometryProps {
  bulgeSize?: number;
}

export const WobblyGeometry: FunctionComponent<WobblyGeometryProps> = ({
  children,
  bulgeSize=500,
}) => {

  let svgRef = useRef(null)
  let {mouseX, mouseY} = useRelativeMousePosition(svgRef)
  let svgRect = useElementPosition(svgRef)
  let viewBox = `0 0 ${svgRect.elementWidth} ${svgRect.elementHeight}`;

  const mapPoint = (x:number, y:number) => {
    let diffX = mouseX - x;
    let diffY = mouseY - y;
    let dist = Math.sqrt(diffX*diffX + diffY*diffY)
    return {
      x: x - (bulgeSize / (dist+50)) * (mouseX - x),
      y: y - (bulgeSize / (dist+50)) * (mouseY - y),
    }
  }

  const contextValue = {
    //bulgeFocus,
    //bulgeSize,
    //mapX,
    //mapY,
    bulgeX: mouseX,
    bulgeY: mouseY,
    mapPoint,
  }

  return <div className="WobblyGeometry">
    <svg className="WobblyGeometrySVG" ref={svgRef} viewBox={viewBox}>
      <WobblyContext.Provider value={contextValue}>
        {children}
      </WobblyContext.Provider>
    </svg>
  </div>
};

export interface WobblyRectContent {
  label?: string;
  preview?: ReactNode;
  bgcolor?: string;
  textColor?: string;
}

export const WobblyRect: FunctionComponent<{
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  preview?: ReactNode;
  showPreview?: boolean;
  style?: React.CSSProperties;
  bgcolor?: string;
  textColor?: string
}> = ({
  x, 
  y, 
  width, 
  height, 
  style,  
  label, 
  preview, 
  showPreview=false, 
  bgcolor='white', 
  textColor="black"
}) => {
  const {mapPoint} = useContext(WobblyContext);

  let a = mapPoint(x, y);
  let b = mapPoint(x+width, y);
  let c = mapPoint(x+width, y+height);
  let d = mapPoint(x, y+height);

  let points = `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`

  const padding = 15;
  let overlay: ReactNode;
  if(showPreview && preview) {
    let foX = Math.max(a.x, d.x) + padding;
    let foY = Math.max(a.y, b.y) + padding;
    let foWidth = Math.min(b.x, c.x) - foX - padding
    let foHeight = Math.min(c.y, d.y) - foY - padding
    overlay = <foreignObject 
      x={foX} 
      y={foY} 
      width={foWidth} 
      height={foHeight}
      style={{
        color: textColor,
      }}
    >
      {preview}
    </foreignObject>
  } else {
    let pathId = 'p'+String(Math.random())
    let x1 = (a.x+d.x)/2 + padding
    let y1 = (a.y+d.y)/2 
    let x2 = (b.x+c.x)/2 - padding
    let y2 = (b.y+c.y)/2
    let labelPath = `M${x1},${y1} L${x2},${y2}`
    let labelLength = Math.sqrt(sq(x2-x1) + sq(y2-y1))

    overlay = <text>
      <path 
        id={pathId} 
        d={labelPath}
      />
      <textPath 
        href={'#'+pathId} 
        textLength={labelLength} 
        lengthAdjust="spacingAndGlyphs" 
        className="WobblyRectLabel"
        fill={textColor}
      >{label}</textPath>
    </text>
  }

  return <g 
    className="WobblyRect" 
  >
    <polygon points={points} style={style} fill={bgcolor} />

    {overlay}
    
  </g>

}

export const WobblyGrid: FunctionComponent<{
  rows: number;
  cols: number;
  width: number;
  height: number;
  pattern?: string[];
  x?:number;
  y?:number;
  content?: {[key:number]: WobblyRectContent};
}> = ({
  pattern=RainbowPattern, 
  rows, 
  cols, 
  width, 
  height,
  x=0,
  y=0,
  content=[],
}) => {

  const cellWidth = width / cols;
  const cellHeight = height / rows;

  let cells:ReactNode[] = [];

  const {bulgeX, bulgeY} = useContext(WobblyContext)
  let focusCol = Math.floor((bulgeX-x) / cellWidth);
  let focusRow = Math.floor((bulgeY-y) / cellHeight);
  let focusCell = focusCol + focusRow * cols

  let n = rows * cols;
  for(let i=0; i < n; ++i) {
    let col = i % cols;
    let row = Math.floor(i / cols)
    let cellX = x + cellWidth * col;
    let cellY = y + cellHeight * row;
    let label = content[i] ? content[i].label : undefined
    let preview = content[i] ? content[i].preview : null
    const showPreview = preview !== null && (focusCell === i)
    const bgcolor = content[i] ? (content[i].bgcolor || pattern[i%pattern.length]) : pattern[i%pattern.length];
    const textColor = content[i] ? content[i].textColor : undefined;
    cells.push(
      <WobblyRect x={cellX} y={cellY} width={cellWidth} height={cellHeight} bgcolor={bgcolor} textColor={textColor} key={i} label={label} showPreview={showPreview} preview={preview}>
      </WobblyRect>
    )

  }

  return <g> {cells} </g>
}
