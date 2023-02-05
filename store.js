 const APIKEY = "63dbf5963bc6b255ed0c459e";

$(document).ready(function(){
  adminCheck();
  const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar-menu');
    
    menu.addEventListener('click', function(){
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });
    $("#update-product-container").hide();
    $("#post-product-container").hide();
    //GetStoreItems();

    $(".postCancel").on("click",()=>{
      $("#post-product-container").hide();
    })
    
    $("#add").on("click",()=>{
      $("#add-post-msg").hide();
      $("#post-product-container").show();
    })

    $("#post-product-submit").on("click",(e)=>{
      e.preventDefault();
      postForm();
    })

   $("#searchQueryInput").on("input",(e)=>{ //search function
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

    window.addEventListener("scroll", function(){
      var nav = document.querySelector("nav");
      nav.classList.toggle("sticky", window.scrollY > 0);
  })



   $(".cancel").on("click",()=>{
    $("#update-product-container").hide();
  })

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
          setTimeout(()=>{
            $("#cart").attr("active","false");

          },500)
        }
        else{
          alert("Item has already been added to the cart")
        }

        
      }
    }})
    $("#product-list").on("click", ".update", function(e) {
        e.preventDefault();
        $("#add-update-msg").hide();
        //update our update form values
        let name = $(this).data("name");
        let price = $(this).data("price");
        let image = $(this).data("image");
        let productId = $(this).data("id");

        console.log("id:" + productId + ", name: " + name + ", price="+price + ", image=" + image);
    
        //[STEP 11]: Load in our data from the selected row and add it to our update contact form 
        
        $("#update-product-name").val(name);
        $("#update-product-price").val(price);
        $("#update-product-image").val(image);
        $("#update-product-id").val(productId);

        $("#update-product-container").show();
    
      });//end product-list listener for update function

      
      
      
      $("#update-product-submit").on("click", function(e) {
        e.preventDefault();
        //retrieve all my update form values
        let name = $("#update-product-name").val();
        let price = $("#update-product-price").val();
        let image = $("#update-product-image").val();
        let id = $("#update-product-id").val();
    
        //[STEP 12a]: We call our update form function which makes an AJAX call to our RESTDB to update the selected information
        updateForm(id, name, price, image);

        $("#product-list").on("click", ".delete", function(e) {
            e.preventDefault();
        
            let contactId = $(this).data("id");
            if (confirm("Are you sure you want to delete this contact?")) {
              deleteContact(contactId);
            }
          })
      });//end updatecontactform listener
});

function GetStoreItems(){
        
        
    let get = {
        "async": true,
        "crossDomain": true,
        // "url": "https://databaseid-63ae.restdb.io/rest/store",
        "url": "https://idasg-332a.restdb.io/rest/store", 
        "method": "GET", 
        "headers": {
          "content-type": "json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,      
      }
      $.ajax(get).done((response)=>{
        let content = "";
        console.log(response)
        for (var i = 0; i < response.length; i++){
          
        
        content = `${content}<div class="product">
        <div class="product-dropshadow"></div>
        <div class="product-backdrop product-backdrop_purple"></div>
        <div class="product-img" style = "width: 90%;
        margin: 15px auto;
        border-radius: 5px;
        background: #ccc;
        z-index: 10;
        overflow: hidden;
        background: url(${response[i].image}) center no-repeat;
        background-size: contain;">
        </div>
        <div class="product-buy">
          <i class="fa fa-shopping-cart"></i>
        </div>
        <div class="product-content">
            <div class="product-content-title">
                <h4>${response[i].name}</h4>
            </div>
            <div class="product-content-cost">
                <h5>$${response[i].price}</h5>
            </div>
        </div>

        <div class="admin-controls">
        <a href="#" class='update' data-id='${response[i]._id}' data-name='${response[i].name}' data-price='${response[i].price}' data-image='${response[i].image}'>UPDATE</a>
        <a href="#" class="delete">DELETE</a>
        </div>
        </div>`
        
        }
        

        $("#product-list").html(content);

       })
    









}









function updateForm(id, name, price, image) {
    //@TODO create validation methods for id etc. 

    var jsondata = { "name": name, "price": price, "image": image };
    var settings = {
      "async": true,
      "crossDomain": true,
    //   "url": `https://databaseid-63ae.restdb.io/rest/store/${id}`,//update based on the ID
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
      console.log(response);

      $("#update-product-container").fadeOut(5000);
      //update our contacts table
      GetStoreItems();
    });
  }//end updateform function

function deleteContact(id) {

    var settings = {
      "async": true,
      "crossDomain": true,
    //   "url": `https://databaseid-63ae.restdb.io/rest/store/${id}`,
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
  console.log(jsondata)

  var post = {
    "async": true,
    "crossDomain": true,
  //   "url": `https://databaseid-63ae.restdb.io/rest/store/${id}`,//update based on the ID
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
    GetStoreItems();

  })

}

function adminCheck(){
  var person = localStorage.getItem("person")
  if (person!=null){
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