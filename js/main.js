let ocIcon = document.querySelector("#open-close");
let loadingScreen = document.querySelector(".loading-screen");
let z = 0;
let cartona = ``
let recipes = "";
let tags = ""
let response;
let btn;
let arrTags = [];

ocIcon.addEventListener("click", function () {
    if (ocIcon.classList.contains("fa-align-justify")) {
        $("nav").animate({ left: 0 }, 400)

        ocIcon.classList.replace("fa-align-justify", "fa-x")

        for (let i = 0; i < 5; i++) {
            $(".side-bar-menu ul li").eq(i).animate({ top: 0 }, (i + 5) * 100)
        }
    } else if (ocIcon.classList.contains("fa-x")) {
        $("nav").animate({ left: -263.75 }, 400)

        ocIcon.classList.replace("fa-x", "fa-align-justify")

        for (let i = 4; i >= 0; i--) {


            $(".side-bar-menu ul li").eq(i).animate({ top: "300px" }, (z + 5) * 50)
            z++;
        }
    }
})

startPage()
async function startPage() {
    loadingScreen.classList.remove("d-none");
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    response = await response.json()

    getMeals(response.meals);

}

function getMeals(meal) {
      document.getElementById("mealDetails").innerHTML = "";
    document.querySelector("#searchPart").innerHTML = "";
    cartona = "";
    for (let i = 0; meal.length > i; i++) {
        cartona += `
<div onclick="getMealDetails(${meal[i].idMeal})" class="cursor-pointer meals col-12 col-sm-6 col-md-4 col-lg-3 g-4">
<div class=" position-relative overflow-hidden">
    <img src="${meal[i].strMealThumb}" class="w-100" alt="${meal[i].strMealThumb}">
    <div class="meal-layer position-absolute p-2">
        <h3>${meal[i].strMeal}</h3>
    </div>

        </div>
        </div>`;
    }
    document.querySelector("#content").innerHTML = cartona;
    loadingScreen.classList.add("d-none");
}





//          *****search***** 

function search() {
    loadingScreen.classList.remove("d-none");
  document.getElementById("mealDetails").innerHTML = "";

    document.querySelector("#searchPart").innerHTML = `
        
    <div class="row p-5 " >
    <div class="mb-md-0 mb-5 col-md-6 col-12">
    <input onkeyup="searchByName(this.value)" type="text" class="form-control ms-3 bg-transparent text-white" placeholder="Search By Name">
    </div>
    <div class="col-md-6 col-12">
    <input onkeyup="searchByLetter(this.value)" maxlength="1" type="text" class="form-control ms-3 bg-transparent text-white" placeholder="Search By first Letter">
    </div>
    </div>`;
    document.querySelector("#content").innerHTML = "";
    loadingScreen.classList.add("d-none");

}

async function searchByName(input) {
    loadingScreen.classList.remove("d-none");
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    response = await response.json()
    response.meals ? searchMeals(response.meals) : searchMeals([])
}

async function searchByLetter(input) {
    input == "" ? input = "a" : "";
    loadingScreen.classList.remove("d-none");
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`)
    response = await response.json()
    response.meals ? searchMeals(response.meals) : searchMeals([])
}



function searchMeals(meal) {
    cartona = "";
    for (let i = 0; meal.length > i; i++) {
        cartona += `
    <div onclick="getMealDetails(${meal[i].idMeal})" class="cursor-pointer meals col-12 col-sm-6 col-md-4 col-lg-3 g-4">
    <div class=" position-relative overflow-hidden">
        <img src="${meal[i].strMealThumb}" class="w-100" alt="${meal[i].strMealThumb}">
        <div class="meal-layer position-absolute p-2">
            <h3>${meal[i].strMeal}</h3>
        </div>
    
            </div>
            </div>`;
    }
    document.querySelector("#content").innerHTML = cartona;
    loadingScreen.classList.add("d-none");
}


//          *****Categories***** 

async function getCategories() {
    loadingScreen.classList.remove("d-none");
    response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    response = await response.json()
    categories(response.categories);
}

function categories(category) {
      document.getElementById("mealDetails").innerHTML = "";
    document.querySelector("#searchPart").innerHTML = "";

    cartona = "";
    for (let i = 0; category.length > i; i++) {
        cartona += `
            <div onclick="getCategoryMeals('${category[i].strCategory}')" class="meals col-12 col-sm-6 col-md-4 col-lg-3 g-4 cursor-pointer">
<div  class=" position-relative overflow-hidden">
    <img src="${category[i].strCategoryThumb}" class="w-100" alt="${category[i].strCategoryThumb}">
    <div class="category-layer position-absolute p-2 text-center">
        <h3>${category[i].strCategory}</h3>
        <p>${category[i].strCategoryDescription}</p>
    </div>
</div>

        </div>`;
        document.querySelector("#content").innerHTML = cartona;
        loadingScreen.classList.add("d-none");

    }

}

async function getCategoryMeals(meal) {
    loadingScreen.classList.remove("d-none");
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`)
    response = await response.json()
    console.log(response);
    categoryMeals(response.meals)
}

