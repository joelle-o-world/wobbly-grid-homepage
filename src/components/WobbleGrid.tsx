import {FunctionComponent, useCallback, useEffect, useRef, useState} from 'react'
import useElementPosition from '../hooks/useElementPosition';

import {useMousePosition, useRelativeMousePosition} from '../hooks/useMousePosition'

const RainbowPattern = [
  { stroke: "red", fill:"red" },
  { stroke: "orange", fill: "orange" },
  { stroke: "yellow", fill: "yellow" },
  { stroke: "green", fill: "green" },
  { stroke: "blue", fill: "blue" },
  { stroke: "purple", fill: "purple" },
]


interface Coordinate {x:number, y:number};

function coordinatesMidpoint(...args:Coordinate[]) {
  let sumX = 0;
  let sumY = 0;
  for(let {x, y} of args) {
    sumX += x;
    sumY += y;
  }
  return {
    x: sumX / args.length,
    y: sumY / args.length
  }
}

const sq = (x:number) => x*x;

export interface WobblyGridProps {
  rows?: number;
  cols?: number
  focusX?: number;
  focusY?: number;
  anchorEdges?: boolean;
  bulgeFactor?: number;
  pattern?: React.StyleHTMLAttributes<SVGPolygonElement>[];
  labels?: {[cellId: number]: string}
  hideLabels?: boolean;
  showLabels?: boolean;
}


export const WobblyGrid: FunctionComponent<WobblyGridProps> = ({
  rows=10,
  cols=11,
  anchorEdges=false,
  bulgeFactor=500,
  pattern=RainbowPattern,
  labels = {},
  hideLabels=false,
  showLabels=!hideLabels,
}) => {

  const svgRef = useRef(null)

  const {elementHeight: height, elementWidth: width} = useElementPosition(svgRef)
  const viewBox = `0 0 ${width} ${height}`;
  let {mouseX, mouseY} = useRelativeMousePosition(svgRef);
  const focusX = mouseX;
  const focusY = mouseY;

  let points:Coordinate[][] = new Array(rows).fill(0).map(() => new Array(cols))

  for(let row=0; row < rows; ++row) {
    const restY = height * row/rows
    for(let col=0; col < cols; ++col) {
      const restX = width * col/cols + 150

      if(anchorEdges) {
        if(col == 0 || col == cols-1 || row == 0 || row == rows-1) {
          points[row][col] = {x: restX, y: restY};
          continue;
        }
      }


      const diffX = focusX - restX;
      const diffY = focusY - restY;
      let dist = Math.sqrt(sq(diffX) + sq(diffY))

      let repel = bulgeFactor / (dist+50)

      let x = Math.round(restX - repel * diffX)
      let y = restY - repel * diffY

      points[row][col] = {x, y}
    }
  }

  let squares = [];
  for(let row=1; row < rows; row++) {
    for(let col=1; col < cols; col++) {
      let i = (row-1) * cols + col - 1;
      let a = points[row-1][col-1];
      let b = points[row-1][col];
      let c = points[row][col]
      let d = points[row][col-1];
      let abcd = `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`

      let label = null;
      console.log(i)
      if(labels[i]) {
        console.log('woot');
        let midpoint = coordinatesMidpoint(a, b, c, d);
        label = <text x={midpoint.x} y={midpoint.y} style={{fill:"white", stroke:"white", fontSize: "20px", textAnchor:"middle"}}>{labels[i]}</text>
      }

      let originalCenter = {
        y: (row - .5) * height / rows,
        x: (width/cols) * (col - .5) + 150
      }
      


      squares.push((<g key={i}>
        <polygon points={abcd} style={pattern[i%pattern.length]}/>
        {showLabels ? label : null}
      </g>))
    }
  }

  return <div className="WobblyGrid">
    <svg ref={svgRef} viewBox={viewBox} className="WobblyGrid_bg" style={{stroke:'black'}}>
      {squares}
    </svg>
  </div>
}


const quickPoints =  (...args:Coordinate[]) => {
  let str = ""
  for(let {x,y} of args)
    str += x+','+y+' '
  return str;
}
