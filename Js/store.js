 const APIKEY = "63dbf5963bc6b255ed0c459e";
 var discount = false;


$(document).ready(async function(){

    //nav bar
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar-menu');
    menu.addEventListener('click', function(){
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

     //LOGIN LOGOUT NAV
     let content = "";

     if (localStorage.getItem("person") == null || localStorage.getItem("person") == undefined){
         content = `<a href="login.html" class="navbar-links">
         <div class="signin-img"></div>  
         <p>LOG IN</p>
         </a>`
         $("#login-btn").html(content);
         $("#acc-dropdown").hide();  
     }
     else{
        let  person = JSON.parse(localStorage.getItem("person"))
        $("#login-btn").hide();  
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


     }
 
     $("#logout-btn").on("click",()=>{
         localStorage.removeItem("person");
         clearCart();
         content = `<a href="login.html" class="navbar-links">
         <div class="signin-img"></div>  
         <p>LOG IN</p>
         </a>`
         window.location.reload();
       

  })

  //nav bar scrolling interactiveness
    window.addEventListener("scroll", function(){
      var nav = document.querySelector("nav");
      nav.classList.toggle("sticky", window.scrollY > 0); })

  // Ajax to check if the person logged in is within top 3
    let secondAPIKEY =  "63ca7160969f06502871b054";
    var person = localStorage.getItem("person")
    if (person != null){
      person = JSON.parse(person)
      if  (person.admin !=true){
          let check = {
          "async": true,
          "crossDomain": true,
          "url": "https://idweek14-d843.restdb.io/rest/login",
          "method": "GET", 
          "headers": {
            "content-type": "application/json",
            "x-apikey": secondAPIKEY,
            "cache-control": "no-cache"
          },
          "beforeSend":function(){
             $("e#topLeads tbody").hide()
      
             $("#topLeads thead").hide()
             $(".animation").show();
      
          },
          "processData": false,
       }
    await $.ajax(check).done((response)=>{  //await to ensure that this function loads before others
          response = response.sort((a,b)=>{
             return a.kills - b.kills 
          })
          for(let i =0; i<5; i++){
             let numberIndex = response.length - 1
             console.log(i)
             console.log(response[numberIndex - i].name)
             if (response[numberIndex - i].name == person.name){
              discount = true;
              // break;
             }
                
          }         
        })
      }
    
  }

  GetStoreItems(); //load the get store items after the get top 5 check. This is to allow the price to update accordingly

    $(".postCancel").on("click",()=>{
      $("#post-product-container").hide();
    })
    
    $("#add").on("click",()=>{
      $("#add-post-msg").hide();
      $("#post-product-container").show();
    })

    $("#post-product-submit").on("click",(e)=>{
      e.preventDefault();
      if ($("#post-product-name").val().length>0 && $("#post-product-price").val().length>0 && $("#post-product-image").val().length>0)
      {
        postForm();
      }
      else{
        alert("cannot post empty form!");
      }
    })
    //search function
   $("#searchQueryInput").on("input",(e)=>{ 
      var productList = document.getElementsByClassName("product")
      for(let i = 0; i<productList.length;i++){
        let name = ($(".update")[i].dataset.name).toLowerCase()
          if(!name.includes(e.target.value.toLowerCase())){
            productList[i].style.display = "none";
          }
          else{
            productList[i].style.display = "block"
          }
      }
    })
    //hiding of the container upon clicking on the x button
   $(".cancel").on("click",()=>{
    $("#update-product-container").hide();
  })

  //adding of the items to cart
  $("#product-list").on("click",".product-buy",(e)=>{
    let buttons =  $(".product-buy")
    for (let i = 0;i<buttons.length;i++){
      if(buttons[i] == e.target){
        if (localStorage.getItem($(".update")[i].dataset.name) === null){
          let json = {
            "quantity": 1,
            "price": parseFloat($(".update")[i].dataset.price),
            "url": $(".update")[i].dataset.image
          }
          localStorage.setItem($(".update")[i].dataset.name, JSON.stringify(json))
          $("#cart").attr("active","true"); //set animation
          $("#cartHolder").attr("active","true")
          setTimeout(()=>{
            $("#cart").attr("active","false");
            $("#cartHolder").attr("active","false")

          },500)
        }
        else{
          alert("Item has already been added to the cart")
        }
      }
    }})

    //update functiom
    $("#product-list").on("click", ".update", function(e) {
        e.preventDefault();
        $("#add-update-msg").hide();
        //update our update form values
        let name = $(this).data("name");
        let price = $(this).data("price");
        let image = $(this).data("image");
        let productId = $(this).data("id");
        
        $("#update-product-name").val(name);
        $("#update-product-price").val(price);
        $("#update-product-image").val(image);
        $("#update-product-id").val(productId);

        $("#update-product-container").show();
    
      });//end product-list listener for update function

      
      
      
      $("#update-product-submit").on("click",function(e) {
        e.preventDefault();
        //retrieve all my update form values
        let name = $("#update-product-name").val();
        let price = $("#update-product-price").val();
        let image = $("#update-product-image").val();
        let id = $("#update-product-id").val();
    
        updateForm(id, name, price, image);
    });//end updatecontactform listener

    //delete function
    $("#product-list").on("click", ".delete", function(e) {
      e.preventDefault();
      let contactId = $(this).data("id");
      if (confirm("Are you sure you want to delete this contact?")) {
        deleteContact(contactId);
        GetStoreItems();
      }
    })
});
//getting the product items from the database
async function GetStoreItems(){
        
    let get = {
        "async": true,
        "crossDomain": true,
        "url": "https://databaseid-63ae.restdb.io/rest/store",
        "url": "https://idasg-332a.restdb.io/rest/store", 
        "method": "GET", 
        "headers": {
          "content-type": "json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "beforeSend":()=>{
          $("#product-list").html(` <div class="animationHolder">
          <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_usmfx6bp.json" class="animation" background="transparent"  speed="1"  loop  autoplay></lottie-player>
        </div>`)
        },
        "processData": false,      
      }

    await $.ajax(get).done(async (response)=>{
        let content = "";
        for (var i = 0; i < response.length; i++){
          originalPrice = parseFloat(response[i].price).toFixed(2)
          if (discount){
            response[i].price = parseFloat(response[i].price)*0.7 
          }
          response[i].price = parseFloat(response[i].price).toFixed(2);
        content = `${content}<div class="product">
        <div class="product-dropshadow"></div>
        <div class="product-backdrop product-backdrop_purple"></div>
        <div class="product-img" style = "width: 90%;
        margin: 0 auto;
        margin-bottom:1%;
        height:200px;
        border-radius: 5px;
        background: #ccc;
        z-index: 10;
        overflow: hidden;
        background: url(${response[i].image}) center no-repeat;
        background-size: contain;">
        </div>
        <div class="discountShow">
          <h5>30%</h5>
        </div>
        <div class="product-buy">
          <i class="fa fa-shopping-cart"></i>
        </div>
        <div class="product-content">
            <div class="product-content-title">
                <h4>${response[i].name}</h4>
            </div>
            <div class="product-content-cost">
            <h5 class="discount">$${originalPrice}</h5>
                <h5>$${response[i].price}</h5>
            </div>
        </div>

        <div class="admin-controls">
        <a href="#" class='update' data-id='${response[i]._id}' data-name='${response[i].name}' data-price='${response[i].price}' data-image='${response[i].image}'>UPDATE</a>
        <a href="#" class="delete" data-id='${response[i]._id}' >DELETE</a>
        </div>
        </div>`
        
        }
        
        $("#product-list").html(content); //update product list
       })
       adminCheck(); //check if users are admins
      if (!discount){ //check if users are eligible for discounts
        $(".discount").hide();
        $(".discountShow").hide();
      }
    
}









function updateForm(id, name, price, image) {
    //@TODO create validation methods for id etc. 

    var jsondata = { "name": name, "price": price, "image": image };
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://databaseid-63ae.restdb.io/rest/store/${id}`,//update based on the ID
      "url": `https://idasg-332a.restdb.io/rest/store/${id}`,
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata)
    }

    //[STEP 13a]: send our AJAX request and hide the update contact form
    $.ajax(settings).done(function(response) {
      $("#add-update-msg").show();
      $("#update-product-container").fadeOut(2000);
      //update our contacts table
      GetStoreItems();
    });
  }//end updateform function

