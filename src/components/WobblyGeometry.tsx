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
  'indigo'
];

const WobblyContext = createContext({
  //bulgeFocus: {x:0, y:0},
  //bulgeSize: 0,
  //mapX: (x:number) => x,
  //mapY: (y: number) => y,
  mapPoint: (x:number, y:number) => ({x,y}),
  bulgeX: 0,
  bulgeY: 0,
  canvasWidth: 500,
  canvasHeight: 500,
})

export interface WobblyGeometryProps {
  bulgeSize?: number;
  diminishBulgeAtEdges?: boolean;
}

export const WobblyGeometry: FunctionComponent<WobblyGeometryProps> = ({
  children,
  diminishBulgeAtEdges=false,
  bulgeSize=500,
}) => {

  let svgRef = useRef(null)
  let {mouseX, mouseY} = useRelativeMousePosition(svgRef)
  let svgRect = useElementPosition(svgRef)
  let viewBox = `0 0 ${svgRect.elementWidth} ${svgRect.elementHeight}`;

  const mapPoint = diminishBulgeAtEdges
    ? (x: number, y: number) => {
      let edgeDist = Math.min(
        Math.abs(x), 
        Math.abs(y), 
        Math.abs(svgRect.elementWidth-x), 
        Math.abs(svgRect.elementHeight-y)
      )
      let diffX = mouseX - x;
      let diffY = mouseY - y;
      let dist = Math.sqrt(diffX*diffX + diffY*diffY)
      let b = (bulgeSize * (edgeDist/svgRect.elementHeight))
      return {
        x: x - (b / (dist+50)) * (mouseX - x),
        y: y - (b / (dist+50)) * (mouseY - y),
      }
    }
    : (x:number, y:number) => {
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
    canvasWidth: svgRect.elementWidth,
    canvasHeight: svgRect.elementHeight,
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
  hoverColor?: string;
  url?: string;
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
  hoverColor?: string;
  onClick?: (e:React.MouseEvent) => void;
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
  textColor="black",
  hoverColor,
  onClick,
}) => {
  const {mapPoint} = useContext(WobblyContext);

  let a = mapPoint(x, y);
  let b = mapPoint(x+width, y);
  let c = mapPoint(x+width, y+height);
  let d = mapPoint(x, y+height);

  let expand = 1;
  let points = `${a.x - expand},${a.y - expand} ${b.x + expand},${b.y - expand} ${c.x + expand},${c.y+expand} ${d.x-expand},${d.y+expand}`

  const padding = 15;
  let overlay: ReactNode;
  if(showPreview && preview) {
    let foX = Math.max(a.x, d.x) + padding;
    let foY = Math.max(a.y, b.y) + padding;
    let foWidth = Math.min(b.x, c.x) - foX - padding
    let foHeight = Math.min(c.y, d.y) - foY - padding
    const maskID = x+'_'+y
    overlay = <g>
      <foreignObject 
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
    </g>
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
    onClick={onClick}
    style={{
      zIndex: showPreview ? 10 : 5,
    }}
  >
    <polygon 
      points={points} 
      style={style} 
      fill={showPreview && hoverColor ? hoverColor : bgcolor} 
    />

    {overlay}
    
  </g>

}

function parsePercentage(str:any, total=1) {
  if(str === undefined)
    return undefined;
  if(typeof str === 'number')
    return str;
  if(typeof str === 'string' && str.slice(-1) == '%') {
    let n = parseFloat(str.slice(0, -1))
    if(!isNaN(n))
      return n/100 * total;
  }

  throw new Error(`unable to parse percentage: "${str}"`);
}

export const WobblyGrid: FunctionComponent<{
  rows: number;
  cols: number;
  width?: number|string;
  height?: number|string;
  pattern?: string[];
  x?:number|string;
  y?:number|string;
  content?: WobblyRectContent[];
  hideLabels?: boolean;
  addBlankTopRow?: boolean;
  addBlankRightRow?: boolean;
}> = (props) => {
  let {
    pattern=RainbowPattern, 
    rows, 
    cols, 
    content=[],
    hideLabels=false,
  } = props
  const {bulgeX, bulgeY, canvasWidth, canvasHeight} = useContext(WobblyContext)

  let x = parsePercentage(props.x, canvasWidth) || 0;
  let y = parsePercentage(props.y, canvasHeight) || 0;
  let width = parsePercentage(props.width, canvasWidth) || canvasWidth-x;
  const height = parsePercentage(props.height, canvasHeight) || canvasHeight-y;

  const cellWidth = width / cols;
  
  const cellHeight = height / rows;
  let focusCol = Math.min(Math.floor((bulgeX-x) / cellWidth), cols-1);
  let focusRow = Math.min(Math.floor((bulgeY-y) / cellHeight), rows-1);
  let focusCell = focusCol + focusRow * cols

  let cells:ReactNode[] = [];
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
    const hoverColor = content[i]?.hoverColor;
    const textColor = content[i] ? content[i].textColor : undefined;
    const handleClick = () => {
      let url = content[i]?.url
      if(url)
        window.open(url, '_blank');
    }
    cells.push(
      <WobblyRect 
        x={cellX} 
        y={cellY} 
        width={cellWidth} 
        height={cellHeight} 
        bgcolor={bgcolor} 
        hoverColor={hoverColor} 
        textColor={textColor} 
        key={i} 
        label={hideLabels ? undefined :label} 
        showPreview={showPreview} 
        preview={preview} 
        onClick={handleClick}>
      </WobblyRect>
    )

  }

  return <g> {cells} </g>
}
