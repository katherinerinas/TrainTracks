

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBSPB4ZktB-UcuYv5hdjD1OdhTzv58HAj0",
    authDomain: "train-tracks-24af8.firebaseapp.com",
    databaseURL: "https://train-tracks-24af8.firebaseio.com",
    storageBucket: "train-tracks-24af8.appspot.com"
    
 };

firebase.initializeApp(config);


 var database =firebase.database();

 $("#add-train-btn").on("click", function(event){
  event.preventDefault();

var trainName=$("#train-name-input").val().trim();
var destination =$("#destination-input").val().trim();
var firstTrain =moment($("#firsttrain-input").val().trim(), "hh:mm").format("X");
var frequency =$("#frequency-input").val().trim();


var newTrain= {
  name: trainName,
  destination: destination,
  firsttrain: firstTrain,
  frequency: frequency

};


database.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.firsttrain);
console.log(newTrain.frequency);


alert("Your train has been added!");



});

 database.ref().on("child_added", function(childSnapshot, prevChildKey){
  
  

var trainName = childSnapshot.val().name;
var destination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().firsttrain;
var frequency = childSnapshot.val().frequency;



var tFrequency = frequency;
var firstTime= firstTrain ;

var frequencyPretty = moment.unix(frequency).format("hh:mm")

var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");


var currentTime = moment();


var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


var tRemainder = diffTime % tFrequency;


var tMinutesTillTrain = tFrequency - tRemainder;


//var minutesAwayPretty = moment.unix(tMinutesTillTrain).format("hh:mm")

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
var choochooPretty = moment.unix(nextTrain).format("hh:mm");


$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +frequency + "</td><td>" + choochooPretty + "</td><td>" + tMinutesTillTrain + "</td><td>" );

});






 

  