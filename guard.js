module.exports = function(creep) {
    var target = Game.spawns.Spawn1.pos.findInRange(FIND_HOSTILE_CREEPS, 5);
    if(target) {
        creep.moveTo(target);
        creep.attack(target);
    }
}
