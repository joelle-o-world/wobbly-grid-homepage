import React, {FunctionComponent} from 'react';
import {IoLogoGithub, IoLogoLinkedin} from 'react-icons/io';
import {IoMailSharp} from 'react-icons/io5';
import {IoDocumentTextSharp} from 'react-icons/io5';
import {SiFiverr} from 'react-icons/si';

import './SideBarNavigation.sass';

export const SideBarNavigation:FunctionComponent = () => {
  return <nav className="SideBarNavigation">
    <a href="http://joel.forsale/cv.html"><IoDocumentTextSharp/> CV</a>
    <a href="mailto:joelyjoel@protonmail.com" className="EmailLink"><IoMailSharp/> joelyjoel@protonmail.com</a>
    <a href="https://github.com/joelyjoel"><IoLogoGithub/> GitHub</a>
    <a href="https://www.linkedin.com/in/joel-plowright-86099119b"><IoLogoLinkedin/> LinkedIn</a>
    <a href="https://www.fiverr.com/share/ogBoWN"><SiFiverr/> Fiverr</a>
    <a href="https://scoodle.co.uk/tutors/joel-plowright">Scoodle</a>
  </nav>
}
