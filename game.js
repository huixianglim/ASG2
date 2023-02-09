$(document).ready(()=>{

   const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar-menu');
    
    menu.addEventListener('click', function(){
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    //LOGIN LOGOUT NAV
    let content = "";
    var person = '';
    if (localStorage.getItem("person") == null || localStorage.getItem("person") == undefined){
         window.location.href = "./login.html"
    }
    else{
         person = JSON.parse(localStorage.getItem("person"))
        content = `<a>
        <div class="signin-img"></div>
        <p>${person.name}</p>
     </a>
    <ul>               
        <li><a class="navbar-links" id="logout-btn" style="padding-top:0">LOG OUT</a>

        </li>
    </ul>`
        $("#acc-dropdown").html(content);  
    }

    $("#logout-btn").on("click",()=>{
        localStorage.removeItem("person");
        content = `<a href="./login.html" class="navbar-links">
        <div class="signin-img"></div>  
        <p>LOG IN</p>
        </a>`
        $("#acc-dropdown").html(""); 
        $("#login-btn").html(content);
    })
    //END

   $("#topLeads thead").hide()
   const APIKEY = "63ca7160969f06502871b054";
   var id =""
   var Currentkills = 0
   var kills = 0
   getLeaderBoard()
   var email = person.email
   chosen = sessionStorage.getItem("character");
   if(chosen==null ||chosen== undefined){
      window.location.href = "selectclass.html" //directing users to the selectclass page if they have not signed up
   }
   if (chosen!="knight"){
      $(".you_spritesheet").attr("character",chosen)
      $(".character_spritesheet").attr("character",chosen) //use the session storage to set the class page
   }
   var characters = {
      "knight":{Maxhealth:20,
         health:20,
         attacks:[{
            "name":"slice",
            "damage":1.5
         },
         {
            "name":"chop",
            "damage":2.5
         }
      ]
      },
      "ninja":{Maxhealth:15,
         health:15,
         attacks:[{
            "name":"shuriken",
            "damage":4.5
         },
         {
            "name":"flying slice",
            "damage":5
         }
      ]
      },
      "tank":{Maxhealth:25,
         health:25,
         attacks:[{
            "name":"tackle",
            "damage":1
         },
         {
            "name":"smash",
            "damage":2
         }
      ]
      }
   }
   var monsters = {
      "beast":{
         Maxhealth:20,
         health:20, 
          attacks:[{
             "name":"slash",
             "damage":1.5
          },
          {
             "name":"bite",
             "damage":2
          }
       ]
       },
       "skeleton":{
         Maxhealth:10,
         health:10, 
          attacks:[{
             "name":"bone slam",
             "damage":4
          },
          {
             "name":"bone whack",
             "damage":4
          }
       ]
       }
   }
   var attacks =document.getElementsByClassName("attacks");
   for (let i = 0;i<attacks.length;i++){
      attacks[i].innerHTML = (characters[chosen].attacks[i].name);
      attacks[i].value = characters[chosen].attacks[i].name
   }   
   var character = document.querySelector(".character");
   var map = document.querySelector(".map");
   //start in the middle of the map
   var x = 90;
   var y = 34;
   var held_directions = []; //State of which arrow keys we are holding down
   var speed = 1; //How fast the character moves in pixels per frame
   const placeCharacter = () => {
      
      var pixelSize = parseFloat(
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
            var monsterUrl =""
            var monster = randomMonster()
            setMonsterImage()
             var you = characters[chosen]
             let yourattacks = []
             for (let i =0; i<you.attacks.length;i++){
               yourattacks.push(you.attacks[i].name)
             } //array of ur attacks to help get the damage later on
             $("#enemyHealthBar").css({"width":`${monster.health/monster.Maxhealth*100}%`}) //setting of the enemy healthbar 
             $("#yourHealthBar").css({"width":`${you.health/you.Maxhealth*100}%`})
             $(".health-bar").html(`Healthbar: ${you.health}/${you.Maxhealth}`)
             $(".attacks").unbind().on("click", async (e)=>{ //unbind to only take note of one click
                $("attack-text").hide() //hide the attack-text or dialogue
                let random  = Math.floor(Math.random() * 2) //enemy random attacks
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
                $(".monster_spritesheet").css({"transition": "all 0.3s", "filter": "brightness(1.75)", "background": `url(${monsterUrl})`, "background-size": "100%", "width": "calc( var(--grid-cell)* 4)", "height": "calc( var(--grid-cell)* 4 )"})
                $(".monster_spritesheet[idle = 'true']").css({"animation": "hitAnimation 0.6s steps(4) infinite"})
                   setTimeout(() =>{
                     $(".monster_spritesheet").css({"transition": "all 0.3s", "filter": "brightness(1)", "background":  `url(${monsterUrl})`, "background-size": "100%", "width": "calc( var(--grid-cell)* 4)", "height": "calc( var(--grid-cell)* 4 )"})
                     $(".monster_spritesheet[idle = 'true']").css({"animation": "walkAnimation 0.6s steps(4) infinite"})
                   }, 500)
                   
                $(".attack-text").html(`<p>The monster used ${monster_attack} and has done ${monster_damage} damage</p>`)
                
                $("#yourHealthBar").css({"width":`${you.health /you.Maxhealth*100}%`})
                $(".attack-text").show()
                $(".attack-bar").hide()
                $(".attack-text").css({"pointer-events":"none"}) 
               if (you.health> 0){
                  setTimeout(() => { //timeout to show ur damage done
                  
                     $(".you_spritesheet[idle = 'true']").css({"transition": "all 0.3s", "filter": "brightness(1.75)", "animation": "hitAnimation 0.6s steps(4) infinite"})
                      setTimeout(() =>{
                        $(".you_spritesheet[idle = 'true']").css({"transition": "all 0.3s", "filter": "brightness(1)", "animation": "walkAnimation 0.6s steps(4) infinite"})
                      }, 500)
                      monster.health -= damage
                      $(".attack-text").html(`<p>You used ${attack} and has done ${damage} damage</p>`)
                      $("#enemyHealthBar").css({"width":`${monster.health /monster.Maxhealth*100}%`})
                      if (monster.health<=0){
                        $(".attack-text").css({"pointer-events":"all"}) 
                        Currentkills+=1
                        $(".killCount").html(`Kill Count:<br>${Currentkills+kills}`)
                         end = true;
                         $(".attack-text").html("Game over! You win!"); //if health is lower than 0, display game over text
                         $(".attack-text").on("click",()=>{
                            if (end){ //onclick to end game
                               endGame();
                               updateLeaderBoard();
                            }
                         });
                         return
                       }
                      $(".attack-text").css({"pointer-events":"all", "cursor": "pointer"})
                    }, 1000)
                    $(".attack-text").click(()=>{
                      resume()
                    })
        
                    $(".health-bar").html(`Healthbar: ${you.health}/${you.Maxhealth}`) 
               }
         
    
               if (you.health<=0){
                  $(".attack-text").css({"pointer-events":"all"}) 
                  Currentkills-=1;
                  $(".killCount").html(`Kill Count: <br>${Currentkills+kills}`);
                   end = true;
                   $(".attack-text").html("Game over! You Lose!"); //if health is lower than 0, display game over text
                   $(".attack-text").on("click",()=>{
                      if (end){ //onclick to end game
                         endGame();
                         updateLeaderBoard();
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
         you.health = you.Maxhealth;
         $(".attack-text").html("");
         $(".attack-text").hide(); //hide the dialogue at the start
         monster.health = monster.Maxhealth; //set monster health back to max
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

      function randomMonster(){
         monsterLinks = ["./Images/Beast.png","./Images/skeleton.png"]
         monstersname = ["beast","skeleton"]
         let randomNumber = Math.floor(Math.random() * 2);
         monsterUrl = monsterLinks[randomNumber]
         let randomMonster = monsters[(monstersname[randomNumber])]
         return randomMonster
      }
      function setMonsterImage(){
         $(".monster_spritesheet").css({"transition": "all 0.3s", "filter": "brightness(1)", "background":  `url(${monsterUrl})`, "background-size": "100%", "width": "calc( var(--grid-cell)* 4)", "height": "calc( var(--grid-cell)* 4 )"})
         $(".monster_spritesheet[idle = 'true']").css({"animation": "walkAnimation 0.6s steps(4) infinite"})
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

  async function getLeaderBoard(){
      let get = {
         "async": true,
         "crossDomain": true,
         "url": "https://idweek14-d843.restdb.io/rest/login",
         "method": "GET", 
         "headers": {
           "content-type": "application/json",
           "x-apikey": APIKEY,
           "cache-control": "no-cache"
         },
         "beforeSend":function(){
            $("#topLeads tbody").hide()

            $("#topLeads thead").hide()
            $(".animation").show();

         },
         "processData": false,
      }
      $.ajax(get).done((response)=>{
         $("#topLeads tbody").show()
         $("#topLeads thead").show()
         $(".animation").hide();
         response = response.sort((a,b)=>{
            return a.kills - b.kills 
         })
         var content =""
         for(let i =0; i<5; i++){
            let numberIndex = response.length -1
            content = `${content}<tr><td>${response[numberIndex - i].name}</td><td>${response[numberIndex- i].kills}</td></tr>`
            $("#topLeads tbody").html(content)
         }         
         for(let i = 0; i<response.length; i++){
            if(email == response[i].email){
               id = response[i]._id;
               kills = response[i].kills
               $(".killCount p").html(`Kill Count: <br>${kills}`)

            }
         }
      })

   }
   function updateLeaderBoard(){
      let jsondata = {
         "name":person.name,
         "email": person.email,
         "password":person.password,
         "admin":person.admin,
         "kills":(Currentkills+kills)
      }
      let update = {
         "async": true,
         "crossDomain": true,
         "url": `https://idweek14-d843.restdb.io/rest/login/${id}`,
         "method": "PUT", 
         "headers": {
           "content-type": "application/json",
           "x-apikey": APIKEY,
           "cache-control": "no-cache"
         },
         "processData": false,
         "data": JSON.stringify(jsondata),
         }
         $.ajax(update).done((response)=>{
            Currentkills = 0;
            getLeaderBoard();
   
         })
   }  
     


})



