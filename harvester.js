module.exports = function (creep) {
	if(creep.energy < creep.energyCapacity) {
	    if (!creep.memory.sourceid) {
	        // find the closest source without any enemies near it
    	    var sources = creep.room.find(FIND_SOURCES);
            var bestSource = null;
            var bestDistance = -1;
    	    for (var i = 0; i < sources.length; i++) {
    	        var safe = sources[i].pos.findInRange(FIND_HOSTILE_CREEPS, 5).length == 0
    	            && sources[i].pos.findInRange(FIND_HOSTILE_STRUCTURES, 5).length == 0;
    	        var distance = creep.pos.findPathTo(sources[i]).length;
    	        if (safe && (bestDistance == -1 || distance < bestDistance)) {
    	            // spawn is best so far
    	            bestSource = sources[i];
    	            bestDistance = distance;
    	        }
    	    }
    	    if (bestSource) {
        	    creep.memory.sourceid = bestSource.id;
    	    }
	    }
	    if (creep.memory.sourceid) {
    	    source = Game.getObjectById(creep.memory.sourceid)
    		creep.moveTo(source);
    		creep.harvest(source);
	    }
	}
	else {
		creep.moveTo(Game.spawns.Spawn1);
		creep.transferEnergy(Game.spawns.Spawn1)
	}
}
