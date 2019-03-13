
function tigonYAMLFormSubmit() {
    const yamlString = document.getElementById("tigon-form-input").value;
    const yamlJSON = YAML.parse(yamlString);
    let convertedJSON = {};
    for (let toplevelKey in yamlJSON) {
        if (toplevelKey !== "worlds") {
            convertedJSON[toplevelKey] = yamlJSON[toplevelKey];
        } else {
            let worlds = yamlJSON[toplevelKey];
            let parsedWorlds = {};
            for (let worldUIDString in worlds) {
                let areas = worlds[worldUIDString];
                let parsedAreas = {};
                for (let areaName in areas) {
                    let areaLoctionString = areas[areaName];
                    const splitCoords = areaLoctionString.split(',');
                    parsedAreas[areaName] = {
                        "x": parseFloat(splitCoords[0]),
                        "y": parseFloat(splitCoords[1]),
                        "z": parseFloat(splitCoords[2])
                    };
                }
                parsedWorlds[worldUIDString] = parsedAreas;
            }
            convertedJSON[toplevelKey] = parsedWorlds;
        }
    }

    console.log("Parsing back into YAML..." + JSON.stringify(convertedJSON, null, '\t'));
    const yamlConvertedJSON = YAML.stringify(convertedJSON, 20, 2).replace("\n","<br>");
    document.getElementById("tigon-result").innerHTML = yamlConvertedJSON;
}
function tigonJSONFormSubmit() {
    const yamlString = document.getElementById("tigon-form-input").value;
    const yamlJSON = YAML.parse(yamlString);
    console.log("Dumping JSON instead of YAML..." + JSON.stringify(yamlJSON, null, '\t'));
    document.getElementById("tigon-result").innerHTML = JSON.stringify(yamlJSON);
}

document.getElementById("tigon-form-submit").onclick = function(event) {
    event.preventDefault();

    if (window.location.href.indexOf('json') >= 0) {
      tigonJSONFormSubmit();
    } else {
      tigonYAMLFormSubmit();
    }
};
