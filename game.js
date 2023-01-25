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
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false"); //if held direction is not null, walking set to true
   
   
   //Limits (gives the illusion of walls)
   var leftLimit = -2;
   var rightLimit = (16 * 11)+ 2;
   var topLimit = -20;
   var bottomLimit = (16 * 7)+10;
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
   
   if (e.key == "Shift"){
      speed = 1.5
   }

})
document.addEventListener("keyup",(e)=>{ //change the speed back to default
   if (e.key == "Shift"){
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