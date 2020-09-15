include("Comportements/Comportement_Classique");
include("Comportements/Comportement_cliqueticleek");
include("Comportements/Comportement_Bulbe_Chetif");


//équipement du poireau "ledouzetteur"
var cliqueticleek = [];
cliqueticleek["distWeapon"] = WEAPON_PISTOL;
cliqueticleek["smallHeal"]=CHIP_BANDAGE;
cliqueticleek["bigHeal"]=CHIP_BANDAGE;
cliqueticleek["powerfulCast"]=null;
cliqueticleek["sndPowerfulCast"]=null;
cliqueticleek["sndShortRangeCast"]=null;
cliqueticleek["shortRangeCast"]=null;
cliqueticleek["longRangeCast"]=CHIP_SPARK;
cliqueticleek["distWeapon"]=WEAPON_PISTOL;
cliqueticleek["lineWeapon"]=WEAPON_SHOTGUN;
cliqueticleek["meleeWeapon"]=WEAPON_SHOTGUN;
cliqueticleek["bigShield"]=CHIP_HELMET;
cliqueticleek["smallShield"]=CHIP_HELMET;
cliqueticleek["relativeShield"]=null;
cliqueticleek["impoDesMains"]=null;
cliqueticleek["bulbType"]=null;
cliqueticleek["buffLife"]=null;
cliqueticleek["defaultWeapon"] = cliqueticleek["distWeapon"];
cliqueticleek["physAttack"] = [cliqueticleek["sndPowerfulCast"], cliqueticleek["powerfulCast"], cliqueticleek["shortRangeCast"], cliqueticleek["sndShortRangeCast"], cliqueticleek["lineWeapon"], cliqueticleek["meleeWeapon"], cliqueticleek["distWeapon"]];


if (getName()=="cliqueticleek"){
	cliquetiCleek(comportementCliqueticleek,cliqueticleek);
}else if (getName()=="cliqueticleek"){
	cliquetiCleek(comportementCliqueticleek,cliqueticleek);
}else{
	weakBulb();
}


debug("Total: " + getOperations());