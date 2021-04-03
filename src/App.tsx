import React from 'react';
import logo from './logo.svg';
import "./style.css"
import {WobblyGeometry, WobblyRect, WobblyGrid} from './components/WobblyGeometry';

let labels = [
  {label:"a plaintext calendar app"},
  {label:"a programming language for sound synthesis"},
  {label:"a typescript framework for audio processing"},
  {
    label:"a synth about my cat",
    preview: <div>
      <h1>Malcolm the Cat Synth</h1>
      <p>Malcom. Malcom the cat. Malcom the malcom the cat, cat, cat, cat.</p>
      <a href="http://joel.forsale/malcolm-the-cat">Click for more!</a>
    </div>
  },
  {label:"a musical sequencer for children"},
  {label:"a manic algorithmic music bot"},
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
    preview: <div>
      <h1>frequency-band-visualiser</h1>
      <p>click to read more</p>
    </div>
  },
]

let labels2:any = []
for(let label of labels)
  labels2[Math.floor(Math.random()*100)] = label


function App() {

  return <div>
    <WobblyGeometry>
      <WobblyGrid rows={10} cols={10} width={1000} height={1000} x={100} y={100} content={labels}/>
    </WobblyGeometry>
  </div>
  //return (
    //<div className="App">
      //<WobblyGrid labels={labels} />
      //<small className="copywrite">Copyright Joel Plowright 2021</small>
    //</div>
  //);
}

export default App;
