module.exports = function(creep) {
    var target = getTarget(creep);
    if (creep.pos.getRangeTo(target) >= 3) {
      creep.moveTo(target);
    }
    creep.rangedAttack(target);
}
