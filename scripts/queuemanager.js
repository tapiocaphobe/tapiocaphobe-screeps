class QueueManager {
    _queue = [];
    _hashmap = new Map();
    constructor(objectkeyset, value)
    {
        for(var n in objectkeyset)
        {
            this._hashmap.set(n.name, value);
        }
    }
    add()
    {

    }
    update(key, ...newvalue)
    {
        switch(typeof this._hashmap.get(key))
        {
            case 'boolean':
                this._hashmap.set(key, !this._hashmap.get(key));
                console.log("queuemanager boolean");
                break;
            default:
                console.log(typeof this._hashmap.get(key));
                break;
        }
    }
}

module.exports = QueueManager;