//variables
const screenLit = document.querySelector('.screenLit');
const screen = document.querySelector('.screen');
const screenIDs = ['#pokeName', '#number', '#type', '#height', '#weight', '#ability', '#move'];

//on click, get the pokemon from api
document.querySelector('button').addEventListener('click', getFetch);

//on enter button, get the pokemon by triggering button click
document.querySelector('input').addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.querySelector("button").click();
  }
});

function powerOff() {
  //revert screen colors to appear "off"
  screenLit.style.display = "none";
  document.querySelector('#ability').innerHTML = '';
  document.querySelector('#move').innerHTML = '';
  document.querySelector('.screen2').style.backgroundColor= '#222222';
  screen.style.backgroundColor = '#222222';
}

function resetData() {
  //clear elements of data
  screenIDs.forEach(id => document.querySelector(id).innerHTML = '');
  document.querySelector('img').src = '';
}

function powerOn() {
  //turn the pokedex 'on'
  screenLit.style.display = ""
  document.querySelector('#blueLightInner').classList.add("animate");
  screen.style.backgroundColor = 'white';
  screenLit.style.border =  "3pt solid azure";
  screenLit.style.backgroundColor = 'white';
  document.querySelector('.screen2').style.backgroundColor = 'white';
}

function displayDataScreen1(data){
  //left screen
  document.querySelector('#pokeName').innerText = data.name;
  document.querySelector('#number').innerText = `#${data.id}`;
  document.querySelector('img').id = 'pokeImg';
  document.querySelector('#pokeImg').src = data.sprites.other.dream_world.front_default;
  if (data.sprites.other.dream_world.front_default==null){
    document.querySelector('#pokeImg').src = data.sprites.front_default;
  }
}

function displayDataScreen2(data){
  //right screen
  document.querySelector('#type').innerText = data.types[0].type.name;
  document.querySelector('#type').className = `${data.types[0].type.name}`;
  document.querySelector('#height').innerText = `${(data.height/3.048).toFixed(1)}'`;
  document.querySelector('#weight').innerText = `${(data.weight/4.536).toFixed(1)} lbs`;
  document.querySelector('#ability').innerText = `ability: ${data.abilities[0].ability.name}`
  document.querySelector('#move').innerText = `move: ${data.moves[3].move.name}`
}


function getFetch(){
  document.querySelector('p').innerText = "";
  const pokeChoice = document.querySelector('input').value.toLowerCase();
  console.log("pokeChoice = " + pokeChoice);
  if (pokeChoice == "") return;
  const url = 'https://pokeapi.co/api/v2/pokemon/'+pokeChoice

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        //display data
        displayDataScreen1(data);
        displayDataScreen2(data);

        //turn screens on
        powerOn();

      })
      .catch(err => {
          console.log(`error ${err}`);
          document.querySelector('p').innerText = "ERROR";
          powerOff();
          resetData();
      });
}

