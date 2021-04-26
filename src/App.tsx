import React, {useEffect, useState} from 'react';
import './Home.sass';
import {WobblyGeometry, WobblyRect, WobblyGrid, WobblyRectContent} from './components/WobblyGeometry';

import {Shaneen, LegAppleMan, DeepDrive, ChladniFigures, YouNeedMoreSeaweed, AudioVisualiser, MalcolmTheCat, RitterDeepReading, AlphaChain, Sequencer, WobblyGridSource} from './projects';
import {SideBarNavigation} from './components/SideBar';

const cols = 4, rows= 4;


let labels = [
  LegAppleMan,
  DeepDrive,
  ChladniFigures,
  YouNeedMoreSeaweed,
  AudioVisualiser,
  MalcolmTheCat,
  RitterDeepReading,
  AlphaChain,
  Shaneen,
  Sequencer,
  WobblyGridSource,

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
  const [cols, setCols] = useState(4);
  //useEffect(() => {
    //const handleResize = () => {
      //let windowWidth = window.innerWidth;
      //setCols(Math.ceil(windowWidth / 500));
    //}
    //handleResize();
    //window.addEventListener('resize', handleResize)
    //return () => window.removeEventListener('resize', handleResize);
  //}, []);
  const rows = Math.ceil(labels.length/cols);

  return <div className="App">
    <SideBarNavigation/>
    <WobblyGeometry>
      <WobblyGrid 
        rows={rows} 
        cols={cols }
        width="90%" 
        height="90%" 
        y="0%" 
        x="10%"
        content={labels}
        //addBlankTopRow
        //pattern={['rgba(0,0,0,0)']}
      />
    </WobblyGeometry>
    <footer className="PageFooter">
      <small className="copyright">© Joel Plowright {new Date().getFullYear()}</small>
    </footer>
  </div>
}

export default App;
