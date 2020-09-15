// Fonction pour analyser les boosts à appliquer
function boostMyLeek(boost) {
	var moi = getLeek();
	var summoner = getSummoner();
	if (canUseChip(boost, summoner)) {
		useChip(boost, summoner);

	}
}


//Fonction pour organiser les shield à poser
function shieldMyLeek(shield) {
	var moi = getLeek();
	var summoner = getSummoner();
	if (canUseChip(shield, summoner)) {
		useChip(shield, summoner);
	}


}