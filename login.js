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

    $("#signSubmit").css({"pointer-events": "none"})
    $("#logSubmit").css({"pointer-events": "none"})

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
    var logemail = false;
    var logpassword = false
    const APIKEY = "63ca7160969f06502871b054";

    $("#signName").on("input",()=>{
      
        let value = $("#signName").val()
        
        if (value.length>5){
            name = true;
            $(".signN").html(`Name is valid`)
           
        }
        else{
            $(".signN").html(`Name is too short!`)
            name = false;

        }
        if (email&&password&&name){
            $("#signSubmit").css({"pointer-events": "all"})
        }
        else{
            $("#signSubmit").css({"pointer-events": "none"})
        }

    })
    $("#signEmail").on("input",(e)=>{
        let value = $("#signEmail").val()
        if (value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )){
            $(".signE").html(`Email is valid`)
            email = true;
        }
        else{
            $(".signE").html(`Email is not valid`)
            email= false
        }
        if (email&&password&&name){
            $("#signE").css({"pointer-events": "all"})
        }
        else{
            $("#signE").css({"pointer-events": "none"})
        }

    })
    $("#signPass").on("input",()=>{

        let value = $("#signPass").val()
        
        if (value.length>5){
            password = true;
            $(".signP").html(`Password is valid`)
           
        }
        else{
            $(".signP").html(`Password is too short!`)
            password = false;

        }
        if (email&&password&&name){
            $("#signSubmit").css({"pointer-events": "all"})
        }
        else{
            $("#signSubmit").css({"pointer-events": "none"})
        }
     console.log($("#signPass").val())

    })
  
    $("#signSubmit").on("click",()=>{
   
       var jsondata ={
        "name":$("#signName").val(),
        "email":$("#signEmail").val(),
        "password":$("#signPass").val(),
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
                        if (response[i].email == $("#signEmail").val()){
                            console.log("hi");
                            $(".signE").html("Email already taken!")
                        }
                    }
                  })
              
            }
            }
    $.ajax(post).done((response)=>{
        localStorage.setItem("email",$("#signEmail").val())
        localStorage.setItem("admin",false)
        window.location.href = "game.html";
    })

    })
    
    $("#logEmail").on("input",(e)=>{
        let value = $("#logEmail").val()
        if (value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )){
            $(".logE").html(`Email is valid`)
            logemail = true;
        }
        else{
            $(".logE").html(`Email is not valid`)
            logemail= false
        }
        if (logemail&&logpassword){
            $("#logSubmit").css({"pointer-events": "all"})
        }
        else{
            $("#logSubmit").css({"pointer-events": "none"})
        }

    })
    $("#logPass").on("input",()=>{

        let value = $("#logPass").val()
        
        if (value.length>5){
            logpassword = true;
            $(".logP").html(`Password is valid`)
           
        }
        else{
            $(".logP").html(`Password is too short!`)
            logpassword = false;

        }
        if (logemail&&logpassword){
            $("#logSubmit").css({"pointer-events": "all"})
        }
        else{
            $("#logSubmit").css({"pointer-events": "none"})
        }
     console.log($("#logPass").val())

    })
  
    $("#logSubmit").on("click",()=>{
   
    
        
        let get = {
            "async": true,
            "crossDomain": true,
            "url": "https://idweek14-d843.restdb.io/rest/login",
            "method": "GET", //[cher] we will use post to send info
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            },
            "processData": false,
            }
    $.ajax(get).done((response)=>{
        console.log('hi')
        let check = false;
        let adin = false
        for (let i =0; response[i];i++){
            console.log(response[i].email)
            if(response[i].password == $("#logPass").val() && response[i].email == $("#logEmail").val()){
                    check = true;
                    if(response[i].admin == "true"){
                        admin = true
                    }
                    
            }

        }
    
        if (check){
            localStorage.setItem("email",$("#logEmail").val());
            localStorage.setItem("admin",admin);

            window.location.href = "game.html"
        }
        else{
            $(".validation").css({"display":"block"})
        }
    })

    })
  
})


