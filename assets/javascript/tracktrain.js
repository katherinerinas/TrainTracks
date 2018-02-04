var trainName
var destination
var firstTrain
var frequency


var config = {
   apiKey: "AIzaSyAueOzPrIK2N_xM55izJ6OK60JrFPX7YIs",
   authDomain: "my-awesome-project-34a06.firebaseapp.com",
   databaseURL: "https://my-awesome-project-34a06.firebaseio.com",
   storageBucket: "my-awesome-project-34a06.appspot.com"
 
};
  

firebase.initializeApp(config);

var database = firebase.database();

//$("#form-group").val("");
$("#add-train-btn").on("click", function(){
  event.preventDefault()
   trainName= $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#firsttrain-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  database.ref().push({
    name: trainName,
    destination: destination,
    firsttrain: firstTrain,
    frequency: frequency,
    dataAdded: firebase.database.ServerValue.TIMESTAMP

  });
});


database.ref().on("value", function(snapshot) {

  var sv = snapshot.val();

  var svArr = Object.keys(sv);

  var lastIndex = svArr.length - 1;

  var lastKey = svArr[lastIndex];

  var lastObj = sv[lastKey];

  

});

database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().dataAdded);

 
  var addTrainRow = $("#add-train-row");

  var trainData = "<tr>";
  trainData += "<td>" + childSnapshot.val().name + "</td>";
  trainData += "<td>" + childSnapshot.val().destination + "</td>";
  trainData += "<td>" + childSnapshot.val().firsttrain + "</td>";
  trainData += "<td></td>";
  trainData += "<td>" + childSnapshot.val().frequency + "</td>";
  trainData += "<td></td>";
  trainData += "</tr>";

  $("#form-design")[0].reset()

  addTrainRow.append(trainData);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    $("#test").append(snapshot.val().name);
    $("#test").append(snapshot.val().destination);
    $("#test").append(snapshot.val().firsttrain);
    $("#test").append(snapshot.val().frequency);
     $("#test").append(snapshot.val().dataAdded);
  })