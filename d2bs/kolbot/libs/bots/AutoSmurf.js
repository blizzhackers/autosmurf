/**
*	@filename	AutoSmurf.js
*	@author		JeanMax / SiC-666 / Dark-f
*	@contributors	Alogwe, Imba, Kolton, Larryw, Noah, QQValpen, Sam, YGM
*	@desc		Questing, Leveling & Smurfing
*	@version	2019
*/

function AutoSmurf() {
	// USER SETTINGS
	// -------- Normal Difficulty -------------
	var caveLvl = 7,
		tristLvl = 16,
		tombsLvl = 26,
		mephLvl = 26,
		diaLvl = 30,
		baalLvl = 48,
	// -------- Nightmare Difficulty ----------
		mephLvlnm = 48,
		diaLvlnm = 54,
		mfLvlnm = 66,
		baalLvlnm = 77,
	// ---------- Hell Difficulty --------------
		mephLvlhell = 77,
		diaLvlhell = 79,
		mfLvlhell = 86,

	// Config.AutoSmurf.AllTeamProfiles;

	//-------------------be-sure-of-what-you-edit-under-this-line--------------------------------------------//
		placeToBe, teamBrain, nickTP,
		otherChar = false, // SiC-666 TODO: Change this to follower.
		teleportingSorc = false, // SiC-666 TODO: Change this to Leader (should be able to teleport).
		boBarb = false, // SiC-666 TODO: Change this name?
		readyCount = 0,
		iAmReady,
		teamIsReady,
		teamWaypoints = [], // Needs to be a global variable.
		myWaypoints = [], // Needs to be a global variable.
		waypointsToShare = {}, // Needs to be a global variable.
		waypointsToReceive = [], // Needs to be a global variable.
		waypointAreas = [0x03,0x04,0x05,0x06,0x1b,0x1d,0x20,0x23,0x30,0x2a,0x39,0x2b,0x2c,0x34,0x4a,0x2e,0x4c,0x4d,0x4e,0x4f,0x50,0x51,0x53,0x65,0x6a,0x6b,0x6f,0x70,0x71,0x73,0x7b,0x75,0x76,0x81], // Needs to be a global variable.
		whereIwas,
		toldBarb = false,
		boed = 0,
		atWPCount = 0,
		readyToDrink = 0,
		cube = false,
		getCube = false,
		amulet = false,
		summoner = false,
		tombs = false,
		radament = false,
		killRadament = false,
		LamEssen = false,
		clearOrifice = false,
		duriel = false,
		travincal = false,
		teamFigurine = false,
		figurine = false,
		mephisto = false,
		redPortal = false,
		readyToKillDiablo = 0,
		potion = me.getItem(545),
		coolStuff = me.getItem(552) ? me.getItem(552) : me.getItem(646), // Book of Skill from Radament or Scroll of Resistance from Malah.
		teamScroll = 0,
		teamFlail = 0,
		teamStaff = 0,
		teamStaff2 = 0,
		boing = 0,
		goBo = 0,
		pick = 0,
		give = 0,
		wait = 0,
		ok = 1,
		mercid = [];

	Messaging.sendToList = function (list, message, mode=55) {
		return list.forEach((profileName) => {
			if (profileName.toLowerCase() != me.profile.toLowerCase()) {
				sendCopyData(null, profileName, mode, JSON.stringify({ nick: me.profile, msg: message }));
			}
		});
	};

	//TEAMS
	this.checkRole = function () { // Checks Config settings to determine role.
		if (Config.AutoSmurf.TeleportingSorc === me.name) {
			teleportingSorc = true;

			print("I am the Leader");

		} else if (Config.AutoSmurf.BoBarb === me.name) {
			boBarb = true;

			print("I am the BOer");
		} else {
			for (var i = 0 ; i < Config.AutoSmurf.OtherChars.length ; i += 1) {
				if (Config.AutoSmurf.OtherChars[i] === me.name) {
					otherChar = true;

					print("I am a Follower");

					break;
				}
			}

			if (!otherChar) {
				print("I am not assigned a role in my Config file. Please rectify this omission and restart."); // SiC-666 TODO: Make this red text or throw an error instead.

				while(true) {
					delay(1000);
				}
			}
		}
	};

	this.start = function () {
		var i, tpTome, item,
			questStuff = [91, 92, 173, 174, 521, 524, 525, 553, 554, 555]; // SiC-666 TODO: Check to make sure this includes all quest items that need to be moved to Stash. (Don't need Horadric Cube in this list?)

		print("starting");

		Town.doChores();

		// Check and use quest items that might be left over from the previous game
		if (coolStuff) {
			if (!Town.openStash()) {
				Town.move("stash");
				Town.openStash();
			}

			clickItem(1, coolStuff);

			delay(me.ping);

			me.cancel();
		}

		for (var i = 0 ; i < questStuff.length ; i += 1) {
			item = me.getItem(questStuff[i]);

			if (item && item.location !==7 && item.location !== 6 && Storage.Stash.CanFit(item)) { // Have the item and it's not in Stash or Cube and it can fit in Stash.
				Storage.Stash.MoveTo(i); // SiC-666 TODO: Improve this by trying to move the item more than once?

				delay(me.ping * 2 + 500);
			}
		}

		//moving to last act before party check
		if (!me.getQuest(7, 0) && (me.getQuest(6, 0) || me.getQuest(6, 1))) {
			Pickit.pickItems();
			this.changeAct(2);
		}
		if (!me.getQuest(15, 0) && me.getQuest(7, 0)) { // if andy done, but not duriel		say(" Here ****** 2 ");
			Town.goToTown(2);
		}
		if (!me.getQuest(15, 0) && (me.getQuest(14, 0) || me.getQuest(14, 1) || me.getQuest(14, 3) || me.getQuest(14, 4))) {
			Pickit.pickItems();
			this.changeAct(3);	//getQuest, (14, 0) = completed (talked to meshif), (14, 3) = talked to tyrael, (14, 4) = talked to jerhyn (<3 Imba)
		}
		if (!me.getQuest(23, 0) && me.getQuest(15, 0)) { // if duriel done, but not meph
			Town.goToTown(3);
		}
		if (!me.getQuest(28, 0) && me.getQuest(23, 0) ) { // if meph done, but not diablo
			Town.goToTown(4);
		}
		if (!me.getQuest(28, 0) && (me.getQuest(26, 0) || me.getQuest(26, 1))) {
			Pickit.pickItems();
			this.changeAct(5);
		}
		if (me.getQuest(28, 0)) { // if diablo done
			Town.goToTown(5);
		}

		Pather.useWaypoint(null); // Will walk to and interact with waypoint.

		Pather.moveTo(me.x + rand(-5, 5), me.y + rand(-5, 5)); // Move off of waypoint so others can reach it.

		whereIwas = me.area;

		this.removeUnwearableItems();
		/*
		getScript("tools/Party.js").resume();

		while(!this.partyReady()) { // Wait for everyone to join party.
			delay(1000);
		}
		*/

		iAmReady = true; // Prevents premature teamIsReady announcment.

		print("I am ready");

		//D2Bot.shoutGlobal(me.realm + " " + me.gamename + " ready", 69);

		Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "ready");

		// Dark-f ->
		if ( iAmReady && Config.AutoSmurf.TeamSize === 1 ) {
			teamIsReady = true;

			print("Team is ready! Telling others :)");

			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "team is ready");
		}
		// <- Dark-f

		while (!teamIsReady) {
			delay(500);
		}

		//misc : starting & teams
		var lowestAct, // Doesn't need to be a global variable, but must be declared when all players are in their highest Act.
			startSharing = this.partyLevel(6); // Doesn't need to be a global variable.

		while (!lowestAct) { // Wait for everyone to get back to their Town, then record the lowest Town.
			lowestAct = this.partyAct();

			delay(250);
		}

		print("startSharing: " + startSharing + " lowestAct: " + lowestAct);

		if (me.findItem(546) || me.findItem(547) || potion || me.getQuest(20, 1)) { // Have A Jade Figurine, The Golden Bird or the Potion of Life or need to Return to Alkor for Reward. Tell the Teleporting Sorc so she gets us to process it.
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "team figurine");

			teamFigurine = true;
		}
		if (boBarb && me.charlvl >= 24) { //announce bo
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "bo");
		}
		if (me.gold < Config.LowGold) { //teamGold - ask
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "GimmeGold");
		}
		if (me.getItem(524) || me.getItem(525)) {	 //teamscroll
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "GotScroll");
		}
		if (me.getItem(92)) { //teamStaff
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "GotStaff");
		}
		if (me.getItem(91)) {	 //teamStaff2
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "GotThePower");
		}
		if ((me.getItem(553) && me.getItem(554) && me.getItem(555)) || me.getItem(174)) {	 //teamflail
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "ReadyForTravincal");
		}
		if (me.getItem(555)) {	 //teambrain
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "GotBrain");
		}
		if (!teleportingSorc) { // I'm a follower.
			if (!me.getItem(549) && me.area === 40) { // Don't have cube, am in Act 2.
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "need cube");
			}
		}
	//-----------------Assembling myWaypoints & Saying In Game--------------------
		var myWaypointsString = "Have: "; // Does not need to be a global variable.

		for (var i = 1 ; i < (me.gametype ? 39 : 30) ; i += 1) { // In Expansion, there are 39 waypoints in total (34 that need to be acquired). In Classic, there are 30 waypoints in total (26 that need to be acquired).
			myWaypoints.push(getWaypoint(i) ? 1 : 0);

			if (i === 8 || i === 17 || i === 26 || i === 29) { // Skip Town Waypoints (0,9,18,27,30).
				i += 1;
			}
		}

	//	print("myWaypoints length: " + myWaypoints.length); // Should be 34 in Expansion and 26 in Classic.

		for (var i = 0 ; i < myWaypoints.length ; i += 1) {
			myWaypointsString += myWaypoints[i];
		}

		Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, myWaypointsString); // Announce my Waypoint possession values.

	//---------------------End Announcing myWaypoints---------------------

		var j = 0;

		while (teamWaypoints.length !== Config.AutoSmurf.TeamSize - 1) { // Wait for everyone's Waypoint data to be shared and recorded (excluding my own). This will ensure all verbal communications have been processed before proceeding.
			delay(250);

			if (j % 20 == 0) { // Check for Team Members every 5 seconds.
				this.teamInGame();
			}

			j += 1;
		}

		if (pick ===1) { //teamGold - pick
			this.receiveGold();
		}
		if (give ===1) { //teamGold - give
			this.giveGold();
		}

		Town.doChores();

	//---------------------Assembling waypointsToReceive & waypointsToShare---------------------
		for (var i = 0 ; i < myWaypoints.length ; i += 1) { 		// Loop thru the myWaypoints list.
			if (startSharing &&										// Team Members need to be at least Level 8, otherwise they might not have a Town Portal Tome.
					i < 8 || 										// Cold Plains thru Catacombs Level 2 have no additional requirements.
					(i >= 8 && i <= 15 && lowestAct > 1) ||			// Sewers Level 2 thru Canyon Of The Magi requires at least Act 2.
					(i >= 16 && i <= 23 && lowestAct > 2) ||		// Spider Forest thru Durance Of Hate Level 2 requires at least Act 3.
					((i === 24 || i === 25) && lowestAct > 3) ||	// City Of The Damned and River Of Flame require at least Act 4.
					(i >= 26 && i <= 33 && lowestAct > 4)) {		// Frigid Highlands thru Worldstone Keep Level 2 requires Act 5.
				if (myWaypoints[i]) { // I have the waypoint.
					for (var j = 0 ; j < teamWaypoints.length ; j += 1) { 	// Loop thru the list of Team Members.
						if (!Number(teamWaypoints[j][i + 1])) { 			// This Team Member is missing the Waypoint (skip Team Member's name by using i + 1).
							if (!waypointsToShare.hasOwnProperty(i)) { 		// The waypointAreas index value isn't an element in the share list object yet.
																			// Example waypointsToShare = {"15" : ["Player1", "Player2", "Player3"]}; Canyon Of The Magi needs to be shared with three players.
								waypointsToShare[i] = []; 					// Add the waypointAreas index value to the share list as an element that contains an array.
							}

							waypointsToShare[i].push(teamWaypoints[j][0]); // Add the Team Member's name to the array to record how many others need to get it from me.
						}
					}
				} else { 	// I don't have the waypoint. Add it to a list of waypoints to receive.
					for (var j = 0 ; j < teamWaypoints.length ; j += 1) { 	// Loop thru the list of Team Members.
						if (Number(teamWaypoints[j][i + 1])) { // This Team Member has the Waypoint (skip Team Member's name by using i + 1).
							waypointsToReceive.push(i); // Add the waypointAreas index value to the receive list.

							break; // Only need to add to the receive list once.
						}
					}
				}
			}
		}
	//---------------------Process Give/Receive Lists---------------------
		print("Start sharing Waypoints.");

		for (i in waypointsToShare) {
			print("Current waypointsToShare element: " + i);

			while (waypointsToReceive.length) {
				print("waypointsToReceive: " + waypointsToReceive[0]);

				if (Number(i) < waypointsToReceive[0]) { // Convert waypointsToShare element to a number (it is a string at this point) and compare it to the number in waypointsToReceive[0].
					break; // Exit while loop because we need to share a Waypoint before receiving this one (waypointsToShare element is a lower waypointAreas index than the lowest waypointAreas index in the waypointsToReceive array).
				}

				this.receiveWaypoint(waypointsToReceive.shift()); // Cut the lowest waypointAreas index from the waypointsToReceive array.
			}

			if (!me.findItem(518)) { // No Tome of Town Portal.
				if (me.area !== 1) {
					Pather.useWaypoint(1);
				}

				Town.move(NPC.Akara);

				var akara = getUnit(1, NPC.Akara);

				if (akara) {
					akara.startTrade();

					var scroll = akara.getItem(529);

					scroll.buy(); // Buy Scroll of Town Portal from Akara.

					me.cancel();
				}
			}

			Pather.useWaypoint(waypointAreas[i]); // Go to the Waypoint that needs to be given to other players.

			var portal = getUnit(2, 59); // A Town Portal at this stage means someone else is already sharing the Waypoint.

			if (!portal) { // Don't share this Waypoint if someone else is already.
				var player,
					playerList = waypointsToShare[i],
					finishedPlayerCount = Config.AutoSmurf.TeamSize - playerList.length;

				print("Sharing a Waypoint in area: " + waypointAreas[i]);

				print("playerList.length: " + playerList.length + " finishedPlayerCount: " + finishedPlayerCount);

				if (me.findItem(518)) {
					Pather.makePortal(); // SiC-666 TODO: Buy more scrolls if needed. Pather will throw an error if there are no scrolls in Tomb.
				} else {
					scroll = me.findItem(529);

					if (scroll) {
						scroll.interact(); // Use a Scroll of Town Portal.
					}
				}

				for (var j = 0 ; j <100 ; j += 1) { //Here is some wrong, it is too long time to wait. Dark-f < 720 ; j += 1) { // Wait up to 3 minutes Team Members to grab the Waypoint.
					if (playerList.length === 0) { //Dark-f: && Misc.getNearbyPlayerCount() <= finishedPlayerCount) {
						break;
					}

					delay(250);

					if (j % 20 == 0) { // Check for Team Members every 5 seconds.
						this.teamInGame();
					}

					player = getUnit(0); // Get nearby player unit.

					do {
						if (player.name !== me.name) {
							//print("player name is" + player.name);
							if (playerList.indexOf(player.name) > -1) { // Player's name is on the list of players needing this Waypoint.
								playerList.splice(playerList.indexOf(player.name), 1); // Remove player's name from the list.
							}
						}
					} while (player.getNext()); // Loop thru all nearby player units.
				}
			}
		}

		print("Done sharing Waypoints. Start receiving Waypoints.");

		print("waypointsToReceive.length: " + waypointsToReceive.length);

		while (waypointsToReceive.length) { // Receive any remaining Waypoints.
			print("waypointsToReceive: " + waypointsToReceive[0]);

			this.receiveWaypoint(waypointsToReceive.shift()); // Cut the lowest waypointAreas index from the waypointsToReceive array.
		}

		if (me.area !== whereIwas) { // Did share/receive something.
			Pather.useWaypoint(whereIwas); // All done sharing/receiving! Return to original town.

			delay(5000); // Allow the Waypointer Giver a moment to come back to Town.
		}

		print("Done receiving Waypoints.");
	//---------------------End Waypoint Sharing---------------------
		if (boing ===1 && !boBarb) { //being bo
			this.beBo();
		}
		if (boBarb && me.charlvl >= 24) { //giving bo
			this.giveBo();
		}
		/*
		if ((me.gold < Config.LowGold/10) && me.charlvl > 15) {
			tpTome = me.findItem("tbk", 0, 3);
			if (!tpTome || !tpTome.getStat(70)) {
				D2Bot.printToConsole("I'm broken :/");
				print("I'm broken :/");
				// delay(10000);
			}
		}
		*/
		return true;
	};

	this.giveTP = function (nick) {
		print("giving TP");
		//(<3 kolton)

		if (!this.nickList) {
			this.nickList = {};
		}
		if (!this.nickList[nick]) {
			this.nickList[nick] = {
				timer: 0
			};
		}

		if (getTickCount() - this.nickList[nick].timer < 60000) {
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "I can only make one Tp per minute ):");
			return false;
		}
		Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "Here you go :)");
		if (me.area !==120) {
			if (!Pather.makePortal()) {
				throw new Error("giveTP: Failed to make TP");
			}
			this.nickList[nick].timer = getTickCount();
		}
		return true;
	};

	function chatEvent(nick, msg) {
		if (nick !== me.name)  {
			switch (msg) {
			case "ready":
				readyCount += 1;

				print("readyCount = " + readyCount);

				if (iAmReady && readyCount === Config.AutoSmurf.TeamSize - 1) { // Doesn't count my ready because my messages are ignored. Subtract one from TeamSize to account for this.
					if (!teamIsReady) { // Only need to change teamIsReady to true once.
						teamIsReady = true;

						print("Team is ready! Telling others :)");

						Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "team is ready");
					}
				}
				break;
			case "team is ready":
				if (!teamIsReady) { // Only need to change teamIsReady to true once.
					teamIsReady = true;
					print("Received team is ready!");
				}
				break;
			case "at waypoint":
				atWPCount += 1;
				print("atWPCount = " + atWPCount);
				break;
			case "ready to drink":
				readyToDrink += 1;
				print("readyToDrink = " + readyToDrink);
				break;
			case "cube":
				cube = true;
				break;
			case "need cube":
				getCube = true;
				break;
			case "amulet":
				amulet = true;
				break;
			case "summoner":
				summoner = true;
				break;
			case "tombs":
				tombs = true;
				break;
			case "radament":
				radament = true;
				break;
			case "kill radament":
				killRadament = true;
				break;
			case "clear orifice":
				clearOrifice = true;
				break;
			case "duriel":
				duriel = true;
				break;
			case "travincal":
				travincal = true;
				break;
			case "team figurine":
				teamFigurine = true;
				break;
			case "figurine":
				figurine = true;
				break;
			case "Lam Essen":
				LamEssen = true;
				break;
			case "mephisto":
				mephisto = true;
				break;
			case "red portal":
				redPortal = true;
				break;
			case "ready to kill diablo":
				readyToKillDiablo += 1;

				print("readyToKillDiablo = " + readyToKillDiablo);

				break;
			case "master":
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, nick + " is my master.");
				break;
			case "smurf":
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "Smurf!");
				break;
			case "WaitMe":
				wait = 1;
				break;
			case "hi":
			case "yo!":
			case "hello":
			case "hey":
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "yo");
				break;
			case "I'm here!":
				ok += 1;
				break;
			case "bo":
				boing = 1;
				break;
			case "I'm bored -.-":
				goBo = 1;
				break;
			case "I'm Boed!":
				boed +=  1;
				break;
			case "Ok Bitch":
				if (me.gold < Config.LowGold) {
					pick = 1;
				}
				break;
			case "GimmeGold":
				if (me.gold > Config.LowGold * 2 + 100) {
					Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "Ok Bitch");
					give = 1;
				}
				break;
			case "TP":
			case "Tp":
			case "tp":
			case "portal":
			case "tp plz":
				nickTP = nick;
				this.giveTP(nickTP);
				nickTP = false;
				break;
			case "ReadyForTravincal":
				teamFlail = 1;
				break;
			case "GotScroll":
				teamScroll = 1;
				break;
			case "GotStaff":
				teamStaff = 1;
				break;
			case "GotThePower":
				teamStaff2 = 1;
				break;
			case "GotBrain":
				teamBrain = 1;
				break;
			case (msg.match("Have: ") ? msg : null): // We're comparing if that case's value is equal to our switch term. Thus, if the msg contains "Have: " compare msg to msg (do case), otherwise compare msg to null (don't do case).
				msg = msg.split("Have: ")[1].split(""); // Change msg from a string to an array of 0's and 1's representing waypoint possession.

				msg.unshift(nick); // Add the waypoint owner's name to the front of the array.

				teamWaypoints.push(msg); // Record the Team Member's list of Waypoint possession values. SiC-666 TODO: Should we check to make sure this character's waypoints hasn't been previously recorded?

				break;
			}
		}
	};

	this.playerIn = function (area) {
		if (!area) {
			area = me.area;
		}

		var count = 1,
			party = getParty(); //this is actually counting in game players(you included), not in party

		if (party) {
			do {
				if ( party.area === area ) { //counting players rdy
					count += 1;
				}
			} while (party.getNext());
		}

		if (count < Config.AutoSmurf.TeamSize) {
			return false;
		}

		return true;
	};

	this.needToKeepWaiting = function (area) { // Wait for party members to be in specified area.
		var myPartyId,
			result = false,
			player = getParty();

		if (arguments.length < 1) {
			throw new Error("AutoSmurf.needToKeepWaiting: No area argument supplied.");
		}

		if (player) {
			myPartyId = player.partyid;

			while (player.getNext()) {
				if (player.partyid === myPartyId) {
					if (player.area !== area) {
						result = true; // Someone is still not in specified area. Need to keep waiting.
					}
				}
			}
		} else {
			result = true; // getParty() didn't return anything. Need to keep waiting.
		}

		return result;
	};

	this.waitForPartyMembers = function (area) {
		var tick = getTickCount(),
			orgx = me.x,
			orgy = me.y;

		print("Waiting for Party Members.");

		if (arguments.length < 1) {
			area = me.area;
		}

		while (this.needToKeepWaiting(area)) {
			if (!me.inTown) {
				Attack.clear(15);

				Pather.moveTo(orgx, orgy);
			}

			delay(1000);

			if (getTickCount() - tick > 10 * 60 * 1000) { // Quit after 10 minutes of waiting.
				quit();
			}
		}
	};

	this.waitForPartyMembersByWaypoint = function () {
		var tick = getTickCount(),
			orgx = me.x,
			orgy = me.y;

		print("Waiting for Party Members by Waypoint.");

		while (atWPCount !== Config.AutoSmurf.TeamSize - 1) {
			Attack.clear(15);

			Pather.moveTo(orgx, orgy);

			delay(1000);

			if (getTickCount() - tick > 10 * 60 * 1000) { // Quit after 10 minutes of waiting.
				quit();
			}
		}
	};

	this.getLeaderUnit = function (name) {
		var player = getUnit(0, name);

		if (player) {
			do {
				if (!player.dead) {
					return player;
				}
			} while (player.getNext());
		}

		return false;
	};

	this.closeLeader = function () {
		var leader = this.getLeaderUnit(Config.AutoSmurf.TeleportingSorc);
		if (leader) {
			if (boBarb) {
				if (me.area != leader.area)
					return false;
				var count = 0;
				while( getDistance(me, leader) > 3 ) {
					if (!Pather.moveTo(leader.x + 1, leader.y, 5))
						Pather.moveTo(leader.x, leader.y + 1, 5);
					count += 1;
					if (count > 5)
						break;
				}
			}
			return true;
		}
		return false;
	};

	this.teamInGame = function (stayInGame) { // Counts all the players in game. If the number of players is below TeamSize either return false or quit game depending on input.
		var i, player,
			count = 0;

		if (stayInGame === undefined) {
			stayInGame = false;
		}

		for (i = 0 ; i < 30 ; i += 1) { // Try 30 times because getParty(); can fail once in a while.
			player = getParty();

			if (player) {
				do {
					count += 1;
				} while (player.getNext());

				break;
			}

			delay(250);
		}

		if (count < Config.AutoSmurf.TeamSize) {
			return stayInGame ? false : quit(); // Return false if stayInGame is true, otherwise leave game.
		}

		return true;
	};

	this.partyLevel = function (level) {
		if (!level) {
			level = me.charlvl;
		}

		var i, player;

		for (i = 0 ; i < 30 ; i += 1) { // Try 30 times because getParty(); can fail once in a while.
			player = getParty();

			if (player) {
				do {
					if (player.level < level) { // Player is not ready.
						return false;
					}
				} while (player.getNext());

				return true;
			}

			delay(250);
		}

		return false;
	};

	this.partyAct = function () { // Cycles thru getParty() and returns the lowest Act (i.e., 1-5) the partied characters are in. Quits if noone is partied. Returns false is someone isn't in a Town.
		var i, player, myPartyID, area,
			lowestAct = 5;

		// Dark-f ->
		if (Config.AutoSmurf.TeamSize === 1) {
			lowestAct = [-1, 1, 40, 75, 103, 109].indexOf(me.area);
			return lowestAct;
		}
		// <- Dark-f

		for (i = 0 ; i < 30 ; i += 1) { // Try 30 times because getParty(); can fail once in a while.
			player = getParty();

			if (player) {
				myPartyID = player.partyid;

				if (myPartyID === 65535) { // Noone in my Party. Probably a good idea to quit. . .
					throw new Error("AutoSmurf.partyAct: Noone in my Party.");
				}

				while (player.getNext()) {
					if (player.partyid === myPartyID) { // Only check characters in a Party with me.
						area = [-1, 1, 40, 75, 103, 109].indexOf(player.area);

						if (area === -1) { // Player isn't in a Town.
							return false;
						}

						if (area < lowestAct) {
							lowestAct = area;
						}
					}
				}

				break;
			}

			delay(250);
		}

		return lowestAct;
	};

	this.receiveGold = function () {
		var i, goldPile;

		Town.move("stash");

		if (me.getStat(14)) {
			Town.openStash();

			gold(me.getStat(14), 3); // Stash my Gold to make sure I have room to pick more up.

			delay(me.ping * 2 + 500);

			me.cancel();
		}

		for (i = 0; i < 20; i += 1) { // Wait up to 20 seconds for someone to drop Gold for me to pick up.
			goldPile = getUnit(4, 523, 3);

			delay(1000);

			if (goldPile) {
				Pickit.pickItem(goldPile);
			}

			if (me.getStat(14)) {
				Town.openStash();

				gold(me.getStat(14), 3); // Stash my Gold.

				delay(me.ping * 2 + 500);

				me.cancel();
			}
		}
	};

	this.giveGold = function () {
		var i, goldPile,
			dropAmmount = (me.gold - (Config.LowGold * 2)) / 2, // Keep some Gold for myself.
			maxDropAmmount = me.charlvl * 1e4; // The maximum ammount of Gold that can be dropped at once.

		Town.move("stash");

		Town.openStash();

		gold(me.getStat(14), 3); // Stash my Gold.

		delay(me.ping * 2 + 500);

		dropAmmount = dropAmmount > maxDropAmmount ? maxDropAmmount : dropAmmount; // If dropAmmount is greater than maxDropAmmount override it.

		dropAmmount = dropAmmount + me.getStat(14) > maxDropAmmount ? maxDropAmmount - me.getStat(14) : dropAmmount; // Handle residual Gold in Inventory screen (shouldn't ever be an issue, but let's be cautious).

		print("Dropping " + Math.round(dropAmmount) + " Gold.");

		gold(Math.round(dropAmmount), 4); // Remove Gold from Stash (must be a round number).
/*
		for (i = 0 ; i < 50 ; i += 1) { // Wait up to two seconds. SiC-666 TODO: Does this not wait long enough and lead to C/I sometimes?
			delay(40);

			if (me.getStat(14)) { // Once Gold has moved to Inventory, exit loop.
				break;
			}
		}
*/
		delay(me.ping * 2 + 500);

		while (me.getStat(14)) {
			gold(me.getStat(14)); // Drop Gold

			delay(me.ping * 2 + 500);
		}

		me.cancel();

		for (i = 0 ; i < 20 ; i += 1) { // Wait 20 seconds for someone to pick up the Gold I've dropped.
			delay(1000);

			goldPile = getUnit(4, 523, 3);

			if (!goldPile) {
				break;
			}

			if (i === 19 && goldPile) {
				Pickit.pickItem(goldPile);
			}
		}
	};

	this.receiveWaypoint = function (index) {
		var townArea;

		print("Receiving Waypoint in area: " + waypointAreas[index]);

		if (!me.inTown) {
			Pather.usePortal(null, null); // Attempt taking an existing Town Portal back before using the Waypoint (saves walking to the portal spot).
		}

		if (index < 8) { // Go to the correct Town as determined by the waypointAreas index value.
			townArea = 1;
		} else if (index < 16) {
			townArea = 40;
		} else if (index < 24) {
			townArea = 75;
		} else if (index < 26) {
			townArea = 103;
		} else {
			townArea = 109;
		}

		if (me.area !== townArea) { // Either the attempt to take a Portal back to Town was unsuccessful or the next Waypoint is in a different Act.
			Pather.useWaypoint(townArea);
		}

		if ((index === 13 || index === 14) && !me.getQuest(11 , 0)) { // Palace Cellar Level 1 & Arcane Sanctuary both require completion of The Tainted Sun.
			var drognan;

			while (!drognan || !drognan.openMenu()) { // Try more than once to interact with Drognan.
				Packet.flash(me.gid);

				Town.move(NPC.Drognan);

				drognan = getUnit(1, NPC.Drognan);

				delay(1000);
			}
		}

		if (index === 15 && !me.getQuest(13, 0)) { // Canyon Of The Magi requires completion of The Summoner.
			var cain;

			while (!cain || !cain.openMenu()) { // Try more than once to interact with Deckard Cain.
				Packet.flash(me.gid);

				Town.move(NPC.Cain);

				cain = getUnit(1, NPC.Cain);

				delay(1000);
			}
		}

		if (index === 23 && !me.getQuest(21, 0)) { // Durance Of Hate Level 2 requires completion of The Blackened Temple.
			var cain;

			while (!cain || !cain.openMenu()) { // Try more than once to interact with Deckard Cain.
				Packet.flash(me.gid);

				Town.move(NPC.Cain);

				cain = getUnit(1, NPC.Cain);

				delay(1000);
			}
		}

		// if (index === 33 && me.getQuest(39, 0)) { // SiC-666 TODO: Worldstone Keep Level 2 requires the completion of Rite of Passage, but talking to someone won't help. Is there anything that would help if this situation arises?

		Town.move("portalspot");

		for (var j = 0 ; j < 720 ; j += 1) { // Wait up to 3 minutes for a Town Portal to the Waypoint.
			if (Pather.usePortal(waypointAreas[index], null)) {
				break;
			}

			delay(250);

			if (j % 20 == 0) { // Check for Team Members every 5 seconds.
				this.teamInGame();
			}
		}

		this.clickWP();
	};

	this.giveBo = function () {
		var orgX, orgY;

		print("giving bo");

		var i;

		if (!Pather.accessToAct(2)) {
			Town.goToTown(1);

			while (me.area === 1) { // Be sure to enter Blood Moor.
				Pather.moveToExit(2, true, false);

				delay(me.ping * 2 + 250);

				Packet.flash(me.gid);

				delay(me.ping * 2 + 250);
			}
		} else {
			if (me.getQuest(25, 0) && !getWaypoint(29)) { // Have completed The Fallen Angel and don't have River Of Flame Waypoint.
				Town.goToTown(4);

				me.overhead("Smurfing the waypoint");

				Town.move("portalspot");

				while (!Pather.usePortal(107, null)) {
					Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "tp");

					delay(10000);
				}

				Config.ClearType = false;

				this.clickWP();
			} else if (!me.getQuest(25, 0) && !getWaypoint(8)) { // Haven't completed The Fallen Angel and don't have Catacombs Level 2.
				Town.goToTown(1);

				me.overhead("Smurfing the waypoint");

				Town.move("portalspot");

				while (!Pather.usePortal(35, null)) {
					Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "tp");

					delay(10000);
				}

				Config.ClearType = false;

				this.clickWP();
			} else {
				me.getQuest(25, 0) ? Pather.useWaypoint(107) : Pather.useWaypoint(35);
			}

			var waypoint;

			while (!waypoint) {
				waypoint = getUnit(2, "waypoint");

				delay(250);
			}

			while (getDistance(me, waypoint) < 5) { // Be sure to move off the waypoint.
				Pather.walkTo(me.x + rand(5, 15), me.y);

				delay(me.ping * 2 + 500);

				Packet.flash(me.gid);

				delay(me.ping * 2 + 500);
			}
		}

		this.waitForPartyMembers();

		for (i=0 ; i<3 ; i+=1 ) {
			if (boed === (Config.AutoSmurf.TeamSize - 1)) {
				break;
			}
			this.closeLeader();
			Precast.doPrecast(true);
			this.Bo();
			delay(3000);
		}
		Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "I'm bored -.-");

		if (!Pather.accessToAct(2)) {
			if (!Pather.moveToExit(1, true)) {
				Town.goToTown();
			}
			Town.move("waypoint");
		}else{
			Pather.useWaypoint(whereIwas);
		}

		return true;
	};

	this.beBo = function () {
		var orgX, orgY;

		print("being bo");

		if (!Pather.accessToAct(2)) {
			Town.goToTown(1);

			while (me.area === 1) { // Be sure to enter Blood Moor.
				Pather.moveToExit(2, true, false);

				delay(me.ping * 2 + 250);

				Packet.flash(me.gid);

				delay(me.ping * 2 + 250);
			}
		} else {
			if (me.getQuest(25, 0) && !getWaypoint(29)) { // Have completed The Fallen Angel and don't have River Of Flame Waypoint.
				Town.goToTown(4);

				me.overhead("Smurfing the waypoint");

				Town.move("portalspot");

				while (!Pather.usePortal(107, null)) {
					Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "tp");

					delay(10000);
				}

				Config.ClearType = false;

				this.clickWP();
			} else if (!me.getQuest(25, 0) && !getWaypoint(8)) { // Haven't completed The Fallen Angel and don't have Catacombs Level 2.
				Town.goToTown(1);

				me.overhead("Smurfing the waypoint");

				Town.move("portalspot");

				while (!Pather.usePortal(35, null)) {
					Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "tp");

					delay(10000);
				}

				Config.ClearType = false;

				this.clickWP();
			} else {
				me.getQuest(25, 0) ? Pather.useWaypoint(107) : Pather.useWaypoint(35);
			}

			var waypoint;

			while (!waypoint) {
				waypoint = getUnit(2, "waypoint");

				delay(250);
			}

			while (getDistance(me, waypoint) < 5) { // Be sure to move off the waypoint.
				Pather.walkTo(me.x + rand(5, 15), me.y);

				delay(me.ping * 2 + 500);

				Packet.flash(me.gid);

				delay(me.ping * 2 + 500);
			}
		}

		this.waitForPartyMembers();

		var j = 0;

		while (goBo !== 1) {
			delay(250);

			if (!toldBarb && me.getState(32) && me.getState(26)) {
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "I'm Boed!");

				toldBarb = true;
			}

			if (j % 20 == 0) { // Check for Team Members every 5 seconds.
				this.teamInGame();
			}

			j += 1;
		}

		if (!Pather.accessToAct(2)) {
			if (!Pather.moveToExit(1, true)) {
				Town.goToTown();
			}

			Town.move("waypoint");
		} else {
			Pather.useWaypoint(whereIwas);
		}

		return true;
	};

	this.Bo = function () { //Dark-f ->
		this.closeLeader();
		if (boBarb) {
			if (me.getSkill(138))
				Skill.Cast(138, 0);
			if (me.getSkill(146))
				Skill.Cast(146, 0);
			if (me.getSkill(155))
				Skill.Cast(155, 0);
			if (me.getSkill(149))
				Skill.Cast(149, 0);
		} else
			delay(2000);
		return true;
	};

	//PATHING
	this.clearToExit = function (currentarea, targetarea, cleartype) { // SiC-666 TODO: add moving to exit without clearing after XX minutes.
		print("Start clearToExit");

		print("Currently in: " + Pather.getAreaName(me.area));
		print("Currentarea arg: " + Pather.getAreaName(me.area));

		delay(250);
		print("Clearing to: " + Pather.getAreaName(targetarea));
		while (me.area == currentarea) {
			try {
				Pather.moveToExit(targetarea, true, cleartype);
			} catch (e) {
				print("Caught Error.");

				print(e);
			}

			Packet.flash(me.gid);

			delay(me.ping * 2 + 500);
		}

		print("End clearToExit");
	};

	this.travel = function (goal) { // 0->9, a custom waypoint getter function
		var i, homeTown, nextAreaIndex, oldClearType, target, destination, unit,
			wpAreas = [],
			areaIDs = [];

		oldClearType = Config.ClearType;

		switch (goal) { // Don't teleport until after Lost City (Act 2) if in normal difficulty
		case 0:
		case 1:
		case 2:
		case 3:
			if (me.diff===0) {
				Pather.teleport = false;
			} else {
				Pather.teleport = true;
			}

			break;
		default:
			Pather.teleport = true;
		}

		switch (goal) {
		case 0:
			destination = 5; // Dark Wood
			wpAreas = [1, 3, 4, 5];
			areaIDs = [2, 3, 4, 10, 5];
			homeTown = 1;
			break;
		case 1:
			destination = 35; // Catacombs Level 2
			wpAreas = [1, 3, 4, 5, 6, 27, 29, 32, 35];
			areaIDs = [2, 3, 4, 10, 5, 6, 7, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
			homeTown = 1;
			break;
		case 2:
			destination = 57; // Halls Of The Dead Level 2
			wpAreas = [42, 57]; // Dry Hills, Halls Of The Dead Level 2
			areaIDs = [41, 42, 56, 57]; // Rocky Waste, Dry Hills, Halls Of The Dead Level 1, Halls Of The Dead Level 2
			homeTown = 40;
			break;
		case 3:
			destination = 44; // Lost City
			wpAreas = [42, 43, 44]; // Dry Hills, Far Oasis, Lost City
			areaIDs = [42, 43, 44]; // Dry Hills, Far Oasis, Lost City
			homeTown = 40;
			break;
		case 4:
			destination = 74; // Arcane Sanctuary
			wpAreas = [52, 74];
			areaIDs = [50, 51, 52, 53, 54, 74];
			homeTown = 40;
			break;
		case 5: // Canyon Of The Magi
			destination = 46;
			wpAreas = [52, 74, 46];
			areaIDs = [50, 51, 52, 53, 54, 74, 46];
			homeTown = 40;
			break;
		case 6:
			destination = 83; // Travincal
			wpAreas = [75, 76, 77, 78, 79, 80, 81, 83];
			areaIDs = [76, 77, 78, 79, 80, 81, 82, 83];
			homeTown = 75;
			break;
		case 7:
			destination = 101; // Durance Of Hate Level 2
			wpAreas = [75, 76, 77, 78, 79, 80, 81, 83, 101];
			areaIDs = [76, 77, 78, 79, 80, 81, 82, 83, 100, 101];
			homeTown = 75;
			break;
		case 8:
			destination = 107; // River Of Flame
			wpAreas = [103, 106, 107];
			areaIDs = [104, 105, 106, 107];
			homeTown = 103;
			break;
		case 9:
			destination = 118; // Ancient's Way
			wpAreas = [109, 111, 112, 113, 115, 117, 118];
			areaIDs = [110, 111, 112, 113, 115, 117, 118];
			homeTown = 109;
			break;
		case 10:
			destination = 129; // The Worldstone Keep Level 2
			wpAreas = [109, 111, 112, 113, 115, 117, 118, 129];
			areaIDs = [110, 111, 112, 113, 115, 117, 118, 120, 128, 129];
			homeTown = 109;
			break;
		}

		//print("Traveling to " + getArea(destination).name);

		Town.goToTown();

		Town.move("waypoint");

		//Pather.getWP(me.area); // SiC-666 Commented out because we shouldn't have to activate the waypoint in town before moving somewhere.

		target = Pather.plotCourse(destination, me.area); // Pather.plotCourse(destination area id, starting area id);
		nextAreaIndex = areaIDs.indexOf(target.course[0])+1; // Index of next area
		print("Travel course = " + target.course);

		if (nextAreaIndex < areaIDs.length) { // If next area index is invalid, return true.
			if (me.inTown && wpAreas.indexOf(target.course[0]) > -1 && // Use waypoint to first area if possible
				getWaypoint(wpAreas.indexOf(target.course[0]))) {
				Pather.useWaypoint(target.course[0]); // , !Pather.plotCourse_openedWpMenu); function useWaypoint(targetArea, check) check - force the waypoint menu
			}

			for (nextAreaIndex ; nextAreaIndex < areaIDs.length; nextAreaIndex += 1) {
				print("nextAreaIndex = " + nextAreaIndex);
				print("Next location name = " + getArea(areaIDs[nextAreaIndex]).name);

				if (Pather.teleport === true && me.charlvl >= 18) { // If allowed to teleport (determined by the switch above), skip killing monsters.
					Config.ClearType = false;
				}

				switch (areaIDs[nextAreaIndex]) { // Special actions for traveling to some areas
				case 100: // Durance of Hate Level 1
				case 101: // Durance of Hate Level 2
					try{
						Pather.moveToExit(areaIDs[nextAreaIndex], true, Config.ClearType);
					} catch(e) {
						print(e);

						Town.goToTown();

						this.mephisto();

						return true;
					}

					break;
				case 115: // Glacial Trail
				case 117: // Frozen Tundra
				case 118: // Ancient's Way
				case 120: // Arreat Summit
				case 128: // The Worldstone Keep Level 1
				case 129: // The Worldstone Keep Level 2
					try{
						Pather.moveToExit(areaIDs[nextAreaIndex], true, Config.ClearType);
					} catch(e) {
						print(e);

						Town.goToTown();

						Town.move("portalspot");

						delay(10000);

						print("Attempting to use any portal");

						while (!Pather.usePortal(129, null)) {
							delay(5000);
						}

						this.clickWP();

						Pather.moveToExit([128, 120, 118], true, Config.ClearType);

						this.clickWP();

						Pather.moveToExit(117, true, Config.ClearType);

						this.clickWP();

						Pather.moveToExit(115, true, Config.ClearType);

						this.clickWP();

						return true;
					}

					break;
				case 50: // Harem Level 1
					if (!Pather.moveToExit(50, true, false)) { // Only try up to three times to enter the Palace. Guard might be blocking the entrance.
						throw new Error("AutoSmurf.travel: Failed to enter the Palace in Act 2.");
					}

					break;
				case 53: // Palace Cellar Level 2
					if (me.diff === 0) {
						if (!Pather.useWaypoint(40)) {
							Town.goToTown(2);
						}

						Town.doChores();

						Pather.useWaypoint(52);
					}

					this.clearToExit(52, 53, Config.ClearType);

					break;
				case 74: // Arcane Sanctuary
					while (getDistance(me.x, me.y, 10073, 8670) > 10) {
						try {
							Pather.moveTo(10073, 8670, 3, false, false);
						} catch (e) {
							print("Caught Error.");

							print(e);
						}
					}

					Pather.usePortal(null);

					break;
				case 46: // Canyon Of The Magi
					try {
						this.summoner();
					} catch(e) {
						print(e);

						Town.goToTown();

						Town.move("portalspot");

						delay(10000);

						while (!Pather.usePortal(areaIDs[nextAreaIndex], null)) {
							delay(10000);

							Pather.usePortal(areaIDs[nextAreaIndex]-1, null);

							delay(10000);
						}

						if (me.area === areaIDs[nextAreaIndex]-1) {
							Pather.moveToExit(areaIDs[nextAreaIndex], true, Config.ClearType);
						}

						delay(me.ping);
					} finally {
						if (me.area !== areaIDs[nextAreaIndex]) {
							Town.goToTown();

							Town.move("portalspot");

							delay(10000);

							Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "tp");

							while (!Pather.usePortal(areaIDs[nextAreaIndex], null)) {
								delay(1000);
							}
						}
					}
					break;
				case 78: // Flayer Jungle
					Pather.getWP(78, false); // this.clearToExit() often fails when attempting to move from Great Marsh to Flayer Jungle.

					break;
				case 110: // Harrogath -> Bloody Foothills
					Pather.moveTo(5026, 5095);

					unit = getUnit(2, 449); // Gate

					if (unit) {
						for (i = 0; i < 10; i += 1) {
							if (unit.mode === 0) {
								sendPacket(1, 0x13, 4, unit.type, 4, unit.gid);
							}

							if (unit.mode === 2) {
								break;
							}

							delay(500);
						}
					}

					Pather.moveToExit(areaIDs[nextAreaIndex], true, Config.ClearType);

					break;
				default:
					if (goal <= 3 && me.diff === 0) { // If traveling in a group (all other goals are tele only).
						if (!me.inTown) {
							this.waitForPartyMembers();
						}
					}

					this.clearToExit(me.area, areaIDs[nextAreaIndex], Config.ClearType);
				}

				if (wpAreas.indexOf(areaIDs[nextAreaIndex]) > -1) { // Check if the next area (which we are now in) has a waypoint. If it does, grab it, go to town, wait for party, run chores, take waypoint, and wait for the party.
					this.clickWP();

					if (me.diff === 0 && (goal === 0 || goal === 1 || goal === 2 || goal === 3) && areaIDs[nextAreaIndex] != destination) { // Don't wait for team if the destination has been reached. (all desinations have a waypoint)
						print("start this.travel() waypoint wait");

						Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "at waypoint");

						this.waitForPartyMembersByWaypoint();

						atWPCount = 0;

						Pather.useWaypoint(homeTown);

						this.waitForPartyMembers(); // Wait for everyone to come to town. If Town.doChores() doesn't do anything it's possible to leave town while everyone is still trying to come to town.

						Town.doChores();

						Town.move("waypoint");

						Pather.useWaypoint(areaIDs[nextAreaIndex]);

						this.waitForPartyMembers();

						print("end this.travel() waypoint wait");
					}
				}
			}

			Pather.useWaypoint(homeTown); // Finishes in town. (all desinations have a waypoint)

			//Pather.teleport = false;

			Config.ClearType = oldClearType;
		}

		return true;
	};

	this.changeAct = function (act) {
		print("change Act " + act);

		var npc, time, tpTome,
			preArea = me.area;

		if (me.act === act) {
			return true;
		}

		try {
			switch (act) {
			case 2:
				if (me.act >= 2) {
					break;
				}

				Town.move(NPC.Warriv);

				npc = getUnit(1, NPC.Warriv);

				if (!npc || !npc.openMenu()) {
					return false;
				}

				Misc.useMenu(0x0D36);

				break;
			case 3:
				if (me.act >= 3) {
					break;
				}
				Town.move("palace");
				npc = getUnit(1, NPC.Jerhyn);
				if (!npc || !npc.openMenu()) {
					Pather.moveTo(5166, 5206);

					return false;
				}

				me.cancel();

				tpTome = me.findItem("tbk", 0, 3);
				if (tpTome && tpTome.getStat(70) > 0 ) {
					try{
						Pather.moveToExit(50, true);
						if (!Pather.usePortal(40, null)) {
							if (!me.inTown) {
								Town.goToTown();
							}
						}
					}catch(e) {
						print(e);
					}finally{
						if (!me.inTown) {
							Town.goToTown();
						}
					}
				}
				Town.move(NPC.Meshif);

				npc = getUnit(1, NPC.Meshif);

				if (!npc || !npc.openMenu()) {
					return false;
				}

				Misc.useMenu(0x0D38);

				break;
			case 4:
				if (me.act >= 4) {
					break;
				}
				this.mephisto();
				break;
			case 5:
				if (me.act >= 5) {
					break;
				}
				Town.move(NPC.Tyrael);
				npc = getUnit(1, NPC.Tyrael);

				if (!npc || !npc.openMenu()) {
					return false;
				}

				delay(me.ping + 1);

				if (getUnit(2, 566)) {
					me.cancel();
					Pather.useUnit(2, 566, 109);
				} else {
					Misc.useMenu(0x58D2);
				}

				break;
			}

			delay(1000 + me.ping * 2);

			while (!me.area) {
				delay(500);
			}

			if (me.area === preArea) {
				me.cancel();
				Town.move("portalspot");
				print("Act change failed.");

				return false;
			}

		} catch (e) {
			return false;
		}

		for(time=0; time<100 ; time += 1) {
			if (this.playerIn()) {
				break;
			}
			if (time>30) {
				quit();
			}
			delay(1000);
		}
		return true;
	}; // <- Dark-f

	this.clickWP = function () { // Move to nearest wp and click it.
		var i, j, wp, presetUnit,
		wpIDs = [119, 145, 156, 157, 237, 238, 288, 323, 324, 398, 402, 429, 494, 496, 511, 539];

		for (i = 0 ; i < wpIDs.length ; i += 1) {
			presetUnit = getPresetUnit(me.area, 2, wpIDs[i]);

			if (presetUnit) {
				print("going to nearest WP");

				while (getDistance(me.x, me.y, presetUnit.roomx * 5 + presetUnit.x, presetUnit.roomy * 5 + presetUnit.y) > 10) {
					try {
						Pather.moveToPreset(me.area, 2, wpIDs[i], 0, 0, Config.ClearType, false);
					} catch (e) {
						print("Caught Error.");

						print(e);
					}

					Packet.flash(me.gid);

					delay(me.ping * 2 + 500);
				}

				wp = getUnit(2, "waypoint");

				if (wp) {
					for (j = 0 ; j < 10 ; j += 1) {
						sendPacket(1, 0x13, 4, wp.type, 4, wp.gid);

						delay(me.ping * 2 + 500);

						if (getUIFlag(0x14)) {
							delay(me.ping);

							me.cancel();

							break;
						}

						Packet.flash(me.gid);

						delay(me.ping * 2 + 500);

						Pather.moveToUnit(presetUnit, 0, 0, Config.ClearType, false);
					}
				}
			}
		}
	};



