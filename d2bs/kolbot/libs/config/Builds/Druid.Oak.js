/** Wind Druid Build - unfinished
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

    1:  {
            //SkillPoints: [-1],                                           // This doesn't matter. We don't have skill points to spend at lvl 1]
            //StatPoints: [-1, -1, -1, -1, -1],                            // This doesn't matter. We don't have stat points to spend at lvl 1
            Update: function () {
                //Scripts.ClearAnyArea  = true;                            // We are only level 1 so we will start by clearing Blood Moor
                //    Config.ClearAnyArea.AreaList = [2];
                //Config.ClearType      = 0;                               // Monster spectype to kill in level clear scripts (0 = all)
                Scripts.Wakka           = true;                            // Walking chaos leecher with auto leader assignment, stays at safe distance from the leader
                Config.TownCheck        = false;                           // Don't go to town for more potions
                Config.StashGold        = 10000;                           // Minimum amount of gold to stash.
                Config.AttackSkill      = [-1, 0, -1, 0, -1, -1, -1];
                Config.LowManaSkill     = [-1, -1];
                Config.ScanShrines      = [];
                Config.BeltColumn       = ["hp", "hp", "hp", "mp"];        // Keep tons of health potions!
                Config.MinColumn        = [3, 3, 3, 3];
                //Config.PickitFiles.push("belowlevelseven.nip");          // Pick up normal armor, belts, etc. Keep ID scrolls and TP scrolls.
                Config.OpenChests = false;                                 // Might as well open em.
                Config.Cubing = false;                                     // Don't cube yet!
            }
        },

    2:  {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    3:  {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    4:  {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    5:  {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    6:  {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    7:  {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    8:  {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    9:  {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    10: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    11: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    12: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    13: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    14: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    15: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    16: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    17: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    18: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    19: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    20: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    21: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    22: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    23: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    24: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    25: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    26: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5

            Update: function () {

            }
        },

    27: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    28: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    29: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    30: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    31: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    32: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    33: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    34: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    35: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5
            Update: function () {

            }
        },

    36: {
            SkillPoints: [-1],                                             //
            StatPoints: [3, 3, 3, 3, 3],                                   // Vitality +5 = 200
            Update: function () {

            }
        },

    37: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    38: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    39: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    40: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    41: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    42: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    43: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    44: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    45: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    46: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    47: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    48: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    49: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    50: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    51: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    52: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    53: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    54: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    55: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    56: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    57: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    58: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    59: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    60: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    61: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    62: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    63: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    64: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    65: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    66: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    67: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    68: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    69: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    70: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    71: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    72: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    73: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    74: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    75: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    76: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    77: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    78: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    79: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    80: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    81: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    82: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    83: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    84: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    85: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    86: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    87: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    88: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    89: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    90: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    91: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    92: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    93: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    94: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    95: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    96: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    97: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    98: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        },

    99: {
            SkillPoints: [-1],                                             //
            StatPoints: [-1, -1, -1, -1, -1],                              //
            Update: function () {

            }
        }
};
