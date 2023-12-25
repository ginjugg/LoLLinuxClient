import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import IElectronApi from '../interfaces/IElectronApi';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function SelectFolder(props: { electron: IElectronApi }): JSX.Element {
  const navigate = useNavigate();
  const electron = props.electron;

  async function getDir(e: MouseEvent) {
    e.preventDefault();
    const file = document.getElementById('file-input') as HTMLElement;
    electron.getLeagueOfLegendsPath('/home/ginju/league-of-legends/wine/prefix/drive_c/Riot Games/League of Legends/lockfile');

    if (localStorage.getItem('Lockfile') !== '' && localStorage.getItem('Lockfile') !== null) {
      electron.setLeagueOfLegendsPath();
      const lockfileData = await electron.getLockfileContent();
      localStorage.setItem('lockfileData', JSON.stringify(lockfileData));
      //navigate('/closed');
    }
  }

}