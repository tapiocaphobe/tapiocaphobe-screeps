var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var namer = require('namer');
var creator = require('creator');

module.exports.loop = function () {
    
    var spawnCPU = Game.cpu.getUsed();
    for(var name in Game.spawns)
    {
        if(Game.spawns[name].store[RESOURCE_ENERGY] > 250 && !Game.spawns[name].spawning)
        {
            var numHarvDes = 20;
            var numHarv = Game.spawns[name].room.find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role == 'harvester'}}).length; // TODO: change when multiple rooms
            var numBuildDes = 1;
            var numBuild = Game.spawns[name].room.find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role == 'builder'}}).length; // TODO: change when multiple rooms
            var numUpDes = 5;
            var numUp = Game.spawns[name].room.find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role == 'upgrader'}}).length;
            var numBigUpDes = 0;
            var numBigUp = Game.spawns[name].room.find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role == 'bUpgrader'}}).length;
            if(numHarvDes - numHarv > 0)
            {
                creator.createHarvester(Game.spawns[name]);
            }
            if(numBuildDes - numBuild > 0)
            {
                creator.createBuilder(Game.spawns[name]);
            }
            if(numUpDes - numUp > 0)
            {
                creator.createUpgrader(Game.spawns[name]);
            }
            if(numBigUpDes - numBigUp > 0)
            {
                creator.createBigUpgrader(Game.spawns[name]);
            }
        }
    }
    console.log("Spawn CPU usage: ", Game.cpu.getUsed() - spawnCPU);
    
    var roleCPU = Game.cpu.getUsed();
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader' || creep.memory.role == 'bUpgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    console.log("Role CPU usage: ", Game.cpu.getUsed() - roleCPU);
}