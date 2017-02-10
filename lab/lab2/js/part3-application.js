/* =====================
  Lab 2, part3: a full application (stretch goal)

  We're going to use the skills we've just been practicing to write a full application
  which is responsive to user input.
  At your disposal are a set of variables which we use to track user input (see
  part3-main.js and part3-setup.js for more details on how this is done — we'll
  cover this topic at a later date). Their values will be logged to console to
  aid in debugging.

  In this lab, which is very much open-ended, your task is to use the value of
  these variables to define the functions below. Try to come up with interesting
  uses of the provided user input.

  Some ideas:
    There are two numeric fields: can you write this application to filter
    using both minimum and maximum?
    There is a boolean (true/false) field: can you write your code to filter according
    to this boolean? (Try to think about how you could chop up this data to make this meaningful.)
    There is a string field: can you write your code to filter/search based on user
    input?

  Remember, this is open-ended. Try to see what you can produce.
===================== */

/* =====================
  Define a resetMap function to remove markers from the map and clear the array of markers
===================== */
var resetMap = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  _.each(myMarkers, function(marker){
    map.removeLayer(marker);
  });
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var parseData;
var getAndParseData = function() {
  /* =====================
      Fill out this function definition
    ===================== */
  myData = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json").done(function(data){
    parseData = JSON.parse(data);
  });
};

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
var plotData = function() {
  var makeMarkers = function() {
      var myObjects1 = [];
      var myObjects2 = [];
      var allmarkers = [];
      _.each(parseData, function(myObject){
        // input two year number in the numericField1 and numbericField2,
        // code below helps to select out the SolarInstallation that built
        // between these two years
        if (myObject.YEARBUILT >= numericField1 && myObject.YEARBUILT <= numericField2){
          myObjects1.push(myObject);
        }
      });
      console.log(typeof(myObjects1));
      _.each(myObjects1, function(object){
        // code below helps to select out the SolarInstallation that built in
        // the zipcode 19104 when the booleanField box is checked
        if ((object.ZIPCODE === 19104) === booleanField){
          myObjects2.push(object);
        }
      });
      _.each(myObjects2, function(object){
        // code below helps to select out the SolarInstallation that built by
        // a speciific developer that the user input in the box
        if (object.DEVELOPER === stringField){
          allmarkers.push(L.marker([object.LAT, object.LONG_]));
        }
      });
      return allmarkers;
  };
  var markers = makeMarkers();
  var plotMarkers = function() {
    _.each(markers, function(marker){
      marker.addTo(map);
    });
  };
  plotMarkers();
  /* =====================
    Fill out this function definition
  ===================== */
};
