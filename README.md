# AutoSmurf

- It's a script for leveling a whole new team, starting from nothing (level 0).
- It should work with any class, assuming you've got at least one sorceress in the team to teleport and one barbarian for casting battle orders.
- It is made to be used with **AutoBuild** included in d2bot-with-kolbot.

### Prerequisites

- d2bot-with-kolbot : https://github.com/kolton/d2bot-with-kolbot
- check the [downloading guide](https://github.com/blizzhackers-d2/documentation/blob/master/d2bot/Download.md#download)

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
			OtherChars: []
		}
	};
	```

### Starter scripts

1. Use the basic configuration for local leader and followers. For a fast config you don’t need touch the leader starter file (D2BotLead.dbj), or maybe only to increase the default value of 	**CrashDelay: 5,** to a higher value than 60 seconds.

2. In the follower's starter script (D2BotFollow.dbj) you should modify the lines 31-33:
	```javascript
	var JoinSettings = {
		"As1": ["all"]
	};
	```
	**As1** = the sorceress leader profile, which will open the game, then will open the TPs in-game

	**all** = the followers which will join the game and will follow in-game the leaders's tps

3. optionally you can set in the 48th line of D2BotFollow.js the delays for joining the game.

4. if you wanna randomize the starter scripts timers - the included D2BotFollow.dbj and D2BotLead.dbj have the randomized timers. In D2BotFollow.dbj, you should complete the changes mentioned at steps 2 and 3.

### Configuration

1. when your bot team get the baalLvlnm, the AutoSmurf will enter on Hell difficulty and you should use XXXX2 char-config files, so that you should copy those files using your char names for XXXX2, the same like in XXXX1 case.

2. in XXXX2 files, Config.AutoEquip = false is by default, so  further more your bot should be equiped manually by yourself. 

### Leader

1. Leader bot should be a sorceress class, and if your char name is **AbC**, you should copy /config/Sorceress.XXXX1(leader).js as **Sorceress.AbC.js**.

2. complete the lines 16-21 with the required character and profile names:
	```javascript
		Scripts.AutoSmurf = true;
			Config.AutoSmurf.TeamSize = 4;
			Config.AutoSmurf.TeleportingSorc = "AbC"; // your leader sorceress charname.
			Config.AutoSmurf.BoBarb = "BcD"; // boBarb charname
			Config.AutoSmurf.OtherChars = ["CdE", "DeF"]; // all team charnames, excluding the leader and boBarb
			Config.AutoSmurf.AllTeamProfiles = ["As1","As2","As3","As4"]; // the whole team PROFILE names
	```

2. complete the leeching section - line 139 with the **profile names**, according to line 140 (Config.QuitListMode = 1). Leader which will quit the game in case of a follower's exit (maybe chicken) will keep the whole team on the same quests/levels.
	```javascript
		Config.QuitList = ["As2", "As3", "As4"]; // List of character names to quit with.
		Config.QuitListMode = 1; // 0 = use character names; 1 = use profile names (all profiles must run on the same computer).
		Config.QuitListDelay = [3, 5]; // Quit the game with random delay in case of using Config.QuitList. Example: Config.QuitListDelay = [1, 10];
	```

3. complete the line ~664 with the desired autobuild template. For sorceress you can choose "Blizzard", "ChainL", "Meteor" 
	```
		Config.AutoBuild.Template = "Blizzard";
	```

### Followers

1. you should copy the follower configuration files:
	- the 2nd required **BcD** follower is BO barbarian, so you should copy /config/Barbarian.XXXX1.js as **Barbarian.BcD.js**.
	- the 3rd follower **CdE** can be a paladin, so you should copy /config/Paladin.XXXX1.js as **Paladin.CdE.js**.
	- the 4th follower **DeF** could be a sorceress, so you should copy /config/Sorceress.XXXX1(follow).js as **Sorceress.DeF.js**.

2. complete the lines 16-21, like in the leader's case.
	```javascript
		Scripts.AutoSmurf = true;
			Config.AutoSmurf.TeamSize = 4;
			Config.AutoSmurf.TeleportingSorc = "AbC"; // your leader sorceress charname.
			Config.AutoSmurf.BoBarb = "BcD"; // boBarb charname
			Config.AutoSmurf.OtherChars = ["CdE", "DeF"]; // all team charnames, excluding the leader and boBarb
			Config.AutoSmurf.AllTeamProfiles = ["As1","As2","As3","As4"]; // the whole team PROFILE names
	```

3. complete the leeching section - lines 138-140 with the sorceress leader char name and its running profile:
	```javascript
		Config.Leader = "AbC"; // Leader's ingame character name. Leave blank to try auto-detection (works in AutoBaal, Wakka, MFHelper)
		Config.QuitList = ["As1"]; // List of character names to quit with.
		Config.QuitListMode = 1; // 0 = use character names; 1 = use profile names (all profiles must run on the same computer).
	```
	line 141 should have different quit delays for every follower
	```
		Config.QuitListDelay = [3, 5];
		Config.QuitListDelay = [5, 7];
		Config.QuitListDelay = [8, 10];
	```

4. Around lines ~655-665 you must specify the build of the bot, accordingly to your existing class build templates:
	- 2nd follower barbarian - "BattleOrders"
	- 3rd follower paladin - "BHammer"
	- 4th follower sorceress - "ChainL".

### Other settings

1. The pickit files may be not suitable for you, so that you can change them according to your desires. But, you can keep the **sell.nip** and **white1.nip** which can help your bot to earn more money and build some runewords.

2. The char config file sets that your bot will use the mercenaries, and the mercenary will be changed when bot arrive in act2 normal/nightmare difficulty. Autosmurf script has no autoequip code for mercenary, so you must equip manually your mercenary items. If you don't want to use Mercs, you should set Config.UseMerc = false. 

3. When your bot team completed Rite of Passage in Nightmare and Hell, the AutoSmurf was transfered into MF mode. But killing baal was restricted by charLvls which are baalLvlnm and mfLvlHell.

4. You may reset the values of [lines 16-30 in AutoSmurf.js](https://github.com/blizzhackers-d2/autosmurf/blob/master/d2bs/kolbot/libs/bots/AutoSmurf.js#L16-L30). These values restrict your bot level to begin some quests, like "tombsLvl = 30" (line 30) means that your bot level must be more than 28 and your bot will begin to kill Duriel. Because the beginner bots equips mostly low quality items, if you want to reduce the number of chicken exits, the suggestion is to not change the default values. The default values will keep your bot safety, but on lower areas the leveling up speed is a bit slower.

5. You do not need to give any gold to your bot on first running of the AutoSmurf.


### NOTES:
1. When your bot team completed Rite of Passage in Nightmare and Hell, the AutoSmurf will be transfered into MF mode, and teamMF is not a silenced script, so you should set the LocalChat active (true) in mode 1 or 2.

2. Javazon and Druid Autobuilds are unfinished, Amazon and Druid will only auto-build till lvl 36, and after that you must set skills and stats manually, or you can edit amazon/druid autobuilds for your needs.


**Special thanks** to [@dark-f](https://d2bot.discourse.group/u/hk-dark-f/) who made a great job with the original [@JeanMax](https://github.com/JeanMax/) - [autosmurf script](https://github.com/JeanMax/AutoSmurf), for updating it and sharing the changes to public.

Happy Smurfing!