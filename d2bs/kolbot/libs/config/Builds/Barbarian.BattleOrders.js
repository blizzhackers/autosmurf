/** BattleOrders Barbarian Build
*
* Instructions:	See /d2bs/kolbot/libs/config/Builds/README.txt
*
* Skill IDs:	See /d2bs/kolbot/sdk/skills.txt for a list of skill IDs.
*
* Stat IDs:
*
* 	Strength	= 0
* 	Energy		= 1
* 	Dexterity	= 2
* 	Vitality	= 3
*

Finished Char Build:

	Stats													Base Stats
	----------												----------
 	Strength: 100 (70 points used)								30
 	Energy: 10 (no points)										10
 	Dexterity: 20 (no points) 									20
 	Vitality: 435 (5 stats remain, from quests?)				25

	Skills				Levelreq			SkillID			TotalPoints
	------------		--------			-------			-----------
	Howl				    1				  130				 1	- Done @ level 2
	Find Potion			    1				  131				 1	- Done @ level 3
	Shout				    6				  138				20	- Done @ level 51
	Leap				    6				  132				10	- Done @ level 7 *****PUMP Normal + Nightmare SKILL QUEST POINTS HERE***** (8 + 2 = 10)
	Find Item			   12				  142				20	- Done @ level 86 *****PUMP Hell SKILL QUEST POINTS HERE***** (4 + 1 = 5)
	Increased Stamina	   12				  141				 1	- Done @ level 12
	Iron Skin 			   18				  145				14	- Done @ level 94
	Battle Orders		   24				  149				20	- Done @ level 45
	Increased Speed		   24				  148				 1	- Done @ level 24
	Battle Command		   30				  155				 1	- Done @ level 30
	Natural Resistance	   30				  153				16	- Done @ level 66

	TOTAL Points Spent --------------------------------------> 100

	**********REMAINING SKILL POINTS =  10  ******** (110 - 100 = 10)

	Quest Skill Point   Level Used			SkillID			TotalPoints
	-----------------	----------			-------			-----------
	Norm Den of Evil         8                132                 1
	Norm Radament           27                132                 1
	Norm Izual              30                132                 2
	NM Den of Evil          43                132                 1
	NM Radament             43                132                 1
	NM Izual                43                132                 2
	Hell Den of Evil        70                142                 1
	Hell Radament           70                142                 1
	Hell Izual              70                142                 2
	
	TOTAL Quest Points Spent ----------------------------------> 12
	
	**********REMAINING QUEST SKILL POINTS =   0  ******** (12 - 12 = 0)

	Attack Config Variables For Barbarian
	---------------------------------------------------------------------------------------------------------------------
	Config.AttackSkill[0] = -1; // Preattack skill.
	Config.AttackSkill[1] = -1; // Primary skill for bosses.
	Config.AttackSkill[2] = -1; // Backup/Immune skill for bosses.
	Config.AttackSkill[3] = -1; // Primary skill for others.
	Config.AttackSkill[4] = -1; // Backup/Immune skill for others.
*/
js_strict(true);

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };

