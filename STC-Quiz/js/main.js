var start = prompt("Welcome to Sha Tin College. This is a short quiz to see what you know about Sha Tin College. Start Quiz? <type and enter YES or NO>").toUpperCase();

switch(start) {  
case 'YES':

 var name = prompt("What is your name?");
 	alert('Hello ' + name + '! ' + 'Welcome to Sha Tin College!');

 var school = prompt("Which school were you from?")
 var leave = prompt("Why did you leave " + school + " ?")  

 var cont = confirm("OK. Let's move on. Click OK to continue to Question 1 of the proper quiz.")

 var q1 = prompt("Who is your helper?")

 var cont1 = prompt('Shall we contiue? If your helper is here doing this short quiz with you, type "YES". If no, type "NO"').toUpperCase();
 		if(cont1 === 'YES') {
          var YES1 = confirm("Click OK to continue to Question 2");
          var q2 = prompt("What is the WiFi Password for SCWiFi? Please answer with the WiFi password or 'I don't know' if you do not know.")
          	if (q2 === 'wifi1234') {
          		var YES2 = confirm("Click OK to continue to Question 3")
          		var q3 = prompt("In what room can you find the ICT Support Team? Please answer with the room number of the ICT Support team, or 'I don't know' if you do not know.")
          			if (q3 === '335') {
          				var YES3 = confirm("Click OK to continue to Question 4")
          				var q4 = prompt("Where is your form room? Please answer with the room number of your form room or 'I don't know' if you do not know.")
                    if (q4 === "I don't know") {
                      var NO4 = confirm("Wrong! Are you sure you want to exit this quiz ?");
                    } else {
                      var YES4 = confirm("Click OK to continue to Question 5")
                      var q5 = prompt("Who is your form tutor? Please answer with your tutor's name or 'I don't know' if you do not know.")
                        if (q5 === "I don't know") {
                          var NO5 = confirm("Wrong! Are you sure you want to exit this quiz ?");
                        } else {
                          var YES5 = confirm("Click OK to continue to Question 5")
                          var q6 = prompt("What is your tutor group? Please answer with your tutor group or 'I don't know' if you do not know.")
                            if (q6 = "I don't know") {
                              var NO6 = confirm("Wrong! Are you sure you want to exit this quiz ?");
                            } else {
                              var YES6 = confirm("Congratulations! You have completed the quiz! To try again, simply reload this page.")
                            }
                        }
                    }

          			} else {
          				var NO3 = confirm("Wrong! Are you sure you want to exit this quiz ?");
          			}


          	} else {
          		var NO2 = confirm("Wrong! Are you sure you want to exit this quiz ?");
          break
          	}

   	} else {
          var NO1 = confirm("Wrong! Are you sure you want to exit this quiz ?");
          break
    }
 
break;

case 'NO':
  var quit = confirm("You quit the quiz. Reload the page to try again.");
  break;
  
  default:
    alert("Your headache seems to be impairing your speech. Try again.");
}