//STUFF
	this.removeUnwearableItems = function () { // Remove items that can no longer be worn due to a change in Dexterity/Strength. Will try to place in Inventory to be checked against Pickit. Clearinventory sells to NPC if there is no Pickit match.
		var item = me.findItem(null, 1, 1); // Equipped item.

		if (item) {
			do {
				if (!Item.canEquip(item)) {
					print("Removing an item I can no longer wear: " + item.name + ".");

					if (Storage.Inventory.CanFit(item)) {
						while (!Storage.Inventory.MoveTo(item)) { // Try to move the item more than once.
							delay(me.ping * 2 + 100);
							Storage.Inventory.MoveTo(item);
							delay(1000);
							Storage.Stash.MoveTo(item);
							me.cancel(1);
							while(me.itemoncursor) {
								delay(1000);
								while(getUIFlag(0x19) || getUIFlag(0x01)) {
									delay(1000);
									me.cancel(1);
								}
								Packet.dropItem(item);  // Why not sell ? Where the Packet.dropItem ? Dark-f
								item.drop(); //Dark-f: from cubing.js
								delay(me.ping * 2 + 100);
							}
						}
						Pickit.pickItems();
					} else {
						while(me.itemoncursor) {
							delay(1000);
							while(getUIFlag(0x19) || getUIFlag(0x01)) {
								delay(1000);
								me.cancel(1);
							}
							Packet.dropItem(item);  // Why not sell ? Where the Packet.dropItem ? Dark-f
							item.drop(); //Dark-f: from cubing.js
							delay(me.ping * 2 + 100);
						}
						Pickit.pickItems();
					}
				}
			} while (item.getNext());
		}
	};

	this.getQuestItem = function (classid, chestid) { // Accepts classid only or a classid/chestid combination.
		var i, chest, item,
			tick = getTickCount();

		if (me.findItem(classid)) { // Don't open "chest" or try picking up item if we already have it.
			return true;
		}

		if (me.inTown) {
			return false;
		}

		if (arguments.length > 1) {
			chest = getUnit(2, chestid);

			if (chest) {
				Misc.openChest(chest);
			}
		}

		for (i = 0 ; i < 50 ; i += 1) { // Give the quest item plenty of time (up to two seconds) to drop because if it's not detected the function will end.
			item = getUnit(4, classid);

			if (item) {
				break;
			}

			delay(40);
		}

		while (!me.findItem(classid)) { // Try more than once in case someone beats me to it.
			item = getUnit(4, classid);

			if (item) {
				if (Storage.Inventory.CanFit(item)) {
					Pickit.pickItem(item);

					delay(me.ping * 2 + 500);
				} else {
					if (Pickit.canMakeRoom()) {
						print("ÿc7Trying to make room for " + Pickit.itemColor(item) + item.name);

						Town.visitTown(); // Go to Town and do chores. Will throw an error if it fails to return from Town.
					} else {
						print("ÿc7Not enough room for " + Pickit.itemColor(item) + item.name);

						return false;
					}
				}
			} else {
				return false;
			}
		}

		return true;
	};

	this.prebuffPoisonResistance = function() { // Goes to Town, buys three Antidote potions from Akara, drinks them, and returns to Catacombs Level 4.
		var i, akara, potions;

		print("Buying Antidote Potions");

		Town.goToTown();

		Town.doChores();

		Town.move(NPC.Akara);

		akara = getUnit(1, NPC.Akara);

		if (akara) {
			akara.startTrade();

			potions = akara.getItem(514);

			for (i = 0 ; i < 3 ; i += 1) {
				potions.buy();
			}

			me.cancel();
		}

		Town.move("portalspot");

		Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "ready to drink");

		while (readyToDrink !== Config.AutoSmurf.TeamSize - 1) {
			delay(250);
		}

		potions = me.findItems(514, -1, 3);

		if (potions.length) {
			for (i = 0 ; i < potions.length ; i += 1) {
				potions[i].interact();

				delay(me.ping * 2 + 500);
			}
		}
		if ( teleportingSorc && me.diff > 0) {
			return true;
		} else {
			Pather.usePortal(37, null);
		}

		return true;
	};

	this.toInventory = function () {
		print("toInventory");

		var i,
		items = [],
		item = me.getItem(-1, 0);

		if (!Town.openStash()) {
			Town.openStash();
		}
		if (item) {
			do {
				if ( item.classid === 91 || item.classid === 174 || item.classid === 553 || item.classid === 554)	 {
					items.push(copyUnit(item));
				}
			} while (item.getNext());
		}
		for (i = 0; i < items.length; i += 1) {
			if ( Storage.Inventory.CanFit(items[i])) {
				Storage.Inventory.MoveTo(items[i]);
			}
		}
		delay(1000);
		me.cancel();

		return true;
	};

	this.cubeStaff = function () {
		print("cubing staff");

		var amulet = me.getItem("vip"),
			staff = me.getItem("msf");

		if (!staff || !amulet) {
			return false;
		}
		Town.move("stash");
		if (!Town.openStash()) {
			Town.openStash();
		}
		Storage.Cube.MoveTo(amulet);
		Storage.Cube.MoveTo(staff);
		Cubing.openCube();
		transmute();
		delay(750 + me.ping);
		Cubing.emptyCube();
		me.cancel();
		Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "GotThePower");

		return true; //(<3 kolton)
	};

	this.placeStaff = function () {
		print("place staff");

		var staff, item, orifice,
			tick = getTickCount(),
			preArea = me.area;

		Town.goToTown();
		Town.move("stash");
		this.toInventory();
		Town.move("portalspot");
		if (!Pather.usePortal(preArea, me.name)) {
			throw new Error("placeStaff: Failed to take TP");
		}
		delay(1000);
		orifice = getUnit(2, 152);
		if (!orifice) {
			return false;
		}
		Misc.openChest(orifice);
		staff = me.getItem(91);
		if (!staff) {
			if (getTickCount() - tick < 500) {
				delay(500);
			}
			return false;
		}

		staff.toCursor();
		submitItem();
		delay(750 + me.ping);

		/*/ unbug cursor
		item = me.findItem(-1, 0, 3);

		if (item && item.toCursor()) {
			while (getUnit(100)) {
				Storage.Inventory.MoveTo(item);

				delay(me.ping * 2 + 500);
			}
		}*/

		return true;
	};

	this.cubeFlail = function () {
		var eye = me.getItem(553),
			heart = me.getItem(554),
			brain = me.getItem(555),
			flail = me.getItem(173);

		print("cubing flail");

		if (me.getItem(174)) { // Already have the finished Flail.
			return true;
		}

		if (!eye || !heart || !brain || !flail) {
			print("cubeFlail failed: missing ingredient(s)");

			return false;
		}
		Town.move("stash");
		if (!Town.openStash()) {
			Town.openStash();
		}
		Storage.Cube.MoveTo(eye);
		Storage.Cube.MoveTo(heart);
		Storage.Cube.MoveTo(brain);
		Storage.Cube.MoveTo(flail);
		Cubing.openCube();
		transmute();
		delay(750 + me.ping);
		Cubing.emptyCube();
		me.cancel();

		return true;
	};

	this.equipFlail = function () {
		var finishedFlail = me.getItem(174);

		if (finishedFlail) {
			if (!Item.equip(finishedFlail, 4)) {
				Pickit.pickItems();

				throw new Error("AutoSmurf.equipFlail: Failed to equip Khalim's Will.");
			}
		} else {
			throw new Error("AutoSmurf.equipFlail: Lost Khalim's Will before trying to equip it.");
		}

		if (me.itemoncursor) { // Seems like Item.equip() doesn't want to keep whatever the sorc has for a weapon, so lets put it into inventory without checking it against Pickit.
			var cursorItem = getUnit(100);

			if (cursorItem) {
				if (Storage.Inventory.CanFit(cursorItem)) {
					print("Keeping weapon by force.")

					Storage.Inventory.MoveTo(cursorItem);
				} else {
					me.cancel();
					print("No room to keep weapon by force.");

					cursorItem.drop();
				}
			}
		}

		delay(me.ping * 2 + 100);

		Pickit.pickItems(); // Will hopefully pick up the character's weapon if it was dropped.

		return true;
	};

	this.placeFlail = function () { // SiC-666 TODO: Rename this function to smashOrb, check orb.mode in the loop and stop when it has been smashed.
		var i,
			orb = getUnit(2, 404);

		print("Smashing the Compelling Orb.");

		if (!orb) {
			throw new Error("AutoSmurf.placeFlail: Couldn't find Compelling Orb.")
		}

		Pather.moveToUnit(orb, 0, 0, Config.ClearType, false);

		for (i = 0; i < 5; i += 1) {
			if (orb) {
				Skill.cast(0, 0, orb);

				delay(500);
			}
		}

		return true;
	};

	this.hireMerc = function(another) {
		print("hiring merc");

		if (another === undefined) {
			another = 0;
		}

		var cursorItem, greiz, j, k, l, merc, id;


		for (l = 0; l < 5; l += 1) {
			merc = me.getMerc();
			if (merc) {
				break;
			}
		delay(100);
		}

		if (!merc) {
			Town.reviveMerc();
			for (k = 0; k < 5; k += 1) {
				merc = me.getMerc();
				if (merc) {
					break;
				}
			delay(100);
			}
		}
		if (!merc) {
			return false;
		}

		if (merc.classid !==338 || another === 1) { //act2 merc
			another =0; // :D
			Town.goToTown(2);
			Town.move(NPC.Greiz);
			Pather.moveTo(me.x + rand(-5, 5), me.y + rand(-5, 5));
			Town.move(NPC.Greiz);

			//ok this is a bit stupid
			clickItem(4, 4);
			delay(me.ping + 500);
			if (me.itemoncursor) {
				delay(me.ping + 500);
				cursorItem = getUnit(100);
				if (cursorItem) {
					Storage.Inventory.MoveTo(cursorItem);
					delay(me.ping + 1000);
					if (me.itemoncursor) {
						Misc.click(0, 0, me);
						delay(me.ping + 500);
					}
				}
			}
			clickItem(4, 3);
			delay(me.ping + 500);
			if (me.itemoncursor) {
				delay(me.ping + 500);
				cursorItem = getUnit(100);
				if (cursorItem) {
					Storage.Inventory.MoveTo(cursorItem);
					delay(me.ping + 1000);
					if (me.itemoncursor) {
						Misc.click(0, 0, me);
						delay(me.ping + 500);
					}
				}
			}
			clickItem(4, 1);
			delay(me.ping + 500);
			if (me.itemoncursor) {
				delay(me.ping + 500);
				cursorItem = getUnit(100);
				if (cursorItem) {
					Storage.Inventory.MoveTo(cursorItem);
					delay(me.ping + 500);
					if (me.itemoncursor) {
						Misc.click(0, 0, me);
						delay(me.ping + 500);
					}
				}
			}
			delay(1000);
			addEventListener("gamepacket", gamePacket);
			greiz = getUnit(1, NPC.Greiz);
			if (!greiz || !greiz.openMenu()) {
				sendPacket(1, 0x4b, 4, me.type, 4, me.gid);
				delay(1000+me.ping);
				Town.move(NPC.Greiz);
				sendPacket(1, 0x4b, 4, me.type, 4, me.gid);
				greiz = getUnit(1, NPC.Greiz);
				greiz.openMenu();
				if (!greiz || !greiz.openMenu()) {
					throw new Error("hireMerc : failed to open npc menu");
				}
			}
			if (mercid.length) {
				Misc.useMenu(0x0D45);
				sendPacket(1,0x36,4,greiz.gid,4,mercid[Math.floor((Math.random() * mercid.length-1))]);
			}else{
				print("No mercs available");
			}
			delay(1000+me.ping*2);
			me.cancel();
			Pickit.pickItems();
		}


		return true; //(<3 QQ)
	};

	this.gamePacket = function (bytes) {
		 switch(bytes[0]) {
			case 0x4e:
				var id = (bytes[2] << 8) + bytes[1];
				if (mercid.indexOf(id) !== -1) {
						mercid.length = 0;
				}
				mercid.push(id);
				break;
		}
	};		//(<3 QQ)