function categoryMeals(meal) {
    cartona = ""
      document.getElementById("mealDetails").innerHTML = "";
    document.querySelector("#searchPart").innerHTML = "";

    for (let i = 0; i < meal.length; i++) {
        cartona += `
<div onclick="getMealDetails(${meal[i].idMeal})" class="cursor-pointer meals col-12 col-sm-6 col-md-4 col-lg-3 g-4">
<div class=" position-relative overflow-hidden">
    <img src="${meal[i].strMealThumb}" class="w-100" alt="${meal[i].strMealThumb}">
    <div class="meal-layer position-absolute p-2">
        <h3>${meal[i].strMeal}</h3>
    </div>
        </div>
        </div>`;
    }
    document.querySelector("#content").innerHTML = cartona;
    loadingScreen.classList.add("d-none");
}





//          *****Areas***** 

async function getArea() {
    loadingScreen.classList.remove("d-none");
    response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    response = await response.json()
    areas(response.meals)

}

function areas(area) {
      document.getElementById("mealDetails").innerHTML = "";
    document.querySelector("#searchPart").innerHTML = "";
    cartona = "";
    for (let i = 0; i < area.length; i++) {
        cartona += `
            <div onclick="getAreaMeals('${area[i].strArea}')" class="meals col-12 col-sm-6 col-md-4 col-lg-3 g-4">
<div  class="cursor-pointer position-relative overflow-hidden text-white text-center">
<i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${area[i].strArea}</h3>
        </div>

    </div>
`;
    }
    document.querySelector("#content").innerHTML = cartona;
    loadingScreen.classList.add("d-none");
}

async function getAreaMeals(area) {
    loadingScreen.classList.remove("d-none");
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    console.log(response.meals);
    areaMeals(response.meals)
}

function areaMeals(meal) {
      document.getElementById("mealDetails").innerHTML = "";
    document.querySelector("#searchPart").innerHTML = "";
    cartona = "";
    for (let i = 0; i < meal.length; i++) {
        cartona += `
<div onclick="getMealDetails(${meal[i].idMeal})" class="cursor-pointer meals col-12 col-sm-6 col-md-4 col-lg-3 g-4">
<div class=" position-relative overflow-hidden">
    <img src="${meal[i].strMealThumb}" class="w-100" alt="${meal[i].strMealThumb}">
    <div class="meal-layer position-absolute p-2">
        <h3>${meal[i].strMeal}</h3>
    </div>
        </div>
        </div>
`;
    }
    document.querySelector("#content").innerHTML = cartona;
    loadingScreen.classList.add("d-none");
}





//          *****Ingredients***** 

async function getIngredients() {
    loadingScreen.classList.remove("d-none");
    response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    response = await response.json()
    ingredients(response.meals.slice(0, 20));
}

function ingredients(ingredient) {
      document.getElementById("mealDetails").innerHTML = "";
    document.querySelector("#searchPart").innerHTML = "";
    cartona = ""
    for (let i = 0; i < ingredient.length; i++) {
        cartona += `
                <div onclick="getIngredientMeals('${ingredient[i].strIngredient}')" class="meals col-12 col-sm-6 col-md-4 col-lg-3 g-4">
    <div class=" cursor-pointer position-relative overflow-hidden text-white text-center">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${ingredient[i].strIngredient}</h3>
        <p>${ingredient[i].strDescription.split(" ").slice(0, 21).join(" ")}</p>
        

    </div>

        </div>`

        document.querySelector("#content").innerHTML = cartona;
        loadingScreen.classList.add("d-none");
    }
}

