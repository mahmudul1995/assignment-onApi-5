const button = document.getElementById('search');
button.addEventListener('click', () => {
    const customeInput = document.getElementById('customeInput');
    const row = document.getElementById('row');


    // Loading item data by api 

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${customeInput.value}`)

    .then(response => response.json())
        .then(data => {
            let html = " ";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="col-md-3" style="margin-top: 20px;" dataid="${meal.idMeal}">
                        <div class=" card text-center "  style="background-color:#F8F7F5;border-radius: 2%; ">
                            <img src="${meal.strMealThumb}" data-id="${meal.idMeal}" class="card-img-top " style="width: 100%; border-top-right-radius: 2%; border-top-left-radius: 2%; ">
                            <div class="card-body " data-id="${meal.idMeal}" style="padding-top: 7px;padding-bottom: 7px; ">
                                <h3 class="card-text text-center " data-id="${meal.idMeal}" style="font-size:17px">${meal.strMeal}</h3>
                            </div>
                        </div>
                    </div>
                        `;
                });
            } else {
                html = "We don't Find Any meal.";
                row.classList.add('not-found');
            }

            row.innerHTML = html;
        })
});




// Loading item details data by api 

row.addEventListener('click', (event) => {
    const idfind = event.target;
    const detailsId = idfind.dataset.id;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsId}`)
        .then(response => response.json())
        .then(data => {
            const details = document.getElementById('details');
            details.style.display = 'block';
            let itemDetails = " ";
            if (data.meals) {
                data.meals.forEach(meal => {

                    itemDetails += `
                    <div class="card mb-3">
                        <button type="button" class="close" aria-label="Close">
                            <span aria-hidden="true" id="close" style="margin-right: 10px;margin-top: 15px;font-size: 40px;">&times;</span>
                          </button>

                          <img class="img-fluid rounded mb-4" src="${meal.strMealThumb}" alt="">


                        
                       
                        <h4>Category: <span>${meal.strCategory}</span></h4>
                            <h5 class="card-title text-lite">Item: <span>${meal.strArea}</span></h5>

                            <h4>${meal.strMeal}</h4>

                            <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>

                        <ul class="list-unstyled mb-0">
                            <li><i class="icon-check icons"></i> ${meal.strIngredient1}</li>
                            <li><i class="icon-check icons"></i> ${meal.strIngredient2}</li>
                            <li><i class="icon-check icons"></i> ${meal.strIngredient3}</li>
                            <li><i class="icon-check icons"></i> ${meal.strIngredient4}</li>
                            <li><i class="icon-check icons"></i> ${meal.strIngredient5}</li>
                        </ul>
                            
                        </div>
                    </div>
 
                    `
                });
                details.innerHTML = itemDetails;
            }
            const close = document.getElementById('close');
            close.addEventListener('click', () => {
                const details = document.getElementById('details');
                details.style.display = 'none';
            })
        })
})

