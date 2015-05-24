module.exports = function(creep) {
    // attack if we have all the attackers we want
    if (true) {//desiredRoles['attack'] == existingRoles['attack']) {
        var target = getTarget(creep);
        creep.moveTo(target);
        creep.attack(target);
    }
}
