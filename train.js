 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBSh1ohQwQfzH7Rk6UVXG1JzI3qm27pB10",
    authDomain: "train-ride-a0312.firebaseapp.com",
    databaseURL: "https://train-ride-a0312.firebaseio.com",
    projectId: "train-ride-a0312",
    storageBucket: "train-ride-a0312.appspot.com",
    messagingSenderId: "473586832473"
  };
  firebase.initializeApp(config);


  // Get reference to the database service
  var database = firebase.database();

  var number = "";
  var name = ""; 
  var destination = "";
  var frequency = "";
  var nextArrival = "";
  var minutesAway = "";
  var min = "";
  var hour = "";
  var frequencyDisplay = "";
  var frequencyHour = "";
  var frequencyMinutes = "";
  var hourCount = "";
  var hourMinutesAway = "";
  var hourMinutes = "";
  var hourCountMin = "";

  function showTime () {
  	var thetime = moment().format('MMMM Do YYYY, h:mm:ss a');
  	$("#headerSpan").html(thetime);
  }

  setInterval(showTime, 1000);

  $("#addTrain").on("click", function() {
  	event.preventDefault();
  	number = parseFloat($("#trainNumber").val());
  	name = $("#trainName").val();
  	destination = $("#destination").val();
  	frequency = parseInt($("frequency").val());

  	min = moment().minute();
  	console.log(min);

    minutesAway =(frequency - (min % frequency));
    console.log(minutesAway);
    hour = moment().hour();
    nextArrival = moment().add(minutesAway, 'minutes').format("h:mm a");
    
    database.ref(("/trainschedule")).push( {
      trainName: name,
      trainDestination: destination,
      trainFrequency: frequency,
      trainNextArrival: nextArrival,
      trainMinutesAway: minutesAway,
      trainNumber: number
    });

    $("#trainNumber").val("");
    $("#trainName").val("");
    $("#destination").val("");
    $("frequency").val("");
  });


  function updateDisplay(name, destination, frequency, nextArrival, minutesAway, number) {

    var novoTableRow = $("<tr class='row" + number + "' data-value='" + number + "'>");
    var novoTableDsix = $("<td class='trainrow'>" + number + "</td>");
    var novoTableDone = $("<td class='trainrow'>" + name + "</td>");
    var novoTableDtwo = $("<td class='trainrow'>" + destination + "</td>");
    var novoTableDthree = $("<td class='trainrow'>" + frequency + " minutes</td>");
    var novoTableDfour = $("<td class='trainrow'>" + nextArrival + "</td>");
    var novoTableDfive = $("<td class='trainrow'>" + minutesAway + " minutes</td>");

    novoTableRow.append(novoTableDfour);
    novoTableRow.append(novoTableDsix);
    novoTableRow.append(novoTableDone);

    novoTableRow.append(novoTableDtwo);

    novoTableRow.append(novoTableDthree);

    novoTableRow.append(novoTableDfive);

    $("#tableBody").append(novoTableRow);
}

function reloadPage() {
    location.reload();
}

setInterval(reloadPage, 120000)