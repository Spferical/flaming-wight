module.exports = function(creep) {
    if (creep.energy < creep.energyCapacity) {
        var energy = creep.pos.findClosest(FIND_DROPPED_ENERGY,
            {filter: function(object) {
                return creep.isSafe(object.pos);
            }});
        creep.moveTo(energy);
        creep.pickup(energy);
    } else {
        var target = null;
        target = creep.pos.findClosest(FIND_MY_SPAWNS, {
            filter: function(spawn) {
                return (spawn.energy <= 5000);
            }
        })
        if (!target) {
            target = creep.pos.findClosest(FIND_MY_STRUCTURES, {
                filter: function(object) {
                    return object.structureType == STRUCTURE_EXTENSION
                        && object.energy < object.energyCapacity * 0.9;
            }});
        }
        if (target) {
        	creep.moveTo(target);
        	creep.transferEnergy(target)
        }
    }
}