async function getIngredientMeals(meal) {
    loadingScreen.classList.remove("d-none");
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)
    response = await response.json()
    ingredientMeals(response.meals);
}


function ingredientMeals(meal) {
      document.getElementById("mealDetails").innerHTML = "";
    document.querySelector("#searchPart").innerHTML = "";
    cartona = ""
    for (let i = 0; i < meal.length; i++) {
        cartona += `
    <div onclick="getMealDetails(${meal[i].idMeal})" class="cursor-pointer meals col-12 col-sm-6 col-md-4 col-lg-3 g-4">
    <div class=" position-relative overflow-hidden">
        <img src="${meal[i].strMealThumb}" class="w-100" alt="${meal[i].strMealThumb}">
        <div class="meal-layer position-absolute p-2">
            <h3>${meal[i].strMeal}</h3>
        </div>
            </div>
            </div>
               `;

               document.querySelector("#content").innerHTML = cartona;
               loadingScreen.classList.add("d-none");
    }
}





//          *****ContactUs***** 

function contactUs() {
    loadingScreen.classList.remove("d-none");
  document.getElementById("mealDetails").innerHTML = "";
    document.querySelector("#searchPart").innerHTML = "";
    cartona = `
    <div class="d-flex justify-Content-center align-items-center text-center flex-column">
    <div class="row">

    <div class="col-sm-6 col-12 g-3 text-center">
    <input onkeyup="AllInputs()" type="text" class="form-control" id="name" name="name" placeholder="Enter Your Name">
    <div id="namealert" class="bg-danger-subtle text-center my-2 p-3 rounded-3 d-none ">Special characters and numbers not allowed</div>
    </div>

    <div class="col-sm-6 col-12 g-3">
    <input onkeyup="AllInputs()" type="email" class="form-control" id="email" name="email" placeholder="Enter Your Email">
    <div id="emailalert" class="bg-danger-subtle text-center my-2 p-3 rounded-3 d-none">Email not valid *exemple@yyy.zzz</div>
</div>

    <div class="col-sm-6 col-12 g-3">
    <input onkeyup="AllInputs()" type="tel" class="form-control" id="phone" name="phone" placeholder="Enter Your Phone">
    <div id="phonealert" class="bg-danger-subtle text-center my-2 p-3 rounded-3 d-none">Enter valid Phone Number</div>
    </div>

    <div class="col-sm-6 col-12 g-3">
    <input onkeyup="AllInputs()" type="number" min="10" max="100" class="form-control" id="age" name="age" placeholder="Enter Your Age">
    <div id="agealert" class="bg-danger-subtle text-center my-2 p-3 rounded-3 d-none">Enter valid age</div>
    </div>

    <div class="col-sm-6 col-12 g-3">
    <input onkeyup="AllInputs()" type="password" class="form-control" id="password" name="password" placeholder="Enter Your Password">
    <div id="passwordalert" class="bg-danger-subtle text-center my-2 p-3 rounded-3 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
    </div>

    <div class="col-sm-6 col-12 g-3">
    <input onkeyup="AllInputs()" type="password" class="form-control" id="repassword" name="repassword" placeholder="Repassword"    >
    <div id="repasswordalert" class="bg-danger-subtle text-center my-2 p-3 rounded-3 d-none">Enter valid repassword</div>
    </div>

    </div>
    <div><button id="btn" class=" my-5 btn text-danger border-danger bg-transparent" disabled>Submit</button>
    </div>
    </div>`

    document.querySelector("#content").innerHTML = cartona;
    loadingScreen.classList.add("d-none");

    btn = document.getElementById("btn");
}

function AllInputs() {
    if (namevalidation() &&
        emailvalidation() &&
        phonevalidation() &&
        agevalidation() &&
        passwordvalidation() &&
        rePasswordvalidation()
    ) {
        btn.removeAttribute("disabled")
    } else {
        btn.setAttribute("disabled", true)
    }
}