//QUESTS
	this.den = function () {
		var i, akara;

		print("den");

		if (!me.getQuest(1, 1)) { // Haven't cleared the Den yet.
			this.teamInGame();

			if (me.diff === 0) { // All characters grab Cold Plains Waypoint in Normal. Only the Teleporting Sorc grabs it in Nightmare and Hell.
				Pather.moveToExit(2, true, true);
				this.teamInGame();
				this.waitForPartyMembers();
				Attack.clearLevel();
				Pather.moveToExit(3, true, true);
				this.teamInGame();
				this.waitForPartyMembers();
				this.Bo();
				//Precast.doPrecast(true);
				Attack.clearLevel();
				if (!getWaypoint(1))
					Pather.getWP(3);
				Pather.moveToExit(2, true, true);
				Pather.moveToExit(8, true, true);
				this.waitForPartyMembers();
				this.Bo();
				//Precast.doPrecast(true);
				for (i = 0; i < 3; i += 1) {
					print("clearing - try number " + i);

					this.teamInGame();

					Attack.clearLevel();

					sendPacket(1, 0x40); // Refresh quest status

					delay(me.ping * 2 + 250);

					if (me.getQuest(1, 1)) { // Den is cleared. Return to Akara for a Reward.
						break;
					}
				}
				while (!me.inTown) {
					switch (me.area) {
					case 8:
						Pather.moveToExit(2, true, true);

						break;
					case 2:
						Pather.moveToExit(1, true, true);
					}
					Packet.flash(me.gid);
					delay(me.ping * 2 + 250);
				}
			} else { // diff > 0
				if (teleportingSorc) {
					if (!getWaypoint(1)) {
						this.clearToExit(1, 2, false); // Move from Rogue Encampment to Blood Moor

						this.clearToExit(2, 3, false); // Move from Blood Moor to Cold Plains

						this.clickWP();

						Pather.useWaypoint(1);
					}
					this.clearToExit(1, 2, false); // Move from Rogue Encampment to Blood Moor

					this.clearToExit(2, 8, false);

					Pather.makePortal();

					Pather.teleport = false; // not teleporting in Den

					delay(3000);
				} else {
					Town.goToTown();
					Town.move("portalspot");
					while (!Pather.usePortal(8, null)) {
						delay(250);
					}
					this.Bo();
				}
				for (i = 0; i < 3; i += 1) {
					print("clearing - try number " + i);

					this.teamInGame();

					Attack.clearLevel();

					sendPacket(1, 0x40); // Refresh quest status

					delay(me.ping * 2 + 250);

					if (me.getQuest(1, 1)) { // Den is cleared. Return to Akara for a Reward.
						break;
					}
				}
				if (teleportingSorc)
					Pather.teleport = true;
				Town.goToTown();
			}
		}

		if (me.inTown) {
			if (!me.getQuest(1, 1)) {
				var j = 0;

				while (!me.getQuest(1, 1) && !me.getQuest(1, 0)) { // Meant to make sorc wait for all the immune monsters to be killed before talking to Akara in hell difficulty.
					delay(250);

					if (j % 20 == 0) { // Check for Team Members every 5 seconds.
						this.teamInGame();
					}

					j += 1;
				}
			}

			Town.move(NPC.Akara);

			akara = getUnit(1, NPC.Akara);

			akara.openMenu();

			me.cancel();

			delay(me.ping * 2 + 250);
		}

		return true;
	};

	this.cave = function () {
		print("cave");
		Town.repair();
		Town.doChores();
		Pather.useWaypoint(3);

		this.waitForPartyMembers();

		Precast.doPrecast(true);

		this.clearToExit(3, 9, Config.ClearType);

		this.waitForPartyMembers();

		this.clearToExit(9, 13, Config.ClearType);

		this.waitForPartyMembers();

		Attack.clearLevel(Config.ClearType);

		return true; // Ends in Cave Level 2 because the characters will likely leave the game from there once or twice.
	};

	this.blood = function () {
		var kashya;

		print("BloodRaven");
		Town.repair();
		this.teamInGame();

		if (!me.inTown) { // this.cave(); doesn't end in town.
			Town.goToTown();
		}

		if (!me.getQuest(2, 1)) {
			Pather.useWaypoint(3);

			this.waitForPartyMembers();

			Precast.doPrecast(true);

			this.clearToExit(3, 17, true);

			this.waitForPartyMembers();

			this.teamInGame();

			try {
				Pather.moveToPreset(17, 1, 805);
				Attack.kill(getLocaleString(3111)); // Blood Raven
			} catch(e) {
				Attack.clear(30);
			}

			Pickit.pickItems();

			Town.goToTown();
		}

		while (!kashya || !kashya.openMenu()) { // Try more than once to interact with Kashya.
			Packet.flash(me.gid);

			Town.move(NPC.Kashya);

			kashya = getUnit(1, NPC.Kashya);

			delay(1000);
		}

		me.cancel();

		return true;
	};

	this.cain = function () { // Dark-f: rewrite rescue cain
		var i, j, akara, cain, slave, scroll1, scroll2, stoneA, stoneB, stoneC, stoneD, stoneE;

		print(NPC.Cain);
		Town.doChores();
		this.teamInGame();
		if (!me.getQuest(4, 1) ) { // Cain isn't rescued yet
			if (me.diff === 0) {
				this.travel(0);
			} else {
				if (teleportingSorc )
					this.travel(0);
			}
			//if (!me.getQuest(4, 4) && !me.getQuest(4, 3) && !me.getItem(524) && !me.getItem(525) && teamScroll !== 1) { //4,4redportal already open ; 4,3 holding scroll
			if (!me.getQuest(4, 4) && !me.getQuest(4, 3) ) {
				if (!me.getItem(524)) { 	// Scroll of Inifuss
					if (!me.inTown) {
						Town.goToTown();
					}
					if (me.diff === 0 ) {
						Pather.useWaypoint(5); //dark wood
					} else {
						if (teleportingSorc ) {
							Pather.useWaypoint(5); //dark wood
							Pather.makePortal();
						} else {
							Town.move("portalspot");
							var j = 0;
							while (!Pather.usePortal(5, null)) {
								delay(250);
								if (j % 20 == 0) { // Check for Team Members every 5 seconds.
									this.teamInGame();
								}
								j += 1;
							}
						}
					}
					this.waitForPartyMembers();

					Precast.doPrecast(true);
					this.Bo();
					Pather.teleport = false;
					Pather.moveToPreset(me.area, 1, 738, 0, 0, true, true); //move to tree
					Attack.clear(40); // treehead

					if (teleportingSorc) {
						Pather.makePortal();
						delay(5000);
						this.getQuestItem(524, 30);
						Pather.usePortal(null, null);
					} else {
						delay(1000);
						if (!Pather.usePortal(null, null)) {
							Town.goToTown();
						}
					}
				/*	scroll1 = me.getItem(524);
					if (scroll1) {
						if ( scroll1.location !== 7 && Storage.Stash.CanFit(scroll1)) {
							Storage.Stash.MoveTo(scroll1);
							delay(me.ping);
							me.cancel();
						}
					}*/
				}
				Town.move(NPC.Akara);
				akara = getUnit(1, NPC.Akara);
				if (akara && akara.openMenu()) {
					me.cancel();
				}
			/*	scroll2 = me.getItem(525);
				if (scroll2) {
					if ( scroll2.location !== 7 && Storage.Stash.CanFit(scroll2)) {
						Storage.Stash.MoveTo(scroll2);
						delay(me.ping);
						me.cancel();
					}
				}*/
			}

			this.teamInGame();
			if (teleportingSorc) {
				Pather.useWaypoint(4); //stoney field
				Pather.makePortal();
				if (me.diff > 0)
					Pather.teleport = false;
			} else {
				Town.move("portalspot");
				while (!Pather.usePortal(4, null)) {
					delay(250);
				}
			}
			this.waitForPartyMembers();

			Precast.doPrecast(true);

			this.Bo();
			Pather.moveToPreset(me.area, 1, 737, 0, 0, true, true);
			try{
				Attack.clear(15, 0, getLocaleString(2872));// Rakanishu
			} catch (e) {
				Attack.clear(20);
			}
			Attack.clear(20);
			if (!me.getQuest(4, 4) ) {		 //redportal already open
				stoneA = getUnit(2, 17);
				stoneB = getUnit(2, 18);
				stoneC = getUnit(2, 19);
				stoneD = getUnit(2, 20);
				stoneE = getUnit(2, 21);
				for (i = 0; i < 5; i += 1) {
					Misc.openChest(stoneA);
					Misc.openChest(stoneB);
					Misc.openChest(stoneC);
					Misc.openChest(stoneD);
					Misc.openChest(stoneE);
				}
			}
			if ( me.diff > 0 ) {
				// Dark-f: now only leader finish the next job when Nightmare & Hell
				if (teleportingSorc) {
					Pather.teleport = true;
					for (i = 0; i < 5; i += 1) {
						if (Pather.usePortal(38)) {
							break;
						}
						delay(1000);
					}
					Pather.moveTo(25175, 5160, 3, false); //Dark-f: close the slave.
					slave = getUnit(2, 26);
					if (!slave) {
						return false;
					}
					for (i = 0; i < 5; i += 1) {
						if (getDistance(me, slave) > 3) {
							Pather.moveToUnit(slave);
						}
					}
					Misc.openChest(slave);
					if (!Pather.usePortal(null, null)) {
						Town.goToTown();
					}
					delay(3000);
				} else { // Dark-f: other team mates goto town.
					Town.goToTown();
				}
			} else {
				// all team
				for (i = 0; i < 5; i += 1) {
					if (Pather.usePortal(38)) {
						break;
					}
				delay(1000);
				}
				Pather.moveTo(25175, 5160, 3, false); //Dark-f: close the slave.
				slave = getUnit(2, 26);
				if (!slave) {
					return false;
				}
				for (i = 0; i < 10; i += 1) {
					if (getDistance(me, slave) > 3) {
						Pather.moveToUnit(slave);
					}
				}
				Misc.openChest(slave);
				if (!Pather.usePortal(null, null)) {
					Town.goToTown();
				}
				delay(3000);
			}
		}
		Town.move(NPC.Akara);
		akara = getUnit(1, NPC.Akara);
		if (akara && akara.openMenu()) {
			me.cancel();
		}
		Town.move(NPC.Cain);
		cain = getUnit(1, NPC.Cain);
		if (cain && cain.openMenu()) {
			me.cancel();
		}

		return true;
	};

	this.trist = function () {
		var coord, i,
			xx = [ 25175, 25147, 25149, 25127, 25128, 25150, 25081],
			yy = [ 5187,  5201,  5172,  5188,  5144,  5123,  5137];

		print("trist");
		Town.repair();
		Pather.useWaypoint(4);

		this.waitForPartyMembers();

		Precast.doPrecast(true);
		this.Bo();
		Pather.moveToPreset(me.area, 1, 737, 0, 0, true, true);

		try{
			Attack.clear(20, 0, getLocaleString(2872)); // Rakanishu
		} catch (e) {
			Attack.clear(25);
		}

		Pather.moveToPreset(me.area, 1, 737, 0, 0, false, false); // Move back to stones after clearing.

		for (i = 0; i < 5; i += 1) {
			if (Pather.usePortal(38)) {
				break;
			}

			delay(1000);
		}

		this.waitForPartyMembers();
		Precast.doPrecast(true);
		this.Bo();
		for (coord = 0; coord < xx.length; coord += 1) {
			Pather.moveTo(xx[coord], yy[coord], 3, Config.ClearType);

			Attack.clear(20);
		}

		return true;
	};

	// add for Lvl up when the partyLevel is less than the tristLvl
	this.tristAfter = function () {

		print("tristAfter");
		if (!me.inTown) { // this.trist(); doesn't end in town.
			Town.goToTown();
		}
		Town.doChores();
		this.teamInGame();
		Pather.useWaypoint(5);
		this.waitForPartyMembers();
		this.Bo();
		this.clearToExit(5, 6, true);
		this.clickWP();
		Precast.doPrecast(true);
		this.Bo();
		this.clearToExit(6, 7, true);
		Precast.doPrecast(true);
		this.Bo();
		//Attack.clearLevel(0);
		this.clearToExit(7, 26, true);
		this.clearToExit(26, 27, true);
		this.clickWP();
		Precast.doPrecast(true);
		this.Bo();
		Attack.clearLevel(0);
		return true;
	};

	this.andy = function () {
		var oldPickRange = Config.PickRange;

		print("killing andy");
		Town.repair();
		this.teamInGame();

		if (me.getQuest(6, 0) && !me.getQuest(7, 0)) {
			this.changeAct(2);

			return true;
		}

		if (!me.getQuest(6, 1)) {
			if (!me.inTown) {
				Town.goToTown();
			}

			if ((!boBarb && !otherChar) || me.diff === 0) {

				this.travel(1);

				if ( me.diff > 0 ) {
					this.prebuffPoisonResistance();
				}
				Pather.useWaypoint(35);

				if (me.diff === 0) {
					this.waitForPartyMembers();

					Precast.doPrecast(true);

					Pather.teleport = false;

					this.clearToExit(35, 36, true);

					this.waitForPartyMembers();

					this.clearToExit(36, 37, true);

					this.waitForPartyMembers();

					Precast.doPrecast(true);
				} else {
					Pather.teleport = true;

					this.clearToExit(35, 36, false);

					this.clearToExit(36, 37, false);

					//Pather.moveTo(22568, 9582, 3, false); //Dark-f: Follower kill other monsters when the leader kills Andy
					Pather.moveTo(22549, 9520, 3, false); //Dark-f: this is from running Andy
					Pather.makePortal();
				}

				this.teamInGame();
			} else {
				Town.goToTown(1);
				Town.repair();
				if ( me.diff > 0) {
					this.prebuffPoisonResistance();
				}
				Town.move("portalspot");

				var j = 0;

				while (!Pather.usePortal(37, null)) {
					delay(250);

					if (j % 20 == 0) { // Check for Team Members every 5 seconds.
						this.teamInGame();
					}

					j += 1;
				}
			}
			this.Bo();
			if (me.diff === 0) {
				Pather.moveTo(22594, 9641, 3, Config.ClearType);
				Pather.moveTo(22564, 9629, 3, Config.ClearType);
				Pather.moveTo(22533, 9641, 3, Config.ClearType);

				Config.PickRange = 0;

				Pather.moveTo(22568, 9582, 3, Config.ClearType);

				this.prebuffPoisonResistance();

				Pather.moveTo(22548, 9568, 3, false);

				Attack.kill(156); // Andariel

				Config.PickRange = oldPickRange;

				Attack.clear(35);
			} else {
				try {
					Attack.kill(156); // Andariel
				} catch(e) {
					Attack.clear(20);
				}
			}

			delay(2000); // Wait for minions to die.

			Pickit.pickItems();

			if (!Pather.usePortal(null, null)) {
				Town.goToTown();
			}
		}

		delay(3000);

		this.changeAct(2);

		return true;
	};


	this.cube = function () { // Only called in Normal Difficulty.
		var i, chest, cube;

		print("getting cube");
		Town.repair();
		this.teamInGame();

		this.travel(2); // Halls Of The Dead Level 2

		this.travel(3); // Lost City

		if (!me.inTown) {
			Town.goToTown();
		}

		Pather.useWaypoint(57, true); // Halls Of The Dead Level 2

		this.waitForPartyMembers();

		Precast.doPrecast(true);

		Pather.teleport = false;

		Config.ClearType = 0;

		this.clearToExit(57, 60, Config.ClearType);

		this.waitForPartyMembers();

		for (i = 0 ; i < 5 ; i += 1) {
			chest = getPresetUnit(60, 2, 354);

			if (chest) {
				break;
			}

			delay(me.ping * 2 + 250);
		}

		while (getDistance(me.x, me.y, chest.roomx * 5 + chest.x, chest.roomy * 5 + chest.y) > 10) {
			try {
				Pather.moveToPreset(60, 2, 354, 0, 0, Config.ClearType, false);
			} catch (e) {
				print("Caught Error.");

				print(e);
			}
		}

		Attack.clear(20);

		this.getQuestItem(549, 354);

		if (!Pather.usePortal(null, null)) {
			Town.goToTown();
		}

		//Pather.teleport = false;

		return true;
	};

	this.amulet = function () {
		var i, drognan;

		print("getting amulet");
		Town.repair();
		this.teamInGame();

		Pather.teleport = false;

		if (me.diff !== 0 && teleportingSorc) { // The Teleporting Sorc needs to travel to Lost City in Nightmare and Hell, otherwise it's already been done in this.cube();
			this.travel(2); // Halls Of The Dead Level 2

			this.travel(3); // Lost City
		}

		if (me.diff === 0) {
			Pather.useWaypoint(44, true);

			this.waitForPartyMembers();

			Precast.doPrecast(true);

			this.clearToExit(44, 45, Config.ClearType); // Go to Valley Of Snakes.

			this.waitForPartyMembers();
			this.Bo();

			this.clearToExit(45, 58, Config.ClearType); // Go to Claw Viper Temple Level 1

			this.waitForPartyMembers();

			this.clearToExit(58, 61, Config.ClearType); // Go to Claw Viper Temple Level 2

			this.waitForPartyMembers();
			this.Bo();
			Pather.moveTo(15044, 14045, 3, Config.ClearType);
		} else if (teleportingSorc) {
			Pather.teleport = true;

			Config.ClearType = false;

			Pather.useWaypoint(44, true);

			this.clearToExit(44, 45, Config.ClearType); // Go to Valley Of Snakes.

			this.clearToExit(45, 58, Config.ClearType); // Go to Claw Viper Temple Level 1

			this.clearToExit(58, 61, Config.ClearType); // Go to Claw Viper Temple Level 2

			Pather.moveTo(15044, 14045, 3);

			Pather.makePortal();
		} else {
			Town.move("portalspot");

			var j = 0;

			while (!Pather.usePortal(61, null)) {
				delay(250);

				if (j % 20 == 0) { // Check for Team Members every 5 seconds.
					this.teamInGame();
				}

				j += 1;
			}
		}

		this.teamInGame();

		if (teleportingSorc)
			this.getQuestItem(521, 149);

		delay(500);

		if (!Pather.usePortal(null, null)) {
			Town.goToTown();
		}

		if (me.getItem(521)) {
			Town.move("stash");
			delay(me.ping);
			Town.openStash();
			Storage.Stash.MoveTo(me.getItem(521));
		}

		Town.move(NPC.Drognan);

		for (i = 0 ; i < 200 ; i += 1) {
			if (i > 60) {
				quit();
			}

			if (this.playerIn(40)) {
				break;
			}

			delay(1000);
		}

		while (!drognan || !drognan.openMenu()) { // Try more than once to interact with Drognan.
			Packet.flash(me.gid);

			Town.move(NPC.Drognan);

			drognan = getUnit(1, NPC.Drognan);

			delay(1000);
		}

		me.cancel();

		//Pather.teleport = false;

		return true;
	};

	this.staff = function () { // Only the Teleporting Sorc does this. She will be at least level 18 as required by MAIN to reach this stage.
		print("getting staff");

		this.teamInGame();

		Pather.useWaypoint(43, true);

		Precast.doPrecast(true);
		// Dark-f
		if (me.classid === 1 ) {
			Pather.teleport = true;

			this.clearToExit(43, 62, false);

			this.clearToExit(62, 63, false);

			this.clearToExit(63, 64, false);

			var presetUnit = getPresetUnit(64, 2, 356);

			if (!presetUnit) {
				return false;
			}

			Pather.moveTo(presetUnit.roomx * 5 + presetUnit.x, presetUnit.roomy * 5 + presetUnit.y, 15, false);

		} else {

			Pather.teleport = false;
			Town.repair();
			this.clearToExit(43, 62, true);

			this.clearToExit(62, 63, true);

			this.clearToExit(63, 64, true);

			var presetUnit = getPresetUnit(64, 2, 356);

			if (!presetUnit) {
				return false;
			}

			Pather.moveTo(presetUnit.roomx * 5 + presetUnit.x, presetUnit.roomy * 5 + presetUnit.y, 15, true);
		}

		this.getQuestItem(92, 356);

		if (!Pather.usePortal(null, null)) {
			Town.goToTown();
		}

		if (me.getItem(92)) {
			Town.move("stash");
			delay(me.ping);
			Town.openStash();
			Storage.Stash.MoveTo(me.getItem(92));
		}

		//Pather.teleport = false;

		if (me.getItem(92)) { //teamStaff
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "GotStaff");
		}

		return true;
	};

	this.summoner = function () { // Teleporting Sorc will be at least level 18 as required by MAIN to reach this stage.
		var i, journal;

		print("killing summoner");
		Town.repair();
		Town.buyPotions();
		this.teamInGame();

		if (teleportingSorc) {
			Pather.teleport = true;

			Config.ClearType = false;

			if (me.area !== 74) {
				if (!me.inTown) {
					Town.goToTown();
				}

				Town.move("waypoint");

				Pather.useWaypoint(74, true);
			}

			Precast.doPrecast(true);

			journal = getPresetUnit(74, 2, 357);

			if (!journal) {
				throw new Error("AutoSmurf.summoner: No preset unit in Arcane Sanctuary.");
			}

			while (getDistance(me.x, me.y, journal.roomx * 5 + journal.x - 3, journal.roomy * 5 + journal.y - 3) > 10) {
				try {
					Pather.moveToPreset(74, 2, 357, -3, -3, false, false);
				} catch (e) {
					print("Caught Error.");

					print(e);
				}
			}

			Pather.makePortal();
		} else {
			Town.move("portalspot");

			var j = 0;

			while (!Pather.usePortal(74, null)) {
				delay(250);

				if (j % 20 == 0) { // Check for Team Members every 5 seconds.
					this.teamInGame();
				}

				j += 1;
			}
		}

		this.teamInGame();

		try {
			Attack.kill(250);
		} catch (e) {
			Attack.clear(20);
		}

		Pickit.pickItems();

		Pather.moveToPreset(74, 2, 357, -3, -3, Config.ClearType);

		journal = getUnit(2, 357);

		for (i = 0; i < 5; i += 1) {
			if (journal) {
				sendPacket(1, 0x13, 4, journal.type, 4, journal.gid);

				delay(1000);

				me.cancel();
			}

			if (Pather.getPortal(46)) {
				break;
			}
		}

		if (i === 5) {
			throw new Error("summoner failed");
		}

		Pather.usePortal(46);

		this.clickWP();

		//Pather.teleport = false;

		return true;
	};

	this.tombs = function() { // Teleporting Sorc shares Canyon of The Magi waypoint with the others and they each clear to the chest in all of the tombs.
		var i, j, chest;

		print("cleaning tombs");
		Town.doChores();
		Pather.teleport = false;

		if (me.act !== 2) {
			Town.goToTown(2);
		}

		Config.ClearType = 0;

		if (teleportingSorc) {
			if (me.area !== 46) {
				Pather.useWaypoint(46);
			}

			Pather.makePortal();
		} else {
			if (!getWaypoint(17)) { // Canyon Of The Magi
				var cain;

				Town.goToTown(2);

				while (!cain || !cain.openMenu()) { // Try more than once to interact with Deckard Cain.
					Packet.flash(me.gid);

					Town.move(NPC.Cain);

					cain = getUnit(1, NPC.Cain);

					delay(1000);
				}

				me.cancel();

				Town.move("portalspot");

				print("Waiting for Canyon Of The Magi TP.");

				j = 0;

				while (!Pather.usePortal(46, null)) { // Canyon Of The Magi
					delay(250);

					if (j % 20 == 0) { // Check for Team Members every 5 seconds.
						this.teamInGame();
					}

					j += 1;
				}

				this.clickWP();
			} else {
				Pather.useWaypoint(46);
			}
		}

		this.waitForPartyMembers();
		this.Bo();
		Precast.doPrecast(true);

		for (i = 66; i <= 72; i += 1) {
			if (i !== getRoom().correcttomb) {
				this.teamInGame();

				while (me.area === 46) {
					Pather.moveToExit(i, false, Config.ClearType); // Move to tomb, don't go in.

					Pather.makePortal(); // Make a portal outside of the tomb.

					Pather.moveToExit(i, true, Config.ClearType); // Go in the tomb.
				}

				this.waitForPartyMembers();
				this.Bo();
				Attack.clearLevel(0);

				chest = getPresetUnit(me.area, 2, 397);

				for (j = 0 ; j < 5 ; j += 1) {
					chest = getPresetUnit(me.area, 2, 397);

					if (chest) {
						break;
					}

					delay(me.ping * 2 + 250);
				}

				if (chest) {
					while (getDistance(me.x, me.y, chest.roomx * 5 + chest.x, chest.roomy * 5 + chest.y) > 10) {
						try {
							Pather.moveToPreset(me.area, 2, 397, 0, 0, Config.ClearType, false);
						} catch (e) {
							print("Caught Error.");

							print(e);
						}

						delay(me.ping * 2 + 250);

						Packet.flash(me.gid);
					}

					chest = getUnit(2, "chest");

					Misc.openChest(chest);

					Pickit.pickItems();

				//	Attack.clear(40);
				}

				if (Misc.getNearbyPlayerCount() > 1) { // There are other characters nearby.
					delay(rand(2,10) * 500); // Delay 1-5 seconds to increase the chances of taking someone else's portal.
				}

				if (!Pather.usePortal(null, null)) {
					Town.goToTown();
				}

				delay(me.ping * 2 + 250);

				if (!Pather.usePortal(46, null)) {
					Town.move("waypoint");

					Pather.useWaypoint(46);
				}
			}
		}

		if (!Pather.usePortal(null, null)) { // Need to finish in town.
			Town.goToTown();
		}

		if (!this.partyLevel(tombsLvl)) {
			print("Not ready to start Duriel.");

			delay(1000);

			quit();
		}

		return true;
	};

	this.radament = function () {
		var i, radament, book, atma,
			pathX = [5106, 5205, 5205, 5214, 5222],
			pathY = [5125, 5125, 5152, 5153, 5181];

		print("radament");
		Town.doChores();
		this.teamInGame();

		if (!me.getQuest(9, 1)) {
			if (teleportingSorc) {
				Pather.teleport = true;
				Config.ClearType = false;
				if (getWaypoint(10)) {
					Pather.useWaypoint(48, true);
				} else {
					Town.goToTown(2);
					while (me.area !== 48) {
						if (me.area === 47) {
							try {
								Pather.moveToExit(48, true);
							} catch (e2) {
								print(e2);
								Town.goToTown(2);
							}
						} else if (me.area === 40) {
							for (i = 0; i < pathX.length; i += 1) {
								Pather.moveTo(pathX[i], pathY[i]);
								Packet.flash(me.gid);
								delay(me.ping * 2 + 100);
							}
							try {
								Pather.moveToExit(47, true);
							} catch (e3) {
								print(e3);
								Town.goToTown(2);
							}
						}
						Packet.flash(me.gid);
						delay(me.ping * 2 + 100);
					}
					this.clickWP();
				}
				this.clearToExit(48, 49, false);
				for (i = 0 ; i < 5 ; i += 1) {
					radament = getPresetUnit(49, 2, 355); // Chest by Radament.
					if (radament) {
						break;
					}
					delay(me.ping * 2 + 250);
				}
				while (getDistance(me.x, me.y, radament.roomx * 5 + radament.x, radament.roomy * 5 + radament.y) > 10) {
					try {
						Pather.moveToPreset(49, 2, 355, 0, 0, false, false);
					} catch (e) {
						print("Caught Error.");
						print(e);
					}
				}
				radament = getUnit(1, 229); // Radament.
				Pather.moveToUnit(radament, 0, 0, false);
				Pather.makePortal();
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "kill radament");
			} else {
				Town.move("portalspot");
				var j = 0;
				while (me.area === 40) {
					delay(250);
					if (j % 20 == 0) { // Check for Team Members every 5 seconds.
						this.teamInGame();
					}
					j += 1;
					if (killRadament) {
						Pather.usePortal(49, null);
					}
				}
			}

			this.teamInGame();
			this.Bo();
			try {
				Attack.kill(229); // Radament
			} catch (e) {
				print("Caught Error.");
				print(e);
				Attack.clear(30);
			}
			this.getQuestItem(552);
			book = me.findItem(552);
			if (book) {
				clickItem(1, book);
			}
			Town.goToTown();
		}
		Town.move(NPC.Atma);
		atma = getUnit(1, NPC.Atma);
		atma.openMenu();
		me.cancel();
		//Pather.teleport = false;
		return true;
	};

	this.duriel = function () {
		print("killing duriel");

		var i, cain, orifice, hole, npc;
		Town.repair();
		this.teamInGame();

		Pather.teleport = true;

		if (!me.getQuest(14, 1) && !me.getQuest(14, 3) && !me.getQuest(14, 4)) {
			if (!me.inTown) {
				Town.goToTown();
			}

			if (teleportingSorc) {
				this.travel(5); // Travel to all waypoints up to and including Canyon Of The Magi if I don't have them.

				Pather.useWaypoint(46, true);

				Precast.doPrecast(true);

				this.clearToExit(46, getRoom().correcttomb, false);

				for (i = 0 ; i < 5 ; i += 1) {
					orifice = getPresetUnit(getRoom().correcttomb, 2, 152);

					if (orifice) {
						break;
					}

					delay(me.ping * 2 + 250);
				}

				while (getDistance(me.x, me.y, orifice.roomx * 5 + orifice.x, orifice.roomy * 5 + orifice.y) > 10) {
					try {
						Pather.moveToPreset(getRoom().correcttomb, 2, 152, 0, 0, false, false);
					} catch (e) {
						print("Caught Error.");

						print(e);
					}
				}

				if (me.diff === 0) {
					Pather.teleport = false;
				}

				Pather.makePortal();

				delay(me.ping * 2 + 250);

				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "clear orifice");

				Attack.clear(30);

				Pather.moveToPreset(me.area, 2, 152, 0, 0, false, false);

				Attack.clear(30);

				Pather.moveToPreset(me.area, 2, 152, 0, 0, false, false);

				Attack.clear(30);

				if (!me.getQuest(10, 0)) { //horadric staff
					this.placeStaff();
				}

				for (i = 0 ; i < 30 ; i += 1) {
					delay(1000);

					hole =  getUnit(2, 100);

					delay(1000);

					Attack.clear(20);

					if (hole) {
						Precast.doPrecast(true);

						Pather.useUnit(2, 100, 73);

						break;
					}
				}

				Pather.makePortal();
			} else {
				Town.goToTown(2);

				while (!cain || !cain.openMenu()) { // Try more than once to interact with Deckard Cain.
					Packet.flash(me.gid);

					Town.move(NPC.Cain);

					cain = getUnit(1, NPC.Cain);

					delay(1000);
				}

				me.cancel();

				Town.move("portalspot");

				print("Waiting for Orifice TP.");

				var j = 0;

				while (me.area === 40) {
					delay(250);

					if (j % 20 == 0) { // Check for Team Members every 5 seconds.
						this.teamInGame();
					}

					j += 1;

					if (clearOrifice) {
						Pather.usePortal(getRoom().correcttomb, null)
					}
				}

				Attack.clear(40);

				Pather.moveToPreset(me.area, 2, 152, 0, 0, false, true);

				Attack.clear(40);

				Town.goToTown(2);

				print("Waiting for Duriel TP.");

				while (!Pather.usePortal(73, null)) {
					delay(250);

					if (j % 20 == 0) { // Check for Team Members every 5 seconds.
						this.teamInGame();
					}

					j += 1;
				}
			}

			this.teamInGame();

			Attack.clear(35);

			try {
				Attack.kill(211);
			} catch(e) {
				print(e);

				Attack.clearLevel();
			}

			Pickit.pickItems();

			Pather.teleport = false;

			Pather.moveTo(22579, 15706);

			Pather.moveTo(22577, 15649, 10);

			Pather.moveTo(22577, 15609, 10);

			npc = getUnit(1, NPC.Tyrael);

			if (!npc) {
				return false;
			}

			for (i = 0; i < 3; i += 1) {
				if (getDistance(me, npc) > 3) {
					Pather.moveToUnit(npc);
				}

				npc.interact();
				delay(1000 + me.ping);
				me.cancel();

				if (Pather.getPortal(null)) {
					me.cancel();

					break;
				}
			}

			Town.goToTown();
		}

		this.changeAct(3);

		return true;
	};

	this.figurine = function () { // Perform the Golden Bird quest or wait for another character to do so, then drink the potion.
		var cain, alkor, meshif;

/*	------- SiC-666 NOTES ------
		me.getQuest(20, 6) = ask cain about the jade figurine (persists after talking to cain)
		me.getQuest(20, 2) = Show Meshif the figurine (persists after talking to Meshif)
		me.getQuest(20, 16/19) = Ask cain about golden bird? need to check to see when these turn on. All i know is they are off before finding the figurine.
		me.getQuest(20, 4) = Give golden bird to Alkor
		me.getQuest(20, 1/28) = Return to Alkor for reward. 28 turns on once quest log is opened after reaching this stage.
		me.getQuest(20, 0) = Quest complete.
		me.getQuest(20, 5/12/13) = Quest complete/have potion? (16/19 persist at this stage, but 6/2/4/1 are off)
		me.getQuest(20, 5/12/13/16/19) = persists after drinking potion
	----------------------------
*/
		print("Processing the Figurine");

		Town.goToTown(3);

		if (me.getItem(546)) { // Have A Jade Figurine.
			if (!me.getQuest(20, 2)) { // Not at the "Show Meshif the Figurine" stage yet. Need to talk to Cain.
				Town.move(NPC.Cain);

				cain = getUnit(1, NPC.Cain);

				cain.openMenu();

				me.cancel();
			}

			Town.move(NPC.Meshif);

			meshif = getUnit(1, NPC.Meshif);

			meshif.openMenu();
		}

		if (me.getItem(547)) { // Have The Golden Bird.
			if (!me.getQuest(20, 4)) { // Not at the "Give Golden Bird to Alkor" stage yet. Need to talk to Cain.
				Town.move(NPC.Cain);

				cain = getUnit(1, NPC.Cain);

				cain.openMenu();

				me.cancel();
			}

			Town.move(NPC.Alkor);

			alkor = getUnit(1, NPC.Alkor);

			alkor.openMenu();

			me.cancel();
		}

		if (!me.getQuest(20, 1) && !me.getQuest(20, 0)) {
			var j = 0 ;

			while (!me.getQuest(20, 1) && !me.getQuest(20, 0)) { // Haven't done the Jade Figurine quest yet. It's possible another character has the Jade Figurine. After checking myself for it and processing if it had it, I should wait here until the "Return to Alkor for reward" stage.
				sendPacket(1, 0x40); // This is likely required to refresh the status of me.getQuest(20, 1) as has been tested with me.getQuest(18, 0) in this.travincal()

				delay(1000);

				if (j % 5 == 0) { // Check for Team Members every 5 seconds.
					this.teamInGame();
				}

				j += 1;
			}
		}

		if (!me.getQuest(20, 0)) {
			Town.move(NPC.Alkor);

			alkor = getUnit(1, NPC.Alkor);

			alkor.openMenu();

			me.cancel();
		}

		delay(500);

		potion = me.getItem(545); // Already declared var and checked once in this.start(). Now that Golden Bird is complete, check for the unit again.

		if (potion) {
			print("Drinking the Figurine potion!");

			if (potion.location > 3) {
				this.openStash();
			}

			clickItem(1, potion);
		}

		Town.move(NPC.Cain);

		teamFigurine = false;

		print("Seriously, the 'Potion of Life'?? Tastes more like 'Potion of Piss'!!!");

		return true;
	};


	this.lamEsen = function () { // Teleporting Sorc walks over to Alkor and completes the quest for everyone via exploit.
		var i, alkor, target;

		print("Lam Essen's Tome");

		Town.goToTown(3);

		this.teamInGame();

		if (!me.inTown) {
			Town.goToTown();
		}
		if (teleportingSorc) {
			if (me.charlvl >=18 && me.classid ===1 ) {
				Pather.teleport = true;
			} else {
				Pather.teleport = false;
			}

			if (!Town.goToTown() || !Pather.useWaypoint(80, true)) {
				throw new Error("Lam Essen quest failed");
			}

			Precast.doPrecast(false);

			if (!Pather.moveToExit(94, true) || !Pather.moveToPreset(me.area, 2, 193)) {
				throw new Error("Lam Essen quest failed");
			}

			if (Pather.teleport === true) {
				this.clearToExit(80, 94, false);

				if (!Pather.moveToPreset(me.area, 2, 193, 0, 0, 0)) {
					Pather.moveToPreset(me.area, 2, 193);
				}

			} else {
				this.clearToExit(80, 94, 0);
				if (!Pather.moveToPreset(me.area, 2, 193, 0, 0, 0)) {
					Pather.moveToPreset(me.area, 2, 193);
				}
			}

			target = getUnit(2, 193);

			Misc.openChest(target);
			delay(300);

			target = getUnit(4, 548);
			Pickit.pickItem(target);
			Town.goToTown();
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "Lam Essen");
		}

		Town.move(NPC.Alkor);

		target = getUnit(1, NPC.Alkor);

		while(target && target.openMenu()) {
			me.cancel();
			sendPacket(1, 0x40); //to refresh the status of me.getQuest(17, 0).
			if (me.getQuest(17, 0)) { // Have completed Lam Esen's Tome.
				break;
			}
		}

		//Pather.teleport = false;

		return true;
	};

	this.eye = function () {
		print("getting eye");

		this.teamInGame();

		if (!me.inTown) {
			Town.goToTown();
		}

		if (me.charlvl >=18 && me.classid ===1 ) { // Dark-f add only sorceress
			Pather.teleport = true;
		} else {
			Pather.teleport = false;
		}

		Pather.useWaypoint(76, true);

		Precast.doPrecast(true);

		if (Pather.teleport === true) {
			this.clearToExit(76, 85, false);

			//Pather.moveToPreset(me.area, 2, 407);
			var presetUnit = getPresetUnit(85, 2, 407);

			if (!presetUnit) {
				return false;
			}

			Pather.moveTo(presetUnit.roomx * 5 + presetUnit.x, presetUnit.roomy * 5 + presetUnit.y, 15, false);
		} else {
			this.clearToExit(76, 85, Config.ClearType);
			if (!Pather.moveToPreset(me.area, 2, 407, 0, 0, Config.ClearType)) {
				Pather.moveToPreset(me.area, 2, 407);
			}
			Attack.clear(20);
		}

		this.getQuestItem(553, 407);

		Town.goToTown();

		if (me.getItem(553)) {
			Town.move("stash");
			delay(me.ping);
			Town.openStash();
			Storage.Stash.MoveTo(me.getItem(553));
		}

		//Pather.teleport = false;

		return true;
	};

	this.heart = function () {
		print("getting heart");

		this.teamInGame();

		if (!me.inTown) {
			Town.goToTown();
		}

		if (me.charlvl >=18 && me.classid ===1 ) { // Dark-f add only sorceress
			Pather.teleport = true;
		} else {
			Pather.teleport = false;
		}

		Pather.useWaypoint(80, true);

		Precast.doPrecast(true);

		if (Pather.teleport === true) {

			this.clearToExit(80, 92, false);

			this.clearToExit(92, 93, false);

			//Pather.moveToPreset(me.area, 2, 405);
			var presetUnit = getPresetUnit(93, 2, 405);

			if (!presetUnit) {
				return false;
			}

			Pather.moveTo(presetUnit.roomx * 5 + presetUnit.x, presetUnit.roomy * 5 + presetUnit.y, 15, false);

			this.getQuestItem(554, 405);

		} else {

			this.clearToExit(80, 92, true);

			this.clearToExit(92, 93, true);

			//Pather.moveToPreset(me.area, 2, 405);
			var presetUnit = getPresetUnit(93, 2, 405);

			if (!presetUnit) {
				return false;
			}

			Pather.moveTo(presetUnit.roomx * 5 + presetUnit.x, presetUnit.roomy * 5 + presetUnit.y, 15, true);

			this.getQuestItem(554, 405);
		}

		Town.goToTown();

		if (me.getItem(554)) {
			Town.move("stash");
			delay(me.ping);
			Town.openStash();
			Storage.Stash.MoveTo(me.getItem(554));
		}

		//Pather.teleport = false;

		return true;
	};

	this.brain = function () {
		print("getting brain");

		this.teamInGame();

		if (!me.inTown) {
			Town.goToTown();
		}

		if (me.charlvl >=18 && me.classid ===1 ) { // Dark-f add only sorceress
			Pather.teleport = true;
		} else {
			Pather.teleport = false;
		}

		Pather.useWaypoint(78, true);

		Precast.doPrecast(true);

		if (Pather.teleport === true) {

			this.clearToExit(78, 88, false);

			this.clearToExit(88, 89, false);

			this.clearToExit(89, 91, false);

			//Pather.moveToPreset(me.area, 2, 406);
			var presetUnit = getPresetUnit(91, 2, 406);

			if (!presetUnit) {
				return false;
			}

			Pather.moveTo(presetUnit.roomx * 5 + presetUnit.x, presetUnit.roomy * 5 + presetUnit.y, 15, false);

			this.getQuestItem(555, 406);

		} else {

			this.clearToExit(78, 88, true);

			this.clearToExit(88, 89, true);

			this.clearToExit(89, 91, true);

			//Pather.moveToPreset(me.area, 2, 406);
			var presetUnit = getPresetUnit(91, 2, 406);

			if (!presetUnit) {
				return false;
			}

			Pather.moveTo(presetUnit.roomx * 5 + presetUnit.x, presetUnit.roomy * 5 + presetUnit.y, 15, true);

			this.getQuestItem(555, 406);

		}

		Town.goToTown();

		if (me.getItem(555)) {
			Town.move("stash");
			delay(me.ping);
			Town.openStash();
			Storage.Stash.MoveTo(me.getItem(555));
		}

		//Pather.teleport = false;

		return true;
	};

	this.travincal = function () {
		var cain, orgX, orgY, preArea;
		Town.repair();
		this.buildList = function (checkColl) {
			var monsterList = [],
				monster = getUnit(1);

			if (monster) {
				do {
					if ([345, 346, 347].indexOf(monster.classid) > -1 && Attack.checkMonster(monster) && (!checkColl || !checkCollision(me, monster, 0x1))) {
						monsterList.push(copyUnit(monster));
					}
				} while (monster.getNext());
			}

			return monsterList;
		};

		print("travincal");

		this.teamInGame();

		Pather.teleport = true; // Turn teleport on for all characters. Will turn off right before fighting if it is normal difficulty.

		Town.goToTown(3);

		while (!cain || !cain.openMenu()) { // Try more than once to interact with Deckard Cain.
			Packet.flash(me.gid);

			Town.move(NPC.Cain);

			cain = getUnit(1, NPC.Cain);

			delay(1000);
		}

		me.cancel();

		if (teleportingSorc) { // I am the Teleporting Sorc, open a portal to Travincal next to the High Council.
			Pather.useWaypoint(83);

			Precast.doPrecast(true);

			orgX = me.x;
			orgY = me.y;

			this.teamInGame();

			Pather.moveTo(orgX + 129, orgY - 92, 5, false);	// (<3 kolton)

			Pather.makePortal();
		} else { // I am not a Sorc, enter the Sorc's Travincal portal.
			Town.move("portalspot");

			var j = 0;

			while (!Pather.usePortal(83, null)) {
				delay(250);

				if (j % 20 == 0) { // Check for Team Members every 5 seconds.
					this.teamInGame();
				}

				j += 1;
			}
		}

		if (me.diff === 0) { // All characters don't teleport during the fight in normal.
			Pather.teleport = false;
		}

		Attack.clearList(this.buildList(0)); // Kill the High Council

		Pickit.pickItems();

		if (teleportingSorc && !me.getQuest(18, 0)) { // I am the Teleporting Sorc and I have not completed Khalim's Will yet. Will smash the orb while the others keep the area clear.
			this.getQuestItem(173); // Pick up Khalim's Flail.

			preArea = me.area;

			if (!me.inTown) {
				Town.goToTown();
			}

			this.cubeFlail(); // Make Khalim's Will if I have the ingredients.

			this.equipFlail() // This function purposely throws an error if Khalim's Will isn't present or is lost in the process.

			Town.move("portalspot");

			if (!Pather.usePortal(preArea, me.name)) {
				throw new Error("AutoSmurf.travincal: Failed to go back from town");
			}

			Config.PacketCasting = 1;

			this.teamInGame();

			this.placeFlail();
		} else { // I am not the Teleporting Sorc or Khalim's Will has been completed. If it the latter is true the while loop on the next line will be skipped.
			while (!me.getQuest(18, 0)) { // I am not the Teleporting Sorc and have not completed Khalim's Will yet.
				sendPacket(1, 0x40); // This is required to refresh the status of me.getQuest(18, 0). Without it, me.getQuest(18, 0) will not == 1 until the Quest Tab is opened on the character.

				Pather.moveToExit(100, false); // Stairs to Durance of Hate Level 1.

				Attack.clear(15);

				delay(1000);
			}
		}
		var unit = getUnit(4, 546);
		if (unit && teleportingSorc)
			this.getQuestItem(546);
		if (me.findItem(546) || me.findItem(547) || me.getQuest(20, 1)) { // Have A Jade Figurine or The Golden Bird or need to Return to Alkor for Reward (possible if someone's Pickit then Town processes the Quest). Tell the Teleporting Sorc so she gets us to process it.
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "team figurine");

			teamFigurine = true;
		}

		Town.goToTown();

		if (teleportingSorc)
			Pickit.pickItems();

		Item.autoEquip(); // For teleportingSorc to re-equip her weapon.

		//Pather.teleport = false; // Turn off teleporting for all characters.

		this.waitForPartyMembers(); // Wait for everyone to finish Travincal and come to town so I don't miss someone announcing team figurine.

		print("done travincal.");

		return true;
	};

	this.mephisto = function (takeRedPortalOnly) {
		if (takeRedPortalOnly === undefined) {
			takeRedPortalOnly = false;
		}

		var cain;

		print("mephisto");
		Town.repair();
		Pather.teleport = true;

		if (teleportingSorc) { // I am the Teleporting Sorc.
			Pather.useWaypoint(101);

			Precast.doPrecast(true);

			this.clearToExit(101, 102, false);

			Pather.moveTo(17566, 8069);

			Pather.makePortal();
		} else {
			Town.goToTown(3);

			Town.move(NPC.Cain);

			cain = getUnit(1, NPC.Cain);

			if (!cain || !cain.openMenu()) {
				return false;
			}

			me.cancel();

			Town.move("portalspot");

			var j = 0;

			while (!Pather.usePortal(102, null)) {
				delay(250);

				if (j % 20 == 0) { // Check for Team Members every 5 seconds.
					this.teamInGame();
				}

				j += 1;
			}
		}

		this.teamInGame();

		if (!takeRedPortalOnly) {
			if (!Attack.kill(242)) {
				Attack.clear(20);
			}

			Pickit.pickItems();
		}

		if ((me.getQuest(22, 0) || me.getQuest(22, 12)) && ((me.diff === 0 && this.partyLevel(mephLvl)) || (me.diff === 1 && this.partyLevel(mephLvlnm)) || (me.diff === 2 && this.partyLevel(mephLvlhell)))) { // Completed Meph Quest and the party has reached the difficulty specific mephLvl requirement.
			var i, redPortal;

			for (i = 0 ; i < 5 ; i += 1) {
				redPortal = getPresetUnit(102, 2, 342);

				if (redPortal) {
					break;
				}

				delay(me.ping * 2 + 250);
			}

			while (getDistance(me.x, me.y, redPortal.roomx * 5 + redPortal.x, redPortal.roomy * 5 + redPortal.y) > 10) {
				try {
					Pather.moveToPreset(102, 2, 342, 0, 0, false, false);
				} catch (e) {
					print("Caught Error.");

					print(e);
				}
			}

			while (me.area === 102) {
				redPortal = getUnit(2, 342);

				Pather.usePortal(null, null, redPortal); // Go to Act 4.
			}
		} else {
			Town.goToTown();

			Town.doChores();
		}

		//Pather.teleport = false;

		this.waitForPartyMembers();

		return true;
	};

	this.izual = function () {
		var tyrael;

		print("izual");
		Town.repair();
		Town.doChores(); // Need max amount of potions otherwise might prematurely TP in Plains Of Despair.

		this.teamInGame();

		if (!me.getQuest(25, 1)) {
			if (!boBarb && !otherChar) {
				Pather.teleport = true;

				Town.goToTown();

				Precast.doPrecast(true);

				Config.ClearType = false;

				this.clearToExit(103, 104, false); // Outer Steppes

				this.clearToExit(104, 105, false); // Plains Of Despair

				//Pather.moveToPreset(105, 1, 256);
				var presetUnit = getPresetUnit(105, 1, 256);

				if (!presetUnit) {
					return false;
				}

				Pather.moveTo(presetUnit.roomx * 5 + presetUnit.x, presetUnit.roomy * 5 + presetUnit.y, 15, false);

				if (me.diff === 0) { // Don't Teleport while killing Izual in Normal Difficulty.
					Pather.teleport = false;
				}

				Pather.makePortal();
			} else {
				Town.goToTown(4);

				Town.move("portalspot");

				var j = 0;

				while (!Pather.usePortal(105, null)) {
					delay(250);

					if (j % 20 == 0) { // Check for Team Members every 5 seconds.
						this.teamInGame();
					}

					j += 1;
				}
			}

			this.teamInGame();

			try {
				if (!Attack.clear(15, 0, 256)) { // Izual
					Attack.clear(20);
				}
			} catch (e) {
				Attack.clear(20);
			}

			Town.goToTown();
		}

		Town.move(NPC.Tyrael);

		tyrael = getUnit(1, NPC.Tyrael);

		tyrael.openMenu();

		me.cancel();

		return true;
	};

	this.diablo = function () {
		// Sort function
		this.sort = function (a, b) {
			if (Config.BossPriority) {
				if ((a.spectype & 0x5) && (b.spectype & 0x5)) {
					return getDistance(me, a) - getDistance(me, b);
				}

				if (a.spectype & 0x5) {
					return -1;
				}

				if (b.spectype & 0x5) {
					return 1;
				}
			}

			// Entrance to Star / De Seis
			if (me.y > 5325 || me.y < 5260) {
				if (a.y > b.y) {
					return -1;
				}

				return 1;
			}

			// Vizier
			if (me.x < 7765) {
				if (a.x > b.x) {
					return -1;
				}

				return 1;
			}

			// Infector
			if (me.x > 7825) {
				if (!checkCollision(me, a, 0x1) && a.x < b.x) {
					return -1;
				}

				return 1;
			}

			return getDistance(me, a) - getDistance(me, b);
		};

		// general functions
		this.getLayout = function (seal, value) {
			var sealPreset = getPresetUnit(108, 2, seal);

			if (!seal) {
				throw new Error("Seal preset not found. Can't continue.");
			}

			if (sealPreset.roomy * 5 + sealPreset.y === value || sealPreset.roomx * 5 + sealPreset.x === value) {
				return 1;
			}

			return 2;
		};

		this.initLayout = function () {
			this.vizLayout = this.getLayout(396, 5275);
			this.seisLayout = this.getLayout(394, 7773);
			this.infLayout = this.getLayout(392, 7893);
		};

		this.openSeal = function (classid) {
			var i, seal;

			for (i = 0; i < 5; i += 1) {
				Pather.moveToPreset(me.area, 2, classid, classid === 394 ? 5 : 2, classid === 394 ? 5 : 0);

				seal = getUnit(2, classid);

				if (!seal) {
					return false;
				}

				if (seal.mode) { // Other player opened Seal already.
					return true;
				}

				seal.interact();

				delay(classid === 394 ? 1000 : 500); // De Seis optimization

				if (!seal.mode) {
					if (classid === 394 && Attack.validSpot(seal.x + 15, seal.y)) { // De Seis optimization
						Pather.moveTo(seal.x + 15, seal.y);
					} else {
						Pather.moveTo(seal.x - 5, seal.y - 5);
					}

					delay(500);
				} else {
					return true;
				}
			}

			return false;
		};

		this.chaosPreattack = function (name, amount) {
			var i, n, target, positions;

			switch (me.classid) {
			case 3:
				target = getUnit(1, name);

				if (!target) {
					return;
				}

				positions = [[6, 11], [0, 8], [8, -1], [-9, 2], [0, -11], [8, -8]];

				for (i = 0; i < positions.length; i += 1) {
					if (Attack.validSpot(target.x + positions[i][0], target.y + positions[i][1])) { // check if we can move there
						Pather.moveTo(target.x + positions[i][0], target.y + positions[i][1]);
						Skill.setSkill(Config.AttackSkill[2], 0);

						for (n = 0; n < amount; n += 1) {
							Skill.cast(Config.AttackSkill[1], 1);
						}

						break;
					}
				}

				break;
			default:
				break;
			}
		};

		this.getBoss = function (name) {
			var i, boss,
				glow = getUnit(2, 131);

			for (i = 0; i < 16; i += 1) {
				boss = getUnit(1, name);

				if (boss) {
					this.chaosPreattack(name, 8);

					return Attack.clear(40, 0, name, this.sort);
				}

				delay(250);
			}

			return !!glow;
		};

		this.vizierSeal = function () {
			print("Viz layout " + this.vizLayout);

			this.followPath(this.vizLayout === 1 ? this.starToVizA : this.starToVizB);

			if (!this.openSeal(395) || !this.openSeal(396)) {
				throw new Error("Failed to open Vizier seals.");
			}

			if (this.vizLayout === 1) {
				Pather.moveTo(7691, 5292, 3, true);
			} else {
				Pather.moveTo(7695, 5316, 3, true);
			}


			if (!this.getBoss(getLocaleString(2851))) {
				throw new Error("Failed to kill Vizier");
			}

			return true;
		};

		this.seisSeal = function () {
			print("Seis layout " + this.seisLayout);

			this.followPath(this.seisLayout === 1 ? this.starToSeisA : this.starToSeisB);

			if (!this.openSeal(394)) {
				throw new Error("Failed to open de Seis seal.");
			}

			if (this.seisLayout === 1) {
				if (me.classid === 1) {
					delay(3000);
					Pather.moveTo(7771, 5216); //(7771, 5196);
				} else {
					Pather.moveTo(7771, 5196, 3, true);
				}
			} else {
				if (me.classid === 1) {
					delay(3000);
					Pather.moveTo(7798, 5206); //(7798, 5186);
				} else {
					Pather.moveTo(7798, 5186, 3, true);
				}
			}

			if (!this.getBoss(getLocaleString(2852))) {
				throw new Error("Failed to kill de Seis");
			}

			return true;
		};

		this.infectorSeal = function () {
			print("Inf layout " + this.infLayout);

			this.followPath(this.infLayout === 1 ? this.starToInfA : this.starToInfB);

			if (!this.openSeal(392)) {
				throw new Error("Failed to open Infector seals.");
			}

			if (this.infLayout === 1) {
				delay(1);
			} else {
				if (me.classid === 1) { // Dark-f
					Pather.moveTo(7908, 5295); // tested by Dark-f
				} else {
					Pather.moveTo(7928, 5295, 3, true); // temp
				}
			}

			if (!this.getBoss(getLocaleString(2853))) {
				throw new Error("Failed to kill Infector");
			}

			if (!this.openSeal(393)) {
				throw new Error("Failed to open Infector seals.");
			}

			return true;
		};

		this.diabloPrep = function () {
			var trapCheck,
				tick = getTickCount();

			while (getTickCount() - tick < 30000) {
				if (getTickCount() - tick >= 8000) {
					if (getUnit(1, 243)) {
						return true;
					}

					switch (me.classid) {
					case 1: // Sorceress
						if ([56, 59, 64].indexOf(Config.AttackSkill[1]) > -1) {
							if (me.getState(121)) {
								delay(500);
							} else {
								Skill.cast(Config.AttackSkill[1], 0, 7793, 5293);
							}

							break;
						}

						delay(500);

						break;
					case 3: // Paladin
						Skill.setSkill(Config.AttackSkill[2]);

						Skill.cast(Config.AttackSkill[1], 1);

						break;
					case 5: // Druid
						if (Config.AttackSkill[1] === 245) {
							Skill.cast(Config.AttackSkill[1], 0, 7793, 5293);

							break;
						}

						delay(500);

						break;
					case 6: // Assassin
						if (Config.UseTraps) {
							trapCheck = ClassAttack.checkTraps({x: 7793, y: 5293});

							if (trapCheck) {
								ClassAttack.placeTraps({x: 7793, y: 5293, classid: 243}, trapCheck);

								break;
							}
						}

						delay(500);

						break;
					default:
						delay(500);

						break;
					}
				} else {
					delay(500);
				}

				if (getUnit(1, 243)) {
					return true;
				}
			}

			throw new Error("Diablo not found");
		};

		this.followPath = function (path) {
			var i;

			for (i = 0; i < path.length; i += 2) {
				if (this.cleared.length) {
					this.clearStrays();
				}


				Pather.moveTo(path[i], path[i + 1], 3, getDistance(me, path[i], path[i + 1]) > 50);

				Attack.clear(30, 0, false, this.sort);

				// Push cleared positions so they can be checked for strays
				this.cleared.push([path[i], path[i + 1]]);


				// After 5 nodes go back 2 nodes to check for monsters
				if (i === 10 && path.length > 16) {
					path = path.slice(6);

					i = 0;
				}
			}
		};

		this.clearStrays = function () {
			var i,
				oldPos = {x: me.x, y: me.y},
				monster = getUnit(1);

			if (monster) {
				do {
					if (Attack.checkMonster(monster)) {
						for (i = 0; i < this.cleared.length; i += 1) {
							if (getDistance(monster, this.cleared[i][0], this.cleared[i][1]) < 30 && Attack.validSpot(monster.x, monster.y)) {
								Pather.moveToUnit(monster);

								Attack.clear(15, 0, false, this.sort);

								break;
							}
						}
					}
				} while (monster.getNext());
			}

			if (getDistance(me, oldPos.x, oldPos.y) > 5) {
				Pather.moveTo(oldPos.x, oldPos.y);
			}

			return true;
		};

		this.cleared = [];

		// path coordinates
		this.entranceToStar = [7794, 5490, 7769, 5484, 7771, 5423, 7782, 5413, 7767, 5383, 7772, 5324];
		this.starToVizA = [7766, 5306, 7759, 5295, 7734, 5295, 7716, 5295, 7718, 5276, 7697, 5292, 7678, 5293, 7665, 5276, 7662, 5314];
		this.starToVizB = [7766, 5306, 7759, 5295, 7734, 5295, 7716, 5295, 7701, 5315, 7666, 5313, 7653, 5284];
		this.starToSeisA = [7772, 5274, 7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7775, 5205, 7804, 5193, 7814, 5169, 7788, 5153];
		this.starToSeisB = [7772, 5274, 7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7811, 5218, 7807, 5194, 7779, 5193, 7774, 5160, 7803, 5154];
		this.starToInfA = [7815, 5273, 7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5295, 7919, 5290];
		this.starToInfB = [7815, 5273, 7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5274, 7927, 5275, 7932, 5297, 7923, 5313];
/*
		this.entranceToStar = [7794, 5517, 7791, 5491, 7768, 5459, 7775, 5424, 7817, 5458, 7777, 5408, 7769, 5379, 7777, 5357, 7809, 5359, 7805, 5330, 7780, 5317, 7791, 5293];
		this.starToVizA = [7759, 5295, 7734, 5295, 7716, 5295, 7718, 5276, 7697, 5292, 7678, 5293, 7665, 5276, 7662, 5314];
		this.starToVizB = [7759, 5295, 7734, 5295, 7716, 5295, 7701, 5315, 7666, 5313, 7653, 5284];
		this.starToSeisA = [7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7775, 5205, 7804, 5193, 7814, 5169, 7788, 5153];
		this.starToSeisB = [7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7811, 5218, 7807, 5194, 7779, 5193, 7774, 5160, 7803, 5154];
		this.starToInfA = [7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5295, 7919, 5290];
		this.starToInfB = [7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5274, 7927, 5275, 7932, 5297, 7923, 5313];
*/
		// start
		print("diablo");
		Town.doChores();
		this.teamInGame();

		//if ( teleportingSorc && me.classid === 1) {
		if (me.classid === 1) {
			Pather.teleport = true;
		} else {
			Pather.teleport = false;
		}
		var clearType;

		if (teleportingSorc) {
			Pather.useWaypoint(107);

			Precast.doPrecast(true);
			if ( me.classid === 1) {
				clearType = false;
			} else {
				clearType = true;
			}

		/*	if ((me.diff === 0 && !this.partyLevel(30)) || (me.diff === 1 && !this.partyLevel(50)) || (me.diff === 2 && !this.partyLevel(75))) {
				Pather.moveTo(7790, 5544, 10, clearType, clearType); // Start at Entrance.

				Pather.makePortal();
				Town.goToTown();
			} else {*/
				Pather.moveTo(7791, 5293, 10, clearType, clearType); // Start at Star.

				Pather.makePortal();
				Town.goToTown();
			//}
		} else {
			Town.goToTown(4);

			Town.move("portalspot");

			Precast.doPrecast(true);

			while (!Pather.usePortal(108, null)) {
				delay(250);
			}
		}
		this.Bo();
		Attack.clear(10);
		if (teleportingSorc) {
			delay(5000);
			//Pather.teleport = false;
			Pather.usePortal(108, null);
			Pather.makePortal();
		}
		Config.ClearType = 0;

		this.initLayout();

		Attack.clear(30, 0, false, this.sort);

		Precast.doPrecast(true);

		if (me.y > 5400) {
			print("Started at Entrance.");

			this.followPath(this.entranceToStar);

			Attack.clear(30, 0, false, this.sort);
		} else {
			print("Started at Star.");
		}
		this.Bo();
		this.vizierSeal();
		this.Bo();
		this.seisSeal();

		Precast.doPrecast(true);
		if (me.classid === 1)
			delay(2000);
		this.Bo();
		//Pather.teleport = true;
		this.infectorSeal();

		if (me.gametype === 0 && (!this.partyLevel(diaLvl) || (me.diff === 1 && !this.partyLevel(diaLvlnm)) || me.diff === 2)) { // Don't kill Diablo in classic unless the difficulty specific level requirement is met.
			print("Not ready to kill diablo!!"); // NOTE TO USERS: In classic, never kill Diablo in Hell difficulty with this script. It's better to switch to a CS Taxi script that will run faster and maintain Diablo virgin kills.

			Town.goToTown();

			this.waitForPartyMembers();

			delay(2000);

			return true;
		}

		this.teamInGame();

		switch (me.classid) {
		case 1:
			Pather.moveTo(7772, 5274); //7792,5294

			break;
		default:
			Pather.moveTo(7788, 5292);

			break;
		}

		this.diabloPrep();
		this.Bo();
		if (me.gametype === 0) {
			try {
				Attack.hurt(243, 30);
			} catch(e) {
				print(e);
			}

			Town.goToTown();

			Town.doChores();

			Town.move("portalspot");

			getScript("tools/ToolsThread.js").pause(); // Pausing ToolsThread.js will effectively turn off chicken and leaving when other characters exit.

			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "ready to kill diablo");

			while (readyToKillDiablo !== Config.AutoSmurf.TeamSize - 1) {
				delay(250);
			}

			this.teamInGame();

			Pather.usePortal(108, null);
		}

		try {
			Attack.kill(243); // Diablo
		} catch(e) {
			print(e);

			var diablo = getUnit(1, 243);

			if (diablo) {
				while (Attack.checkMonster(diablo)) {
					delay(250);
				}
			}
		}

		if (me.dead) { // It is possible to die after ToolsThread.js is paused (no potions and no chicken).
			var diablo = getUnit(1, 243);

			while (Attack.checkMonster(diablo)) {
				delay(250);
			}
		}

		delay(2000); // Seems necessary to delay after Diablo dies for experience and quest to be gained.

		Pickit.pickItems();

		//Pather.teleport = false;

		if (me.gametype === 0) { // Exit game in classic.
			while (me.ingame) {
				D2Bot.restart(); // D2Bot# will restart this profile immediately (avoids congrats screen).

				delay(1000);
			}
		}

		return true; // Continue to Act 5 in expansion.
	};


	this.shenk = function () { // SiC-666 TODO: Rewrite this.
		print("shenk");
		Town.doChores();
		this.teamInGame();
		if (me.getQuest(35, 1)) {
			return true;
		}
		if (teleportingSorc) {
			if (!Pather.useWaypoint(111, false)) {
				throw new Error();
			}
			Pather.teleport = true;
			Pather.moveTo(3883, 5113, 5, false);
			Pather.makePortal();
		} else {
			Town.goToTown(5);
			Town.move("portalspot");
			while(!Pather.usePortal(110, null)) {
				delay(1000);
			}
		}
		try{
			Attack.kill(getLocaleString(22435)); // Shenk the Overseer
		}catch(e) {
			print(e);
		}

		return true;
	};

	this.rescueBarbs = function() { // SiC-666 TODO: Rewrite this.
		print("coming barbies");
	//(<3 Larryw)
		var i, k, qual, door, skill,
			coords =[],
			barbSpots = [];

		this.teamInGame();
		if (!me.getQuest(36,1) && teleportingSorc) {
			Pather.teleport = true;
			Pather.useWaypoint(111, false);
			Precast.doPrecast(true);
			barbSpots = getPresetUnits (me.area, 2, 473);

			if (!barbSpots) {
				return false;
			}
			for ( i = 0  ; i < barbSpots.length ; i += 1) {
				coords.push({
					x: barbSpots[i].roomx * 5 + barbSpots[i].x - 3, //Dark-f: x-3
					y: barbSpots[i].roomy * 5 + barbSpots[i].y
				});
			}
			Config.PacketCasting = 1;

			for ( k = 0  ; k < coords.length ; k += 1) {
				print("going to barbspot "+(k+1)+"/"+barbSpots.length);
				Pather.moveToUnit(coords[k], 2, 0);
				door = getUnit(1, 434);
				if (door) {
					Pather.moveToUnit(door, 1, 0);
					for (i = 0; i < 20 && door.hp; i += 1) {
						if (me.getSkill(45, 1))
							Skill.cast(45, 0, door.x, door.y);
						delay(50);
						if (me.getSkill(55, 1))
							Skill.cast(55, 0, door.x, door.y);
						delay(50);
						if (me.getSkill(47, 1))
							Skill.cast(47, 0, door.x, door.y);
						delay(50);
						if (me.getSkill(49, 1))
							Skill.cast(40, 0, door.x, door.y);
						delay(50);
					}
				}
				delay(1500 + 2 * me.ping); //barb going to town...
			}
			delay(1000);
			Town.goToTown();
		}
		Town.move("qual-kehk");
		delay(1000+me.ping);
		qual = getUnit(1, "qual-kehk");
		while(!me.getQuest(36,0)) {
			qual.openMenu();
			me.cancel();
			delay(500);
			sendPacket(1, 0x40); //fresh Quest state.
			if (me.getQuest(36,0))
				break;
		}

		return true;
	};

	this.anya = function () { // Dark-f: Rewrite this.
		print(NPC.Anya);

		var i, anya, malah, scroll, unit, waitAnya;

		Town.doChores();
		this.teamInGame();
		if (!me.getQuest(37, 1)) {

			if (teleportingSorc) {

				Precast.doPrecast(true);

				Pather.useWaypoint(113, false);

				var clearType;

				if (me.classid === 1) {	//Dark-f: mind already changed, this is not correct now
					Pather.teleport = true;
					clearType = false;
				} else {
					Pather.teleport = false;
					clearType = true;
				}
				try{
					Pather.moveToExit(114, true, clearType);
				}catch(e) {
					print(e);
				}
				if (me.area!==114) {
					try{
						Pather.moveToExit(114, true, clearType);
					}catch(e) {
						print(e);
					}
				}
				if (me.classid ===1 ) {
					unit = getPresetUnit(me.area, 2, 460);
					while(true) {
						Pather.moveToUnit(unit, 15, 15, false);
						anya = getUnit(2, 558);
						if ( anya && getDistance(me, anya) < 35)
							break;
					}
				}
				Pather.makePortal();

			} else {
				Town.goToTown(5);
				Town.move("portalspot");
				while(!Pather.usePortal(114, null)) {
					delay(1000);
				}
			}
			//this.Bo();
			//this.teamInGame();
			//unit = getPresetUnit(me.area, 2, 460);
			//Pather.moveToUnit(unit, true);
			Attack.clear(50);
			delay(me.ping+850);

			anya = getUnit(2, 558);
			if (anya) {
				if (teleportingSorc) {
					Pather.moveToUnit(anya);
					for (i = 0; i < 3; i += 1) {
						if (getDistance(me, anya) > 3) {
							Pather.moveToUnit(anya);
						}
						anya.interact();
						delay(300 + me.ping);
						me.cancel();
					}

					Town.goToTown(5);
					Town.move(NPC.Malah);
					malah = getUnit(1, NPC.Malah);
					while(true) {
						malah.interact();
						if (malah && malah.openMenu()) {
							me.cancel();
						}
						if ( me.getItem(644))
							break;
						delay(500);
					}
				} else {
					delay(10000);
					Attack.clear(30);
					while(!Pather.usePortal(null, null)) { // Wait for TeleportingSorc making portal
						delay(1000);
						Attack.clear(30);
					}
				}
				if ( me.getItem(644)) {
					Town.move("portalspot");
					while(!Pather.usePortal(114, null)) {
						delay(1000);
					}

					for (i = 0; i < 3; i += 1) {
						if (getDistance(me, anya) > 3) {
							Pather.moveToUnit(anya);
						}
						anya.interact();
						delay(300 + me.ping);
						me.cancel();
					}
				}
			}
			Town.goToTown(5);
			Town.move(NPC.Malah);
			malah = getUnit(1, NPC.Malah);
			while(true) {
				malah.interact();
				malah.openMenu();
				me.cancel(1);
				if (me.getItem(646))
					break;
				delay(1000);
			}
		}
		Town.goToTown(5);
		scroll = me.getItem(646);
		if (scroll) {
			clickItem(1, scroll);
		}
		anya = getUnit(1, NPC.Anya);
		Town.move(NPC.Anya);
		if (!anya) {
			for (waitAnya=0 ; waitAnya<30 ; waitAnya+=1) {
				delay(1000);
				anya = getUnit(1, NPC.Anya);
				if (anya) {
					break;
				}
			}
		}
		if (anya) {
			Town.move(NPC.Anya);
			anya.openMenu();
			me.cancel();
		}

		return true;
	};

	this.ancients = function () { // SiC-666 TODO: Rewrite this.
		print("ancients");

		var i, j, altar, time;
		Town.doChores();
		this.teamInGame();
		Pather.teleport = true;
		if (teleportingSorc) {
			Pather.useWaypoint(118, true);
			Pather.moveToExit(120, false);
			Pather.makePortal();
		}else{
			Town.goToTown(5);
			Town.move("portalspot");
			while(!Pather.usePortal(118, null)) {
				delay(10000);
			}
		}
		Precast.doPrecast(true);
		Pather.teleport = true;

		try{
			Pather.moveToExit(120, true);
		}catch(e) {
			print(e);
		}

		if (me.area !==120) {
			if (!me.inTown) {
				Town.goToTown();
			}
			Town.move("portalspot");
			delay(10000);
			while(!Pather.usePortal(118, null)) { //(118, !me.name) ??
				delay(1000);
			}
			try{
				Pather.moveToExit(120, true);
			}catch(e) {
				print(e);
			}
		}
		Pather.moveTo(10048, 12634, 5, Config.ClearType);
		this.teamInGame();
		this.Bo();
		Config.LifeChicken = 0; // Exit game if life is less or equal to designated percent.
		Config.TownHP = 0; // Go to town if life is under designated percent.
		Config.ManaChicken = 0; // Exit game if mana is less or equal to designated percent.
		Config.MercChicken = 0; // Exit game if merc's life is less or equal to designated percent.
		Config.TownMP = 0; // Go to town if mana is under designated percent.
		Config.TownCheck = false; // Go to town if out of potions
		Config.MercWatch = false; // Don't revive merc during battle.
		Pather.teleport = true;
		altar = getUnit(2, 546);
		for(time=0; time<80 ; time+=1) {
			if (this.playerIn() || wait === 1) {
				break;
			}
			delay(1000);
		}

		if (altar && teleportingSorc) {
			Pather.moveToUnit(altar);
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "WaitMe");
			delay(500 + me.ping * 3);
			clickMap(0, 0, altar);
			delay(100 + me.ping * 2);
			me.cancel();
			while (!getUnit(1, 542)) {
				delay(250);
				me.cancel();
			}
		}
		while(true) {
			Attack.clear(60);
			delay(3000);
			me.cancel();
			sendPacket(1, 0x40); //fresh Quest state.
			if (me.getQuest(39,0))
				break;
		}
		this.clearToExit(120, 128, true);
		if (teleportingSorc) {
			this.clearToExit(128, 129, false);
			this.clickWP();
		}
		Town.goToTown();
		return true;
	};

	this.baal = function () { // SiC-666 TODO: Rewrite this.
		print("baal");
	//(<3 YGM)
		this.teamInGame();
		var portal, tick, baalfail, questTry, time, l, merc,
		quest = false;
		Town.doChores();
		this.preattack = function () {
			var check;

			switch (me.classid) {
			case 1: // Sorceress
				switch (Config.AttackSkill[1]) {
				case 49:  // Lightening
				case 53:  // Chain Lightening
				case 56:  // Meteor
				case 59:  // Blizzard
				case 64:  // Frozen Orb
					if (me.getState(121)) {
						while (me.getState(121)) {
							delay(100);
						}
					} else {
						return Skill.cast(Config.AttackSkill[1], 0, 15090 + rand(-5, 5), 5026);
					}

					break;
				}

				break;
			case 3: // Paladin
				if (Config.AttackSkill[3] === 112) { // 112	Blessed Hammer
					if (Config.AttackSkill[4] > 0) {
						Skill.setSkill(Config.AttackSkill[4], 0);
					}

					return Skill.cast(Config.AttackSkill[3], 1);
				}

				break;
			case 5: // Druid
				if (Config.AttackSkill[3] === 245) {
					return Skill.cast(Config.AttackSkill[3], 0, 15094 + rand(-1, 1), 5028);
				}

				break;
			case 6: // Assassin
				if (Config.UseTraps) {
					check = ClassAttack.checkTraps({x: 15094, y: 5028});

					if (check) {
						return ClassAttack.placeTraps({x: 15094, y: 5028}, 5);
					}
				}

				if (Config.AttackSkill[3] === 256) { // shock-web
					return Skill.cast(Config.AttackSkill[3], 0, 15094, 5028);
				}

				break;
			}

			return false;
		};

		this.checkThrone = function () {
			var monster = getUnit(1);

			if (monster) {
				do {
					if (Attack.checkMonster(monster) && monster.y < 5080) {
						switch (monster.classid) {
						case 23:
						case 62:
							return 1;
						case 105:
						case 381:
							return 2;
						case 557:
							return 3;
						case 558:
							return 4;
						case 571:
							return 5;
						default:
							Attack.getIntoPosition(monster, 10, 0x4);
							Attack.clear(15);

							return false;
						}
					}
				} while (monster.getNext());
			}

			return false;
		};

		this.clearThrone = function () {
			var i, monster,
				monList = [],
				pos = [15094, 5022, 15094, 5041, 15094, 5060, 15094, 5041, 15094, 5022];

			//avoid dolls
				monster = getUnit(1, 691);

				if (monster) {
					do {
						if (monster.x >= 15072 && monster.x <= 15118 && monster.y >= 5002 && monster.y <= 5079 && Attack.checkMonster(monster) && Attack.skipCheck(monster)) {
							monList.push(copyUnit(monster));
						}
					} while (monster.getNext());
				}

				if (monList.length) {
					Attack.clearList(monList);
				}


			for (i = 0; i < pos.length; i += 2) {
				Pather.moveTo(pos[i], pos[i + 1]);
				Attack.clear(25);
			}
		};

		this.checkHydra = function () {
			var monster = getUnit(1, "hydra");
			if (monster) {
				do {
					if (monster.mode !== 12 && monster.getStat(172) !== 2) {
						if (me.classid === 1) { // I'm a sorceress, dodge Hydras if
							Pather.moveTo(15072, 5002);
						} else {
							Pather.moveTo(15118, 5002);
						}
						while (monster.mode !== 12) {
							delay(500);
							if (!copyUnit(monster).x) {
								break;
							}
						}

						break;
					}
				} while (monster.getNext());
			}

			return true;
		};

		Town.doChores();
		for(questTry = 0 ; questTry < 10 ; questTry +=1) {
			if (me.getQuest(40,0)) {
				quest = true;
				break;
			}
			delay(100);
		}
		Pather.teleport = true;
		if (teleportingSorc) {
			try{
				Pather.useWaypoint(129);
			}catch(e) {
				print(e);
				Town.goToTown();
				for(baalfail = 0; baalfail < 10; baalfail =+1) {
					if (!Pather.usePortal(131, null)) {
						delay(1000);
					}
					if (!Pather.usePortal(129, null)) {
						delay(1000);
					}
					if (me.area === 131) {
						Pather.moveToExit([130, 129], true);
						this.clickWP();
						break;
					}
					if (me.area === 129) {
						this.clickWP();
						break;
					}
					delay(10000);
					if (baalfail === 8) {
						D2Bot.printToConsole("I'm broken :/");
					}
				}

			}
			if (!this.partyLevel(28)) {
				Pather.makePortal();
			}
		}else{
			Town.goToTown(5);
			Town.move("portalspot");
			if (this.partyLevel(28)) {
				while(!Pather.usePortal(131, null)) {
					delay(500);
				}
			}else{
				while(!Pather.usePortal(129, null)) {
					delay(500);
				}
			}
		}

		//teleporting
		if (teleportingSorc && this.partyLevel(28)) {
			Pather.moveToExit([130, 131], true);
			//Pather.moveTo(15121, 5237);
			Pather.moveTo(15095, 5029);
			Pather.moveTo(15118, 5002);
			Pather.makePortal();
		}

		//walking
		if (!this.partyLevel(28)) {
			Pather.teleport = false;
			Precast.doPrecast(true);
			try{
				Pather.moveToExit(130, true, Config.ClearType);
				if (me.area !== 130) {
					Pather.teleport = true;
					Pather.moveToExit(130, true);
					Pather.teleport = false;
				}
				Pather.moveToExit(131, true, Config.ClearType);
				if (me.area !== 131) {
					Pather.teleport = true;
					Pather.moveToExit(131, true);
					Pather.teleport = false;
				}
			}catch(e) {
					if (!boBarb && !otherChar) {
						Pather.teleport = true;
						Town.goToTown();
						Pather.useWaypoint(129);
						Precast.doPrecast(true);
						Pather.moveToExit([130, 131], true);
						Pather.teleport = false;
					}else{
						Town.goToTown();
						Town.move("portalspot");
						while(!Pather.usePortal(131, null)) {
							delay(1000);
						}
					}
			}
			Pather.moveTo(15095, 5029, 5, Config.ClearType);
		}

		Pather.teleport = true;
		Attack.clear(15);
		this.clearThrone();
		tick = getTickCount();
		Pather.moveTo(15094, me.classid === 3 ? 5029 : 5038, 5, Config.ClearType);
		Precast.doPrecast(true);

	BaalLoop:
		while (true) {
		//	if (getDistance(me, 15094, me.classid === 3 ? 5029 : 5038) > 3) {
		//		Pather.moveTo(15094, me.classid === 3 ? 5029 : 5038);
		//	}
			if (me.classid === 3 || me.classid === 4) {
				Pather.moveTo(15094, 5029);
				this.Bo();
			} else if (me.classid === 1) {
				Pather.moveTo(15094, 5038);
			}

			if (!getUnit(1, 543)) {
				break BaalLoop;
			}
			switch (this.checkThrone()) {
			case 1:
				Attack.clear(40);

				tick = getTickCount();

				Precast.doPrecast(true);

				break;
			case 2:
				Attack.clear(40);

				tick = getTickCount();

				break;
			case 3:
				Attack.clear(40);

				this.checkHydra();

				tick = getTickCount();

				break;
			case 4:

				Attack.clear(40);

				tick = getTickCount();

				break;
			case 5:
				Attack.clear(40);
				if (me.charlvl === 69 && me.diff === 1) {
					for (l = 0; l < 5; l += 1) {
						merc = me.getMerc();
						if (merc) {
							break;
						}
					delay(100);
					}
					if (merc) {
						if (!merc.getState(43)) {
							Town.goToTown();
							this.hireMerc(1);
							delay(60000);
							quit();
						}
					}
				}
				break BaalLoop;
			default:
				if (getTickCount() - tick < 7e3) {
					if (me.getState(2)) {
						Skill.setSkill(109, 0);
					}

					break;
				}

				if (!this.preattack()) {
					delay(100);
				}

				break;
			}

			delay(10);
		}

		sendPacket(1, 0x40);
		delay(me.ping*2);

		if (!this.partyLevel(baalLvl) || (me.diff === 1 && !this.partyLevel(baalLvlnm)) || (me.diff === 2 && !this.partyLevel(mfLvlhell))) { // If the team hasn't met the level requirement in Normal or Nightmare, don't kill baal.
			return true;
		}

		this.teamInGame();
		for(questTry = 0 ; questTry < 10 ; questTry +=1) {
			if (me.getQuest(40,0)) {
				quest = true;
				break;
			}
			delay(100);
		}

		if (!quest) {
			Config.QuitList = [];
		}
		Pather.moveTo(15090, 5008); //, 5, Config.ClearType);
		delay(5000);
		Precast.doPrecast(true);
		this.Bo();
		while (getUnit(1, 543)) {
			delay(500);
		}
		portal = getUnit(2, 563);
		if (portal) {
			Pather.usePortal(null, null, portal);
		} else {
			throw new Error("Baal: Couldn't find portal.");
		}
		for(time=0; time<200 ; time+=1) {
			if (time>30) {
				quit();
			}
			if (this.playerIn()) {
				break;
			}
			delay(1000);
		}
		Pather.moveTo(15134, 5923);
		try{
			Attack.kill(544); // Baal
		}catch(e) {
			delay(10000);
			print(e);
		}
		Pickit.pickItems();
		delay(2000);
		if (!quest) {
			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "avoiding congrats screen");

			delay(20 * me.ping); // Wait 2-4 seconds for others to pause ToolsThread.js before leaving.

			D2Bot.restart(); // Avoid congrats screen.
		}

		//Pather.teleport = false;

		return true;
	};

