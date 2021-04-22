import React from 'react';
import './undulating.scss';

export function IndividualUndulation(props) {
  let duration = props.duration || Math.random() * 4 + 3;
  let style = {animationDuration: duration+'s'}

  return <span style={style} className='undulating'>{props.children}</span>
}

export function UndulatingText(props) {
  if(!props.text)
    throw 'UndulatingText: no text provided';
  let undulators = props.text.split('').map(
    (c, i) => <IndividualUndulation key={i}>{c}</IndividualUndulation>
  );

  return <span className='undulating-text'>{undulators}</span>;
}
