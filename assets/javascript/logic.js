var firebaseConfig = {
  apiKey: "AIzaSyDaGouHHpKPmRt3ESzfSEi3bqNmB-mbK-E",
  authDomain: "stu-s-class-project.firebaseapp.com",
  databaseURL: "https://stu-s-class-project.firebaseio.com",
  projectId: "stu-s-class-project",
  storageBucket: "",
  messagingSenderId: "154397890714",
  appId: "1:154397890714:web:3953f54be49f0bb9"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submit").on("click", function () {
  var name = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#first-train").val().trim();
  var rate = $("#rate").val().trim();

  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    rate: rate,
  });

  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#rate").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().firstTrain;
  var trainRate = childSnapshot.val().rate;
  
  var firstConversion = moment(trainFirst, "HH:mm");
  var remainder = moment().diff(moment(firstConversion, "HH:mm"), "minutes") % trainRate;
  var arrivingIn = trainRate - remainder;
  var nextArrival = moment().add(arrivingIn, "minutes").format("HH:mm");

console.log('remainder: ' + remainder);
console.log(arrivingIn);
console.log(nextArrival);

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),   
    $("<td>").text(trainFirst),   
    $("<td>").text(trainRate),
    $("<td>").text(nextArrival),
    $("<td>").text(arrivingIn)
  );

  $("#train-table > tbody").append(newRow);
});