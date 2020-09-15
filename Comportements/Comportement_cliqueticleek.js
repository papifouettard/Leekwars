include("../Fonctions/Leek/Data_Collect");
include("../Fonctions/Leek/Attaque_Magiques");
include("../Fonctions/Leek/Attaque_Physiques");
include("../Fonctions/Leek/Buffs");
include("../Fonctions/Leek/Deplacements");
include("../Fonctions/Leek/Soins");
include("../Fonctions/Leek/Analyse_Situation");


var comportementCliqueticleek = adopteComportementStart();
function cliquetiCleek(comportement, currentLeek) {
	//Mes variables de stats
	var moi = getLeek();
	var myCell = getCell(moi);
	
	
	//Mes variables d'équipements
	var smallHeal = currentLeek["smallHeal"];
	var bigHeal = currentLeek["bigHeal"];
	var powerfulCast = currentLeek["powerfulCast"];
	var powerfulCastAvailable = getCooldown(powerfulCast)==0;
	var sndPowerfulCast=currentLeek["sndPowerfulCast"];
	var sndPowerfulCastAvailable=getCooldown(sndPowerfulCast)==0;
	var sndShortRangeCast = currentLeek["sndShortRangeCast"];
	var shortRangeCast = currentLeek["shortRangeCast"];
	var longRangeCast = currentLeek["longRangeCast"];
	var distWeapon = currentLeek["distWeapon"];
	var lineWeapon = currentLeek["lineWeapon"];
	var meleeWeapon = currentLeek["meleeWeapon"];
	var bigShield = currentLeek["bigShield"];
	var smallShield = currentLeek["smallShield"];
	var relativeShield = currentLeek["relativeShield"];
	var impoDesMains = currentLeek["impoDesMains"];
	var bulbType = currentLeek["bulbType"];
	var buffLife = currentLeek["buffLife"];
	var defaultWeapon = currentLeek["defaultWeapon"];
	var cleanse=currentLeek["cleanse"];

	
	//Variables Ennemies
	var enemy;
	if (comportement == "AGGRESSIVE"){
		enemy = getNearestEnemyLeek();	
	}else{
		enemy = getNearestEnemy();	
	}
	var enemyCell = getCell(enemy);
	var enemyDist = getPathLength(myCell, enemyCell);
	var enemyBirdDist = getDistance(myCell, enemyCell);
	
	//Afficher le comportement joué pour ce tour
	debug(comportement);
	

	//Afficher le comportement joué pour ce tour
	if (comportement == "OFFENSIVE"
	or comportement == "DEFENSIVE"
	or comportement == "RANGED_OFFENSE"
	or comportement == "STANDARD"
	or comportement == "FIGHtMELEE") {
		if (getLife() < getTotalLife() * 0.25 or getLife() < 250) {
			castBigHeal(impoDesMains, moi);
		}
		cleanseTarget(cleanse,moi);
		if (comportement != "FIGHTMELEE") {
			buffMaxLife(buffLife, moi);
		}
	}

	/* ************************************************************************ */
	/*          _    ___    ___   ___     ___    __    __  .        ___         */
	/*         /_\  /  __  /  __  | O \   |__   /__   /__  |  \  /  |__         */
	/*        // \\ \__/   \__/   | |\ \  |__   __/   __/  |   \/   |__         */
	/*                                                                          */
	/* ************************************************************************ */

	if (comportement == "AGGRESSIVE") {


		var bestShootCell = getBestShootCell(distWeapon, lineWeapon);
		var bestShootCellDistance;
		var bestCastCell = getBestCastCell(powerfulCast, enemy);
		var bestCastCellDistance;
		if (bestCastCell != null and powerfulCastAvailable) {
			bestCastCellDistance = getCellDistance(myCell, bestCastCell);
			moveTowardCell(bestCastCell, bestCastCellDistance);
			castSpell(powerfulCast, enemy);
		}
		bestCastCell = getBestCastCell(sndPowerfulCast, enemy);
		bestCastCellDistance;
		if (bestCastCell != null and sndPowerfulCastAvailable) {
			bestCastCellDistance = getCellDistance(myCell, bestCastCell);
			moveTowardCell(bestCastCell, bestCastCellDistance);
			castSpell(sndPowerfulCast, enemy);
		}
		if (bestShootCell) {
			setThBestWeapon(bestShootCell, lineWeapon, distWeapon);
			bestShootCellDistance = getCellDistance(myCell, bestShootCell);
			moveTowardCell(bestShootCell, bestShootCellDistance);
		} else {
			//Déplacement de fin
			setTheWeapon(defaultWeapon);
			comeCloserFromEnemy(2, enemy);
		}
		//Série d'attaque par priorité de dégat
		castSpell(powerfulCast, enemy);
		castSpell(shortRangeCast, enemy);
		shootMelee(enemy);
		castSpell(sndShortRangeCast, enemy);
		castSpell(longRangeCast, enemy);

		//Boost/Heal s'il reste des points
		invokeBulb(bulbType);
		shieldMeUp(bigShield, smallShield, relativeShield);
		castBigHeal(bigHeal, moi);
		castSmallHeal(smallHeal, moi);

		comeCloserFromEnemy(0, enemy);


		/* ************************************************************************ */
		/*               ____   ___  ___  ___         __           ___              */
		/*               |   |  |_   |_   |__  |\ |  /__  |  \  /  |__              */
		/*               |___|  |    |    |__  | \|  __/  |   \/   |__              */
		/*                                                                          */
		/* ************************************************************************ */
	} else if (comportement == "OFFENSIVE") {
		//Boost/Heal s'il reste des points
		shieldMeUp(bigShield, smallShield, relativeShield);

		var bestShootCell = getBestShootCell(distWeapon, lineWeapon);
		var bestShootCellDistance;
		var bestCastCell = getBestCastCell(powerfulCast, enemy);
		var bestCastCellDistance;
		if (bestCastCell!=null and powerfulCastAvailable) {
			bestCastCellDistance = getCellDistance(myCell, bestCastCell);
			moveTowardCell(bestCastCell, bestCastCellDistance);
		} else if (bestShootCell) {
			bestShootCellDistance = getCellDistance(myCell, bestShootCell);
			moveTowardCell(bestShootCell, bestShootCellDistance);
		} else {
			//Déplacement de fin
			comeCloserFromEnemy(6, enemy);
		}

		//Série d'attaque par priorité de dégat
		castSpell(powerfulCast, enemy);
		castSpell(shortRangeCast, enemy);
		setThBestWeapon(bestShootCell, lineWeapon, distWeapon);
		shootMelee(enemy);
		castSpell(sndShortRangeCast, enemy);
		castSpell(longRangeCast, enemy);

		goToHide();


		/* ************************************************************************ */
		/*                 __       _           __    __  __                        */
		/*                | O \    /_\   |\ |  /  __ |__  |  \                      */
		/*                | |\ \  // \\  | \|  \__/  |__  |__/ 						*/
		/*                                                                          */
		/* ************************************************************************ */
	} else if (comportement == "RANGED_OFFENSE"
	or comportement == "STANDARD") {
		shieldMeUp(bigShield, smallShield, relativeShield);
		if (canUseWeapon(lineWeapon, enemy)) {
			setTheWeapon(lineWeapon);
		} else if (canUseWeapon(distWeapon, enemy)) {
			setTheWeapon(distWeapon);

		}
		//Boost/Heal s'il reste des points
		invokeBulb(bulbType);
		castBigHeal(bigHeal, moi);
		castSmallHeal(smallHeal, moi);
		//Série d'attaque par priorité de dégat
		castSpell(powerfulCast, enemy);
		castSpell(shortRangeCast, enemy);
		shootMelee(enemy);
		castSpell(sndShortRangeCast, enemy);
		if(getTP()>5){
			comeToLongRange(longRangeCast, enemy);	
		}
		castSpell(longRangeCast, enemy);

		goToHide();



		/* ************************************************************************ */
		/*               ___   ___  ___  ___         __           ___              */
		/*               |  \  |__  |_   |__  |\ |  /__  |  \  /  |__              */
		/*               |__/  |__  |    |__  | \|  __/  |   \/   |__              */
		/*                                                                          */
		/* ************************************************************************ */

	} else if (comportement == "DEFENSIVE") {
		//Boost/Heal s'il reste des points
		shieldMeUp(bigShield, smallShield, relativeShield);
		castBigHeal(bigHeal, moi);
		castSmallHeal(smallHeal, moi);
		//Série d'attaque par priorité de dégat
		castSpell(powerfulCast, enemy);
		castSpell(shortRangeCast, enemy);
		if (canUseWeapon(enemy)) {
			useWeapon(enemy);
		}
		castSpell(sndShortRangeCast, enemy);
		castSpell(longRangeCast, enemy);

		goToHide();

		/* ************************************************************************ */
		/*               ___ .  __        ___       ___      ___  ___               */
		/*               |_  | /  __ |__|  |   |\/| |__ |    |__  |__               */
		/*               |   | \__/  |  |  |   |  | |__ |__  |__  |__               */
		/*                                                                          */
		/* ************************************************************************ */
	} else if (comportement == "FIGHTMELEE") {


		var bestCastCell = getBestCastCell(sndPowerfulCast, enemy);
		var bestCastCellDistance;
		debug(bestCastCell);
		setTheWeapon(meleeWeapon);
		useWeapon(enemy);
		if (bestCastCell != null and(powerfulCastAvailable or sndPowerfulCastAvailable)) {
			bestCastCellDistance = getCellDistance(myCell, bestCastCell);
			moveTowardCell(bestCastCell, bestCastCellDistance);
			castSpell(sndPowerfulCast, enemy);
			castSpell(powerfulCast, enemy);
			castSpell(shortRangeCast, enemy);
		}
		shootMelee(enemy);
		shieldMeUp(bigShield, smallShield, relativeShield);
		goToHide();
		castBigHeal(bigHeal, moi);
		castSmallHeal(smallHeal, moi);

	}
}