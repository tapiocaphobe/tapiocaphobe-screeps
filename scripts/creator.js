// Code to determine spawning harvesters
var creator = 
{
    createHarvester: function(spawner) 
    {
        return spawner.spawnCreep([WORK, CARRY, MOVE], ('Harvester' + Game.time), { memory: {role: 'harvester'}});
    },
    
    createBuilder: function(spawner)
    {
        return spawner.spawnCreep([WORK, CARRY, MOVE], ('Builder' + Game.time), { memory: {role: 'builder', building: false}});
    },
    
    createUpgrader: function(spawner)
    {
        return spawner.spawnCreep([WORK, CARRY, MOVE], ('Upgrader' + Game.time), {memory: {role: 'upgrader', upgrading: false}});
    },
    
    createBigUpgrader: function(spawner)
    {
        return spawner.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE], ('BigUpgrader' + Game.time), {memory: {role: 'bUpgrader', upgrading: false}});
    }
}

module.exports = creator;