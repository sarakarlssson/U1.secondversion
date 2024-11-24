
// skapa alla cityBoxes
let cityNameBox;
let userPrompt = prompt("Vilken stad? ")
let closestCityId;
let cityNameBoxId = null;

function createCityBox(closestDistance) {
    closestDistance = targetClosest(); //returvärdet sparas i variabel så vi kan använda det i denna funktion

    for (let i = 0; i < cities.length; i++) {
        let cityBoxesContainer = document.getElementById("cities");
        cityNameBox = document.createElement("div");
        cityNameBox.id = `nameBox${cities[i].id}`
        cityNameBox.textContent = cities[i].name;

        cityBoxesContainer.appendChild(cityNameBox);
        //ge klass till cityNameBox, anropar funktionen som stylar cityNameBoxes
        styleCityNameBox(cityNameBox)
        targetClosest(closestDistance);
        //console.log(cityNameBox.id)

        if (userPrompt == cities[i].name) {     // den angivna staden blir markerad
            styleFoundTargetCity(cityNameBox)
            continue;
        }
        if (cities[i].id == closestCityId) {
            styleClosestNameBox(cityNameBox);
            cityNameBox.textContent = cities[i].name + " ligger " + closestDistance + " bort "
        }
    }

}
// skapa table

function targetClosest() {
    let isFound = false;
    let targetCityId = null
    let closestDistance = Infinity;
    let closestCityName = null;

    // loopa igenom databasen, se ifall userprompt namn finns i databasen
    for (let i = 0; i < cities.length; i++) {

        let compareCityId = null

        if (cities[i].name == userPrompt) {
            isFound = true;
            let h2 = document.querySelector("h2");
            h2.textContent = userPrompt + " (" + cities[i].country + ") ";
            targetCityId = cities[i].id;
            console.log("targetCityId: " + targetCityId);

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
                    }
                }
            }
            //om staden hittas, blir värdet true och loopen avslutas
            break;
        }
    }

    if (isFound != true) {          //om staden skiljer sig från true dvs är false och staden inte finns
        let h2 = document.querySelector("h2");
        h2.textContent = userPrompt + " finns inte i databasen :(";
    }
    return closestDistance;         //returnera värdet till createCityBox


}

function styleCityNameBox(cityNameBox) {
    cityNameBox.classList.add("cityBox");
}

function styleClosestNameBox(cityNameBox) {
    cityNameBox.classList.add("closest");
    // (div + closestCityId).add("closest");
}

function styleFoundTargetCity(cityNameBox) {
    cityNameBox.classList.add("target");
}

//div med id som i ska få klassen 

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

createCityBox();