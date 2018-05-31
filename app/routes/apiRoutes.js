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
    
    //pushing the data from new friend to the database
    friendData.push(newFriend);

    //Adding all values for total score of new friend
    var newFriendSums = reductor();
    var newFriendTotal = newFriendScoresNumbers.reduce(newFriendSums);
    console.log ("This is the total of the new friedn array: " + newFriendTotal);

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

    //Having the total values of all friends in data and the total value of the new friend
    //Lets find the difference and the smalles difference would be the best match
    var bestMatch = friendTotalAll.map(x => Math.abs(x - newFriendTotal));
    console.log(bestMatch);
    
    //finding the index of the smallest difference
    var indexOfMinValue = bestMatch.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);

    //returning the best match
    var bestMatchFromData = friendData[indexOfMinValue];


    res.json(bestMatchFromData);
    console.log(bestMatchFromData);
    console.log(friendData);

  });

};

function reductor() {
  return (accumulator, currentValue) => accumulator + currentValue;
}


