//Fonction pour évaluer l'arme à mettre
function getBestShootCell(distWeapon, meleeWeapon) {
	var enemy = getNearestEnemy();
	var myY = getCellY(getCell());
	var myX = getCellX(getCell());
	var cellForMelee = getCellsToUseWeaponOnCell(meleeWeapon, getCell(enemy));
	var bestCell = null;
	for (var cell in cellForMelee) {
		var nearerCell = false;
		if (bestCell != null) {
			nearerCell = getCellDistance(getCell(), cell) < getCellDistance(getCell(), bestCell);
		}
		var iCanMoveToIt = getPathLength(getCell(), cell) < getMP();
		if (bestCell == null and iCanMoveToIt) {
			bestCell = cell;
		} else if (iCanMoveToIt and nearerCell) {
			bestCell = cell;
		}
		nearerCell = false;
	}
	return bestCell;
}


// Met l'arme que l'on utilise par défaut
function setTheWeapon(defaultWeapon) {
	if (getWeapon() != defaultWeapon) {
		setWeapon(defaultWeapon);
	}
}


//Equiper la meilleur arme en fonction de la portée.
function setThBestWeapon(bestCell, meleeWeapon, distWeapon) {
	if (bestCell != null) {
		if (getCellDistance(bestCell, getCell()) < getMP() and getTP() >= getWeaponCost(meleeWeapon)) {
			if (getWeapon() != meleeWeapon) {
				setWeapon(meleeWeapon);
			}
		} else if (getWeapon() != distWeapon) {
			setWeapon(distWeapon);
		}
	} else if (getWeapon() != distWeapon) {
		setWeapon(distWeapon);
	}
}


//Vérifier les prérequis avant de tirer sur l'ennemi
function shootMelee(enemy) {
	while (getTP() >= getWeaponCost(getWeapon(getLeek())) and canUseWeapon(enemy) and!isDead(enemy)) {
		useWeapon(enemy);
	}
}