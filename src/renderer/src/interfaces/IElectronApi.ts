export default interface IElectronApi {
  //getLeagueOfLegendsPath(file: HTMLElement);
  getLeagueOfLegendsPath(lockfilepath: String);
  setLeagueOfLegendsPath();
  getLockfileContent();
  clientIsOpen();
  openGithub();
}
