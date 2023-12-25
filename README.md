### Ginjus League of Legends LeaguestatsRuneMakerApp for Linux (working title) (ginju.gg App)

<a href="https://discord.gg/mXVCuFnkzB"><img src="https://img.shields.io/badge/Discord-join%20chat-738bd7.svg" alt="LeagueStats.gg official Discord"></a>

This is an Open Source Third Party Application for League of Legends. It's based on the idea to combine multiple open source projects into one Client. It has no actual name but to make it a little bit easier I'll call it "ginju.gg" for the time being.

At this time it's just an experimental build to test things out and know the limits. The current app consists of leaguestat.gg and rune-maker inside an electron-vite wrapper and is written with TypeScript/JavaScript. It's basically an npm package.

#### Why???

At this time there is no really "good" LoL third party app for Linux. Either the apps are all not supported anymore or lack a lot of features. There are alot of third party apps for windows, but they're nearly all broken inside a wine prefix. 

In my opinion it is time to change that since LoL runs very smooth in Linux inside a wine prefix. Furthermore there is a big LoL Community on Linux which deserves to have a featurerich and updated LoL Third Party Program with every feature like those apps on windows have.

Current "features":
- standalone client native on Linux 
- basically everyting that leaguestats.gg can do
- basic interaction framework with the local league client 
- read and display default runes from League Client

Future ideas:
- add Haze's RPC 

ginju.gg  consists of the following LoL open source projects:
- Leaguestats: https://github.com/vkaelin/LeagueStats
- Rune-Maker: https://github.com/duduisonfire/rune-maker

### Who Dafuq are you?

I'm Ginju and I live in germany. I have absolutely no developer experience and just barely know JavaScript. However, I am super frustrated about the fact that there is no satisfying solution for Linux. So I started this project. 

## Contributing

Feel free to contribute and test it yourself! Also don't forget to join the League of Linux community on Discord: https://discord.gg/mXVCuFnkzB

## License

NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)  
https://creativecommons.org/licenses/by-nc-sa/4.0/

### You are free to:

Share — copy and redistribute the material in any medium or format

Adapt — remix, transform, and build upon the material

### Under the following terms:

NonCommercial — You may not use the material for commercial purposes.

ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

## Project setup

### Clone Repository and change directory
```
git clone https://github.com/GinjuGG/LoLLinuxClient.git && cd LoLLinuxClient
```

### Setup NodeJS environment
```
npm install
```

### Compile preview

```
npm run preview
```

### Compile and minify for production

```
npm run build:linux
```
