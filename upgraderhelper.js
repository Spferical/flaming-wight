util = require('util');

module.exports = function(creep) {

    // unassign any dead or lost upgraders
    var upgrader = Game.getObjectById(creep.memory.upgrader);
    if (upgrader == null or upgrader.memory.role != 'upgrader') {
        creep.memory.upgrader = null;
    }

    // assign to an upgrader if not assigned already
    if (!creep.memory.upgrader) {
        var upgraders = creep.pos.findClosest(FIND_MY_CREEPS, {
            filter: function(creep) {
                return (creep.memory.role == 'upgrader');
            }
        });
        for (upgrader in upgraders) {
            // find any other helpers helping this upgrader
            var helpers = creep.room.find(FIND_MY_CREEPS, {
                filter: function(creep) {
                    return creep.memory.role == 'upgraderhelper'
                        && creep.memory.upgrader == upgrader;
                }
            });
            if (helpers.length < 2) {
                // this upgrader is eligible for a helper
                creep.memory.upgrader = upgrader.id
            }
        }
    }

    // now we should have been assigned an upgrader
    if (creep.energy == 0) {
        util.get_energy_from_spawn_or_extension(creep);
    } else {
        var upgrader = Game.getObjectById(creep.memory.upgrader);
        creep.moveTo(upgrader);
        if (upgrader.energy < upgrader.energyCapacity / 2) {
            creep.transferEnergy(upgrader);
        } else {
            creep.dropEnergy();
        }
    }
}
