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
  

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendData array)
  // ---------------------------------------------------------------------------

  app.post("/api/survey", function(req, res) {
    
    //Parsing score data from survey to integers
    var newFriend = req.body;
    var newFriendScores = newFriend.scores;
    var newFriendScoresNumbers = newFriendScores.map(Number);

    //redefining the newfriend data to push to the data base as scores = array of integers
    Object.defineProperties(newFriend, {
      scores: { value: newFriendScoresNumbers}
    });
    
    friendData.push(newFriend);

    //Array that will holds all total values
    var friendTotalAll = [];

    //Loop through the data to calculate total scores
    for (var i = 0; i < 10; i++){

      //Get the data from the possible friends
      var frindsScore = friendData[i].scores;

      console.log("this is friendScore: "+ frindsScore);

      //Add to get total score from possible friends
      var friendSums = reductor();
      var friendTotal =  frindsScore.reduce(friendSums);
      console.log("This is xxx: " + friendTotal);
      
      //Push the totals to the array that holds all results
      friendTotalAll.push(friendTotal);
      console.log("This is the total of all in the array: " + friendTotalAll);
    }

    

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

};


function reductor() {
  return (accumulator, currentValue) => accumulator + currentValue;
}


