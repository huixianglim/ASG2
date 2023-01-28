// HAMBURGER MENU
$(document).ready(()=>{
    
    const loginText = document.querySelector(".title-text .login");
            const loginForm = document.querySelector("form.login");
            const loginBtn = document.querySelector("label.login");
            const signupBtn = document.querySelector("label.signup");
            const signupLink = document.querySelector("form .signup-link a");
            signupBtn.onclick = (()=>{
              loginForm.style.marginLeft = "-50%";
              loginText.style.marginLeft = "-50%";
            });
            loginBtn.onclick = (()=>{
              loginForm.style.marginLeft = "0%";
              loginText.style.marginLeft = "0%";
            });
            signupLink.onclick = (()=>{
              signupBtn.click();
              return false;
            });

    $("#Submit").css({"pointer-events": "none"})

    //nav bar 
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar-menu');
    
    menu.addEventListener('click', function(){
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });
    var email = false;
    var name = false
    var password = false
    const APIKEY = "63ca7160969f06502871b054";

    $("#nameInput").on("input",()=>{
      
        let value = $("#nameInput").val()
        
        if (value.length>5){
            name = true;
            $(".name").html(`Name is valid`)
           
        }
        else{
            $(".name").html(`Name is too short!`)
            name = false;

        }
        if (email&&password&&name){
            $("#Submit").css({"pointer-events": "all"})
        }
        else{
            $("#Submit").css({"pointer-events": "none"})
        }

    })
    $("#emailInput").on("input",(e)=>{
        let value = $("#emailInput").val()
        if (value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )){
            $(".email").html(`Email is valid`)
            email = true;
        }
        else{
            $(".email").html(`Email is not valid`)
            email= false
        }
        if (email&&password&&name){
            $("#Submit").css({"pointer-events": "all"})
        }
        else{
            $("#Submit").css({"pointer-events": "none"})
        }

    })
    $("#passwordInput").on("input",()=>{

        let value = $("#passwordInput").val()
        
        if (value.length>5){
            password = true;
            $(".password").html(`Password is valid`)
           
        }
        else{
            $(".password").html(`Password is too short!`)
            password = false;

        }
        if (email&&password&&name){
            $("#Submit").css({"pointer-events": "all"})
        }
        else{
            $("#Submit").css({"pointer-events": "none"})
        }
     console.log($("#passwordInput").val())

    })
  
    $("#Submit").on("click",()=>{
   
       var jsondata ={
        "name":$("#nameInput").val(),
        "email":$("#emailInput").val(),
        "password":$("#passwordInput").val(),
        "admin":false
       }
        
        let post = {
            "async": true,
            "crossDomain": true,
            "url": "https://idweek14-d843.restdb.io/rest/login",
            "method": "POST", //[cher] we will use post to send info
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata),
            "error" : function(){
                let exists = false
                let settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://idweek14-d843.restdb.io/rest/login",
                    "method": "GET", //[cher] we will use GET to retrieve info
                    "headers": {
                      "content-type": "application/json",
                      "x-apikey": APIKEY,
                      "cache-control": "no-cache"
                    },
                    
                  }
                  $.ajax(settings).done(function (response) {
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].email == $("#emailInput").val()){
                            $(".email").html("Email already taken!")
                        }
                    }
                  })
            }
            }
    $.ajax(post).done((response)=>{
        localStorage.setItem("email",$("#emailInput").val())
        window.location.href = "game.html";
    })

    })
  
})
