// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let div = document.getElementById("missionTarget");
    div.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
    if (testInput == "") {
        return "Empty"
    } else if (isNaN(testInput)) {
        return "Not a number"
    } else if (!isNaN(testInput)) {
        return "Is a number"
    } 
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!")
    } else if (validateInput(pilot) == "Is a number" || validateInput(copilot) == "Is a number" || validateInput(fuelLevel) == "Not a number" || validateInput(cargoLevel) == "Not a number") {
        alert("Pilot and copilot only take word value. Fuel level and cargo mass only take numerical value.")
    } else {
        list.style.visibility = "visible"
        let pilotStatus = document.getElementById("pilotStatus");
        let copilotStatus = document.getElementById("copilotStatus");
        let fuelStatus = document.getElementById("fuelStatus");
        let cargoStatus = document.getElementById("cargoStatus")
        pilotStatus.innerHTML = `Pilot's name: ${pilot}`;
        copilotStatus.innerHTML = `Copilot's name: ${copilot}`;
        let launchStatus = document.getElementById("launchStatus");
        if (fuelLevel < 10000 && cargoLevel > 10000) {
            fuelStatus.innerHTML = "WARNING: There is not enough fuel for your journey"
            cargoStatus.innerHTML = "WARNING: There is too much mass for the shuttle to take off" 
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = "red"
        } else if (fuelLevel > 10000 && cargoLevel > 10000) {
            cargoStatus.innerHTML = "WARNING: There is too much mass for the shuttle to take off"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = "red"
        } else if (fuelLevel < 10000 && cargoLevel < 10000) {
            fuelStatus.innerHTML = "WARNING: There is not enough fuel for your journey"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = "red"
        } else {
            fuelStatus.innerHTML = `Fuel level: ${fuelLevel}`
            cargoStatus.innerHTML = `Cargo level: ${cargoLevel}`
            launchStatus.innerHTML = "Shuttle is ready for launch";
            launchStatus.style.color = "green"
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            let jsonArr = response.json()
            console.log(jsonArr);
            return jsonArr
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.round(Math.random()*planets.length);
    return planets[index]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
