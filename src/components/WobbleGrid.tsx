import {FunctionComponent, useCallback, useEffect, useRef, useState} from 'react'

import {useMousePosition, useRelativeMousePosition} from '../hooks/useMousePosition'

export interface WobblyGridProps {
  rows?: number;
  cols?: number
  focusX?: number;
  focusY?: number;
  anchorEdges?: boolean;
  bulgeFactor?: number;
}
interface Coordinate {x:number, y:number};

const sq = (x:number) => x*x;

export const WobblyGrid: FunctionComponent<WobblyGridProps> = ({
  rows=10,
  cols=10,
  anchorEdges=true,
  bulgeFactor=260
}) => {

  const svgRef = useRef(null)

  let width = 1000
  let height = 800

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

      let x = restX - repel * diffX
      let y = restY - repel * diffY
      points[row][col] = {x, y}
    }
  }

  let squares = [];
  for(let row=1; row < rows; row++) {
    for(let col=1; col < cols; col++) {
      let a = points[row-1][col-1];
      let b = points[row-1][col];
      let c = points[row][col]
      let d = points[row][col-1];

      squares.push((<g>
        <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
        <line x1={b.x} y1={b.y} x2={c.x} y2={c.y} />
        <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} />
        <line x1={d.x} y1={d.y} x2={a.x} y2={a.y} />
      </g>))
    }
  }

  return <div className="WobblyGrid">
    <svg ref={svgRef} width="1400px" height="1000px" className="WobblyGrid_bg" style={{stroke:'black'}}>
      {squares}
    </svg>
    <pre>{tabulateCoordinates(points)}</pre>
  </div>
}

function tabulateCoordinates(points: Coordinate[][]) {
  return <table><tbody>{
    points.map(row => <tr>{
      row.map(cell => <td>{
        `(${Math.round(cell.x)},${Math.round(cell.y)})`
      }</td>)
    }</tr>)
  }</tbody></table>
}

