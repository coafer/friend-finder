// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends.
// ===============================================================================

var friendData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "send" a request a page.
  

  // app.get("/api/survey", function(req, res) {
  //   res.json(friendData);
  // });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendData array)
  // ---------------------------------------------------------------------------

  app.post("/api/survey", function(req, res) {
    friendData.push(req.body);
    res.json(true);
    console.log(friendData);
    // var dataSurvey = req.body;
    // console.log("this is " + dataSurvey + "data");
    // //Have the data from the friends.js
    // // var friendScore = function(friendData){
    // //   for (let index = 0; index < friendData.length; index++) {
    // //     const scores = friendData[index].scores;
    // //     console.log(scores);
    // //   }
    // // }

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.post("/api/clear", function() {
  //   // Empty out the arrays of data
  //   friendData = [];

  //   console.log(friendData);
  // });
};
