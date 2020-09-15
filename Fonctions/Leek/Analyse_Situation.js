include("Attaque_Physiques");
include("Data_Collect");

/* ************************************************************************ */
//Classique >300PHYS DMG
/* ************************************************************************ */

function adopteComportementClassique() {


	//Mes Stats
	var moi = getLeek();
	var myCell = getCell(moi);
	var myLife = getLife();
	var myMaxLife = getTotalLife();
	var myResist = getResistance();

	//Les stats de l'ennemi
	var enemy = getNearestEnemyLeek();
	var enemyLife = getLife(enemy);
	var enemyMaxLife = getTotalLife(enemy);
	var enemyResist = getResistance(enemy);
	var enemyStrength = getStrength(enemy);
	var enemyMagic = getMagic(enemy);

	var enemyCell = getCell(enemy);
	var enemyDist = getPathLength(myCell, enemyCell);
	var enemyBirdDist = getDistance(myCell, enemyCell);
	var enemyWeapon = getWeapon(enemy);


	//Variable stockant l'état de certaines conditions pour analyser la game
	var enemyAtMelee = enemyDist == 0;

	var strongEnemy = enemyStrength >= myResist + 75;
	var mightyKiller = enemyStrength >= myResist + 200;
	var mightySorcerer = enemyMagic >= 290;
	var hesAboutToDie = (enemyLife < 150 and enemyResist <= 120);
	var justNeedAFckingShot = (enemyLife < 300 and enemyResist < 50) or(enemyLife < 220 and enemyResist <= 150) or(enemyLife < 140 and enemyResist <= 250) or enemyLife < 100;

	var iAmSafe = myLife > myMaxLife * 0.85;
	var iAmOk = myLife > myMaxLife * 0.65;
	var iAmInDanger = myLife < myMaxLife * 0.35 or(myLife < myMaxLife * 0.45	and myResist < enemyStrength);

	var iHaveStrongAdvantage = (enemyLife < enemyMaxLife * 0.25 and myLife > myMaxLife * 0.5) or(enemyLife < enemyMaxLife * 0.5 and myLife > myMaxLife * 0.8);
	var iHaveGoodAdvantage = (enemyLife < enemyMaxLife * 0.4 and myLife > myMaxLife * 0.5);

	var nearEndOfGame = getTurn() >= 50;


	//Valeur du comportement à retourner en fonction des conditions testés au préalable
	if (enemyAtMelee) {
		return "FIGHTMELEE";
	} else if (((iHaveGoodAdvantage or hesAboutToDie and!iAmInDanger) or justNeedAFckingShot) or(nearEndOfGame and iAmSafe)) {

		return "AGGRESSIVE";
	} else if (iAmSafe or iHaveGoodAdvantage or(nearEndOfGame and!iAmInDanger)) {

		return "OFFENSIVE";
	} else if (iAmOk) {

		return "RANGED_OFFENSE";
	} else if (iAmInDanger) {

		return "DEFENSIVE";
	} else {

		return "STANDARD";
	}


}




function adopteComportementStart(){	

//Mes Stats
	var moi = getLeek();
	var myCell = getCell(moi);
	var myLife = getLife();
	var myMaxLife = getTotalLife();
	var myResist = getResistance();

	//Les stats de l'ennemi
	var enemy = getNearestEnemyLeek();
	var enemyLife = getLife(enemy);
	var enemyMaxLife = getTotalLife(enemy);
	var enemyResist = getResistance(enemy);
	var enemyStrength = getStrength(enemy);
	var enemyMagic = getMagic(enemy);

	var enemyCell = getCell(enemy);
	var enemyDist = getPathLength(myCell, enemyCell);
	var enemyBirdDist = getDistance(myCell, enemyCell);
	var enemyWeapon = getWeapon(enemy);


	//Variable stockant l'état de certaines conditions pour analyser la game
	var enemyAtMelee = enemyDist == 0;

	var strongEnemy = enemyStrength >= myResist + 75;
	var mightyKiller = enemyStrength >= myResist + 200;
	var mightySorcerer = enemyMagic >= 290;
	var hesAboutToDie = (enemyLife < 50 and enemyResist <= 120);
	var justNeedAFckingShot = (enemyLife < 20 and enemyResist < 50) or(enemyLife < 15 and enemyResist <= 150) or(enemyLife < 10 and enemyResist <= 250) or enemyLife < 40;

	var iAmSafe = myLife > myMaxLife * 0.7;
	var iAmOk = myLife > myMaxLife * 0.5;
	var iAmInDanger = myLife < myMaxLife * 0.2 or(myLife < myMaxLife * 0.3 and myResist < enemyStrength);

	var iHaveStrongAdvantage = (enemyLife < enemyMaxLife * 0.25 and myLife > myMaxLife * 0.5) or(enemyLife < enemyMaxLife * 0.5 and myLife > myMaxLife * 0.8);
	var iHaveGoodAdvantage = (enemyLife < enemyMaxLife * 0.4 and myLife > myMaxLife * 0.5);

	var nearEndOfGame = getTurn() >= 50;


	//Valeur du comportement à retourner en fonction des conditions testés au préalable
	if (enemyAtMelee) {
		return "FIGHTMELEE";
	} else if (((iHaveGoodAdvantage or hesAboutToDie and!iAmInDanger) or justNeedAFckingShot) or(nearEndOfGame and iAmSafe)) {

		return "AGGRESSIVE";
	} else if (iAmSafe or iHaveGoodAdvantage or(nearEndOfGame and!iAmInDanger)) {

		return "OFFENSIVE";
	} else if (iAmOk) {

		return "RANGED_OFFENSE";
	} else if (iAmInDanger) {

		return "DEFENSIVE";
	} else {

		return "STANDARD";
	}


}
	

