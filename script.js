// Write your JavaScript code here!

//const { addDestinationInfo } = require("./scriptHelper");

window.addEventListener("load", function() { //add add destination //addform to submit event, default(submit), call form submission 

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch() //thinking this is where pickPlanet(myFetch()) will be called
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       let planet = pickPlanet(listedPlanets)
       addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
   })

        let form = document.querySelector("form")
        form.addEventListener("submit", function(event) {
            let pilotName = document.querySelector("input[name=pilotName]").value;
            let copilotName = document.querySelector("input[name=copilotName]").value;
            let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
            let cargoMass = document.querySelector("input[name=cargoMass]").value;

            let faultyItems = document.getElementById("faultyItems")
            event.preventDefault()
            formSubmission(document, faultyItems, pilotName, copilotName, fuelLevel, cargoMass)
        })     
});
