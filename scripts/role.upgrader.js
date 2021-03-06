var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else { // if energy needed
           var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION && structure.energy == structure.energyCapacity ||
                                structure.structureType == STRUCTURE_SPAWN && structure.energy == structure.energyCapacity);
                    }
            });
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if(targets.length > 1)
            {
                for(var index in targets)
                {
                    if(creep.withdraw(targets[index], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targets[index], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }   
            }
            else 
            {
                for(var index in sources)
                {
                    if(creep.harvest(sources[index]) == ERR_NOT_IN_RANGE && creep.moveTo(sources[index]) != ERR_NO_PATH)
                    {
                        creep.moveTo(sources[index], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
	}
};

module.exports = roleUpgrader;