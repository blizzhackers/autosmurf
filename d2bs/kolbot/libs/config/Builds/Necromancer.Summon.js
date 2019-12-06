/** Summoner Necromancer Build
*
* Instructions:   See /d2bs/kolbot/libs/config/Builds/README.txt
*
* Skill IDs:   See /d2bs/kolbot/sdk/skills.txt for a list of skill IDs.
*
* Stat IDs:
*
* 	Strength	= 0
* 	Energy		= 1
* 	Dexterity	= 2
* 	Vitality	= 3
*

Finished Char Build:

    Stats                                                    Base Stats
    ------------                                             ----------
    Strength (0) :      15 (no points)                       15
    Energy   (1) :      20 (no points)                       20
    Dexterity(2) :      20 (no points)                       20
    Vitality (3) :      200 (175 points used)                25

    Skills              Levelreq            SkillID          TotalPoints
    ------------        --------            -------          -----------
    xxx                 1                   xx               1    - Done @ level
    xxx                 1                   xx               1    - Done @ level
*/
js_strict(true);

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };


var AutoBuildTemplate = {
	
	1:	{	
			//SkillPoints: [-1],										// This doesn't matter. We don't have skill points to spend at lvl 1]
			//StatPoints: [-1,-1,-1,-1,-1],								// This doesn't matter. We don't have stat points to spend at lvl 1
			Update: function () {
				Config.TownCheck		= false;						// Don't go to town for more potions
				Config.StashGold 		= 200;							// Minimum amount of gold to stash.
				Config.AttackSkill		= [-1, 0, 0, 0, 0, -1, -1];
				Config.LowManaSkill		= [0, 0];
				Config.ScanShrines		= [1, 15, 13, 12, 14, 7, 6, 3, 2];	
				Config.BeltColumn		= ["hp", "hp", "hp", "hp"];		// Keep tons of health potions!
				Config.MinColumn 		= [0, 0, 0, 0];
				Config.Skeletons = "max"; // Number of skeletons to raise. Set to "max" to auto detect, set to 0 to disable.
				Config.SkeletonMages = "max"; // Number of skeleton mages to raise. Set to "max" to auto detect, set to 0 to disable.
				Config.Revives = "max"; // Number of revives to raise. Set to "max" to auto detect, set to 0 to disable.
				Config.ActiveSummon = true; // Raise dead between each attack. If false, it will raise after clearing a spot.
				Config.ReviveUnstackable = true; // Revive monsters that can move freely after you teleport.
				//Config.PickitFiles.push("belowlevelseven.nip");		// Pick up normal armor, belts, etc. Keep ID scrolls and TP scrolls.
				Config.OpenChests = true;								// Might as well open em.
				Config.Cubing = false;									// Don't cube yet!
			}
		},

   2:   {   
         SkillPoints: [70],
         StatPoints: [0,0,0,0,0],
         Update: function () {
            
         }
      },

   3:   {
         SkillPoints: [66],
         StatPoints: [0,0,0,0,0],
         Update: function () {
			Config.Dodge = true;
			Config.Curse[0] = 66; // Boss curse.
           
         }
      },

   4:   {
         SkillPoints: [70],
         StatPoints: [0,0,0,0,0],
         Update: function () {
         }
      },

   5:   {
         SkillPoints: [68],
         StatPoints: [3,3,3,0,0], // Enough Strength for Studded Leather
         Update: function () {
			 	
         }
      },

   6:   {
         SkillPoints: [75],
         StatPoints: [3,3,3,3,1],
         Update: function () {
			Config.Golem = "Clay"; 

         }
      },

   7:   {
         SkillPoints: [67,70],
         StatPoints: [3,3,1,1,1],
         Update: function () {
         }
      },

   8:   {
         SkillPoints: [70],
         StatPoints: [3,3,3,1,1],
         Update: function () {
		
         }
      },

   9:   {
         SkillPoints: [70],
         StatPoints: [3,3,3,1,1],
         Update: function () {

         }
      },

   10:   {
         SkillPoints: [70],
         StatPoints: [3,3,3,1,1],
         Update: function () {
          
         }
      },

   11:   {   
         SkillPoints: [70],
         StatPoints: [1,1,1,1,1],
         Update: function () {

         }
      },

   12:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,3],
         Update: function () {
			Config.StashGold 		= 1000;				
			Config.BeltColumn		= ["hp", "hp", "mp", "mp"];	
			Config.ExplodeCorpses = 74; // Explode corpses. Use skill number or 0 to disable. 74 = Corpse Explosion, 83 = Poison Explosion
			Config.HPBuffer = 4; // Number of healing potions to keep in inventory.
			Config.Curse[1] = 66; // Other monsters curse. Use skill number or set to 0 to disable.
         }
      },

   13:   {
         SkillPoints: [80],
         StatPoints: [3,3,3,1,1],
         Update: function () {

         }
      },

   14:   {
         SkillPoints: [70],
         StatPoints: [3,3,3,0,1],
         Update: function () {

         }
      },

   15:   {
         SkillPoints: [70],
        StatPoints: [3,3,3,0,1],
         Update: function () {
			Config.HPBuffer = 2; // Number of healing potions to keep in inventory.
			Config.MPBuffer = 8; // Number of mana potions to keep in inventory.
			Config.Dodge = true;
			Config.DodgeRange = 15;
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
         }
      },

   16:   {
         SkillPoints: [70],
         StatPoints: [3,3,3,0,1],
         Update: function () {
			Config.MinColumn[0] = 1;
			Config.MinColumn[1] = 1;
			Config.MinColumn[2] = 1;
			Config.MinColumn[3] = 1;	
         }
      },

   17:   {
         SkillPoints: [70],
         StatPoints: [3,3,3,0,1],
         Update: function () {
 
         }
      },

   18:   {
         SkillPoints: [70],
         StatPoints: [3,3,3,0,1],
         Update: function () {
			Config.TownCheck = true; // Go to town if out of potions
			Config.Cubing = true;
			Config.MakeRunewords = true;
			Config.Runewords.push([Runeword.Spirit, ("CrystalSword" || "BroadSword")]);
			Config.Runewords.push([Runeword.Lore, ("Helm" || "FullHelm")]);
			Config.Recipes.push([Recipe.Rune, "Tal Rune"]);
			Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
			Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
			Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
			Config.Recipes.push([Recipe.Rune, "Amn Rune"]);
         }
      },

   19:   {
         SkillPoints: [70],
         StatPoints: [3,3,3,0,1],
         Update: function () {
         }
      },

   20:   {
         SkillPoints: [72],
         StatPoints: [3,3,3,1,1],
         Update: function () {
			 Config.Curse[1] = -1; // Other monsters curse. Use skill number or set to 0 to disable.
         }
      },

   21:   {   
         SkillPoints: [77],
         StatPoints: [0,0,0,0,0],
         Update: function () {
         }
      },

   22:   {
         SkillPoints: [79],
         StatPoints: [0,0,0,0,0],
         Update: function () {
         }
      },

   23:   {
         SkillPoints: [-1],
         StatPoints: [3,3,3,0,1],
         Update: function () {
            
         }
      },

   24:   {
         SkillPoints: [87,89],
         StatPoints: [3,3,3,0,1],
         Update: function () {
			Config.Curse[0] = 87; // Boss curse. Use skill number or set to 0 to disable.
			Config.Curse[1] = 87; // Other monsters curse. Use skill number or set to 0 to disable.
         }
      },

   25:   {
         SkillPoints: [70],
         StatPoints: [1,3,3,3,3],
         Update: function () {
         }
      },

   26:   {
         SkillPoints: [70],
         StatPoints: [1,3,3,3,3],
         Update: function () {
         }
      },

   27:   {
         SkillPoints: [70],
         StatPoints: [1,3,3,3,3],
         Update: function () {
         }
      },

   28:   {
         SkillPoints: [76],
         StatPoints: [1,3,3,3,3],
         Update: function () {
         }
      },

   29:   {
         SkillPoints: [86],
         StatPoints: [1,3,3,3,3],
         Update: function () {
         }
      },

   30:   {
         SkillPoints: [91],
         StatPoints: [1,3,3,3,3],
         Update: function () {
			Config.Curse[0] = 91; // Boss curse. Use skill number or set to 0 to disable.
			Config.Curse[1] = 91; // Other monsters curse. Use skill number or set to 0 to disable.
         }
      },

   31:   {   
         SkillPoints: [95],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   32:   {
         SkillPoints: [70],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   33:   {
         SkillPoints: [70],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   34:   {
         SkillPoints: [70],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   35:   {
         SkillPoints: [70],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   36:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   37:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {

         }
      },

   38:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   39:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   40:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   41:   {   
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   42:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   43:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   44:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   45:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   46:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   47:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   48:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   49:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   50:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   51:   {   
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   52:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   53:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   54:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   55:   {
         SkillPoints: [69],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   56:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   57:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   58:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   59:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   60:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   61:   {   
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   62:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   63:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   64:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   65:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   66:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   67:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   68:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   69:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   70:   {
         SkillPoints: [74],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   71:   {   
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   72:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   73:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   74:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   75:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   76:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   77:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   78:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   79:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   80:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   81:   {   
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   82:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         }
      },

   83:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            ;
         }
      },

   84:   {
         SkillPoints: [65],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   85:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   86:   {
         SkillPoints: [65],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   87:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   88:   {
         SkillPoints: [65],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   89:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   90:   {
         SkillPoints: [65],
         StatPoints: [3,3,3,3,1],
         Update: function () {
         
         }
      },

   91:   {   
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   92:   {
         SkillPoints: [65],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   93:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   94:   {
         SkillPoints: [65],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   95:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   96:   {
         SkillPoints: [65],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   97:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   98:   {
         SkillPoints: [65],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      },

   99:   {
         SkillPoints: [55],
         StatPoints: [3,3,3,3,1],
         Update: function () {
            
         }
      }
};