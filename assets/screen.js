var add = document.querySelector("#add");
var roll = document.querySelector("#roll");
var counter = 3;

add.addEventListener("click", function(event){
    event.preventDefault();
    var form = document.querySelector("#form-content");
    var lastrow = document.querySelector("#last-entry");
    var newRow = document.createElement("div");
    newRow.setAttribute("class", "input-group mb-3");
    var entry1 = document.createElement("input");
    entry1.setAttribute("id", "poke"+counter);
    entry1.setAttribute("type", "text");
    entry1.setAttribute("class", "form-control");
    entry1.setAttribute("placeholder", "Pokemon Name");
    var space = document.createElement("span");
    space.setAttribute("class", "mx-2");
    var entry2 = document.createElement("input");
    entry2.setAttribute("id", "perc"+counter);
    entry2.setAttribute("type", "number");
    entry2.setAttribute("class", "form-control");
    entry2.setAttribute("placeholder", "Percentage");
    newRow.appendChild(entry1);
    newRow.appendChild(space);
    newRow.appendChild(entry2);
    var label = document.createElement("label");
    label.setAttribute("class","form-label");
    label.innerText="Pokemon " + counter;
    form.appendChild(label);
    form.appendChild(newRow);
    counter = counter + 1;
});

roll.addEventListener("click", function(event){
    event.preventDefault();
    var sum = 0;
    var pokepercList = [];
    for(var i = 1; i < counter; i++){
        var poke1 = document.querySelector("#poke"+i).value;
        var perc1 = document.querySelector("#perc"+i).value;
        sum = sum + parseInt(perc1);
        var pokeperc = {"pokemon":poke1, "weight":perc1};
        pokepercList.push(pokeperc);
    }
    console.log(sum);
    if(sum != 100){
        var alert = document.querySelector("#alert");
        var col = document.querySelector("#col");
    if(alert == null){
        var alert = document.createElement("div");
        alert.setAttribute("class", "alert alert-danger");
        alert.setAttribute("id", "alert");
        alert.innerText = "Percentages must add up to 100!";
        col.prepend(alert);
    }
    else{
        alert.setAttribute("class", "alert alert-danger");
        alert.innerText = "Percentages must add up to 100!";
    }
    }
    else{
    var chosenmon = weightFunction(pokepercList).pokemon;
    var alert = document.querySelector("#alert");
    var col = document.querySelector("#col");
    chosenmon = chosenmon.charAt(0).toUpperCase() + chosenmon.slice(1);
    if(alert == null){
        var alert = document.createElement("div");
        alert.setAttribute("class", "alert alert-success");
        alert.setAttribute("id", "alert");
        alert.innerText = chosenmon + " Was Chosen!"
        col.prepend(alert);
    }
    else{
        alert.setAttribute("class", "alert alert-success");
        alert.innerText = chosenmon + " Was Chosen!";
    }
    fetch('https://pokeapi.co/api/v2/pokemon/' + chosenmon.toLowerCase())
  .then(response => response.json())
  .then((data) => {
      console.log(data.sprites.front_default);
      var img = document.createElement("img");
      img.setAttribute("src", data.sprites.front_default);
      alert.prepend(img);
  })
  .catch(error => console.log(error));
}
});

function weightFunction(items) {
    var cum = 100
    var random = Math.floor(Math.random() * 100)
  
    for(var i = 0; i < items.length; i++) {
      cum -= items[i].weight
      if (random >= cum) {
        return items[i]
      }
    }
  }