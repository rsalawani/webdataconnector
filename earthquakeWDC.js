// Step 2: Create the Connector Object

// Having created the user interface (earthquakeWDC.html), we'll
// now write the JavaScript code for the 'connector'.  This file
// is saved in the same directory as the 'earthquakeWDC.html' file.

// The 'tableau' object isn't defined here, but in the WDC library.
// (It's assigned to the global scope.)

// The code is wrapped in an immediately invoked function expression
// to create a local scope.

(function () {
    var myConnector = tableau.makeConnector();
// 'makeConnector' function above is a constructor that pre-defines
// some methods for our connector object.

// 'getSchema' and 'getData' functions below contain the logic for
// getting the table schema and downloading the data.
    myConnector.getSchema = function (schemaCallback) {
// 'getSchema' takes a 'schemaCallback' parameter defined by the WDC API.
    	tableau.log("Hello WDC!");
// tableau.log() allows us to pass messages from our connector back
// to the simulator.  These log messages are then printed with the
// browser’s built-in console.log() function on the simulator page.
    var cols = [{
        id: "id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "mag",
        alias: "magnitude",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "title",
        alias: "title",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "location",
        dataType: tableau.dataTypeEnum.geometry
    }];
// The 'cols' variable contains an array of JavaScript objects, where
// each object defines a single column in our table.  In this example,
// there are columns for magnitude, title, and location.  Note that for
// each column you can specify additional options.  E.g., the alias
// defines a friendly name that can appear in Tableau and the 'columnRole'
// determines whether a field is a measure or a dimension.  The id can only
// contain alphanumeric values (a-z, A-Z, 0-9) and underscore characters (_).
// The identifiers cannot contain spaces, hyphens, or special characters.
// For more options, see the API reference.

    var tableSchema = {
        id: "earthquakeFeed",
        alias: "Earthquakes with magnitude greater than 4.5 in the last 7 days",
        columns: cols
    };

    schemaCallback([tableSchema]);

    };
// The 'tableSchema' variable defines the schema for a single table
// and contains a JavaScript object.  Here, the value of the columns
// property is set to the cols array defined earlier.

// The 'schemaCallback' gets called when the schema is defined.
// The 'schemaCallback' takes an array of table objects.  In this case,
// there is only table object (the 'tableSchema' object defined above).

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
            var feat = resp.features,
            tableData = [];
// The 'getData' function takes 2 parameters: (1) The 'table' parameter
// is an object defined by WDC to which you can append data.  (2) The
// 'doneCallback' signals to Tableau completion of data retrieval.

// The jQuery '$.getJSON' function gets earthquake data from the USGS
// earthquake feed and uses a success handler to store the returned
// data in a response parameter (resp).

        // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "mag": feat[i].properties.mag,
                    "title": feat[i].properties.title,
                    "location": feat[i].geometry
                });
            }
// The 'for' loop iterates over the features in the JSON object and
// stores the data that we want in the 'tableData' array.

            table.appendRows(tableData);
// The 'table.appendRows' function appends the 'tableData' array to
// the table as a JavaScript object.
            doneCallback();
// 'doneCallback' signals to Tableau completion of data retrieval.
        });

    };

    tableau.registerConnector(myConnector);
// 'registerConnector' validates the connector object before initialization.
// Add an 'event listener' in order to respond to the button clicks in HTML. 
    $(document).ready(function () {
// The jQuery '$(document).ready' function runs some code when the page loads.
    	$("#submitButton").click(function () {
// A 'click event listener' is added to the button element created earlier
// in the HTML UI file.  The button is identified by the 'submitButton' id.
    		tableau.connectionName = "USGS Earthquake Feed"; // variable defines
// what we want to call the connector data source when it is displayed in Tableau.
    		tableau.submit(); // Send the connector object to Tableau for validation.
    	});
    });

})();

// Note: The API Reference describes the properties that you can define for
// the table object and for each object in the table columns in more detail.
