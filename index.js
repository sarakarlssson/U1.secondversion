
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
        cellCityName.textContent = cities[j].id + "-" + cities[j].name;
        styleFirstRowColumnCell(cellCityName);
        table.appendChild(cellCityName);


        for (let k = 0; k < cities.length; k++) {
            let cell = document.createElement("div")
            cell.textContent = "hej";
            styleCell(cell);
            table.appendChild(cell)
            if (j % 2 == 0) {
                cellCityName.classList.add("even_row");
                cell.classList.add("even_row");
            }
            if (k % 2 == 0) {
                cell.classList.add("even_col");
            }

            if (j == k) {
                cell.textContent = " "
            } else {
                for (let l = 0; l < distances.length; l++) {
                    if (((distances[l].city1 == cities[j].id) && (distances[l].city2 == cities[k].id))
                        || ((distances[l].city2 == cities[j].id) && (distances[l].city1 == cities[k].id))) {
                        cell.textContent = distances[l].distance / 10;

                        break;
                    }
                }
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
            let title = document.querySelector("title");
            title.textContent = cities[i].name;

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
        let title = document.querySelector("title");
        title.textContent = "Not Found";
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

createCityBox();
createTable();