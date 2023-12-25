import { i as LeagueOfLegendsClientApi } from "./index-a1b34cfc.js";
class ElectronApi {
  getLeagueOfLegendsPath(lockfilepath) {
    localStorage.setItem("Lockfile", lockfilepath);
  }
  setLeagueOfLegendsPath() {
    window.api.setFile(localStorage.getItem("Lockfile"));
  }
  async getLockfileContent() {
    window.api.watch();
    const lockfileData = await window.api.requestData();
    return lockfileData;
  }
  async clientIsOpen() {
    const isOpen = await window.api.isOpen();
    return isOpen;
  }
  watch() {
    window.api.watch();
  }
  openHandle() {
    window.api.openHandles();
  }
  openGithub() {
    window.api.openGithub();
  }
}
function openedClient() {
  const electron = new ElectronApi();
  if (!localStorage.getItem("Lockfile")) {
    localStorage.setItem("Lockfile", "");
  }
  electron.getLeagueOfLegendsPath("/home/ginju/league-of-legends/wine/prefix/drive_c/Riot Games/League of Legends/lockfile");
  electron.setLeagueOfLegendsPath();
  electron.watch();
  electron.openHandle();
  async function setData() {
    const lockfileData = await electron.getLockfileContent();
    localStorage.setItem("lockfileData", JSON.stringify(lockfileData));
    const lockfileContent = JSON.parse(localStorage.getItem("lockfileData"));
    const lolClientApi = LeagueOfLegendsClientApi.create(lockfileContent);
    let output = {
      "handShake": await lolClientApi.handshakeRequest(),
      "CurrentRunePage": await lolClientApi.getCurrentRunePage(),
      "MatchesData": await lolClientApi.requestMatchesData(),
      "SummonerData": await lolClientApi.requestSummonerData()
    };
    return output;
  }
  return setData();
}
export {
  openedClient as o
};
