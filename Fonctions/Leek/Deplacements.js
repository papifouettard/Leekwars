global __debug_operation;

function startOp() {
	__debug_operation = getOperations();
}

function stopOp(@title) {
	debug(title + ": " + (getOperations() - __debug_operation - 6));
}


function goToHide() {

	startOp();
	var me = getLeek();
	var myCell = getCell(me);
	var myX = getCellX(myCell);
	var myY = getCellY(myCell);
	var myMP = getMP();

	var enemies = getAliveEnemies();
	var myPossibleMove = [];
	var enemyPossibleMove = [];
	var cellIsOk = [];
	var finalCell = null;

	var allLeeks=arrayConcat(getAllies(),getEnemies());
	for (var enemy in enemies) {
		if (isLeek(getCell(enemy))) {

			var enemyCell = getCell(enemy);
			var hisX = getCellX(enemyCell);
			var hisY = getCellY(enemyCell);
			var hisMP = getMP(enemy);
			for (var x = -hisMP; x <= hisMP; x++) {
				for (var y = -hisMP; y <= hisMP; y++) {
					if (abs(x) + abs(y) <= hisMP) {
						var cellOuf = getCellFromXY(hisX + x, hisY + y);
						push(enemyPossibleMove, cellOuf);

					}
				}
			}

		}

	}
	for (var x = -17; x <= 17; x++) {
		for (var y = -17; y <= 17; y++) {
			if (abs(x) + abs(y) <= 17) {
				var cellOuf = getCellFromXY(x, y);
				if (isEmptyCell(cellOuf) or myCell==cellOuf) {
					push(myPossibleMove, cellOuf);
				}
			}
		}
	}
	for (var myMove in myPossibleMove) {
		var tempBest = true;
		for (var hisMove in enemyPossibleMove) {
			if (lineOfSight(hisMove, myMove,allLeeks)) {
				tempBest = false;
			}
		}
		if (tempBest == true) {
			push(cellIsOk, myMove);
		}
	}
	mark(cellIsOk, COLOR_GREEN);
	
	if (cellIsOk != []) {
		if (!inArray(cellIsOk, myCell)) {
			for (var finalMove in cellIsOk) {
				if (isEmptyCell(finalMove)) {
					if (finalCell == null and getPathLength(finalMove, myCell) != null) {
						finalCell = finalMove;
					} else if (getPathLength(finalCell, myCell) > getPathLength(finalMove, myCell) and getPathLength(finalMove, myCell) != null) {
						finalCell = finalMove;
					}
				}
			}
		}else{
			finalCell=myCell;
		}
		mark(finalCell, COLOR_RED);

	}
	
	moveTowardCell(finalCell, getPathLength(finalCell, myCell) + 1);

	stopOp("Total Cache-Cache: ");
}



function comeCloserFromEnemy(dist, enemy) {
	while (!isDead(enemy) and getMP() > 0 and getPathLength(getCell(), getCell(enemy)) > dist) {
		moveToward(enemy, 1);
	}
}

function comeToLongRange(longRangeCast, enemy) {
	var enemyBirdDist = getDistance(getCell(), getCell(enemy));
	while (enemyBirdDist > getChipMaxRange(longRangeCast) - 1 and getMP() > 0) {
		moveToward(enemy, 1);
	}

}

function followLeek(dist, leek) {
	var myCell = getCell();
	var leekCell = getCell(leek);
	var getDist = getPathLength(myCell, leekCell);
	if (getDist > dist and getMP() > 0) {
		moveToward(leek, 1);
		followLeek(leek, dist);
	} else if (getDist < dist and getMP() > 0) {
		var beginMP = getMP();
		moveAwayFrom(leek, 1);
		followLeek(leek, dist);
	}
}