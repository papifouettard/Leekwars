function follow(leek,dist){
	var myCell = getCell();
	var leekCell=getCell(leek);
	var getDist=getPathLength(myCell,leekCell);
		if(getDist>dist and getMP()>0){
			moveToward(leek, 1);
			follow(leek, dist);
		}else if(getDist<dist and getMP()>0){
			var beginMP=getMP();
			moveAwayFrom(leek,1);
			var isSuccess=beginMP>getMP();
			if(!isSuccess){
				moveAwayFrom(myCell,1);
			}
			follow(leek, dist);
			}
}