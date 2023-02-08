// HAMBURGER MENU
$(document).ready(()=>{
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar-menu');
    
    menu.addEventListener('click', function(){
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    
    
    //LOGIN LOGOUT NAV
    let content = "";

    if (localStorage.getItem("person") == null || localStorage.getItem("person") == undefined){
        content = `<a href="./login.html" class="navbar-links">
        <div class="signin-img"></div>  
        <p>LOG IN</p>
        </a>`
        $("#login-btn").html(content);
        $("#acc-dropdown").hide();
    }
    else{
       let  person = JSON.parse(localStorage.getItem("person"))
        content = `<a>
        <div class="signin-img"></div>
        <p>${person.name}</p>
     </a>
    <ul>               
        <li><a class="navbar-links" id="logout-btn" style="padding-top:0">LOG OUT</a>

        </li>
    </ul>`
        $("#login-btn").hide()
        $("#acc-dropdown").html(content);  
         $(".createacc-btn").html(`<a href="./selectclass.html">
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         Start Playing
        </a>`)
        $("#acc-dropdown").show();

    }

    $("#logout-btn").on("click",()=>{
        localStorage.removeItem("person");
        ClearCart();
        content = `<a href="./login.html" class="navbar-links">
        <div class="signin-img"></div>  
        <p>LOG IN</p>
        </a>`
        $("#acc-dropdown").html(""); 
        $("#acc-dropdown").hide();
        $("#login-btn").html(content);
         $(".createacc-btn").html(`<a href="./selectclass.html">
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         Sign Up
        </a>`)
        $("#login-btn").show()

    })
    //END        LOGIN LOGOUT NAV 


    
    window.addEventListener("scroll",reveal);
    function reveal(){
        var reveals = document.querySelectorAll('.reveal')
        var background = document.querySelectorAll('.background')

        for (var i=0; i<reveals.length; i++){
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 100;
            if(revealtop< windowheight - revealpoint){
                reveals[i].classList.add("active");
                background[i].setAttribute("background","true")

            }
            else{
                reveals[i].classList.remove('active');
                background[i].setAttribute("background","false")


            }

        }
    }


    //STICKY NAV
    window.addEventListener("scroll", function(){
        var nav = document.querySelector("nav");
        nav.classList.toggle("sticky", window.scrollY > 0);
    })


    //MOUSEMOVE
    var image = document.querySelector(".title .back-img");

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        function moveBackground(event){
            var mouseXposition = event.clientX;
            var mouseYposition = event.clientY;

            var calculatedX = mouseXposition / (windowWidth / 6);
            var calculatedY = mouseYposition / (windowHeight / 6);

            image.style.transform="translate(-"+calculatedX.toString()+"%,-"+calculatedY.toString()+"%)";
        }

        document.addEventListener("mousemove", moveBackground);

    

})

function ClearCart(){
    let index = localStorage.length
    let nameArray = []
    for (let i =0; i<index;i++){
       if(localStorage.key(i) !="person"){
        nameArray.push(localStorage.key(i))
       }
    }
    if (nameArray.length >0){
        for (let i = 0; i< nameArray.length;i++){
            localStorage.removeItem(nameArray[i])
        }
    }
}