//Fonction d'affichage en debug d'une map (de dégat, de danger, autre)
function debugMap(map) {
	var line = "";
	var lineType = "18";
	var counterEntry = 0;
	var countMap = count(map);
	for (var i = 0; i < countMap; i++) {
		colorMap(i, map[i]);
	}
}






//Fonction pour Colorer les cellules d'une map selon des critres variable
function colorMap(cell, value) {
	if (value > 1) {
		mark(cell, COLOR_RED);
	} else if (value > 0.6) {
		mark(cell, COLOR_GREEN);
	} else if (value > 0) {
		mark(cell, COLOR_BLUE);
	}
}







//Obtenir la map d'air d'effet  sans variation par la distance.
function getAreaMap(weapon) {
	var areaMap = [];
	fill(areaMap, 0, 612);
	for (var cell = 0; cell < 613; cell++) {
		var targets = getWeaponTargets(weapon, cell);
		var score = applyScore(cell, weapon);
		areaMap[cell] = score;
		/*var cellsImpacted = getAreaCells(cell, weaponArea);
		for (var cel in cellsImpacted) {
			areaMap[cel] = areaMap[cel] + score;
		}*/
		}
	return areaMap;
}







//Fonction pour appliquer le score d'une arme sur une cellule donnée
function applyScore(cell, weapon) {
	var cellX=getCellX(cell);
	var	cellY=getCellY(cell);
	var weaponArea = getWeaponArea(weapon);
	var targets = getWeaponTargets(weapon, cell);
	var score = 0;
	if (weaponArea == AREA_CIRCLE_1) {
		for (var target in targets) {
			var targetCell=getCell(target);
			var itsX=getCellX(targetCell);
			var itsY=getCellY(targetCell);
			var targetDist=abs(abs(itsX-cellX)+abs(itsY-cellY));
			if (!isSummon(target)) {
				if (isEnemy(target)) {
					if(targetDist==0){score+=1;}
					if(targetDist==1){score+=0.5;}
				} else {
					if(targetDist==0){score+=-1;}
					if(targetDist==1){score+=-0.5;}
				}
			} else {
				if (isEnemy(getSummoner(target))) {
					if(targetDist==0){score+=0.5;}
					if(targetDist==1){score+=0.25;}
				} else {
					if(targetDist==0){score+=-0.5;}
					if(targetDist==1){score+=-0.25;}
				}

			}
		}

	} else if (weaponArea == AREA_CIRCLE_2) {
		for (var target in targets) {
			var targetCell=getCell(target);
			var itsX=getCellX(targetCell);
			var itsY=getCellY(targetCell);
			var targetDist=abs(abs(itsX-cellX)+abs(itsY-cellY));
			if (!isSummon(target)) {
				if (isEnemy(target)) {
					if(targetDist==0){score+=1;}
					if(targetDist==1){score+=0.75;}
					if(targetDist==2){score+=0.5;}
				} else {
					if(targetDist==0){score+=-1;}
					if(targetDist==1){score+=-0.75;}
					if(targetDist==2){score+=-0.5;}
				}
			} else {
				if (isEnemy(getSummoner(target))) {
					if(targetDist==0){score+=0.5;}
					if(targetDist==1){score+=0.37;}
					if(targetDist==2){score+=0.25;}
				} else {
					if(targetDist==0){score+=-0.5;}
					if(targetDist==1){score+=-0.37;}
					if(targetDist==2){score+=-0.25;}
				}

			}
		}

	} else if (weaponArea == AREA_CIRCLE_3) {
		for (var target in targets) {
			var targetCell=getCell(target);
			var itsX=getCellX(targetCell);
			var itsY=getCellY(targetCell);
			var targetDist=abs(abs(itsX-cellX)+abs(itsY-cellY));
			if (!isSummon(target)) {
				if (isEnemy(target)) {
					if(targetDist==0){score+=1;}
					if(targetDist==1){score+=0.83;}
					if(targetDist==2){score+=0.67;}
					if(targetDist==3){score+=0.5;}
				} else {
					if(targetDist==0){score+=-1;}
					if(targetDist==1){score+=-0.83;}
					if(targetDist==2){score+=-0.67;}
					if(targetDist==3){score+=-0.5;}
				}
			} else {
				if (isEnemy(getSummoner(target))) {
					if(targetDist==0){score+=0.5;}
					if(targetDist==1){score+=0.41;}
					if(targetDist==2){score+=0.33;}
					if(targetDist==3){score+=0.25;}
				} else {
					if(targetDist==0){score+=-0.5;}
					if(targetDist==1){score+=-0.41;}
					if(targetDist==2){score+=-0.33;}
					if(targetDist==3){score+=-0.25;}
				}

			}
		}

	} else if (weaponArea == AREA_LASER_LINE) {

	}
	return score;
}







