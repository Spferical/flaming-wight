module.exports = function(creep) {
    if (!creep.memory.sourceid) {
        // find the closest source without any enemies near it
        var sources = creep.room.find(FIND_SOURCES);
        var bestSource = null;
        var bestDistance = -1;
        for (var i = 0; i < sources.length; i++) {
            var safe = creep.isSafe(sources[i].pos);
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
