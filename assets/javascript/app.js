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
var frequency = 0;
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
      nextTrain: nextTrain,

      
    });

})




database.ref().on("child_added", function(snapshot) {

    var sv = snapshot.val();

    console.log(sv.train);
    console.log(sv.destination);
    console.log(sv.frequency);
    console.log(sv.firstTrain);

  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years"); 
  console.log(firstTrainConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    let tBody = $("<tbody>");
    let tRow = $("<tr>");

    let trainID = $("<td>").text(sv.train);
    let destinationID = $("<td>").text(sv.destination);
    let frequencyID = $("<td>").text(sv.frequency);
    let firstTrainID = $("<td>").text(sv.firstTrain);
    let nextTrainID = $("<td>").text(sv.nextTrain);

    tRow.append(trainID, destinationID,frequencyID, firstTrainID, nextTrainID);

    tBody.append(tRow);
    $(".table").append(tRow);

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    });

});





