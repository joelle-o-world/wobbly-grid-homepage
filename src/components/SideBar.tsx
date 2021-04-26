import React, {FunctionComponent} from 'react';
import {IoLogoGithub, IoLogoLinkedin} from 'react-icons/io';
import {IoDocumentTextSharp} from 'react-icons/io5';

import './SideBarNavigation.sass';

export const SideBarNavigation:FunctionComponent = () => {
  return <nav className="SideBarNavigation">
    <a href="http://joel.forsale/cv.html"><IoDocumentTextSharp/> CV</a>
    <a href="https://github.com/joelyjoel"><IoLogoGithub/> GitHub</a>
    <a href="https://www.linkedin.com/in/joel-plowright-86099119b"><IoLogoLinkedin/> LinkedIn</a>
  </nav>
}
