$(document).ready(function () {
//Initializing Firebase
    var config = {
    apiKey: "AIzaSyAHjt86FYMimVXti6SYsPZAxVcmVP5wNFY",
    authDomain: "train-scheduler-3c270.firebaseapp.com",
    databaseURL: "https://train-scheduler-3c270.firebaseio.com",
    projectId: "train-scheduler-3c270",
    storageBucket: "train-scheduler-3c270.appspot.com",
    messagingSenderId: "139876575188"
  };

firebase.initializeApp(config);

var database = firebase.database();

var train = "";
var destination = "";
var frequency = "";
var firstTrain = "";


$("#add-train-btn").on("click", function(event) {

    event.preventDefault();

    train = $("#add-train-input").val().trim();
    destination = $("#add-destination-input").val().trim();
    frequency = $("#add-train-frequency-input").val().trim();
    firstTrain = $("#add-firsttrain-input").val().trim();


    
   
  
    database.ref().push({
      train: train,
      destination: destination,      
      frequency: frequency,
      firstTrain: firstTrain,

      
    });

})




database.ref().on("child_added", function(snapshot) {

    var sv = snapshot.val();

    console.log(sv.train);
    console.log(sv.destination);
    console.log(sv.frequency);
    console.log(sv.firstTrain);


    let tBody = $("<tbody>");
    let tRow = $("<tr>");

    let trainID = $("<td>").text(sv.train);
    let destinationID = $("<td>").text(sv.destination);
    let frequencyID = $("<td>").text(sv.frequency);
    let firstTrainID = $("<td>").text(sv.firstTrain);

    tRow.append(trainID, destinationID,frequencyID, firstTrainID);

    tBody.append(tRow);
    $(".table").append(tRow);

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    });

});





