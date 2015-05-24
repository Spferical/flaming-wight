module.exports = function(creep) {
    // get more energy if we're out of it
	if(creep.energy == 0) {
		creep.moveTo(Game.spawns.Spawn1);
		if (Game.spawns.Spawn1.energy > 1000) {
		    Game.spawns.Spawn1.transferEnergy(creep);
		}
	}
	else {
	    // repair any structures that are being destroyed
	    var target = creep.pos.findClosest(FIND_STRUCTURES, {
            filter: function(object) {
                return object.hits <= object.hitsMax / 2;
            }
        });
        if(target) {
            creep.moveTo(target);
            creep.repair(target);
        } else {
            // build any structures
    		var target = creep.pos.findClosest(FIND_CONSTRUCTION_SITES);
    		if (target) {
    			creep.moveTo(target);
    			creep.build(target);
    		} else {
    		    target = creep.room.controller;
    		    creep.moveTo(target);
    		    creep.upgradeController(target);
    		}
        }
	}
}
