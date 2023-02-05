// HAMBURGER MENU
$(document).ready(()=>{
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar-menu');
    
    menu.addEventListener('click', function(){
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

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
