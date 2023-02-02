// HAMBURGER MENU
$(document).ready(()=>{
    var json = {}
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
        
        if (value.length>0 && value.length<=10){
            name = true;
            $(".signN").html(`Name is valid`)
           
        }
        else if (value.length == 0){
            $(".signN").html(`Name length is too short!`)
            name = false;

        }
        else if (value.length>10){
            $(".signN").html(`Name length is too long!`)
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
        "admin":false,
        "kills":0
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
            "beforeSend":function(){
                $("#signSubmit").css({"pointer-events":"none"})     
                $("#signSubmit").html(`<a href = "#"><span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_usmfx6bp.json"  background="transparent"  speed="1"  style="width: 7vw; height: 3vw;"  loop  autoplay></lottie-player>
                        </a>`)       
            
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
                    }
                  }
                  $.ajax(settings).done(function (response) {
                    
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].email == $("#signEmail").val()){
                            $(".signE").html("Email already taken!")
                    
                        }
                        if (response[i].email ==  $("#signName").val()){
                            $(".signN").html("Name already taken!")

                        }
                    }
                    $("#signSubmit").css({
                        "pointer-events":"all"
                    })
                    $("#signSubmit").html(`  
                    <a href = "#">  
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </a>`)
                  })
              
            }
            }
    $.ajax(post).done((response)=>{
        $("#signSubmit").css({
            "pointer-events":"all"
        })
        json = jsondata
        
        localStorage.setItem("person",JSON.stringify(json))
        window.location.href = "selectclass.html";
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
            "beforeSend":function(){
                $("#logSubmit").css({
                    "pointer-events":"none"
                })
                $("#logSubmit").html(`<a href = "#"><span></span>
                <span></span>
                <span></span>
                <span></span>
                <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_usmfx6bp.json"  background="transparent"  speed="1"  style="width: 7vw; height: 3vw;"  loop  autoplay></lottie-player>
                </a>`)      
            }
            }
    $.ajax(get).done((response)=>{
        $("#logSubmit").css({
            "pointer-events":"all"
        })
        $("#logSubmit").html(`<a href = "#"><span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
        </a>`)    
        let check = false;
        for (let i =0; response[i];i++){
            console.log(response[i].email)
            if(response[i].password == $("#logPass").val() && response[i].email == $("#logEmail").val()){
                    check = true;
                    json = {
                        "name":response[i].name,
                        "email":response[i].email,
                        "password":response[i].password,
                        "admin":response[i].admin,
                        "kills":response[i].kills
                    }
            
                    
            }

        }
    
        if (check){
            localStorage.setItem("person",JSON.stringify(json))
            console.log(json)
            setTimeout(()=>{
                window.location.href = "selectclass.html"

            },10000)
        }
        else{
            $(".validation").css({"display":"block"})
        }
    })

    })
  
})


