
// skapa alla cityBoxes
for (let i = 0; i < cities.length; i++) {
    let cityBoxesContainer = document.getElementById("cities");
    let cityNameBox = document.createElement("div");
    cityNameBox.textContent = cities[i].name;

    //ge klass till cityNameBox
    styleCityNameBox(cityNameBox)  //anropar funktionen som stylar cityNameBoxes

    cityBoxesContainer.appendChild(cityNameBox);

}

// skapa table

//userPrompt
let userPrompt = prompt("Vilken stad? ")
let isFound = false;
let targetCityId = null
let compareCityId = null

let closestCityId = null;
let closestDistance = Infinity;

// loopa igenom databasen, se ifall userprompt namn finns i databasen
for (let i = 0; i < cities.length; i++) {
    if (cities[i].name == userPrompt) {
        isFound = true;
        let h2 = document.querySelector("h2");
        h2.textContent = userPrompt + " (" + cities[i].country + ") ";
        targetCityId = cities[i].id;
        console.log(targetCityId);

        console.log("Det funkar");
        for (let j = 0; j < distances.length; j++) {
            if ((distances[j].city1 == targetCityId) || (distances[j].city2 == targetCityId)) {
                if (distances[j].city1 == targetCityId) {
                    compareCityId = distances[j].city2;
                } else if (distances[j].city2 == targetCityId) {
                    compareCityId = distances[j].city1;
                }

                if (distances[j].distance < closestDistance) {
                    closestDistance = distances[j].distance;
                    closestCityId = compareCityId;

                }
            }


            /*
    
            compareCityId = distances[j].city2;
            console.log(compareCityId);
    
    
        } else if (distances[j].city2 == targetCityId) {
            compareCityId = distances[j].city1;
            console.log(compareCityId);
        }
        */
        }




        break; //om staden hittas, blir värdet true och loopen avslutas

    }
}


if (isFound != true) {          //om staden skiljer sig från true dvs är false och staden inte finns
    let h2 = document.querySelector("h2");
    h2.textContent = userPrompt + " finns inte i databasen :(";
    console.log("Det funkar inte");

}
console.log("closest Distance = " + closestDistance / 10);
console.log("closest CityId=" + closestCityId)



// if userprompt finns = blir det vår targetCity variabel
//   sätta färg på targetCity
//   jämföra targetCityId med alla otherId
//   jämföra distance mellan targetCityDistance och infinity och hitta minsta distance
//   om distance är mindre så ska vi ha closestCityId variabel
//   när vi sedan har slutliga closestCityId använder vi Id för att ta fram dess namn i databasen
//   tillsätta class till closestCityId som ändrar färg + text hur nära den är targetCity

//sedan gör vi samma sak fast med furthestCity.

//          else ändrar vi rubriken till att userprompt inte finns i databasen + title på hemsidan


//funktioner som stylar innehåll

function styleCityNameBox(cityNameBox) {
    cityNameBox.classList.add("cityBox");
}