interface Coordinate { x:number; y: number;};

export function tabulateCoordinates(points: Coordinate[][]) {
  return <table><tbody>{
    points.map(row => <tr>{
      row.map(cell => <td>{
        `(${Math.round(cell.x)},${Math.round(cell.y)})`
      }</td>)
    }</tr>)
  }</tbody></table>
}
