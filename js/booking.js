
// Form
const createAccount = document.getElementById("CreateAccount");
// Input
 var currentProductId;
 var getName = document.getElementById("nameProduct");
 var getPrice = document.getElementById("priceProduct");
 var getCategory = document.getElementById("catProduct");
 var getDescription = document.getElementById("descProduct");

 var allStored;
 if ( localStorage.getItem("allProductLocalStorage") != null) {
    allStored = JSON.parse(localStorage.getItem("allProductLocalStorage"));
    displayProducts();
 }
   else {
   allStored = [];
   console.log("Not Found..!")
   }



 function addProduct()
 {
   var nameValue = getName.value;
   var priceValue = getPrice.value;
   var catValue = getCategory.value;
   var descValue = getDescription.value;


    var oneProduct = { Name : nameValue, Price : priceValue, Cat : catValue, Desc : descValue};
    allStored.push(oneProduct);

    // Local Storage
    localStorage.setItem("allProductLocalStorage", JSON.stringify(allStored));
    //Display
    displayProducts();
    // Clear input
    clearField();
 }

 function clearField()
 {
    getName.value = "";
    getPrice.value = "";
    getCategory.value = "";
    getDescription.value = "";
 }

function displayProducts()
{
    var allRow = "";
    for(var i = 0; i < allStored.length; i++)
    {
        allRow += `
        <tr>
            <td> ` + i + `</td>
            <td>`+ allStored[i].Name +`</td>
            <td>`+ allStored[i].Price +`</td>
            <td>`+ allStored[i].Cat +`</td>
            <td>`+ allStored[i].Desc +`</td>
            <td><button onclick="updateProduct(` + i + `)" class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteProduct(` + i + `)" class="btn btn-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById("bodyProduct").innerHTML = allRow;
}
function updateProduct(id)
{
        let addProduct = document.getElementById("addProduct");
        let saveProduct = document.getElementById("saveProduct");
        saveProduct.value = allStored;
        let products = JSON.parse(localStorage.getItem("allProductLocalStorage"));

         currentProductId = id;
         getName.value = products[id].Name;
         getPrice.value = products[id].Price;
         getCategory.value = products[id].Cat;
         getDescription.value = products[id].Desc;
         displayProducts();

        addProduct.style.display="none";
        saveProduct.style.display="block";
}

 function saveProduct()
 {
        let saveProduct = document.getElementById("saveProduct");
        let addProduct = document.getElementById("addProduct");
        let products = JSON.parse( localStorage.getItem("allProductLocalStorage"));

                  products[currentProductId].Name = getName.value;
                  products[currentProductId].Price= getPrice.value;
                  products[currentProductId].Cat= getCategory.value;
                  products[currentProductId].Desc= getDescription.value;

      // Local Storage
          localStorage.setItem("allProductLocalStorage", JSON.stringify(products));
          //Display
          displayProducts();
          // Clear input
          clearField();

      saveProduct.style.display="none";
      addProduct.style.display="block";


 }

function deleteProduct(productID)
{
    allStored.splice(productID , 1);
    displayProducts();
    localStorage.setItem("allProductLocalStorage", JSON.stringify(allStored));
}

function searchProduct( userWord )
{
    var exitProducts = [];

    for (var i = 0; i <allStored.length; i++)
    {
        if (allStored[i].Name.toLowerCase().includes(userWord.toLowerCase() ))
        {
            var newProduct = allStored[i];
            newProduct["searchIndex"] = i;
            exitProducts.push(newProduct);
        }
    }

    var allRow =``;
    for (var i = 0; i < exitProducts.length; i++)
    {
         allRow += `
                <tr>
                <td> ` + exitProducts[i].searchIndex + `</td>
                    <td>`+ exitProducts[i].Name +`</td>
                    <td>`+ exitProducts[i].Price +`</td>
                    <td>`+ exitProducts[i].Cat +`</td>
                    <td>`+ exitProducts[i].Desc +`</td>
                    <td><button onclick="updateProduct(` + exitProducts[i].searchIndex + `)" class="btn btn-warning">update</button></td>
                    <td><button onclick="deleteProduct(` + exitProducts[i].searchIndex + `)" class="btn btn-danger">Delete</button></td>
                </tr>`
    }
    document.getElementById("bodyProduct").innerHTML = allRow;

}