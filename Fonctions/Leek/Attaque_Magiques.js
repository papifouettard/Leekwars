include("../../Comportements/Comportement_Bulbe_Chetif");

function getBestCastCell(dmgSpell,target) {
	var cellForCast = getCellsToUseChipOnCell(dmgSpell, getCell(target));
	var bestCellForCast=null;
	for(var cell in cellForCast){
		if(bestCellForCast==null and getPathLength(cell,getCell())<getMP()){
			bestCellForCast=cell;
		}else if(getPathLength(cell,getCell())<getPathLength(bestCellForCast, getCell())){
			bestCellForCast=cell;
		}
	}
	return bestCellForCast;
}


//Tester les prérequis avant de lancer sort
function castSpell(spell, target) {
	while (getTP() >= getChipCost(spell) and getCooldown(spell) == 0 and canUseChip(spell, target)) {
		useChip(spell, target);
	}
}


//Invoquer un bulbe à côté de soi. 
function invokeBulb(bulb) {
	var myX = getCellX(getCell(getLeek()));
	var myY = getCellY(getCell(getLeek()));
	var bulbCell;
	var celPoints = 0;
	var preCels = [];

	for (var x = -1; x <= 1; x++) {
		for (var y = -1; y <= 1; y++) {
			if (abs(x + y) <= 1) {
				var cel = getCellFromXY(x + myX, y + myY);
				if (cel != null and isEmptyCell(cel)) {

					bulbCell = cel;
				}

			}
		}
	}
	summon(bulb, bulbCell, weakBulb());
}