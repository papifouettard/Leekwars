include("../Fonctions/Bulb/Data_Collect");
include("../Fonctions/Bulb/Attaque_Magiques");
include("../Fonctions/Bulb/Attaque_Physiques");
include("../Fonctions/Bulb/Buffs");
include("../Fonctions/Bulb/Deplacements");
include("../Fonctions/Bulb/Soins");
include("../Fonctions/Bulb/Analyse_Situation");

function weakBulb() {
	return function() {
		var boost = CHIP_PROTEIN;
		var smallHeal = CHIP_BANDAGE;
		var longRangeCast = CHIP_PEBBLE;
		var smallShield = CHIP_HELMET;
		var summoner=getSummoner();
		var meTheBulb=getLeek();
		
		debug(getName());
		follow(summoner,2);
		boostMyLeek(boost);
		shieldMyLeek(smallShield);
		castSmallHealBulb(smallHeal,summoner);
		
	};

}