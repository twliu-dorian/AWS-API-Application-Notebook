//AWS config
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: "ASIAYIZQRUCOQ3EQZHS7",
  secretAccessKey: "3nx7X2C5OkwuYL2P7z9yrC4NgBZKP+tIgEVRD6V3",
  sessionToken:"FwoGZXIvYXdzEEIaDGdrxhPx3shX2oh1SCLIAc4upMAjtr62H7WqXz7SosKxCJvNamNMIBJb8EuTqZuLINPEqvAdg72qP/p+KFeunCnNCsxYKBw4Hk8QuiZKO8ZvCMXoC0m5eEpi5bdnXi6s5En9SwhfbDvSdWQEQ1NMVSi+bOOWvQtPAjPyedcJQFZjGWMRoKvfdrj7NerHvZ5DZCUDTB/WkyoA8eh+dScxc+VhzTRntWxVgOwDWBs+z1VVmNiAVr539R2Or8CFfKBWx8d2NFDnrYRL9LpTR71+Yrs5gN7LO9z4KNi6//gFMi3Sevt98n3LQr02mExgtQ7l/dSTwTaDWEAxYsjsNNqXEVuB3al1gvE854wdad8="
});

///// INIT /////
var current_email ="";

////// ONLOAD /////
var data = {
  UserPoolId : _config.cognito.userPoolId,
      ClientId : _config.cognito.clientId
  };
//var timeoutID = window.setInterval(( () => readiiii() ), 500);
var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
var cognitoUser = userPool.getCurrentUser();

window.onload = function(){
if (cognitoUser != null) {
  cognitoUser.getSession(function(err, session) {
      if (err) {
          alert(err);
          return;
      }
      console.log('session validity: ' + session.isValid());
//Set the profile info
cognitoUser.getUserAttributes(function(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
  document.getElementById("email_value").innerHTML = result[2].getValue();
  current_email=result[2].getValue();
  readiiii();
});

  });

}
}
function signOut(){
if (cognitoUser != null) {
    cognitoUser.signOut();
  }
  alert("Log out successfully!");
window.location.href="login.html";

}




////// sending /////

var sendbtn = document.getElementById('send_btn');
var sendinfo = document.getElementById('text_input');
var docClient = new AWS.DynamoDB.DocumentClient();

//Catch sending time





// if first used, create a row for the user
function createiiii() {
  var time = new Date();
  m = time.getMonth() + 1;
  d = time.getDate();
  h = time.getHours();
  n = time.getMinutes();
  s = time.getSeconds();

  var showTime=m + '/' + d + ' ' + h + ':' + n+ ':' + s;
  var inputstring = current_email;
  var NewArray = new Array();
  var NewArray = inputstring.split("@");


    if (sendinfo.value != "") {
      console.log(current_email);
      console.log(NewArray[0]);
      console.log(showTime,sendinfo.value);
      var params = {
          TableName :NewArray[0],
          Item:{
              "time": showTime,
              "info":sendinfo.value,
          }
      };
      docClient.put(params, function(err, data) {
          if (err) {
            console.log("Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2));
          } else {
            console.log("PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2));
            console.log(data,params);
            readiiii();

          }
      });
            sendinfo.value = "";
            sendinfo.innerHTML= " ";
            document.getElementById('showInfoHere').innerHTML="";

  }
}


var $show = $('#showInfoHere');


function readiiii() {
  var inputstring = current_email;
  var NewArray = new Array();
  var NewArray = inputstring.split("@");
  console.log(current_email, NewArray[0]);
    var params = {
        TableName: NewArray[0]
    };
    docClient.scan(params, function(err, data) {
        if (err) {
          console.log("Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2));

        } else {
          console.log("GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2));
          console.log(data);
          data.Items.forEach(function(movie) {
                document.getElementById('showInfoHere').innerHTML += movie.time + "   :   " + movie.info +  "<br>";
            });
        }
    });
}

function toPhoto(){
  window.location.href="photo.html";
}
