export var parseJSONData = function (data) {
    var parsedData = undefined;
    try {
        parsedData = JSON.parse(data);
    }
    catch (e) { }
    return parsedData;
};