var AutoBuildTemplate = {

	1:	{
			//SkillPoints: [-1],										// This doesn't matter. We don't have skill points to spend at lvl 1
			//StatPoints: [-1,-1,-1,-1,-1],								// This doesn't matter. We don't have stat points to spend at lvl 1
			Update: function () {
				Config.TownCheck		= false;						// Don't go to town for more potions
				Config.StashGold 		= 200;							// Minimum amount of gold to stash.
				Config.AttackSkill		= [0, 0, 0, 0, 0];
				Config.LowManaSkill		= [0];
				Config.ScanShrines		= [15, 13, 12, 14, 7, 6, 2];
				Config.BeltColumn		= ["hp", "hp", "hp", "hp"];		// Keep tons of health potions!
				Config.MinColumn 		= [0, 0, 0, 0];
				//Config.PickitFiles.push("belowlevelseven.nip");		// Pick up normal armor, belts, etc. Keep ID scrolls and TP scrolls.
				Config.OpenChests = true;								// Might as well open em.
				Config.Cubing = false;									// Don't cube yet!
			}
		},

	2:	{
			SkillPoints: [130], 										// Howl + 1 (level 1)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	3:	{
			SkillPoints: [131], 										// Find Potion + 1 (level 1)
			StatPoints: [0, 0, 3, 3, 3],								// Strength + 2, Vitality + 3
			Update: function () {

			}
		},

	4:	{
			SkillPoints: [-1],											// Save Point + 1 (1 saved point remains)
			StatPoints: [0, 0, 0, 3, 3],								// Strength + 3, Vitality + 2
			Update: function () {
				Config.BeltColumn = ["hp", "hp", "hp", "mp"]; 			// Start keeping rejuvs
			}
		},

	5:	{
			SkillPoints: [-1],											// Save Point + 1 (2 saved points remain)
			StatPoints: [0, 0, 0, 0, 3],								// Strength + 4, Vitality + 1
			Update: function () {
				Config.ScanShrines = [15, 13, 12];
				Config.MinColumn = [1, 1, 1, 1];
			}
		},

	6:	{
			SkillPoints: [138, 132],									// Shout + 1, Leap + 1 (level 1) (level 1) (1 saved point remains)
			StatPoints: [0, 0, 3, 3, 3],								// Strength + 2, Vitality + 3
			Update: function () {

			}
		},

	7:	{
			SkillPoints: [138, 132],									// Shout + 1, Leap + 1 (level 2) (level 2) (0 saved points remain)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {
				//Config.PickitFiles.splice(Config.PickitFiles.indexOf("belowlevelseven.nip"), 1);	// Will remove index "belowlevel7.nip" from Config.PickitFiles
			}
		},

	8:	{
			SkillPoints: [138, 132], 									// Shout + 1, Leap + 1 (level 3) (level 3) (Normal Den of Evil Used)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	9:	{
			SkillPoints: [138], 										// Shout + 1 (level 4)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	10:	{
			SkillPoints: [138], 										// Shout + 1 (level 5)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {
				Config.LowGold = 5000;
			}
		},

	11:	{
			SkillPoints: [-1],											// Save Point + 1 (1 saved point remains)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	12:	{
			SkillPoints: [142, 141], 									// Find Item + 1, Increased Stamina + 1 (level 1) (level 1) (0 saved points remain)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	13:	{
			SkillPoints: [138], 										// Shout + 1 (level 6)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	14:	{
			SkillPoints: [138], 										// Shout + 1 (level 7)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	15:	{
			SkillPoints: [138], 										// Shout + 1 (level 8)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {
				Config.OpenChests = false;								// Eyes on the prize!
			}
		},

	16:	{
			SkillPoints: [138], 										// Shout + 1 (level 9)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {
				Config.TownCheck = true;								// Do go to town for more potions
			}
		},

	17:	{
			SkillPoints: [138], 										// Shout + 1 (level 10)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	18:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 1)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	19:	{
			SkillPoints: [138], 										// Shout + 1 (level 11)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	20:	{
			SkillPoints: [138], 										// Shout + 1 (level 12)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {
				Config.LowGold = 10000;
			}
		},

	21:	{
			SkillPoints: [138], 										// Shout + 1 (level 13)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	22:	{
			SkillPoints: [138], 										// Shout + 1 (level 14)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	23:	{
			SkillPoints: [-1],											// Save Point + 1 (1 saved point remains)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	24:	{
			SkillPoints: [149, 148], 									// Battle Orders + 1, Increased Speed + 1 (level 1) (level 1) (0 saved points remain)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {
				Config.Cubing = true;									// Will have a cube by now.
			}
		},

	25:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 2)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {
				Config.LowGold = 15000;
			}
		},

	26:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 3)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	27:	{
			SkillPoints: [149, 132], 									// Battle Orders + 1, Leap + 1 (level 4) (level 4) (Norm Radament)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	28:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 5)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	29:	{
			SkillPoints: [-1],											// Save Point + 1 (1 saved point remains)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	30:	{
			SkillPoints: [155, 153, 132, 132], 							// Battle Command + 1, Natural Resistance + 1 , Leap + 2 (level 1) (level 1) (level 6) (Norm Izual)
			StatPoints: [0, 3, 3, 3, 3, 3, 3, 3, 3, 3],					// Strength + 1, Vitality + 9 (Norm Lam Esen's Tome)
			Update: function () {
				Config.LowGold = 20000;
				Config.AttackSkill = [0, 155, 146, 149, 138, 142];
			}
		},

	31:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 6)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	32:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 7)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	33:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 8)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	34:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 9)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	35:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 10)
			StatPoints: [0, 0, 0, 0, 0],								// Strength + 5 (45)
			Update: function () {
				Config.LowGold = 30000;
			}
		},

	36:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 11)
			StatPoints: [0, 0, 0, 0, 0],								// Strength + 5 (50)
			Update: function () {

			}
		},

	37:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 12)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	38:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 13)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	39:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 14)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	40:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 15)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {
				Config.LowGold = 35000;
			}
		},

	41:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 16)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	42:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 17)
			StatPoints: [0, 0, 0, 0, 0],								// Strength + 5 (60)
			Update: function () {

			}
		},

	43:	{
			SkillPoints: [149, 132, 132, 132, 132], 					// Battle Orders + 1, Leap + 4 (level 18) (level 10) (NM Den of Evil, NM Radament, NM Izual)
			StatPoints: [0, 3, 3, 3, 3, 3, 3, 3, 3, 3],					// Strength + 1, Vitality + 9 (NM Lam Esen's Tome)
			Update: function () {

			}
		},

	44:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 19)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	45:	{
			SkillPoints: [149], 										// Battle Orders + 1 (level 20)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {
				Config.LowGold = 40000;
			}
		},

	46:	{
			SkillPoints: [138], 										// Shout + 1 (level 15)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	47:	{
			SkillPoints: [138], 										// Shout + 1 (level 16)
			StatPoints: [0, 3, 3, 3, 3],								// Strength + 1, Vitality + 4
			Update: function () {

			}
		},

	48:	{
			SkillPoints: [138], 										// Shout + 1 (level 17)
			StatPoints: [0, 0, 0, 0, 0],								// Strength + 5 (70 added)
			Update: function () {

			}
		},

	49:	{
			SkillPoints: [138], 										// Shout + 1 (level 18)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	50:	{
			SkillPoints: [138], 										// Shout + 1 (level 19)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {
				Config.MPBuffer = 0;									// Shouldn't be AutoSmurfing anymore.
				Config.BeltColumn = ["hp", "hp", "mp", "rv"];			// Regular potion settings
				Config.MinColumn = [3, 3, 3, 0];						// Regular potion settings
				Config.LowGold = 45000;
			}
		},

	51:	{
			SkillPoints: [138], 										// Shout + 1 (level 20)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	52:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 2)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	53:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 3)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	54:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 4)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	55:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 5)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {
				Config.LowGold = 50000;
			}
		},

	56:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 6)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	57:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 7)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	58:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 8)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	59:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 9)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	60:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 10)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {
				Config.LowGold = 55000;
			}
		},

	61:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 11)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	62:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 12)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	63:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 13)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	64:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 14)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	65:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 15)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {
				Config.LowGold = 60000;
			}
		},

	66:	{
			SkillPoints: [153], 										// Natural Resistance + 1 (level 16)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	67:	{
			SkillPoints: [142], 										// Find Item + 1 (level 2)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	68:	{
			SkillPoints: [142], 										// Find Item + 1 (level 3)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	69:	{
			SkillPoints: [142], 										// Find Item + 1 (level 4)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {
				
			}
		},

	70:	{
			SkillPoints: [142, 142, 142, 142, 142], 					// Find Item + 5 (level 9) (Hell Den of Evil, Hell Radament, Hell Izual)
			StatPoints: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],					// Vitality + 10 (Hell Lam Esen's Tome)
			Update: function () {
				Config.LowGold = 100000;
				
			}
		},

	71:	{
			SkillPoints: [142], 										// Find Item + 1 (level 10)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {
				
			}
		},

	72:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 2)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	73:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 3)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {
				
			}
		},

	74:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 4)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {
				
			}
		},

	75:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 5)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {
				
			}
		},

	76:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 6)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	77:	{
			SkillPoints: [142], 										// Find Item + 1 (level 11)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	78:	{
			SkillPoints: [142], 										// Find Item + 1 (level 12)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	79:	{
			SkillPoints: [142], 										// Find Item + 1 (level 13)
			StatPoints: [3, 3, 3, 3, 3],								// Vitality + 5
			Update: function () {

			}
		},

	80:	{
			SkillPoints: [142], 										// Find Item + 1 (level 14)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {
				Config.Gamble = true;									// Time to spend dat ca$h!!
				Config.ScanShrines = [];
			}
		},

	81:	{
			SkillPoints: [142], 										// Find Item + 1 (level 15)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	82:	{
			SkillPoints: [142], 										// Find Item + 1 (level 16)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	83:	{
			SkillPoints: [142], 										// Find Item + 1 (level 17)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	84:	{
			SkillPoints: [142], 										// Find Item + 1 (level 18)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	85:	{
			SkillPoints: [142], 										// Find Item + 1 (level 19)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	86:	{
			SkillPoints: [142], 										// Find Item + 1 (level 20)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	87:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 7)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	88:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 8)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	89:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 9)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	90:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 10)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	91:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 11)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	92:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 12)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	93:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 13)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	94:	{
			SkillPoints: [145], 										// Iron Skin + 1 (level 14)
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	95:	{
			SkillPoints: [-1], 											//
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	96:	{
			SkillPoints: [-1], 											//
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	97:	{
			SkillPoints: [-1], 											//
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	98:	{
			SkillPoints: [-1], 											//
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		},

	99:	{
			SkillPoints: [-1], 											//
			StatPoints: [-1, -1, -1, -1, -1],								// Vitality + 5
			Update: function () {

			}
		}
};