//Fonction pour choper les cellules d'une aire d'effet lancé depuis une cellule donnée
function getAreaCells(cell, area) {
	var cellX = getCellX(cell);
	var cellY = getCellY(cell);
	var Result = [];
	if (area == AREA_CIRCLE_1) {
		for (var x = -1; x <= 1; x++) {
			for (var y = -1; y <= 1; y++) {
				if (abs(x) + abs(y) <= 1) {
					var cellInMap = abs(cellX + x) <= 17 - abs(cellY + y);
					if (cellInMap) {
						var cellOuf = getCellFromXY(cellX + x, cellY + y);
						push(Result, cellOuf);

					}
				}
			}
		}
		return Result;

	} else if (area == AREA_CIRCLE_2) {
		for (var x = -2; x <= 2; x++) {
			for (var y = -2; y <= 2; y++) {
				if (abs(x) + abs(y) <= 2) {
					var cellInMap = abs(cellX + x) <= 17 - abs(cellY + y);
					if (cellInMap) {
						var cellOuf = getCellFromXY(cellX + x, cellY + y);
						push(Result, cellOuf);

					}
				}
			}
		}
		return Result;

	} else {
		for (var x = -3; x <= 3; x++) {
			for (var y = -3; y <= 3; y++) {
				if (abs(x) + abs(y) <= 3) {
					var cellInMap = abs(cellX + x) <= 17 - abs(cellY + y);
					if (cellInMap) {
						var cellOuf = getCellFromXY(cellX + x, cellY + y);
						push(Result, cellOuf);

					}
				}
			}
		}
		return Result;

	}
}







//Fonction pour obtenir le Leek le plus proche de nous
function getNearestEnemyLeek() {
	var enemies = getEnemies();
	var nearest = getNearestEnemy();
	var myCell = getCell();
	for (var enemy in enemies) {
		if (!isSummon(enemy) and!isDead(enemy)) {
			if (isSummon(nearest)) {
				nearest = enemy;
			} else {
				var nearestCell = getCell(nearest);
				var enemyCell = getCell(enemy);
				if (getPathLength(nearestCell, myCell) > getPathLength(enemyCell, myCell)) {
					nearest = enemy;
				}
			}
		}
	}
	return nearest;

}








//Fonction pour Obtenir la liste des combos offensifs.
function getCombos(liste_attaque, myTP, combos, combo, currentWeapon) {
	//initialisation de variables
	var myNewTP = myTP;
	var tempCombo = combo;
	var minCost;
	var arrayCost = [];
	var isCurrentWeapon = true;
	var canRecurse = false;
	var onCD = null;
	var hasCD = false;
	//On compte le nombre d'attaques possible
	var counter = count(liste_attaque);

	//pour chaque attaque on enregistre son cout dans arrayCost
	for (var attack in liste_attaque) {
		arrayCost[attack] = getCost(attack, currentWeapon);
	}
	//Puis on détermine le cout minimum des attaques faisables
	minCost = arrayMin(arrayCost);
	assocSort(arrayCost);
	for (var attack: var cost in arrayCost) {
		if (isChip(attack)) {
			onCD = inArray(combo, attack);
			if (getChipCooldown(attack) > 0) {
				hasCD = true;
			}
		}
		if (myTP >= cost and(onCD == null or!onCD or!hasCD)) {
			canRecurse = true;
		}

		onCD = null;
		hasCD = false;
	}

	if (!inArray(combos, combo) /* and combo!=[] and (myNewTP<minCost or  !canRecurse)*/ ) push(combos, combo);
	// si on peut encore faire des actions
	if (canRecurse) {
		//Pour chaque attaqsues
		var countFor = 0;
		for (var attack in liste_attaque) {
			var new_liste_attaque = liste_attaque;
			//si c'est pas le premier bouclage, on supprime le premier élément de liste_attaque'
			if (countFor > 0) {
				shift(liste_attaque);
			}
			//Reset des variables pour chaque attaque
			tempCombo = combo;
			myNewTP = myTP;
			onCD = null;
			hasCD = false;
			isCurrentWeapon = true;

			//Si c'est une puce on vérifie si elle a un cd et a été utilisé dans le combo actuelle
			if (isChip(attack)) {
				onCD = inArray(combo, attack);
				if (getChipCooldown(attack) > 0) {
					hasCD = true;
				}
			}
			//Si c'est une arme, on vérifie si c'est celle qu'on a déjà d'équipé
			if (attack != currentWeapon and isWeapon(attack)) {
				isCurrentWeapon = false;
			}
			//Si on a les TP pour faire l'attaque et qu'elle est pas sous cd
			if (getCost(attack, currentWeapon) <= myNewTP and(onCD == null or!onCD or!hasCD)) {
				var itsCost = getCost(attack, currentWeapon);
				push(tempCombo, attack);
				myNewTP -= itsCost;
				sort(combo);
				combos = getCombos(liste_attaque, myNewTP, combos, tempCombo, currentWeapon);


			}
			countFor++;
		}
	}
	return combos;

}









//Fonction pour obtenir le Coût d'une attaque, pucef ou arme'
function getCost(attack, currentWeapon) {

	if (isWeapon(attack)) {
		if (attack == currentWeapon) {
			return getWeaponCost(attack);
		} else {
			return (getWeaponCost(attack) + 1);
		}

	}
	if (isChip(attack)) return getChipCost(attack);
}








//Fonction pour obtenir le CD d'une attaque, puce ou arme
function getCDs(attack) {
	if (isWeapon(attack)) return 0;
	if (isChip(attack)) return getChipCooldown(attack);
}







//Fonction pour obtenir le Nom d'une attaque, pucef ou arme
function getAttackName(attack) {
	if (isChip(attack)) return getChipName(attack);
	if (isWeapon(attack)) return getWeaponName(attack);
}




