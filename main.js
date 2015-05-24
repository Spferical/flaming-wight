var harvester = require('harvester');
var miner = require('miner');
var collecter = require('collector');
var builder = require('builder');
var guard = require('guard');
var attacker = require('attacker');
var rangedattacker = require('rangedattacker');
var upgrader = require('upgrader');
var upgraderhelper = require('upgraderhelper');


Spawn.prototype.createRole = function(role) {
    return this.createCreep(roles[role], null, {role: role});
};

Creep.prototype.isSafe = function(position) {
    return position.findInRange(FIND_HOSTILE_CREEPS, 5).length == 0
        && position.findInRange(FIND_HOSTILE_STRUCTURES, 5).length == 0;
}

var getTarget = function(creep) {
    var target = null;
    var creepTarget = creep.pos.findClosest(FIND_HOSTILE_CREEPS);
    var structTarget = creep.pos.findClosest(FIND_HOSTILE_STRUCTURES);
    if (!structTarget) {
        target = creepTarget;
    } else if (!creepTarget) {
        target = structTarget;
    } else {
        creepTargetDist = creep.pos.findPathTo(creepTarget);
        structTargetDist = creep.pos.findPathTo(structTarget);
        if (creepTargetDist < structTargetDist + 5) {
            target = creepTarget;
        } else{ 
            target = structTarget;
        }
    }
    return target;
}

var roles = {
    'miner': [MOVE, WORK, WORK, WORK, WORK],
    'collector': [MOVE, MOVE, CARRY, CARRY, CARRY],
    'harvester': [MOVE, MOVE, CARRY, WORK],
    'builder': [WORK, WORK, CARRY, CARRY, MOVE],
    'guard': [TOUGH, MOVE, ATTACK, ATTACK, ATTACK],
    'attack': [TOUGH, ATTACK, ATTACK, MOVE, MOVE],
    'rangedattack': [TOUGH, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
    'upgrader': [MOVE, WORK, WORK, WORK, CARRY],
    'upgraderhelper': [MOVE, MOVE, CARRY, CARRY, CARRY],
}

var desiredRoles = {
    'miner': 1,
    'collector': 5,
    'guard': 2,
    'attack': 0,
    'builder': 3,
    'rangedattack': 0,
    'upgrader': 1,
    'upgraderhelper': 2,
}

var existingRoles = {}
for (var role in desiredRoles) {
    existingRoles[role] = 0;
}
for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    existingRoles[creep.memory.role] += 1;
};
for (var role in desiredRoles) {
    if (existingRoles[role] < desiredRoles[role]) {
        Game.spawns.Spawn1.createRole(role);
        break;
    }
}

for(var name in Game.creeps) {
    var creep = Game.creeps[name];

    if(creep.memory.role == 'harvester') {
        harvester(creep);
    } else if (creep.memory.role == 'miner') {
        miner(creep);
    } else if (creep.memory.role == 'collector') {
        collecter(creep);
    } else if (creep.memory.role == 'builder') {
        builder(creep);
    } else if (creep.memory.role == 'guard') {
        guard(creep);
    } else if (creep.memory.role == 'attack') {
        attacker(creep);
    } else if (creep.memory.role == 'rangedattack') {
        rangedattacker(creep);
    } else if (creep.memory.role == 'upgrader') {
        upgrader(creep);
    } else if (creep.memory.role == 'upgraderhelper') {
        upgraderhelper(creep);
    }
}
