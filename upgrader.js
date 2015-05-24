module.exports = function(creep) {
    if (creep.energy < creep.energyCapacity) {
        // find some energy and grab it
        var energy = creep.pos.findClosest(FIND_DROPPED_ENERGY,
            {filter: function(object) {
                return creep.isSafe(object.pos);
            }});
        if (energy) {
            creep.moveTo(energy);
            creep.pickup(energy);
        } else {
            creep.moveTo(Game.spawns.Spawn1);
            Game.spawns.Spawn1.transferEnergy(creep);
        }
    }
    // go to room controller and upgrade it
    var controller = creep.room.controller;
    creep.moveTo(controller);
    creep.upgradeController(controller);
    
}
