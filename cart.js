$(document).ready(()=>{
    $("#checkOut").hide();
    getCart();
    $("#startCheck").on("click",()=>{
        $("#checkOut").show()
        let price = checkTotal()
        $(".totalProduct").html(price)
        $(".checkTotal") .html("$" + String(price+4));
    })

    $(".cancel").on("click",()=>{
        $("#checkOut").hide()
    })
    $(".remove").on("click",(e)=>{
        $(".remove").attr("disabled",false)
        e.preventDefault();
        let id = e.target.dataset.id
        localStorage.removeItem(id)
        e.target.parentNode.parentNode.parentNode.remove()
        getTotal();
        setQuantity();
    })
    $(".productQuantity").on("input",(e)=>{
        let id = e.target.dataset.id
        let product = JSON.parse(localStorage.getItem(id))
        let amount =  e.target.value
        console.log(amount)
        if (amount =='' || amount <0){
            product.quantity = 0;
            e.target.value = 0;
        }
        else{
            product.quantity = amount 
        }
        localStorage.setItem(id,JSON.stringify(product))
        let price = document.getElementsByClassName("price")
        for(let i = 0;i<price.length;i++){
            if(e.target == $(".productQuantity")[i]){
                price[i].innerHTML = `$ ${parseFloat(product.price)* product.quantity}`
            }
        }
         getTotal();
    })
    $(".plus").on("click",(e)=>{
        let id = e.target.dataset.id
        let product = JSON.parse(localStorage.getItem(id))
        let amount = parseInt(e.target.parentNode.querySelector('input[type=number]').value)
        amount+=1
        e.target.parentNode.querySelector('input[type=number]').value = amount
        product.quantity = amount 
        localStorage.setItem(id,JSON.stringify(product))
        let price = document.getElementsByClassName("price")
        for(let i = 0;i<price.length;i++){
            if(e.target == $(".plus")[i]){
                price[i].innerHTML = `$ ${parseFloat(product.price)* product.quantity}`
            }
        }
         getTotal();
    })
    $(".minus").on("click",(e)=>{
        
        let id = e.target.dataset.id
        let product = JSON.parse(localStorage.getItem(id))
        let amount = parseInt(e.target.parentNode.querySelector('input[type=number]').value)
        if (amount != 0 ){
            amount-=1
            e.target.parentNode.querySelector('input[type=number]').value = amount
            product.quantity = amount 
            localStorage.setItem(id,JSON.stringify(product))
            let price = document.getElementsByClassName("price")
            for(let i = 0;i<price.length;i++){
                if(e.target == $(".minus")[i]){
                    price[i].innerHTML = `$ ${parseFloat(product.price)* product.quantity}`
                }
            }
            getTotal()
        }
        
    })
})



function getCart(){
    var content = ""
for (var i = 0; i < localStorage.length; i++){
    key = localStorage.key(i)
    if (key!="person"){
       let product = JSON.parse(localStorage.getItem(key))
       console.log(product.url)
       content = `${content}
       <div class = "product">
       <hr class="my-4">
       <div class="row mb-4 d-flex justify-content-between align-items-center" data-id = '${key}' data-quantity = "${product.quantity}">
       <div class="col-md-2 col-lg-2 col-xl-2">
         <img
           src="${product.url}"
           class="img-fluid rounded-3" alt="Image not found">
       </div>
       <div class="col-md-3 col-lg-3 col-xl-3">
         <h6 class="text-black mb-0">${key}</h6>
       </div>
       <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
         <button class="btn btn-link px-2 minus" data-id = "${key}">
           <p>&#8722</p>
         </button>

         <input id="form1" min="0" name="quantity" value= ${product.quantity} type="number" data-id = '${key}'
           class="form-control form-control-sm productQuantity" />

         <button class="btn btn-link px-2 plus" data-id='${key}'>
           <p>&#43</p>
         </button>
       </div>
       <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
         <h6 class="mb-0 price">$ ${parseFloat(product.price)* product.quantity}</h6>
       </div>
       <div class="col-md-1 col-lg-1 col-xl-1 text-end">
         <a href="#" data-id = "${key}" class="remove">x</a>
       </div>
     </div>
    <div> `
    }
    $("#cartWrap").html(content)
    setQuantity();
    getTotal();

}

}
function getTotal(){
    var total = 0
    for (var i = 0; i < localStorage.length; i++){
        key = localStorage.key(i)
        if (key!="person" && key !="top"){
           let product = JSON.parse(localStorage.getItem(key))
           quantity = product
            total += product.quantity *product.price
        }
    }
    $("#totalPrice").html(`$${total}`)
}

function setQuantity(){
    let index = localStorage.length;
    let number = 0;
    for(let i =0; i<index;i++){
        if(localStorage.key(i)!="person" && localStorage.key(i) !="top"){
            number+=1
        }
    }
    $("#numItems").html(number +" Cart Items")

}
function checkTotal(){
    var total = 0
    for (var i = 0; i < localStorage.length; i++){
        key = localStorage.key(i)
        if (key!="person" && key !="top"){
           let product = JSON.parse(localStorage.getItem(key))
           quantity = product
            total += product.quantity *product.price
        }
    }
    return total
}