var character = document.querySelector(".character");
var map = document.querySelector(".map");
//start in the middle of the map
var x = 90;
var y = 34;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame
const placeCharacter = () => {
   
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size') //get the css property of --pixel-size
   );
   
   const held_direction = held_directions[0];
   if (held_direction != null) { //if the held_directions array is not null
      if (held_direction === directions.right) {x += speed;} //change movemennt accordingly
      if (held_direction === directions.left) {x -= speed;}
      if (held_direction === directions.down) {y += speed;} 
      if (held_direction === directions.up) {y -= speed;}
      if (Math.random() < 0.005){
         initialiseGame();
         var end = false
          var monster = {health:20, //creating of 2 classes, monster and you(aka the player)
             attacks:[{
                "name":"slash",
                "damage":1.5
             },
             {
                "name":"bite",
                "damage":2
             }
          ]
          }
          var you = {health:20,
             attacks:[{
                "name":"tackle",
                "damage":1.5
             },
             {
                "name":"water punch",
                "damage":2.5
             }
          ]
          }
          let yourattacks = ["tackle","water punch"] //array of ur attacks to help get the damage later on
          $("#enemyHealthBar").css({"width":`${monster.health/20*100}%`}) //setting of the enemy healthbar 
          $("#yourHealthBar").css({"width":`${you.health/20*100}%`})
          $(".health-bar").html(`Healthbar: ${you.health}/20`)
          $(".attacks").unbind().on("click", async (e)=>{ //unbind to only take note of one click
             $("attack-text").hide() //hide the attack-text or dialogue
             let random  = Math.floor(Math.random() * 2) //enemy random attacks
             console.log(monster.attacks[random])
             let monster_attack = monster.attacks[random].name
             let monster_damage = monster.attacks[random].damage            
             let attack = e.target.value
             let index = yourattacks.indexOf(attack) 
             let damage = you.attacks[index].damage
             if (Math.random()<0.1){
                damage+=1; //random crit chance for monsters
             }
             if (Math.random()<0.09){
                monster_damage+=1; //random crit chance for monsters
             }
             you.health -= monster_damage
             monster.health -= damage
             $(".monster_spritesheet").css({"transition": "all 0.3s", "filter": "brightness(1.75)", "background": "url('./Images/Beast.png')", "background-size": "100%", "width": "calc( var(--grid-cell)* 4)", "height": "calc( var(--grid-cell)* 4 )"})
             $(".monster_spritesheet[idle = 'true']").css({"animation": "hitAnimation 0.6s steps(4) infinite"})
                setTimeout(() =>{
                  $(".monster_spritesheet").css({"transition": "all 0.3s", "filter": "brightness(1)", "background": "url('./Images/Beast.png')", "background-size": "100%", "width": "calc( var(--grid-cell)* 4)", "height": "calc( var(--grid-cell)* 4 )"})
                  $(".monster_spritesheet[idle = 'true']").css({"animation": "walkAnimation 0.6s steps(4) infinite"})
                }, 500)

             $(".attack-text").html(`<p>The monster used ${monster_attack} and has done ${monster_damage} damage</p>`)
             $("#yourHealthBar").css({"width":`${you.health /20*100}%`})
             $(".attack-text").show()
             $(".attack-bar").hide()
             $(".attack-text").css({"pointer-events":"none"}) 

             setTimeout(() => { //timeout to show ur damage done
               
               $(".you_spritesheet[idle = 'true']").css({"transition": "all 0.3s", "filter": "brightness(1.75)", "animation": "hitAnimation 0.6s steps(4) infinite"})
                setTimeout(() =>{
                  $(".you_spritesheet[idle = 'true']").css({"transition": "all 0.3s", "filter": "brightness(1)", "animation": "walkAnimation 0.6s steps(4) infinite"})
                }, 500)

                $(".attack-text").html(`<p>You used ${attack} and has done ${damage} damage</p>`)
                $("#enemyHealthBar").css({"width":`${monster.health /20*100}%`})
                $(".attack-text").css({"pointer-events":"all", "cursor": "pointer"})
              }, 1000)
              $(".attack-text").click(()=>{
                resume()
              })
  
              $(".health-bar").html(`Healthbar: ${you.health}/20`) 
 
              if (you.health<=0 || monster.health<=0 ){
                end = true;
                $(".attack-text").html("Game over"); //if health is lower than 0, display game over text
                $(".attack-text").on("click",()=>{
                   if (end){ //onclick to end game
                      endGame();
                   }
                });
 
                return
              }
             
          })
       }
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false"); //if held direction is not null, walking set to true
   //game functions
   function initialiseGame(){ //reset the game settings
      $(".battle").attr("battle-activation","true")
         speed = 0;
         character.setAttribute("walking","false")
         $(".battle").css({"opacity":1})
         $(".dpad").css({"pointer-events":"none"})
         $(".battle").css(({"pointer-events":"all"}))
   }
   function endGame(){
      end = false //set the default of end back to false
      $(".attack-bar").show() //show attack bar 
      you.health = 20;
      $(".attack-text").html("");
      $(".attack-text").hide(); //hide the dialogue at the start
      monster.health = 20; //set monster health back to max
      $(".battle").attr("battle-activation","false")
      speed = 1; //set back the speed to allow movement
      $(".battle").css({"opacity":0})
      $(".dpad").css({"pointer-events":"all"}) //allow movement in normal game
      $(".battle").css(({"pointer-events":"none"})) //set the pointer events in the fighting mode to none
   }

   function resume(){ //resume the game 
      $(".attack-text").hide();
      $(".attack-bar").show()
   }
   // end of game functions
   
   //Limits (gives the illusion of walls)
   var leftLimit = 8;
   var rightLimit = (16 * 11)+ 7;
   var topLimit = -5 + 32;
   var bottomLimit = (16.4 * 10);
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   
 
    var camera_left = pixelSize * 66;
    var camera_top = pixelSize * 42;
   
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`; //moving the background
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  //moving the character
}
const battleBackgroundImage = new Image();

//Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step(); //kick off the first step!



/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
}
document.addEventListener("keydown", (e) => { //if keydown is in the directions json and its new, add it to the front of the array, 
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})
document.addEventListener("keydown",(e)=>{ //added running
   
   if (e.key == "Shift" && $(".battle").attr("battle-activation") == "false"){
      speed = 1.5
   }

})
document.addEventListener("keyup",(e)=>{ //change the speed back to default
   if (e.key == "Shift" && $(".battle").attr("battle-activation") == "false"){
      speed = 1
   }
})

document.addEventListener("keyup", (e) => { // on key up, remove the item from array
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});



/* BONUS! Dpad functionality for mouse and touch */
var isPressed = false; //set default to false
const removePressedAll = () => {
   document.querySelectorAll(".dpad-button").forEach(d => {
      d.classList.remove("pressed")
   })
}
document.body.addEventListener("mousedown", () => {
    //on mouse down ispressed sets to true
   isPressed = true;
})
document.body.addEventListener("mouseup", () => {
    //on mouse up is pressed sets to false
   isPressed = false;
   held_directions = [];
   removePressedAll();
})
const handleDpadPress = (direction, click) => {   
   if (click) {                  //if button pad is clicked, is pressed =true
      isPressed = true;
   }
   held_directions = (isPressed) ? [direction] : [] //if is pressed create an array with a single item inside
   
   if (isPressed) {
      removePressedAll();
      document.querySelector(".dpad-"+direction).classList.add("pressed"); //if pressed set the thing to blue
   }
}
//Bind a ton of events for the dpad and event listeners for the dpad
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));
//this allows for drag clicks for the dpad
document.querySelector(".dpad-left").addEventListener("mouseover", (e) =>{ handleDpadPress(directions.left)});
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));

let clicked = false
addEventListener('click', () => {
   if (!clicked){
      audio.Map.play()
      clicked = true
   }
   
})