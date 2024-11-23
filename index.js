
// skapa alla cityBoxes
let cityNameBox;
let userPrompt = prompt("Vilken stad? ")

for (let i = 0; i < cities.length; i++) {
    let cityBoxesContainer = document.getElementById("cities");
    cityNameBox = document.createElement("div");
    cityNameBox.id = "nameBox" + i;
    cityNameBox.textContent = cities[i].name;

    //ge klass till cityNameBox
    styleCityNameBox(cityNameBox)  //anropar funktionen som stylar cityNameBoxes

    console.log(cityNameBox)
    if (userPrompt == cities[i].name) {     // den angivna staden blir markerad
        styleFoundTargetCity(cityNameBox)
    }

    cityBoxesContainer.appendChild(cityNameBox);
}

// skapa table

//userPrompt

let isFound = false;
let targetCityId = null
let compareCityId = null

let closestCityId = null;
let closestDistance = Infinity;
let closestCityName = null;

// loopa igenom databasen, se ifall userprompt namn finns i databasen
for (let i = 0; i < cities.length; i++) {
    if (cities[i].name == userPrompt) {
        isFound = true;
        styleFoundTargetCity(targetCityId);
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
                    closestCityId = compareCityId; //om vi hittar en stad som är närmre ändrar vi jämförd stad till närmst
                    closestCityName = cities[closestCityId].name;


                    styleClosestNameBox(closestCityId)

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


        console.log("closestCityName: " + closestCityName)

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

function styleClosestNameBox() {
    // (div + closestCityId).add("closest");
}

function styleFoundTargetCity(cityNameBox) {
    cityNameBox.classList.add("target");
}

//div med id som i ska få klassen 

