## Project Structure
* css, and TemplateData all contain styling information for the overlay UI and loading screens.
* cas and pier both contain a map example along with the main HTML page and map page. The HTML page embeds the map page within an iframe.
* demo-ui.js is the controller and contains examples into how to call into the AmbiarSDK

## Running the Example project
The project will only run if it is served over http. You can run a server locally with the following

`python -m SimpleHTTPServer`

You can access each map at the following paths:
* `/cas/index.html` (California Academy of Sciences in San Francisco)
* `/pier/index.html` (PIER 39 in San Francisco)

## Getting started

### Knowing when the AmbiarcSDK is initilized

```
var iframeLoaded = function() {
    //once the iframe loads subscribe to the Ambiarc event
    $("#ambiarcIframe")[0].contentWindow.document.addEventListener('AmbiarcAppInitialized', function() {
        onAmbiarcLoaded();
        });
}

var onAmbiarcLoaded = function() {
    var ambiarc = $("#ambiarcIframe")[0].contentWindow.Ambiarc;
    //take action using the ambiarc SDK
    //ambiarc.registerForEvent(ambiarc.eventLabel.RightMouseDown, onRightMouseDown);
}
```

### Subscribing to events

```
var onEnteredFloorSelector = function(event) {
    var buildingId = event.detail;
    console.log("Ambiarc received a FloorSelectorEnabled event with a building of " + buildingId);
}
var onAmbiarcLoaded = function() {
    var ambiarc = $("#ambiarcIframe")[0].contentWindow.Ambiarc;
    //take action using the ambiarc SDK
    ambiarc.registerForEvent(ambiarc.eventLabel.FloorSelectorEnabled, onEnteredFloorSelector);
}
```

#### Creating a Map Label at cursor location

```
var createIconLabel = function() {
    var ambiarc = $("#ambiarcIframe")[0].contentWindow.Ambiarc;

    // getMapPositionAtCursor is a convenience method provided by the SDK
    ambiarc.getMapPositionAtCursor((vector3) => {
        var mapLabelInfo = {
            buildingId: mainBldgID, //retrieved with getAllBuildings SDK method
            floorId: currentFloorId,  //retrieved with getAllFloors SDK method
            scenePosition: vector3,
            category: 'Label',
            location: 'Default',
            partialPath: 'Information', //used to access default icons
            showOnCreation: true
        };
        ambiarc.createMapLabel(ambiarc.mapLabel.Icon, mapLabelInfo, (labelId) => {
            var mapLabelName = 'Ambiarc Icon Label: ' + poisInScene.length;
        });
    });
}
```

#### SDK Documentation
More info can be found here: [AmbiarcSDK Documentation](http://ambiarc.com/documentation.html)




