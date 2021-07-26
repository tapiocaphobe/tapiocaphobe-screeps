roomTargets = {
    
    calculateBuildTargets: function(room)
    {
        var buildTargets = room.find(FIND_MY_CONSTRUCTION_SITES);
        for(var i in buildTargets)
        {
            buildTargets[i].memory.reserved = false; // if reserved by builder
            if(buildTargets[i].structureType == STRUCTURE_TOWER)
            {
                buildTargets[i].memory.numReserves = 2; // number of builders allowed to reserve site; so we can spread builders out on stuff
            }
            else
            {
                buildTargets[i].memory.numReserves = 1;
            }
            // TODO: add more cases
        }
        room.memory.buildTargetsID = buildTargets.id;
    },
    
    calculateRepairTargets: function(room)
    {
        var repairTargets = room.find(FIND_MY_STRUCTURES, {filter: function(structure) {return structure.hits < structure.hitsMax}});
        room.memory.repairTargetsID = repairTargets.id;
    },
    calculateSources: function(room)
    {
      var sourcesFound = false;
      if(!sourcesFound)
      {
          var sources = room.find(FIND_SOURCES);
          room.memory.sourcesID = sources.id;
          sourcesFound = true;
      }
    }
}

module.exports = roomTargets;