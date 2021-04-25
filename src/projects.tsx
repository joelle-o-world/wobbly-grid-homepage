import MalcolmPic from './assets/img/malcolm.png';
import ShaneenImg from './assets/img/shaneen_cutout.png';
import WaveformImg from './assets/img/waveform.png';
import LegAppleManImg from './assets/img/leg-apple-man.png';
import RDRScreenshot from './assets/img/rdr-screenshot.png';
import AlphaChainScreenshot from './assets/img/alpha-chain-screenshot.png';
import ChladniIMG from './assets/img/chladni.png';
import DeepdriveWaveforms from './assets/img/deepdrive-waveforms.png';

import {UndulatingText} from './components/UndulatingText';
export const MalcolmTheCat = {
  label:"a synth about my cat",
  bgcolor: "#333333",
  textColor: "white",
  year: 2020,
  url: 'http://joel.forsale/malcolm-the-cat',
  preview: <div className='stdPreview'>
    <h1>Malcolm the Cat Synth</h1>
    <img src={MalcolmPic} />
    <p>Malcom. Malcom the cat. Malcom the malcom the cat, cat, cat, cat.</p>
    <a href="http://joel.forsale/malcolm-the-cat">Click for more!</a>
  </div>,
}

export const YouNeedMoreSeaweed = {
  bgcolor: "rgb(174, 201, 52)",
  textColor: "rgb(41, 16,6)",
  label:"you need more seaweed",
  year: 2019,
  url: "http://youneedmoreseaweed.today",
  preview: <div className="stdPreview YouNeedMoreSeaweedPreview">
    <UndulatingText text="you need more seaweed" />
    <img src="http://youneedmoreseaweed.today/19cc519e846181ea941299711b84e959.gif" />
    <p>visit <a href="http://youneedmoreseaweed.today">youneedmoreseaweed.today</a>...</p>
  </div>,
} 

export const Sequencer = {
  label: "a sequencer for children",
  bgcolor: "rgb(33, 48,174)",
  textColor: "rgb(170,170,170)",
  url: 'http://brewood.org/sequencer',
  year: 2021,
  preview: <div className="SequencerPreview">
    <hgroup className="SequencerHeader">
      <h1>Musical Sequencing</h1>
      <h2>Programming a melody using the computer</h2>
    </hgroup>
    <p>An open source sequencer/synthesizer to teach children about musical composition and MIDI Trackers.</p>
    <a className="ClickToBegin">Click to begin</a>
  </div>
}

export const Shaneen = {
  bgcolor: "rgb(230, 94, 248)",
  textColor: "yellow",
  year: 2016,
  url: "https://soundcloud.com/shaneenthemachine",
  preview: <div className="ShaneenPreview">
    <img src={ShaneenImg} />
    <hgroup>
      <h1>Shaneen the Machine</h1>
      <p>(music written by a computer)</p>
    </hgroup>
  </div>,
}

export const AudioVisualiser = {
  label:"a web app for visualising the frequency content of an audio file",
  year: 2019,
  url: 'http://joel.forsale/audio-visualiser',
  bgcolor: 'rgb(248,233,233)',
  preview: <div className='stdPreview'>
    <img src={WaveformImg} />
    <h1>frequency-band-visualiser</h1>
    <p>Use this app to explore an interactive graph of the frequency content in an audio file. An audio signal is made up of energy which is distributed across the frequency spectrum and across time. In this app, time is represented along the left-to-right axis and frequency energy is represented using colour. Low frequency sound energy (bass) is represented using low frequency colour (red); high frequency sound energy (treble) is represented using high frequency colour (blue/violet). The rest of the rainbow/colour-spectrum fills out the frequencies in-between.</p>
  </div>
}

export const RitterDeepReading = {
  //bgcolor: 'rgb(237,153,41)',
  bgcolor: 'rgb(235,246,244)',
  year: 2021,
  url: 'https://deepreading.de',
  textColor: 'white',
  preview: <div className="SitePreview">
    <img src={RDRScreenshot} className="screenshot" />
  </div>
}

export const LegAppleMan = {
  label:"a video game about an apple with legs",
  year: 2016,
  bgcolor: '#00ff00',
  textColor: '#ff00ff',
  url: "http://joel.forsale/leg-apple-man",
  preview: <div className="stdPreview">
    <h1>Leg Apple Man</h1>
    <img src={LegAppleManImg} />
  </div>,
}

export const AlphaChain = {
  url: 'https://alphachain.io',
  year: 2021,
  bgcolor: "rgb(12,24,12)", 
  textColor: "rgb(246, 23, 254)",
  preview: <div className="SitePreview">
    <img src={AlphaChainScreenshot} className="screenshot" />
  </div>
}

export const ChladniFigures = {
  url: "http://joel.forsale/chladni-figures",
  year: 2019,
  bgcolor: 'rgb(204, 204, 255)',
  preview: <img src={ChladniIMG} className="ContainPreview" />
}

export const DeepDrive = {
  url: 'https://deepdrive.com',
  year: 2018,
  bgcolor: "rgb(18,16,25)",
  textColor: 'rgb(253,231,231)',
  preview: <div className="stdPreview">
    <img src={DeepdriveWaveforms} className="screenshot"/>
    <h1>DeepDrive</h1>
  </div>
}
