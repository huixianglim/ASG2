
$(document).ready(()=>{
    const chars = ["./Images/knight.png", "./Images/darkninja.png", "./Images/tank.png"];
    var character = "knight";
    $(".character-button-k a").on("click", function(){
        let char = chars[0]
        character = "knight"
        $(".character_spritesheet").css({"background":`url(${char}) no-repeat no-repeat`, "position":"absolute", "background-size":"100%", "width":"calc( var(--grid-cell)* 4 )", "height":"calc( var(--grid-cell)* 4 )", "image-rendering":"pixelated"})
        $(".character, .smoke-wrap").attr("animation","true")
        if ($(".character").attr("animation") ==  "true"){
            setTimeout(()=>{
            $(".character").attr("animation","false")
            console.log("hi")},200)
    }
    });
    
    $(".character-button-n a").on("click", function(){
        character = "ninja"

    let char = chars[1]
    $(".character_spritesheet").css({"background":`url(${char}) no-repeat no-repeat`, "position":"absolute", "background-size":"100%", "width":"calc( var(--grid-cell)* 4 )", "height":"calc( var(--grid-cell)* 4 )", "image-rendering":"pixelated"})
    $(".character").attr("animation","true")
    if ($(".character").attr("animation") ==  "true"){
        setTimeout(()=>{
        $(".character").attr("animation","false")
        console.log("hi")},200)
    }
    });
    
    $(".character-button-t a").on("click", function(){
        character = "tank"

    let char = chars[2]
    $(".character_spritesheet").css({"background":`url(${char}) no-repeat no-repeat`, "position":"absolute", "background-size":"100%", "width":"calc( var(--grid-cell)* 4 )", "height":"calc( var(--grid-cell)* 4 )", "image-rendering":"pixelated"})
    $(".character, .smoke-wrap").attr("animation","true")
    if ($(".character").attr("animation") ==  "true"){
        setTimeout(()=>{
        $(".character").attr("animation","false")
        console.log("hi")},200)
    }
    });
    $(".select-btn").on("click",()=>{
        sessionStorage.setItem("character",character)
    })
})
