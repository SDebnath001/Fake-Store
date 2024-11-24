//Getting all document variables here!
let ShowProducts = document.getElementById("ProductCards");
let CataList = document.querySelector(".CataList");
let AllCatagories = []; //Storing All Categories in empty array.
let cartItems = []; //Storing cart items in this array.

// All product fetching here!
let AllProducts = async (AllShownCate=[])=> {  // Passing an empty arry "AllshownCate" to collect all categories.
    ShowProducts.innerHTML = "";  //Products field set to epmty to clear the previous data fetched from API.

    let Products = await fetch('https://fakestoreapi.com/products');
    let IncomingData = await Products.json();
    console.log(IncomingData);

    IncomingData.map(value=> {  // Dynamically adding cards of incoming data with map to clear and create which go through each data.

        let LoadCatagories = ()=> {  // Created LoadCatagories function to load all API categories.
            if(!AllCatagories.includes(value.category)) {  //includes() used to check if the category exists or not.
                CataList.innerHTML += `
                            <div class="mb-2">
                                <input type="checkbox" name="Men-Fashion" value="${value.category}" class="form-check-input" onclick="FilterProduct()"> 
                                <span class="cataName ps-2">${value.category}</span>
                            </div>
                        `;
                AllCatagories.push(value.category); //Push() used to push the missing category into the arry "AllCatagories".
            }
        }
        LoadCatagories();
        
        /* Explanation:
            If there is nothing in the array AllShownCate then it will get the data from "AllCatagories" this array. 
            which is 'AllShownCate = AllCatagories'. so that next if AllShownCate array includes any category it will show all products.
            Because AllShownCate = AllCatagories which has the API categories stored in array.
        */ 

        if(AllShownCate.length == 0){   
            AllShownCate = AllCatagories;
        };
        
        if(AllShownCate.includes(value.category)) {
            ShowProducts.innerHTML += `
            <div class="card mb-4">
            <div class="card-header text-center">
                <img src="${value.image}" alt="" class="card-img-top">
                <div class="card-title">
                    <div class="fs-3 text-primary">${value.title}</div>
                </div>
            </div>
            <div class="card-body">
                <b class="fs-5">Description :</b>
                <div class="text-secondary">${value.description}</div> 
            </div>
            <div class="card-footer">
                <div class="d-flex justify-content-between">
                    <div>
                        <b class="fs-5">Price</b> : <b class="text-success fs-4">&#8377; ${value.price}</b>
                    </div>
                    <div>
                        <button class="btn btn-warning px-4" onclick="addCart(${value.id}, '${value.title}', ${value.price}, '${value.image.replace(/'/g, "\\'")}')">Add to Cart</button>
                    </div>
                </div>
            </div>
            </div>
        ` 
        }
        
    })
}
AllProducts()

// Filtering Categories
/*
Explanation:
    Here accessing checkbox inputs is checkBox. then storing the value of checked checkbox in FilteredData array.
    So the logic is accessing the checkbox and checking each element if it is checked of not, if element is checked then 
    the logic is pushing the checkbox value in the 'FilteredData' array. Which is the same data coming from API.
    Then passing the array with only checked value or category to the main funcion to render products which is AllProducts().
*/
function FilterProduct () {
    let CheckBox = document.querySelectorAll("input[type='checkbox']");
    let FilteredData = []; // 
    CheckBox.forEach((element)=> {
        if(element.checked){
            FilteredData.push(element.value);
        }
        AllProducts(FilteredData)
    })
};
// Adding Products to cart
//Explaination:

function addCart(id, title, price, image) {
    alert('Added to cart')
    const cartItemNo = cartItems.findIndex(item => item.id === id);
    if (!cartItemNo == -1) {
        cartItems[cartItemNo].quantity++;
    } else {
        cartItems.push({id, title, price, image, quantity: 1});
    }
    updateCart();
};

//Updating Cart
function updateCart() {
    const cartItemHolder = document.getElementById("cartItemHolder");
    const cartTotal = document.getElementById("cartTotal");

    cartItemHolder.innerHTML = "";
    let TotalCost = 0;
    
    cartItems.forEach(item =>{
        TotalCost += item.price * item.quantity;
        cartItemHolder.innerHTML +=`
                        <div class="card">
                            <div class="card-header text-center">
                                <img src="${item.image}" alt="${item.image}" width="60px" height="80px" class="image-fluid">
                            </div>
                            <div class="card-body">
                                <h4> ${item.title} x(${item.quantity}) </h4>
                            </div>
                            <div class="card-footer">
                                <div class="price">
                                    <b>Price:</b> ${item.price}
                                </div>
                            </div>
                        </div>
        `;

        cartTotal.innerHTML = `
            <b>Total Price:</b> <span class="text-success">${TotalCost}</span>
        `; 
    })
};