function deleteContact(id) {

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://databaseid-63ae.restdb.io/rest/store/${id}`,
      "url": `https://idasg-332a.restdb.io/rest/store/${id}`,
      "method": "DELETE",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false
    }

    //[STEP 13a]: send our AJAX request and hide the update contact form
    $.ajax(settings).done(function(response) {
        GetStoreItems();
    });


    
  }
function postForm(){

  let jsondata = {
    "name":$("#post-product-name").val(),
    "price": parseFloat($("#post-product-price").val()),
    "image":$("#post-product-image").val()
  }

  var post = {
    "async": true,
    "crossDomain": true,
    "url": `https://databaseid-63ae.restdb.io/rest/store`,//update based on the ID
    "url": `https://idasg-332a.restdb.io/rest/store`,
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    },
    "error":function(){
      alert("error in inputs")
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
  }
  $.ajax(post).done(()=>{
    $("#add-post-msg").show();
    $("#post-product-container").fadeOut(2000);
    GetStoreItems();

  })

}

function adminCheck(){
  let person = localStorage.getItem("person")
  if (person!=null){
    person = JSON.parse(person)
    if(person.admin == true){
      $(".admin-controls").show()
      $("#add").show()
    }
    else{
      $(".admin-controls").hide()
      $("#add").hide()
    }
  }
  else{
    $(".admin-controls").hide()
    $("#add").hide()
  }

}
function clearCart(){
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