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
//data variables declared
var train = "";
var destination = "";
var frequency = 0;
var nextArrival = "";
var minsAway = 0;

//on-click train captures form inputs
$("#add-train-btn").on("click", function(event) {

    event.preventDefault();

    train = $("#add-train-input").val().trim();
    destination = $("#add-destination-input").val().trim();
    frequency = $("#add-train-frequency-input").val().trim();
    nextArrival = $("#add-firsttrain-input").val().trim();


    
   
  //Push to populate database
    database.ref().push({
      train: train,
      destination: destination,      
      frequency: frequency,
      nextArrival: nextArrival,
      minsAway: minsAway
    });

})




database.ref().on("child_added", function(snapshot) {
    //Print the initial data to the console
    var sv = snapshot.val();

    var freq = parseInt(sv.frequency)
        // moment function added to calculate mins away
    var dConverted = moment(snapshot.val().nextArrival, 'HH:mm').subtract(1, 'years');
    var trainTime = moment(dConverted).format('HH:mm');
    var timeConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
    var timeDifference = moment().diff(moment(timeConverted), 'minutes');
    var timeRemainder = timeDifference % freq;
    var minsAway = freq - timeRemainder;
     nextArrival = moment().add(minsAway, 'minutes');
        
     //appending new row/info to html
    var newRow = $("<tr>").append(
        $("<th>").text(sv.train),
        $("<th>").text(sv.destination),
        $("<th>").text(sv.frequency),
        $("<th>").text(moment(sv.nextArrival, 'HH:mm').format('hh:mm a')),
        $("<th>").text(minsAway),
    );

    $("#train-table > tbody").append(newRow);

})


  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    });







