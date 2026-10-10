const intro = document.getElementById("intro");
const forestScene = document.getElementById("forestScene");
const cabinScene = document.getElementById("cabinScene");
const interiorScene = document.getElementById("interiorScene");
const mountainScene = document.getElementById("mountainScene");

const status = document.getElementById("status");

const enterButton = document.getElementById("enter");

const snowflake = document.getElementById("snowflake");
const forestMessage = document.getElementById("forestMessage");
const continueForest = document.getElementById("continueForest");

const cabinDoor = document.getElementById("cabinDoor");
const cabinMessage = document.getElementById("cabinMessage");
const enterCabin = document.getElementById("enterCabin");

const note = document.getElementById("note");
const noteMessage = document.getElementById("noteMessage");
const continueCabin = document.getElementById("continueCabin");

const mountainSymbol = document.getElementById("mountainSymbol");
const mountainMessage = document.getElementById("mountainMessage");

const restart = document.getElementById("restart");


/* =========================
   GAME STATE
========================= */

const gameState = {
  chapter: 0,
  foundSnowflake: false,
  foundCabin: false,
  foundNote: false
};


/* =========================
   SCREEN SYSTEM
========================= */

function showScreen(screen, chapterName) {

  const screens = [
    intro,
    forestScene,
    cabinScene,
    interiorScene,
    mountainScene
  ];

  screens.forEach(function(currentScreen) {
    currentScreen.classList.remove("active");
  });

  screen.classList.add("active");

  status.textContent = chapterName;
}


/* =========================
   SNOW
========================= */

function createSnow() {

  const snowLayer = document.getElementById("snowLayer");

  for (let i = 0; i < 90; i++) {

    const flake = document.createElement("i");

    flake.classList.add("flake");

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 8;

    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.left = `${left}%`;
    flake.style.animationDuration = `${duration}s`;
    flake.style.animationDelay = `${delay}s`;

    snowLayer.appendChild(flake);
  }
}


/* =========================
   INTRO → FOREST
========================= */

enterButton.addEventListener("click", function() {

  gameState.chapter = 1;

  showScreen(
    forestScene,
    "Chapter 01 · Forest"
  );

});


/* =========================
   FIND SNOWFLAKE
========================= */

snowflake.addEventListener("click", function() {

  gameState.foundSnowflake = true;

  forestMessage.classList.add("show");

  snowflake.style.opacity = "0";
  snowflake.style.pointerEvents = "none";

});


/* =========================
   FOREST → CABIN
========================= */

continueForest.addEventListener("click", function() {

  if (!gameState.foundSnowflake) {
    return;
  }

  gameState.chapter = 2;

  showScreen(
    cabinScene,
    "Chapter 02 · Cabin"
  );

});


/* =========================
   OPEN CABIN DOOR
========================= */

cabinDoor.addEventListener("click", function() {

  gameState.foundCabin = true;

  cabinMessage.classList.add("show");

});


/* =========================
   CABIN → INTERIOR
========================= */

enterCabin.addEventListener("click", function() {

  if (!gameState.foundCabin) {
    return;
  }

  showScreen(
    interiorScene,
    "Chapter 02 · Inside"
  );

});


/* =========================
   FIND NOTE
========================= */

note.addEventListener("click", function() {

  gameState.foundNote = true;

  noteMessage.classList.add("show");

});


/* =========================
   INTERIOR → MOUNTAIN
========================= */

continueCabin.addEventListener("click", function() {

  if (!gameState.foundNote) {
    return;
  }

  gameState.chapter = 3;

  showScreen(
    mountainScene,
    "Chapter 03 · Mountain"
  );

});


/* =========================
   MOUNTAIN SYMBOL
========================= */

mountainSymbol.addEventListener("click", function() {

  mountainMessage.classList.add("show");

});


/* =========================
   RESTART
========================= */

restart.addEventListener("click", function() {

  gameState.chapter = 0;
  gameState.foundSnowflake = false;
  gameState.foundCabin = false;
  gameState.foundNote = false;

  forestMessage.classList.remove("show");
  cabinMessage.classList.remove("show");
  noteMessage.classList.remove("show");
  mountainMessage.classList.remove("show");

  snowflake.style.opacity = "1";
  snowflake.style.pointerEvents = "auto";

  showScreen(
    intro,
    "Prologue"
  );

});


/* =========================
   START
========================= */

createSnow();

showScreen(
  intro,
  "Prologue"
);
<<<<<<< HEAD
=======
const cluelibrary = [
  {
    id :"snowflake",
    title :"the last snowflake",
    text : " The snowflake is still alive, but someonr was before you."
  
  },
  {
    id: "cabin-note ",
    title : "the old Note ",
    text :" the snowflack was never  meant to disappear ."

  }
];
const discoveredClues =[];
function discoverClues(clueId){
  const clue = clueLibrary.find (function(item){
    return item.id === clueId;

  });

 if (!clue) {
    return;
  }
const alreadyFound = discoveredClues.some(function(item){
  return item.id === clueId;
});
if (alreadyFound) {
  return;
}
  discoveredClues.push(clue);

  console.log("Clue discovered:", clue.title);
  console.log("Total clues:", discoveredClues.length);
}
>>>>>>> master
