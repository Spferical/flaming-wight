module.exports = function(creep) {
    // assign to an upgrader if not assigned already
    if (!creep.memory.upgrader) {
        var upgraders = creep.room.find(FIND_MY_CREEPS, {
            filter: function(creep) {
                return (creep.memory.role == 'upgrader');
            }
        });
        for (upgrader in upgraders) {
            j
        }
    }
}
