// const APIKEY = "63dbf5963bc6b255ed0c459e";

$(document).ready(function(){
 
    $("#update-product-container").hide();
    $("#add-update-msg").hide();
    GetStoreItems();
    

    $("#product-list").on("click", ".update", function(e) {
        e.preventDefault();
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
        <div class="product-img">
        <img src="${response[i].image}">
        </div>
        <div class="product-buy">
            <h5>ADD TO CART</h5>
        </div>
        <div class="product-content">
            <div class="product-content-title">
                <h4>${response[i].name}</h4>
            </div>
            <div class="product-content-cost">
                <h5>${response[i].price}</h5>
            </div>
        </div>

        <div class="admmin-controls">
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