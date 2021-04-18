import React from 'react';
import logo from './logo.svg';
import "./style.css"
import {WobblyGeometry, WobblyRect, WobblyGrid} from './components/WobblyGeometry';

import MalcolmPic from './assets/img/malcolm.png';
import ShaneenImg from './assets/img/shaneen_cutout.png';

const cols = 7, rows= 4;

let labels = [
  ...new Array(cols).fill(null),
  {
    bgcolor: "rgb(174, 201, 52)",
    textColor: "rgb(41, 16,6)",
    label:"you need more seaweed",
    url: "http://youneedmoreseaweed.today",
    preview: <div className="stdPreview">
      <h1>you need more seaweed</h1>
      <img src="http://youneedmoreseaweed.today/19cc519e846181ea941299711b84e959.gif" />
      <p>visit <a href="http://youneedmoreseaweed.today">youneedmoreseaweed.today</a>...</p>
    </div>,
  },
  {
    label:"a synth about my cat",
    bgcolor: "#333333",
    textColor: "white",
    preview: <div className='stdPreview'>
      <h1>Malcolm the Cat Synth</h1>
      <img src={MalcolmPic} />
      <p>Malcom. Malcom the cat. Malcom the malcom the cat, cat, cat, cat.</p>
      <a href="http://joel.forsale/malcolm-the-cat">Click for more!</a>
    </div>,
  },
  {
    label:"a manic algorithmic music bot",
    bgcolor: "rgb(230, 94, 248)",
    textColor: "yellow",
    url: "https://soundcloud.com/shaneenthemachine",
    preview: <div className="stdPreview">
      <img src={ShaneenImg} />
      <h1>Shaneen the machine</h1>
    </div>,
  },
  {
    label: "a sequencer for children",
  },
  {label:"a plaintext calendar app"},
  {label:"a programming language for sound synthesis"},
  {label:"a typescript framework for audio processing"},
 
  {label:"a musical sequencer for children"},
 
  {label:"a modular synthesiser that understands english"},
  {label:"a bbPress theme for a magic mushroom forum"},
  {label:"a parser for text adventure games"},
  {label:"a C++ synthesis library"},
  {label:"a video game about an apple with legs"},
  {label:"a fun new notation for predicate logic"},
  {label:"a typescript program for calculating Mel frequency cepstral coefficients"},
  {label:"a react library for interactive time plots"},
  {
    label:"a web app for visualising the frequency content of an audio file",
    preview: <div className='stdPreview'>
      <h1>frequency-band-visualiser</h1>
      <p>click to read more</p>
    </div>
  },
  
]


let labels2:any = []
for(let label of labels)
  labels2[Math.floor(Math.random()* cols * rows)] = label


function App() {

  return <div>
    <WobblyGeometry>
    <WobblyGrid 
      rows={rows} 
      cols={cols} 
      width={1200} 
      height={700} 
      x={200} 
      y={-10} 
      content={labels}
      pattern={['#111', '#222']}
    />
    </WobblyGeometry>
  </div>
}

export default App;