//MAIN
	//addEventListener("copydata", ReceiveCopyData);
	//addEventListener("chatmsg", chatEvent);
	addEventListener("copydata", (id, data) => {
		let { msg, nick } = JSON.parse(data);
		// Dark-f ->
		if ( iAmReady && Config.AutoSmurf.TeamSize === 1 ) {
			teamIsReady = true;

			print("Team is ready! Telling others :)");

			Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "team is ready");
		}
		// <- Dark-f
		if (id == 55) {
			switch (msg) {
			case "ready":
				readyCount += 1;

				print("readyCount = " + readyCount);

				if (iAmReady && readyCount === Config.AutoSmurf.TeamSize - 1) {  // Doesn't count my ready because my messages are ignored. Subtract one from TeamSize to account for this.
					if (!teamIsReady) { // Only need to change teamIsReady to true once.
						teamIsReady = true;

						print("Team is ready! Telling others :)");

						Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "team is ready");
					}
				}
				break;
			case "team is ready":
				if (!teamIsReady) { // Only need to change teamIsReady to true once.
					teamIsReady = true;

					print("Received team is ready!");
				}
				break;
			case "at waypoint":
				atWPCount += 1;

				print("atWPCount = " + atWPCount);

				break;
			case "ready to drink":
				readyToDrink += 1;
				print("readyToDrink = " + readyToDrink);
				break;
			case "cube":
				cube = true;
				break;
			case "need cube":
				getCube = true;
				break;
			case "amulet":
				amulet = true;
				break;
			case "summoner":
				summoner = true;
				break;
			case "tombs":
				tombs = true;
				break;
			case "radament":
				radament = true;
				break;
			case "kill radament":
				killRadament = true;
				break;
			case "clear orifice":
				clearOrifice = true;
				break;
			case "duriel":
				duriel = true;
				break;
			case "travincal":
				travincal = true;
				break;
			case "team figurine":
				teamFigurine = true;
				break;
			case "figurine":
				figurine = true;
				break;
			case "Lam Essen":
				LamEssen = true;
				break;
			case "mephisto":
				mephisto = true;
				break;
			case "red portal":
				redPortal = true;
				break;
			case "ready to kill diablo":
				readyToKillDiablo += 1;

				print("readyToKillDiablo = " + readyToKillDiablo);

				break;
			case "master":
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, nick + " is my master.");
				break;
			case "smurf":
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "Smurf!");
				break;
			case "WaitMe":
				wait = 1;
				break;
			case "hi":
			case "yo!":
			case "hello":
			case "hey":
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "yo");
				break;
			case "I'm here!":
				ok += 1;
				break;
			case "bo":
				boing =1;
				break;
			case "I'm bored -.-":
				goBo =1;
				break;
			case "I'm Boed!":
				boed += 1;
				break;
			case "Ok Bitch":
				if (me.gold < Config.LowGold) {
					pick = 1;
				}
				break;
			case "GimmeGold":
				if (me.gold > Config.LowGold * 2 + 100) {
					Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "Ok Bitch");
					give = 1;
				}
				break;
			case "TP":
			case "Tp":
			case "tp":
			case "portal":
			case "tp plz":
				nickTP = nick;
				this.giveTP(nickTP);
				nickTP = false;
				break;
			case "ReadyForTravincal":
				teamFlail = 1;
				break;
			case "GotScroll":
				teamScroll = 1;
				break;
			case "GotStaff":
				teamStaff = 1;
				break;
			case "GotThePower":
				teamStaff2 = 1;
				break;
			case "GotBrain":
				teamBrain = 1;
				break;
			case (msg.match("Have: ") ? msg : null): // We're comparing if that case's value is equal to our switch term. Thus, if the msg contains "Have: " compare msg to msg (do case), otherwise compare msg to null (don't do case).
				msg = msg.split("Have: ")[1].split(""); // Change msg from a string to an array of 0's and 1's representing waypoint possession.

				msg.unshift(nick); // Add the waypoint owner's name to the front of the array.

				teamWaypoints.push(msg); // Record the Team Member's list of Waypoint possession values. SiC-666 TODO: Should we check to make sure this character's waypoints hasn't been previously recorded?

				break;
			}
		}
	});
	/*
	getScript("tools/Party.js").pause();

	if (getParty(me).partyid != 65535) {
		clickParty(getParty(me.name), 3); // Leave party so the others will wait for me.
	}
	*/
	this.checkRole();

	var tick = getTickCount();

	while (!this.teamInGame(true)) { // Wait for the AutoSmurf Team to join.
		delay(1000);

		if (getTickCount() - tick > 5 * 60 * 1000) { // Leave the game after 5 minutes of waiting.
			print("Team wasn't in game within 5 minutes.");

			D2Bot.printToConsole("AutoSmurf: Team didn't join the game within 5 minutes.", 9);

			quit();
		}
	}
	this.start();

	//act1
	if (!me.getQuest(7, 0)) { // Andariel is not done.
		Town.goToTown(1);

		//den
		if (!me.getQuest(1, 0)) {
			this.den();
		}

		if (me.diff === 0) { // Normal difficulty.
			//cave
			if (!me.getQuest(2, 0) && me.getQuest(1, 0) && !this.partyLevel(caveLvl)) { // Haven't killed Blood Raven, have completed the Den of Evil and the party hasn't reached the caveLvl requirement.
				this.cave();
			}
			//blood raven
			if (!me.getQuest(2, 0) && me.getQuest(1, 0) && this.partyLevel(caveLvl)) { // Haven't killed Blood Raven, have completed the Den of Evil and the party has reached the caveLvl requirement.
				this.blood();
			}

			//cain
			if (!me.getQuest(4, 0) && this.partyLevel(caveLvl)) { // Haven't completed The Search for Cain and the party has reached the caveLvl requirement.
				this.cain(); // Only rescues cain SiC-666 TODO: this is redundant, should grab the questing from autoladderreset or something to consolidate.
			}

			//trist
			if (me.getQuest(4, 0) && !this.partyLevel(tristLvl)) { // Have completed The Search for Cain and the party hasn't reached the tristLvl requirement

				this.trist();
				/* When the partyLevel is less than the tristLvl, the game must quit.
				I think that the party should Lv up going to Dark Wood and so on.
				*/
				if (!this.partyLevel(tristLvl)) {

					this.tristAfter();
				}
			}
		}

		if (me.diff > 0) { // Nightmare & Hell difficulty.
			if (!me.getQuest(4, 0)) { 	// Haven't completed The Search for Cain and the party has reached the caveLvl requirement.
				this.cain(); 			// Only rescues cain
			}
		}

		//andy
		if (!me.getQuest(7, 0) && ((me.diff === 0 && this.partyLevel(tristLvl)) || (me.diff !== 0))) {

			this.andy();
		}
	}

	//act2
	if (!me.getQuest(15, 0) && me.getQuest(7, 0)) { // Duriel is not done and Andariel is.

		Town.goToTown(2);

		if (teleportingSorc) { // I am the leader.
			if (!me.getItem(549) || getCube || me.charlvl < 18) { // No cube or team member is requesting cube or am not level 18 yet (required to teleport to the summoner).
				if (me.diff === 0)
					this.hireMerc();
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "cube");
				this.cube();
			}

			if ((!me.getItem(521) && !me.getItem(91) && !me.getQuest(10, 0)) || !me.getQuest(11, 0)) { // No Amulet of the Viper/Horadric Staff and Horadric Staff quest (staff placed in orifice) is incomplete or The Tainted Sun quest is incomplete.
				if (me.charlvl >= baalLvl && me.charlvl <= diaLvlnm)
					this.hireMerc(1);
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "amulet");
				this.amulet();
			}

			if (!me.getQuest(13, 0) && me.getQuest(11 , 0) || !Pather.useWaypoint(46, true)) { // Summoner quest incomplete but The Tainted Sun is complete.
				this.travel(4); // Travel to all waypoints up to and including Arcane Sanctuary if I don't have them.

				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "summoner");

				this.summoner();
			}

			if (!this.partyLevel(tombsLvl) && me.diff === 0) {
				this.travel(5); // Travel to all waypoints up to and including Canyon Of The Magi if I don't have them.
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "tombs");
				this.tombs(); // Clears to the chest in all of Tal Rashas Tomb's (except for the one with the Orifice). Will quit() at the end if the team hasn't reached tombsLvl requirement.
			}

			if (!me.getItem(92) && !me.getItem(91) && !me.getQuest(10, 0)) { // No Staff of Kings nor Horadric Staff and Horadric Staff quest (staff placed in orifice) not complete.

				this.staff();
			}

			if (me.getItem(92) && me.getItem(521) && me.getItem(549)) { // Have The Staff of Kings, The Viper Amulet, and The Horadric Cube.
				this.cubeStaff();
			}

			if (!me.getQuest(9, 0)) { // && me.diff <= 2) { // Haven't finished Radament's Lair.
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "radament");
				this.radament();
			}

			if (!me.getQuest(14, 0) && (this.partyLevel(tombsLvl) || me.diff !== 0)) { // Haven't completed Duriel and team has reached level goal or this isn't normal difficulty.
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "duriel");

				this.duriel();
			}

		} else { // Not the leader.
			var j = 0;

			while (!me.getQuest(14, 0)) { // Haven't completed Duriel.
				if (cube) {
					if (me.diff === 0)
						this.hireMerc();
					this.cube();
					cube = false;
				}

				if (amulet) {
					if (me.charlvl >= baalLvl && me.charlvl <= diaLvlnm)
						this.hireMerc(1);
					this.amulet();

					amulet = false;
				}

				if (summoner) {
					this.summoner();

					summoner = false;
				}

				if (tombs) {
					this.tombs();

					tombs = false;
				}

				if (radament) {
					this.radament();

					radament = false;
				}

				if (duriel) {
					this.duriel();

					duriel = false;
				}

				delay(250);

				if (j % 20 == 0) { // Check for Team Members every 5 seconds.
					this.teamInGame();
				}

				j += 1;
			}
		}
	}

	//act3
	if (!me.getQuest(23, 0) && me.getQuest(15, 0)) { // "Able to go to Act IV" (AKA haven't gone thru red portal to Act 4) is not done and Duriel is.
		Town.goToTown(3);
		if (teleportingSorc ) { // I am the Teleporting Sorc
			this.travel(6); // Travel to all waypoints up to and including Travincal if I don't have them.

			if (teamFigurine) { // Someone has the Jade Figurine!
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "figurine");

				this.figurine();
			}

			if (!me.getQuest(17, 0)) { // Haven't completed Lam Esen's Tome.

				this.lamEsen();
			}

			if (!me.getItem(553) && !me.getItem(174) && !me.getQuest(18, 0)) { // Don't have Eye and don't have Khalim's Will and haven't completed Khalim's Will.
				this.eye();
			}

			if (!me.getItem(554) && !me.getItem(174) && !me.getQuest(18, 0)) { // Don't have Heart and don't have Khalim's Will and haven't completed Khalim's Will.
				this.heart();
			}

			if (!me.getItem(555) && !me.getItem(174) && !me.getQuest(18, 0)) { // Don't have Brain and don't have Khalim's Will and haven't completed Khalim's Will.
				this.brain();
			}

			if (me.getItem(174) || (me.getItem(553) && me.getItem(554) && me.getItem(555)) || !me.getQuest(20, 0) || !me.getQuest(21, 0)) { // Have Khalim's Will or have Eye, Heart, and Brain, or Golden Bird isn't complete, or The Blackened Temple isn't complete.
			//if (!me.getQuest(21, 0)) { // Have Khalim's Will or have Eye, Heart, and Brain, or Golden Bird isn't complete, or The Blackened Temple isn't complete.
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "travincal");
				this.travincal();
			}

			if (teamFigurine) { // Someone has the Jade Figurine!
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "figurine");

				this.figurine();
			}

			if (!me.getQuest(23, 0) && me.getQuest(18, 0) && me.getQuest(21, 0) ) { //no matter Golden bird && me.getQuest(20, 0)) { // Haven't been "Able to go to Act IV" yet and have completed Khalim's Will (AKA the stairs to Durance of Hate Level 1 are open), The Blackened Temple (AKA everyone can enter a Durance Of Hate Level 3 Town Portal), and Golden Bird.
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "mephisto");

				this.travel(7); // Travel to Durance Of Hate Level 2 Waypoint if I don't have it.

				this.mephisto(); // Won't take the portal to Act 4 until the team has met the mephLvl requirement.
			}
		} else {
			var j = 0;

			while (!me.getQuest(23, 0)) { // Haven't completed "Able to go to Act IV" (AKA haven't gone thru red portal to Act 4)
				if (LamEssen) {
					this.lamEsen();
					LamEssen = false;
				}

				if (travincal) {
					this.travincal();

					travincal = false;
				}

				if (figurine) {
					this.figurine();

					figurine = false;
				}

				if (mephisto) {
					this.mephisto();

					mephisto = false;
				}

				if (redPortal) { // I'm a straggler stuck in Act 3. TeleportingSorc is going to help me thru the Red Portal to Act 4!
					this.mephisto(true);

					redPortal = false;
				}

				delay(250);

				if (j % 20 == 0) { // Check for Team Members every 5 seconds.
					this.teamInGame();
				}

				j += 1;
			}
		}
	}

	//act4
	var runDiablo = 0; // Dark-f: for running baal

	if (me.getQuest(23, 0) && (!me.getQuest(28, 0) || !this.partyLevel(diaLvl) || (me.diff === 1 && !this.partyLevel(diaLvlnm)))) { // Have been to Act 4 and Diablo is not done or haven't reached the difficulty specific level requirement.
		Town.goToTown(4);

		if (teleportingSorc) { // I am the Teleporting Sorc
			var checkPartyAct;

			while (!checkPartyAct) { // Wait for everyone to get back to their Town, then record the lowest Town.
				checkPartyAct = this.partyAct();

				delay(250);
			}

			if (checkPartyAct === 3) { // If the lowest Town is Act 3.
				Messaging.sendToList(Config.AutoSmurf.AllTeamProfiles, "red portal");

				D2Bot.printToConsole("AutoSmurf: Helping straggler complete Act 3.", 5);

				this.mephisto(true);
			}

			this.travel(8);	// Travel to all waypoints up to and including River of Flame if I don't have them.
		}

		if (!me.getQuest(25, 0) || me.getQuest(25, 1)) { // The Fallen Angel is not done or it has been started.
			this.izual();
		}

		runDiablo = 1; // Dark-f: kill diablo first.

		this.diablo();
	}

	//act5
	if (me.gametype === 1 && teleportingSorc && me.getQuest(39, 0) && !getWaypoint(38) )
		Pather.getWP(129, false);
	if (me.gametype === 1 && me.getQuest(39, 0) && ((me.diff == 1 && !this.partyLevel(baalLvlnm)) || me.diff == 2)) { //Dark-f
		if (teleportingSorc) {
			D2Bot.printToConsole("I'm the leader, changed script.");
			OnOff.enable("Config.MFLeader");
			OnOff.enable("Scripts.Andariel");
			OnOff.enable("Scripts.Countess");
			//OnOff.enable("Scripts.Mausoleum");
			//OnOff.enable("Scripts.Pit");
			//OnOff.enable("Scripts.AncientTunnels");
			OnOff.enable("Scripts.Duriel");
			OnOff.enable("Scripts.Travincal");
			OnOff.enable("Scripts.Mephisto");
			OnOff.enable("Scripts.Pindleskin");
			OnOff.enable("Scripts.Eldritch");
			//OnOff.enable("Scripts.Nihlathak");
			OnOff.enable("Scripts.Diablo");
			OnOff.enable("Scripts.Baal");
			if ((me.diff === 1 && !this.partyLevel(baalLvlnm)) || (me.diff == 2 && !this.partyLevel(mfLvlhell)))
				OnOff.disable("Config.Baal.KillBaal");
		} else {
			OnOff.enable("Scripts.MFHelper");
			OnOff.enable("Scripts.DiabloHelper");
			OnOff.enable("Scripts.BaalHelper");
			D2Bot.printToConsole("I'm a follower, changed script.");
		}
		OnOff.disable("Scripts.AutoSmurf");
	}

	//if (me.gametype === 1 && me.getQuest(28, 0) && ((me.diff === 0 && this.partyLevel(diaLvl)) || (me.diff === 1 && this.partyLevel(diaLvlnm)) || me.diff == 2)) { // Am an expansion character, Diablo is done, and the party has reached the difficulty specific diaLvl requirement or it's Hell difficulty.
	if (me.gametype === 1 && me.getQuest(28, 0)) { //Dark-f
		Town.goToTown(5);
		if (!me.getQuest(37,1) && teleportingSorc) {
			this.travel(9);
		}

		if (!me.getQuest(35, 1) && !me.getQuest(35, 0)) {
			this.shenk();
		}

		if ((!me.getQuest(36,0) || me.getQuest(36,1)) && me.diff < 2) {
			this.rescueBarbs();
		}

		if ( !me.getQuest(37, 0) ) { //Dark-f
			this.anya();
		}
		// Rite of Passage is not completed
		if (!me.getQuest(39, 0))
			this.ancients();
		if (teleportingSorc && !getWaypoint(38))
			Pather.getWP(129, false);

		if (runDiablo === 0 && me.diff === 0) { // running diablo
			Town.goToTown(4);
			this.diablo();
			Town.goToTown(4);
			Town.doChores();
			Pather.useWaypoint(129);
			this.waitForPartyMembers();
			delay(3000);
			this.Bo();
		}
		this.baal(); // Won't kill Baal in Normal and Nightmare until the team has met the baalLvl or baalLvlnm requirement.
	}

	return true;
}

