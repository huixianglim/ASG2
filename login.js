// HAMBURGER MENU
$(document).ready(()=>{
    $("#Submit").css({"pointer-events": "none"})

    //nav bar 
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar-menu');
    
    menu.addEventListener('click', function(){
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });
    var email = false;
    var password = false
    const APIKEY = "63ca7160969f06502871b054";
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
        if (email&&password){
            $("#Submit").css({"pointer-events": "all"})
        }
        else{
            $("#Submit").css({"pointer-events": "none"})
        }

    })
    $("#passwordInput").on("input",()=>{
        console.log("email:",email)
        console.log("password:",password)
        console.log("check:",email&&password)
        let value = $("#passwordInput").val()
        
        if (value.length>5){
            password = true;
            $(".password").html(`Password is valid`)
           
        }
        else{
            $(".password").html(`Password is too short!`)
            password = false;

        }
        if (email&&password){
            $("#Submit").css({"pointer-events": "all"})
        }
        else{
            $("#Submit").css({"pointer-events": "none"})
        }
     console.log($("#passwordInput").val())

    })
  
    $("#Submit").on("click",()=>{
        let emailValue = $("#emailInput").val();
        let passwordValue = $("#passwordInput").val();
       var jsondata ={
        "email":emailValue,
        "password":passwordValue
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
            "data": JSON.stringify(jsondata)
            }
    $.ajax(post).done((response)=>{
        localStorage.setItem("email",$("#emailInput").val())
        window.location.href = "game.html";
    })

    })
  
})
