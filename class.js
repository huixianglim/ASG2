
$(document).ready(()=>{
    const chars = ["./Images/knight.png", "./Images/darkninja.png", "./Images/tank.png"];
    var character = "knight";
    var classes = ["knight","ninja","tank"]
    const btns = ["k","n","t"];
    const smk = ["./Images/whitesmoke.png", "./Images/redsmoke.png", "./Images/yellowsmoke.png"]


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
