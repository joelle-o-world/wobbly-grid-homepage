import React, {useEffect, useState} from 'react';
import './Home.sass';
import {WobblyGeometry, WobblyRect, WobblyGrid, WobblyRectContent} from './components/WobblyGeometry';

import {Shaneen, LegAppleMan, DeepDrive, ChladniFigures, YouNeedMoreSeaweed, AudioVisualiser, MalcolmTheCat, RitterDeepReading, AlphaChain, Sequencer} from './projects';

const cols = 4, rows= 4;


let labels = [
  Shaneen,
  LegAppleMan,
  DeepDrive,
  ChladniFigures,
  YouNeedMoreSeaweed,
  AudioVisualiser,
  MalcolmTheCat,
  RitterDeepReading,
  AlphaChain,
  Sequencer,

  //{label:"a plaintext calendar app"},
  //{label:"a programming language for sound synthesis"},
  //{label:"a typescript framework for audio processing"},
 
  //{label:"a musical sequencer for children"},
 
  //{label:"a modular synthesiser that understands english"},
  //{label:"a bbPress theme for a magic mushroom forum"},
  //{label:"a parser for text adventure games"},
  //{label:"a C++ synthesis library"},
  //{label:"a fun new notation for predicate logic"},
  //{label:"a typescript program for calculating Mel frequency cepstral coefficients"},
  //{label:"a react library for interactive time plots"},
  
]

function addBufferCells(content: WobblyRectContent[], {rows, cols}:{rows:number, cols:number}) {
  // Add top row
  content = [
    ...content.slice(0, rows).map(({bgcolor}) => ({bgcolor})),
    ...content,
  ]

  let contentRows = [];
  let content2 = []
  for(let r=0; r < rows; ++r) {
    contentRows.push(content.slice(r * cols, (r+1)*cols));
    contentRows[r][cols] = {bgcolor: contentRows[r][cols-1]?.bgcolor}
    content2.push(...contentRows[r]);
  }

  return content2
}


let labels2:any = []
for(let label of labels)
  labels2[Math.floor(Math.random()* cols * rows)] = label


function App() {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      let windowWidth = window.innerWidth;
      setCols(Math.ceil(windowWidth / 500));
    }
    handleResize();
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const rows = Math.ceil(labels.length/cols);
  const content = addBufferCells(labels, {rows, cols});

  return <div>
    <WobblyGeometry>
    <WobblyGrid 
      rows={rows} 
      cols={cols }
      width="80%" 
      height="80%" 
      y="10%" 
      x="10%"
      content={labels}
      hideLabels
      //addBlankTopRow
      pattern={['rgba(0,0,0,0)']}
    />
    </WobblyGeometry>
  </div>
}

export default App;
