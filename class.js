
$(document).ready(()=>{
    const chars = ["./Images/knight.png", "./Images/darkninja.png", "./Images/tank.png"];
    var character = "knight";
    var classes = ["knight","ninja","tank"]
    const btns = ["k","n","t"];
    const smk = ["./Images/whitesmoke.png", "./Images/redsmoke.png", "./Images/yellowsmoke.png"]

    if (localStorage.getItem("person") == null){
        window.location.href = "./login.html"
    }
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar-menu');
    
    menu.addEventListener('click', function(){
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

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
    
    $("#acc-dropdown").html(content);  
    $("#acc-dropdown").show();
    $("#login-btn").hide()
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
        $("#login-btn").show()
    })

    for(let i=0; i<chars.length; i++){
        $(".character-button-" + btns[i] + " a").on("click", function(){
        let char = chars[i];
        let smoke = smk[i];
        character = classes[i]                

        $(".smoke-wrap").attr("smokeshow","false");
        $(".character_spritesheet").css({"background":`url(${char}) no-repeat no-repeat`, "position":"absolute", "background-size":"100%", "width":"calc( var(--grid-cell)* 4 )", "height":"calc( var(--grid-cell)* 4 )", "image-rendering":"pixelated"});
        $(".smoke,.smoke2,.smoke3").attr("src", `${smoke}`);
        $(".smoke,.smoke2,.smoke3").css({"filter": "blur(5px)", "transform-origin":"50% 50%"});
        $(".character").attr("animation","true");
        if ($(".character").attr("animation") ==  "true"){
            setTimeout(()=>{
            $(".character").attr("animation","false");
            $(".smoke-wrap").attr("smokeshow","true");
            },200)
        }
        });


    }
    
    $(".select-btn").on("click",()=>{
        sessionStorage.setItem("character",character)
    })
})

function ClearCart(){
    let index = localStorage.length
    console.log(index)
    let nameArray = []
    for (let i =0; i<index;i++){
        console.log(localStorage.key(i))
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