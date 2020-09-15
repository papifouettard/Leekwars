function castBigHeal(bigHeal,target) {
	if (canUseChip(bigHeal, target) and getTotalLife(target)-getLife(target)>70) {
		useChip(bigHeal, target);
	}
}

function castSmallHeal(smallHeal, target){
	if (canUseChip(smallHeal, target)and getTotalLife(target)-getLife(target)>19) {
		useChip(smallHeal, target);
	}
}


function cleanseTarget(cleanse,target){
	var targetEffects = getEffects(target);
	if(isEnemy(target)){
	}else{
		var countDot;
		for(var effect in targetEffects){
			if(effect[0]==EFFECT_POISON){
					countDot+=1;
			}
		}
		if(countDot>3){
			if(canUseChip(cleanse,target) ){
				useChip(cleanse,target);
			}
		}
	}
	
}