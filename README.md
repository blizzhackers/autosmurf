# AutoSmurf

- It's a script which try to level and rush your characters, starting from nothing (level 0).
- It should work with any class, assuming you've got at least one sorceress in the team to teleport and one barbarian for casting battle orders.
- It's made to be used with **AutoBuild**.

### Prerequisites

- d2bot-with-kolbot : https://github.com/kolton/d2bot-with-kolbot
- check the [downloading guide](https://github.com/blizzhackers/documentation/blob/master/d2bot/Download.md#download)

### Starting

- For the beginning, you should download the files and copy/extract them in a new and fresh d2bot-with-kolbot folder.
- Copy all downloaded files into their correct location. By example, you need to copy the **/libs/common/Config.js** to **/libs/common/** directory and overwrite the default **Config.js** file. 
- At least you should copy:
	- ...\d2bs\kolbot\libs\bots\AutoSmurf.js
	- ...\d2bs\kolbot\libs\common\Config.js
	- ...\d2bs\kolbot\libs\config\
	- ...\kolbot\pickit\autosmurf\
- The alternative for Config.js is to add, at the end of the default file, the variables needed for autosmurf config, so at the bottom it should look:
```javascript
	},
	AutoSmurf: {
		TeamSize: 1,
		TeleportingSorc: [],
		BoBarb: "",
		NonSorcChar: []
	}
};
```	

### Starter scripts

1. Use the basic configuration for local leader and followers. For a fast config you don’t need touch the leader starter file (D2BotLead.dbj), or maybe only to increase the default value of 	**CrashDelay: 5,** higher than 60 seconds.

2. In the follower's starter script (D2BotFollow.dbj) you should modify the lines 31-33:
	```javascript
	var JoinSettings = {
		"As1": ["all"]
	};
	```
	As1 = the sorceress leader profile, which will open the game, then will open the TPs in-game
	all = the followers which will join the game and will follow in-game the leaders's tps

2. optionally you can set in the 48th line of D2BotFollow.js the delays for joining the game.

3. maybe it will be better if you will also set [delays for quitting the games](https://github.com/blizzhackers/documentation/blob/master/kolbot/MultiBotting.md#followers-exit-delays)

4. you can take a look to [D2BotLead randomized timers](https://github.com/blizzhackers/documentation/blob/master/kolbot/MultiBotting.md#randomize-the-timers) and to [D2BotFollow randomized timers](https://github.com/blizzhackers/documentation/blob/master/kolbot/MultiBotting.md#randomize-the-timers-1)

### Configuration

1. when your bot team Lvl get the baalLvlnm, the AutoSmurf will enter into Hell difficulty and you should use XXXX2 char-config file so that you must write your char name in XXXX2 same as XXXX1.

2. in XXXX2 files, Config.AutoEquip = false is default, so your bot should be equiped manually by yourself further more. 

### Leader

1. Leader bot should be a sorceress class and if your char name is **AbC**, you should copy /config/Sorceress.XXXX1(leader).js as **Sorceress.AbC.js**.

2. complete the lines 16-21 with the required character and profile names:
	```javascript
		Scripts.AutoSmurf = true;
			Config.AutoSmurf.TeamSize = 4;
			Config.AutoSmurf.TeleportingSorc = "AbC"; // your leader sorceress charname.
			Config.AutoSmurf.BoBarb = "BcD"; // boBarb charname
			Config.AutoSmurf.NonSorcChar = ["CdE", "DeF"]; // all team charnames, excluding the leader and boBarb
			Config.AutoSmurf.AllTeamProfiles = ["As1","As2","As3","As4"]; // the whole team PROFILE names
	```

2. complete the line 129 with the names of the profiles, according to line 130 (Config.QuitListMode = 1):
	```javascript
		Config.QuitList = ["As2", "As3", "As4"]; // team char name except from leader
	```

3. complete the line 582 with the desired autobuild template. For sorceress you can choose "Blizzard", "ChainL", "Meteor" 
	```
		Config.AutoBuild.Template = "Blizzard";
	```

### Followers

1. You should copy the follower configuration files:
	- the required **BcD** follower is BO barbarian, so you should copy /config/Barbarian.XXXX1.js as **Barbarian.BcD.js**.
	- the 3rd follower can be a **CdE** paladin, so you should copy /config/Paladin.XXXX1.js as **Paladin.CdE.js**.
	- the 4th **DeF** follower could be a sorceress, so you should copy /config/Sorceress.XXXX1(follow).js as **Sorceress.DeF.js**.

1. complete the lines 16-21, like in the leader's case.
	```javascript
		Scripts.AutoSmurf = true;
			Config.AutoSmurf.TeamSize = 4;
			Config.AutoSmurf.TeleportingSorc = "AbC"; // your leader sorceress charname.
			Config.AutoSmurf.BoBarb = "BcD"; // boBarb charname
			Config.AutoSmurf.NonSorcChar = ["CdE", "DeF"]; // all team charnames, excluding the leader and boBarb
			Config.AutoSmurf.AllTeamProfiles = ["As1","As2","As3","As4"]; // the whole team PROFILE names
	```

2. complete the lines 138-140 with the sorceress leader char name and its running profile:
	```javascript
		Config.Leader = "AbC"; // Leader's ingame character name. Leave blank to try auto-detection (works in AutoBaal, Wakka, MFHelper)
		Config.QuitList = ["As1"]; // leader char name.
		Config.QuitListMode = 1; // 0 = use character names; 1 = use profile names (all profiles must run on the same computer).
	```

3. Around line 578-580 line you must specify the build according to your existing build template. For barbarian you should set "BattleOrders", paladin should have the "BHammer", and the other sorceress can have "ChainL".

### Other settings

1. The pickit files may be not suitable for you, so that you can change them according to your desires. But, you can keep the **sell.nip** and **white1.nip** which can help your bot to earn more money and build some runewords.

2. The char config file sets that your bot will use the mercenaries, and the mercenary will be changed when bot arrive in act2 normal/nightmare difficulty.
If you want to not use Mercs, you should set Config.UseMerc = false which is locates on the 230th line in the char-config file. 

3. When your bot team completed Rite of Passage in Nightmare and Hell, the AutoSmurf was transfered into MF mode. But killing baal was restricted by charLvls which are baalLvlnm and mfLvlHell.

4. You may reset the values of line 16-30 in AutoSmurf.js. These values restrict your bot level to begin some quests, like "tombsLvl = 30" (line 30) means that your bot level must be more than 28 and your bot will begin to kill Duriel. Because the beginner bots equips mostly low quality items, if you want to reduce the number of chicken exits, the suggestion is to not change the default values. The default values will keep your bot safety, but on lower areas the leveling up speed is a bit slower.

5. You do not need to give any gold to your bot on first running of the AutoSmurf.


### NOTES:
1. Autosmurf script has no autoequip code for mercenary, so you must equip manually your mercenary items, if you set it to true. If you don't want to use Mercs, you should set **Config.UseMerc = false**. 
2. When your bot team completed Rite of Passage in Nightmare and Hell, the AutoSmurf will be transfered into MF mode, and teamMF is not a silenced script, so you should set the local chat in mode 1 or 2.
3. Javazon and Druid Autobuilds are unfinished, Amazon and Druid will only auto-build till lvl 36, and after that you must set skills and stats manually, or you can edit amazon/druid autobuilds for your needs.


Special thanks to [@dark-f](https://d2bot.discourse.group/u/hk-dark-f/) who made a great job with the original [@jeanmax autosmurf script](https://github.com/JeanMax/AutoSmurf), updating it and sharing the changes to public.

Happy Smurfing!