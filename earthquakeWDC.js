// Step 2: Create the connector object

// Having created the user interface (earthquakeWDC.html), we'll
// now write the JavaScript code for the 'connector'.  This file
// is saved in the same directory as the 'earthquakeWDC.html' file.

// The 'tableau' object isn't defined here, but in the WDC library.
// (It's assigned to the global scope.)

// The code is wrapped in an immediately invoked function expression
// to create a local scope.

(function () {
    var myConnector = tableau.makeConnector();
// 'makeConnector' function is a constructor that pre-defines some
// methods for our connector object.

    myConnector.getSchema = function (schemaCallback) {
    	tableau.log("Hello WDC!");
// tableau.log allows us to pass messages from our connector back
// to the simulator.  These log messages are then printed with the
// browser’s built-in console.log() function on the simulator page.
    };

    myConnector.getData = function (table, doneCallback) {

    };

// 'getSchema' and 'getData' functions are placeholders for now, but will
// contain the logic for getting the table schema and downloading the data.

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

