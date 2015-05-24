var get_energy_from_spawn_or_extension = function(creep) {
    var target = null;
    var nearestExtension = creep.pos.findClosest(FIND_MY_STRUCTURES, {
        filter: function(structure) {
            return structure.structureType == STRUCTURE_EXTENSION
                && structure.energy > structure.energyCapacity / 2;
        }});
    var nearestSpawn = creep.pos.findClosest(FIND_MY_SPAWNS, {
        filter: function(spawn) {
            return spawn.energy > 1000;
        });
    if (!nearestExtension) {
        target = nearestSpawn;
    } else {
        var extDist = creep.pos.pathTo(nearestExtension);
        var spaDist = creep.pos.pathTo(nearestSpawn);
        if (extDist < spaDist) {
            target = nearestExtension;
        } else {
            target = nearestSpawn;
        }
    }

    creep.moveTo(target);
    target.transferEnergy(creep);
}
