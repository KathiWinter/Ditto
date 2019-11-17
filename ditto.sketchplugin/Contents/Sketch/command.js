const sketch = require('sketch')
const doc = sketch.getSelectedDocument()
 

var setSizeToOrigin = function(context) {
var currentSymbolInstances = doc.selectedLayers.layers

    currentSymbolInstances.forEach((instance) => {
        
        instance.sketchObject.resetSizeToMaster()
        instance.sketchObject.scale = 1

        setMasterName()

        showUIMessage(instance)
        
    });
};


var listenerFunction = function(context) {  
    var action = context.actionContext
  
    for (var i = 0; i < action.length; i++) {
        var change = action[i]
        var path = change.fullPath()
        var obj = change.object()
        var className = obj.className()
    
        if(className == 'MSSymbolInstance' && path.includes(`symbolID`)) {
            var currentSymbolInstances = doc.selectedLayers.layers
            currentSymbolInstances.forEach(instance => {
                instance.sketchObject.resetSizeToMaster()
                instance.sketchObject.scale = 1
                setMasterName()
                showUIMessage(instance)

            });            
        }
    }   
}

var setMasterName = function(context) {
    var currentSymbolInstances = doc.selectedLayers.layers

    currentSymbolInstances.forEach(instance => {
        var parentMasterSymbol = doc.getSymbolMasterWithID(instance.symbolId)
        instance.name = parentMasterSymbol.name
         
    });
}

var showUIMessage = function(instance) {
    var parentMasterSymbol = doc.getSymbolMasterWithID(instance.symbolId)

    sketch.UI.message(`Ditto successful! (W: ${parentMasterSymbol.frame.width}, H: ${parentMasterSymbol.frame.height})`)
}