
//submit username/password to login

var submit=document.getElementById('submit_btn');
submit.onclick=function(){
     //Create a request object
  var request=new XMLHttpRequest();
  
  //capture the response and store it ioon a variable
  request.onreadystatechange = function(){
     if (request.readyState === XMLHttpRequest.DONE){
         //take some action
         if (request.status === 200){
             console.log('User logges in');
             alert('Logged in successfully');
         }else if(request.status===403){
             alert('Username/password incorrect');
         }else if(request.status===500){
             alert('Something went wrong on the server');
             
         }
    
     }
     //not done yet
  };
  
  //make the request
  var username=document.getElementById('username').value;
  var password=document.getElementById('password').value;
  console.log(username);
  console.log(password);
  request.open('POST','http://giraffesmruthi.imad.hasura-app.io/login',true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username:username,password:password}));
};