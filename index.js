
// skapa alla cityBoxes
let cityNameBox;
let userPrompt = prompt("Vilken stad? ")
let closestCityId;
let furthestCityId;
let cityNameBoxId = null;

function createCityBox() {
    let distanceResult = targetClosestFurthest(); //returvärdet sparas i variabel så vi kan använda det i denna funktion
    let closestDistance = distanceResult.closestDistance
    let furthestDistance = distanceResult.furthestDistance

    for (let i = 0; i < cities.length; i++) {
        let cityBoxesContainer = document.getElementById("cities");
        cityNameBox = document.createElement("div");
        cityNameBox.id = `nameBox${cities[i].id}`
        cityNameBox.textContent = cities[i].name;

        cityBoxesContainer.appendChild(cityNameBox);
        //ge klass till cityNameBox, anropar funktionen som stylar cityNameBoxes
        styleCityNameBox(cityNameBox)
        targetClosestFurthest();
        //console.log(cityNameBox.id)

        if (userPrompt == cities[i].name) {     // den angivna staden blir markerad
            styleFoundTargetCity(cityNameBox)
            continue;
        }
        if (cities[i].id == closestCityId) {
            styleClosestNameBox(cityNameBox);
            cityNameBox.textContent = cities[i].name + " ligger " + closestDistance / 10 + " mil bort "
        }
        if (cities[i].id == furthestCityId) {
            styleFurthestNameBox(cityNameBox);
            cityNameBox.textContent = cities[i].name + " ligger " + furthestDistance / 10 + " mil bort "

        }
    }
}

function createTable() {

    let table = document.getElementById("table"); //skapa table 
    let emptyCell = document.createElement("div") //skapa första tom cell
    emptyCell.textContent = "tom";
    styleFirstRowColumnCell(emptyCell);
    table.appendChild(emptyCell);
    //skapa översta raden

    for (let i = 0; i < cities.length; i++) {
        let firstRowCell = document.createElement("div");
        firstRowCell.textContent = cities[i].id;
        styleFirstRowColumnCell(firstRowCell);
        table.appendChild(firstRowCell);
        console.log(firstRowCell);
    }
    for (let j = 0; j < cities.length; j++) {
        let cellCityName = document.createElement("div");
        cellCityName.textContent = cities[j].name;
        styleFirstRowColumnCell(cellCityName);
        table.appendChild(cellCityName);

        for (let k = 0; k < cities.length; k++) {
            let cell = document.createElement("div")
            cell.textContent = "hej";
            styleCell(cell);
            table.appendChild(cell)

            if (j == k) {
                cell.textContent = " "
            }

        }
    }
}





function targetClosestFurthest() {
    let isFound = false;
    let targetCityId = null
    let closestDistance = Infinity;

    let furthestDistance = -Infinity;

    // loopa igenom databasen, se ifall userprompt namn finns i databasen
    for (let i = 0; i < cities.length; i++) {

        let compareCityId = null;

        if (cities[i].name == userPrompt) {
            isFound = true;
            let h2 = document.querySelector("h2");
            h2.textContent = userPrompt + " (" + cities[i].country + ") ";
            targetCityId = cities[i].id;

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
                    }
                    if (distances[j].distance > furthestDistance && distances[j].distance > closestDistance) {
                        furthestDistance = distances[j].distance;
                        furthestCityId = compareCityId;

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
    return { closestDistance, furthestDistance }//, furthestDistance       //returnera värdet till createCityBox

}

function styleCityNameBox(cityNameBox) {
    cityNameBox.classList.add("cityBox");
}

function styleClosestNameBox(cityNameBox) {
    cityNameBox.classList.add("closest");
    // (div + closestCityId).add("closest");
}

function styleFurthestNameBox(cityNameBox) {
    cityNameBox.classList.add("furthest");
    // (div + closestCityId).add("closest");
}

function styleFoundTargetCity(cityNameBox) {
    cityNameBox.classList.add("target");
}

function styleFirstRowColumnCell(firstRowCell, cellCityName) {
    firstRowCell.classList.add("cell");
    firstRowCell.classList.add("head_row");
}
function styleCell(cell) {
    cell.classList.add("cell")
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
createTable();