function namevalidation() {
    if (/^[a-zA-Z]+$/gm.test(document.getElementById("name").value)) {
        document.getElementById("namealert").classList.add("d-none")
        return /^[a-zA-Z]+$/gm.test(document.getElementById("name").value)
    } else {
        document.getElementById("namealert").classList.remove("d-none")
    }
}


function emailvalidation() {
    if (/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/gm.test(document.getElementById("email").value)) {
        document.getElementById("emailalert").classList.add("d-none")
        return /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/gm.test(document.getElementById("email").value)
    } else {
        document.getElementById("emailalert").classList.remove("d-none")
    }
}


function phonevalidation() {
    if (/^01[0125][0-9]{8}$/gm.test(document.getElementById("phone").value)) {
        document.getElementById("phonealert").classList.add("d-none")
        return /^01[0125][0-9]{8}$/gm.test(document.getElementById("phone").value)
    } else {
        document.getElementById("phonealert").classList.remove("d-none")
    }
}


function agevalidation() {
    if (/^[1][0-9]|[1-9][0-9]|[100]$/gm.test(document.getElementById("age").value)) {
        document.getElementById("agealert").classList.add("d-none")
        return /^[1][0-9]|[1-9][0-9]|[100]$/gm.test(document.getElementById("age").value)
    } else {
        document.getElementById("agealert").classList.remove("d-none")
    }
}


function passwordvalidation() {
    if (/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/gm.test(document.getElementById("password").value)) {
        document.getElementById("passwordalert").classList.add("d-none")
        return /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/gm.test(document.getElementById("password").value)
    } else {
        document.getElementById("passwordalert").classList.remove("d-none")
    }

}


function rePasswordvalidation() {
    if (document.getElementById("password").value == document.getElementById("repassword").value) {
        document.getElementById("repasswordalert").classList.add("d-none")
        return document.getElementById("password").value == document.getElementById("repassword").value
    } else {
        document.getElementById("repasswordalert").classList.remove("d-none")
    }

}


//          *****mealDetails***** 
async function getMealDetails(id) {
    loadingScreen.classList.remove("d-none");
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)

    response = await response.json()
    mealDetails(response.meals[0])
}

function mealDetails(details) {
    recipes = "";
    tags = ""

    for (let i = 0; i <= 20; i++) {
        if (details[`strIngredient${i}`] && details[`strMeasure${i}`])
            recipes += `
<li class="p-2">${details[`strMeasure${i}`]} ${
              details[`strIngredient${i}`]
            }</li>
`;
    }
    if (details.strTags) {
        arrTags = details.strTags.split(",");
    } else {
        arrTags = ["No Tags to mention"]
    }

    for (let i = 0; i < arrTags.length; i++) {
        tags += `
<li class="p-2">${arrTags[i]}</li>
`
    }

    cartona += `
    <div class="DetailsPage ps-5">
    <div class="row mb-5 mx-auto container">
                <div class="col-12 my-5 text-end text-white">
                    <i onclick="closeTab()" class="fa fa-xmark fs-1"></i>
                </div>
                <div class="col-lg-4 col-12 text-white text-center">
    <img class="w-100 rounded-2" src="${details.strMealThumb}" alt="${details.strMealThumb}">
    <h2 class="my-3">${details.strMeal}</h2>
</div>
<div class="col-lg-8 detailMeal col-12 text-white">
    <h2>Instructions</h2>
    <p>${details.strInstructions}</p>
    <h3>Area : ${details.strArea}</h3>
    <h3>Category : ${details.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="d-flex flex-wrap list-unstyled text-black recipes">
${recipes}
    </ul>
    <h3>Tags :</h3>
    <ul class="d-flex flex-wrap list-unstyled text-black tags">
    ${tags}
    </ul>
    <a target="_blank" class="btn bg-success text-white" href="${details.strSource}">Source</a>
    <a target="_blank" class="btn bg-danger text-white" href="${details.strYoutube}">Youtube</a>
            </div>
            </div>
    `;

    document.querySelector("#mealDetails").innerHTML = cartona;
    loadingScreen.classList.add("d-none");
}

function closeTab() {
    cartona="";
  document.getElementById("mealDetails").innerHTML = "";
}