/* ************************************************************************ */
//Classique pour adapter aux LowLevel
/* ************************************************************************ */
function adopteComportementClassiqueLowLevel() {


	//Mes Stats
	var moi = getLeek();
	var myCell = getCell(moi);
	var myLife = getLife();
	var myMaxLife = getTotalLife();
	var myResist = getResistance();

	//Les stats de l'ennemi
	var enemy = getNearestEnemyLeek();
	var enemyLife = getLife(enemy);
	var enemyMaxLife = getTotalLife(enemy);
	var enemyResist = getResistance(enemy);
	var enemyStrength = getStrength(enemy);

	var enemyCell = getCell(enemy);
	var enemyDist = getPathLength(myCell, enemyCell);
	var enemyBirdDist = getDistance(myCell, enemyCell);
	var enemyWeapon = getWeapon(enemy);


	//Variable stockant l'état de certaines conditions pour analyser la game
	var enemyAtMelee = enemyDist == 0;

	var strongEnemy = enemyStrength >= myResist + 75;
	var mightyKiller = enemyStrength >= myResist + 200;
	var hesAboutToDie = (enemyLife < 150 and enemyResist <= 50);
	var justNeedAFckingShot = (enemyLife < 150 and enemyResist < 50) or(enemyLife < 120 and enemyResist <= 1000) or(enemyLife < 90 and enemyResist <= 150) or enemyLife < 70;

	var iAmSafe = myLife > myMaxLife * 0.7;
	var iAmOk = myLife > myMaxLife * 0.5;
	var iAmInDanger = myLife < myMaxLife * 0.2 or(myLife < myMaxLife * 0.3 and myResist < enemyStrength);

	var iHaveStrongAdvantage = (enemyLife < enemyMaxLife * 0.25 and myLife > myMaxLife * 0.5) or(enemyLife < enemyMaxLife * 0.5 and myLife > myMaxLife * 0.8);
	var iHaveGoodAdvantage = (enemyLife < enemyMaxLife * 0.4 and myLife > myMaxLife * 0.5);

	var nearEndOfGame = getTurn() >= 50;


	//Valeur du comportement à retourner en fonction des conditions testés au préalable
	/*if(getFightContext()==FIGHT_CONTEXT_TEST ){
			return "FIGHTMELEE";
		}else*/

	if (enemyAtMelee) {
		return "FIGHTMELEE";
	} else if (((iHaveGoodAdvantage or hesAboutToDie and!iAmInDanger) or justNeedAFckingShot) or(nearEndOfGame and iAmSafe)) {
		return "AGGRESSIVE";
	} else if (iAmSafe or iHaveGoodAdvantage or(nearEndOfGame and!iAmInDanger)) {
		return "OFFENSIVE";
	} else if (iAmOk) {
		return "RANGED_OFFENSE";
	} else if (iAmInDanger) {
		return "DEFENSIVE";
	} else {
		return "STANDARD";
	}


}
/* ************************************************************************ */
// Comportement de Boosteur
/* ************************************************************************ */

function adopteComportementBoosteur(){

	var turn=getTurn();
	debug(turn);
	//Mes Stats
	var moi = getLeek();
	var myCell = getCell(moi);
	var myLife = getLife();
	var myMaxLife = getTotalLife();
	var myResist = getResistance();

	var allies=getAliveAllies();
	for(var ally in allies){
		if (!isSummon(ally)){
		var hisDist=getPathLength(getCell(),getCell(ally));
		debug(hisDist);
			
		}
	}
	if(true){
		return "ENEMY_NEAR";
	}else if(false){
		
	}
	
}