var OnOff = {
	file: "",

	find: function() {
		var i, n,
		configFilename = "",
		classes = ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"];

		for (i = 0; i < 5; i += 1) {
			switch (i) {
			case 0: // Custom config
				if (!isIncluded("config/_customconfig.js")) {
					include("config/_customconfig.js");
				}

			for (n in CustomConfig) {
				if (CustomConfig.hasOwnProperty(n)) {
					if (CustomConfig[n].indexOf(me.profile) > -1) {
						if (notify) {
							print("ÿc2Loading custom config: ÿc9" + n + ".js");
						}

						 configFilename = n + ".js";

						break;
					}
				}
			}

				break;
			case 1:// Class.Profile.js
				configFilename = classes[me.classid] + "." + me.profile + ".js";

				break;
			case 2: // Realm.Class.Charname.js
				configFilename = me.realm + "." + classes[me.classid] + "." + me.charname + ".js";

				break;
			case 3: // Class.Charname.js
				configFilename = classes[me.classid] + "." + me.charname + ".js";

				break;
			case 4: // Profile.js
				configFilename = me.profile + ".js";

				break;
			}

			if (configFilename && FileTools.exists("libs/config/" + configFilename)) {
				this.file = "libs/config/" + configFilename;
				return true;
			}
		}
		print("ÿc;ConfigChanger ÿc0:: Couldn't find config file.");
		return false;
	},

	disable: function(line) {
		this.find();
		if (this.file == "") {
			return false;
		}

		try {
			var confFile = File.open(this.file, 0);
		} catch (e) {
			return false;
		}
		var lines = confFile.readAllLines();
		confFile.close();

		for (var i = 0; i < lines.length; i++) {
			if (lines[i].match(line + " = ")) {
				lines[i] = lines[i].replace(/true/gi, "false");
				print("ÿc;ConfigChanger ÿc0:: Disabled: " + line);
				Misc.fileAction(this.file, 1, lines.join("\n"));
				return true;
			}
		}

		return true;
	},

	enable: function(line) {
		this.find();
		if (this.file == "") {
			return false;
		}

		try {
			var confFile = File.open(this.file, 0);
		} catch (e) {
			return false;
		}

		var lines = confFile.readAllLines();
		confFile.close();

		for (var i = 0; i < lines.length; i++) {
			if (lines[i].match(line + " = ")) {
				lines[i] = lines[i].replace(/false/gi, "true");
				print("ÿc;ConfigChanger ÿc0:: Enabled: " + line);
				Misc.fileAction(this.file, 1, lines.join("\n"));

				return true;
			}
		}

		return true;
	}
};