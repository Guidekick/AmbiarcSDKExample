var mapLabelId;
var cameraMotionId;

var addMapLabel = function() {
    var ambiarc = window.frames[0].Ambiarc;
    var mapLabelInfo = {
        buildingId: 'B00001',
        floorId: 'L002',
        latitude: 37.809975499656,
        longitude: -122.410402933442,
        label: 'HTML Generated Label',
        fontSize: 24,
        category: 'Label'
    };
    ambiarc.createMapLabel(ambiarc.mapLabel.Text, mapLabelInfo, mapLabelCreatedCallback);
};

var destroyMapLabel = function() {
    var ambiarc = window.frames[0].Ambiarc;
    ambiarc.destroyMapLabel(mapLabelId);
    $('#destroyMapLabel').prop('disabled', true);
    $('#focusOnMapLabel').prop('disabled', true);
};

var focusOnMapLabel = function() {
    var ambiarc = window.frames[0].Ambiarc;
    cameraMotionId = 1;
    ambiarc.focusOnMapLabel(mapLabelId, cameraMotionId);
};

var focusOnFloor = function() {
    var ambiarc = window.frames[0].Ambiarc;
    cameraMotionId = 2;
    ambiarc.focusOnFloor('B00001', 'L003');
};

var viewFloorSelector = function() {
    var ambiarc = window.frames[0].Ambiarc;
    cameraMotionId = 3;
    ambiarc.viewFloorSelector('B00001');
}

var subscribeToFloorSelectorEnabled = function() {
    var ambiarc = window.frames[0].Ambiarc;
    ambiarc.registerForEvent(ambiarc.eventLabel.FloorSelectorEnabled, logFloorSelectorEnabled);
    $('#unsubscribeFromFloorSelectorEnabled').prop('disabled', false);
    $('#subscribeToFloorSelectorEnabled').prop('disabled', true);
}

var unsubscribeFromFloorSelectorEnabled = function() {
    var ambiarc = window.frames[0].Ambiarc;
    ambiarc.unregisterEvent(ambiarc.eventLabel.FloorSelectorEnabled, logFloorSelectorEnabled); 
    $('#unsubscribeFromFloorSelectorEnabled').prop('disabled', true);
    $('#subscribeToFloorSelectorEnabled').prop('disabled', false);
}

var subscribeToFloorSelected = function() {
    var ambiarc = window.frames[0].Ambiarc;
    ambiarc.registerForEvent(ambiarc.eventLabel.FloorSelected, logFloorSelected);
    $('#unsubscribeFromFloorSelected').prop('disabled', false);
    $('#subscribeToFloorSelected').prop('disabled', true);
}

var unsubscribeFromFloorSelected = function() {
    var ambiarc = window.frames[0].Ambiarc;
    ambiarc.unregisterEvent(ambiarc.eventLabel.FloorSelected, logFloorSelected);
    $('#unsubscribeFromFloorSelected').prop('disabled', true);
    $('#subscribeToFloorSelected').prop('disabled', false);
}

var logFloorSelectorEnabled = function(event) {
    console.log(event);
    $('#eventFeed').val(function(i, text) {
        return text + '\nFloor selector for building: ' + event.detail + ' enabled';
    });
}

var logFloorSelected = function(event) {
    console.log(event);
    $('#eventFeed').val(function(i, text) {
        return text + '\nFloor ' + event.detail.floorId + ' for building ' + event.detail.buildingId + ' selected';
    });
}

var mapLabelCreatedCallback = function(_mapLabelId) {
    mapLabelId =_mapLabelId;
    console.log("Map Label Id: " + _mapLabelId);
    $('#destroyMapLabel').prop('disabled', false);
    $('#focusOnMapLabel').prop('disabled', false);
}