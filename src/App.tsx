import React from 'react';
import './Home.sass';
import {WobblyGeometry, WobblyRect, WobblyGrid} from './components/WobblyGeometry';

import MalcolmPic from './assets/img/malcolm.png';
import ShaneenImg from './assets/img/shaneen_cutout.png';
import WaveformImg from './assets/img/waveform.png';
import LegAppleManImg from './assets/img/leg-apple-man.png';
import RDRScreenshot from './assets/img/rdr-screenshot.png';
import AlphaChainScreenshot from './assets/img/alpha-chain-screenshot.png';
import ChladniIMG from './assets/img/chladni.png';
import DeepdriveWaveforms from './assets/img/deepdrive-waveforms.png';

import {UndulatingText} from './components/UndulatingText';

const cols = 4, rows= 4;

let labels = [
  ...new Array(cols).fill(null),
  {
    label:"a synth about my cat",
    bgcolor: "#333333",
    textColor: "white",
    url: 'http://joel.forsale/malcolm-the-cat',
    preview: <div className='stdPreview'>
      <h1>Malcolm the Cat Synth</h1>
      <img src={MalcolmPic} />
      <p>Malcom. Malcom the cat. Malcom the malcom the cat, cat, cat, cat.</p>
      <a href="http://joel.forsale/malcolm-the-cat">Click for more!</a>
    </div>,
  },
  {
    bgcolor: "rgb(174, 201, 52)",
    textColor: "rgb(41, 16,6)",
    label:"you need more seaweed",
    url: "http://youneedmoreseaweed.today",
    preview: <div className="stdPreview YouNeedMoreSeaweedPreview">
      <UndulatingText text="you need more seaweed" />
      <img src="http://youneedmoreseaweed.today/19cc519e846181ea941299711b84e959.gif" />
      <p>visit <a href="http://youneedmoreseaweed.today">youneedmoreseaweed.today</a>...</p>
    </div>,
  },
  {
    label:"a manic algorithmic music bot",
    bgcolor: "rgb(230, 94, 248)",
    textColor: "yellow",
    url: "https://soundcloud.com/shaneenthemachine",
    preview: <div className="ShaneenPreview">
      <img src={ShaneenImg} />
      <hgroup>
        <h1>Shaneen the Machine</h1>
        <p>(music written by a computer)</p>
      </hgroup>
    </div>,
  },
  {
    label: "a sequencer for children",
    bgcolor: "rgb(33, 48,174)",
    textColor: "rgb(170,170,170)",
    url: 'http://brewood.org/sequencer',
    preview: <div className="SequencerPreview">
      <hgroup className="SequencerHeader">
        <h1>Musical Sequencing</h1>
        <h2>Programming a melody using the computer</h2>
      </hgroup>
      <p>An open source sequencer/synthesizer to teach children about musical composition and MIDI Trackers.</p>
      <a className="ClickToBegin">Click to begin</a>
    </div>
  },
  {
    label:"a web app for visualising the frequency content of an audio file",
    url: 'http://joel.forsale/audio-visualiser',
    bgcolor: 'rgb(248,233,233)',
    preview: <div className='stdPreview'>
      <img src={WaveformImg} />
      <h1>frequency-band-visualiser</h1>
      <p>Use this app to explore an interactive graph of the frequency content in an audio file. An audio signal is made up of energy which is distributed across the frequency spectrum and across time. In this app, time is represented along the left-to-right axis and frequency energy is represented using colour. Low frequency sound energy (bass) is represented using low frequency colour (red); high frequency sound energy (treble) is represented using high frequency colour (blue/violet). The rest of the rainbow/colour-spectrum fills out the frequencies in-between.</p>
    </div>
  },
  {
    label:"a video game about an apple with legs",
    bgcolor: '#00ff00',
    textColor: '#ff00ff',
    url: "http://joel.forsale/leg-apple-man",
    preview: <div className="stdPreview">
      <h1>Leg Apple Man</h1>
      <img src={LegAppleManImg} />
    </div>,
  },
  {
    bgcolor: 'rgb(46,142, 191)',
    url: 'https://deepreading.de',
    textColor: 'white',
    preview: <div>
      <h1>Ritter Deep Reading</h1>
      <img src={RDRScreenshot} width="100%" />
    </div>
  },
  {
    url: 'https://alphachain.io',
    bgcolor: "rgb(12,24,12)", 
    textColor: "rgb(246, 23, 254)",
    preview: <div className="AlphaChainPreview">
      <h1>alphachain.io</h1>
      <img src={AlphaChainScreenshot} width="100%" />
    </div>
  },
  {
    url: "http://joel.forsale/chladni-figures",
    bgcolor: 'rgb(204, 204, 255)',
    preview: <img src={ChladniIMG} className="ContainPreview" />
  },

  {
    url: 'https://deepdrive.com',
    bgcolor: "rgb(18,16,25)",
    textColor: 'rgb(253,231,231)',
    preview: <div className="stdPreview">
      <img src={DeepdriveWaveforms} width="100%"/>
      <h1>DeepDrive</h1>
    </div>
  },
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
      hideLabels
      pattern={['#222']}
    />
    </WobblyGeometry>
  </div>
}

export default App;
