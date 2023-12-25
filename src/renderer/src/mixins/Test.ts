//import React, { createRef, useMemo, useState } from 'react';
//import { MatchesContainer } from './styles/MatchesContainer';
//import { useNavigate } from 'react-router-dom';
//import LeagueOfLegendsClientApi from '../libs/LeagueOfLegendsClientApi';
/** 
import ISummonerData from '../interfaces/ISummonerData';
//import MatchBox from '../components/matchBox';
import IMatchesData from '../interfaces/IMatchesData';
import IGameData from '../interfaces/IGameData';
//import LeagueOfLegendsExternalApi from '../libs/LeagueOfLegendsExternalApi';
import { useQuery, useQueryClient } from 'react-query';
import { ipcMain } from 'electron';
import { Lockfile } from '../libs/Lockfile.ts';
import SelectFolder from '../selectFolder/index.tsx';
import ILockfileData from '../interfaces/ILockfileData';
import { useNavigate } from 'react-router-dom';
import ElectronApi from '../libs/ElectronApi.ts'; */


import ElectronApi from '../libs/ElectronApi.ts';
import ILockfileData from '../interfaces/ILockfileData';
import LeagueOfLegendsClientApi from '../libs/LeagueOfLegendsClientApi';

export function openedClient () {
  const electron = new ElectronApi();

  if (!localStorage.getItem('Lockfile')) {
    localStorage.setItem('Lockfile', '');
  }
  electron.getLeagueOfLegendsPath('/home/ginju/league-of-legends/wine/prefix/drive_c/Riot Games/League of Legends/lockfile')
  electron.setLeagueOfLegendsPath();
  electron.watch();
  electron.openHandle();

  async function setData() {

    const lockfileData = await electron.getLockfileContent();
    localStorage.setItem('lockfileData', JSON.stringify(lockfileData));
    const lockfileContent = JSON.parse(localStorage.getItem('lockfileData') as string) as ILockfileData;
    
    const lolClientApi = LeagueOfLegendsClientApi.create(lockfileContent);

   let output = {
      'handShake': await lolClientApi.handshakeRequest(),
      'CurrentRunePage': await lolClientApi.getCurrentRunePage(),
      'MatchesData': await lolClientApi.requestMatchesData(),
      'SummonerData': await lolClientApi.requestSummonerData()

   }
    return output
  }
  
  return setData()
  
  
  /**
   * Hardcode lockfileData Path for now
   * https://github.com/duduisonfire/rune-maker/blob/master/src/components/selectFolder/index.tsx#L17C1-L21C6
   */


  // @ts-ignore (define in dts)
  //console.log('hier');
  //window.api.requestData();
  //const electronApi = new ElectronApi();
  //electronApi.getLeagueOfLegendsPath('/home/ginju/league-of-legends/wine/prefix/drive_c/Riot Games/League of Legends/lockfile');
  //electronApi.setLeagueOfLegendsPath();
  //console.log(electronApi.getLockfileContent());

};