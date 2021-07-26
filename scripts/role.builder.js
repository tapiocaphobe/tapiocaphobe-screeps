var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var builderCPU = Game.cpu.getUsed();
        var buildTargets = Game.getObjectById(creep.room.memory.buildTargetsID);
        
        if(creep.memory.building)
        {
            if(creep.build(buildTargets) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(buildTargets);
            }
        }
            
	    console.log(creep.name + " CPU usage: ", Game.cpu.getUsed() - builderCPU);
	}
};

module.exports = roleBuilder;