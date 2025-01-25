var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productImage = document.getElementById('productImage');
var productCategory = document.getElementById('productCategory');
var productSale = document.getElementById('productSale');
var productDescription = document.getElementById('productDescription');
var addBtn = document.getElementById('addBtn');
var editBtn = document.getElementById('editBtn');

var searchValue = document.getElementById('searchValue');
var myData = document.getElementById('myData');
var productsList;

console.log(productImage.files);

if (JSON.parse(localStorage.getItem('product')) == null) {
	productsList = [];
} else {
	productsList = JSON.parse(localStorage.getItem('product'));
	displayProduct(productsList);
}
if (!Array.isArray(productsList)) {
	productsList = [];
}
var myIndex;
var filePath = productImage.value;
var fileName = filePath.split('\\').pop();
function addProduct() {
	var product = {
		name: productName.value,
		price: productPrice.value,
		image: `assets/${fileName}`,
		category: productCategory.value,
		sale: productSale.checked,
		description: productDescription.value
	};

	productsList.push(product);
	localStorage.setItem('product', JSON.stringify(productsList));
	clearInput();
	displayProduct(productsList);
}
function displayProduct(array) {
	var content = '';
	for (let i = 0; i < array.length; i++) {
		content += `<tr>
		<td>${i}</td>
		<td class="w-50"><img src=${array[i].image} class="w-50" alt="" /></td>
		<td>${array[i].name}</td>
		<td>${array[i].price}</td>
		<td>${array[i].category}</td>
		<td>${array[i].sale}</td>
		<td>${array[i].description}</td>

		<td><button onclick="setValueInInput(${i})" class="btn btn-outline-warning">Update</button></td>
		<td><button onclick="deleteProduct(${i})"  class="btn btn-outline-danger">Delete</button></td>
	</tr>`;
	}
	myData.innerHTML = content;
}
function clearInput() {
	productName.value = null;
	productCategory.value = null;
	productDescription.value = null;
	productImage.value = null;
	productPrice.value = null;
}

function deleteProduct(e) {
	productsList.splice(e, 1);
	displayProduct(productsList);
	localStorage.setItem('product', JSON.stringify(productsList));
}

function search() {
	var word = searchValue.value.toLowerCase();
	var searchDisplayArray = [];
	for (let i = 0; i < productsList.length; i++) {
		if (productsList[i].name.toLowerCase().includes(word)) {
			searchDisplayArray.push(productsList[i]);
			displayProduct(searchDisplayArray);
		} else {
			null;
		}
	}
}

function setValueInInput(index) {
	myIndex = index;
	productName.value = productsList[index].name;
	productPrice.value = productsList[index].price;
	productCategory.value = productsList[index].category;
	productSale.checked = productsList[index].sale;
	productDescription.value = productsList[index].description;

	addBtn.classList.add('d-none');
	editBtn.classList.remove('d-none');
	// console.log(index);
}

function updateProduct() {
	productsList[myIndex] = {
		name: productName.value,
		price: productPrice.value,
		category: productCategory.value,
		description: productDescription.value,
		sale: productSale.checked,
		image: `assets/${fileName}`
	};

	displayProduct(productsList);
	clearInput();
	localStorage.setItem('product', JSON.stringify(productsList));
	addBtn.classList.remove('d-none');
	editBtn.classList.add('d-none');
}

function validation(element) {
	var regex = {
		productName: /^[A-Z][a-z]{2,8}$/,
		productPrice: /^[0-9]+(\.[0-9]{1,2})?$/,
		productDescription: /^\b(\w+\b\s?){0,10}$/
	};

	if (regex[element.id].test(element.value)) {
		element.classList.add('is-valid');
		element.classList.remove('is-invalid');
	} else {
		element.classList.add('is-invalid');
		element.classList.remove('is-valid');
	}
}
