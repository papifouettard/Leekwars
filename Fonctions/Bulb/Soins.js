function castBigHealBulb(bigHeal,target) {
	if (canUseChip(bigHeal, target)) {
		useChip(bigHeal, target);
	}
}
function castSmallHealBulb(smallHeal, target){
	if (canUseChip(smallHeal, target)) {
		useChip(smallHeal, target);
	}
}