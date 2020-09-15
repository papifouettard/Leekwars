// Fonction pour analyser les boosts à appliquer
function boostMeUp() {
	var moi = getLeek();
	var myBuffs = getEffects();
	var myCell = getCell(moi);
	var enemy = getNearestEnemy();
	var enemyCell = getCell(enemy);
	var enemyDist = getPathLength(myCell, enemyCell);
	var buffStrengh = false;
	for (var buff in myBuffs) {
		if (buff[0] == EFFECT_BUFF_FORCE) {
			buffStrengh = true;
		}
	}
	if (!buffStrengh) {
		if (canUseChip(CHIP_PROTEIN, moi) and enemyDist < 14) {
			return useChip(CHIP_PROTEIN, moi);
		}
	}
}

//Fonction pour organiser les shield à poser
function shieldMeUp(bigShield, smallShield, relativeShield) {
	var moi = getLeek();
	//Shield Dispo?
	if(canUseChip(relativeShield,moi)){
		useChip(relativeShield, moi);
	}
	if (canUseChip(bigShield, moi)) {
		useChip(bigShield, moi);
	}
	//alors timer le Shield inférieur pour permashield
	if (getCooldown(bigShield) < getChipCooldown(bigShield) - 2) {
		useChip(relativeShield, moi);
		useChip(smallShield, moi);
	}
}

//Fonction pour lancer le boost de vie
function buffMaxLife(buffLife, target) {
	if (buffLife != null) {
		if (canUseChip(buffLife, target)) {
			useChip(buffLife, target);
		}
	}
}