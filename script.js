
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
   CLUE SYSTEM
========================= */

const clueLibrary = [
  {
    id: "snowflake",
    title: "The Last Snowflake",
    text: "The snowflake is still alive, but someone was here before you."
  },
  {
    id: "cabin-note",
    title: "The Old Note",
    text: "The snowflake was never meant to disappear."
  }
];

const discoveredClues = [];

function discoverClues(clueId) {
  const clue = clueLibrary.find(function(item) {
    return item.id === clueId;
  });

  if (!clue) {
    return;
  }

  const alreadyFound = discoveredClues.some(function(item) {
    return item.id === clueId;
  });

  if (alreadyFound) {
    return;
  }

  discoveredClues.push(clue);

  console.log("Clue discovered:", clue.title);
  console.log("Clue text:", clue.text);
  console.log("Total clues:", discoveredClues.length);
}

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
    if (currentScreen) {
      currentScreen.classList.remove("active");
    }
  });

  if (screen) {
    screen.classList.add("active");
  }

  if (status) {
    status.textContent = chapterName;
  }
}

/* =========================
   SNOW
========================= */

function createSnow() {
  const snowLayer = document.getElementById("snowLayer");

  if (!snowLayer) {
    return;
  }

  // Prevent duplicate snowflakes if this function runs again.
  snowLayer.innerHTML = "";

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

if (enterButton) {
  enterButton.addEventListener("click", function() {
    gameState.chapter = 1;

    showScreen(forestScene, "Chapter 01 · Forest");
  });
}

/* =========================
   FIND SNOWFLAKE
========================= */

if (snowflake) {
  snowflake.addEventListener("click", function() {
    if (gameState.foundSnowflake) {
      return;
    }

    gameState.foundSnowflake = true;

    discoverClues("snowflake");

    if (forestMessage) {
      forestMessage.classList.add("show");
    }

    snowflake.style.opacity = "0";
    snowflake.style.pointerEvents = "none";
  });
}

/* =========================
   FOREST → CABIN
========================= */

if (continueForest) {
  continueForest.addEventListener("click", function() {
    if (!gameState.foundSnowflake) {
      return;
    }

    gameState.chapter = 2;

    showScreen(cabinScene, "Chapter 02 · Cabin");
  });
}

/* =========================
   OPEN CABIN DOOR
========================= */

if (cabinDoor) {
  cabinDoor.addEventListener("click", function() {
    if (gameState.foundCabin) {
      return;
    }

    gameState.foundCabin = true;

    if (cabinMessage) {
      cabinMessage.classList.add("show");
    }
  });
}

/* =========================
   CABIN → INTERIOR
========================= */

if (enterCabin) {
  enterCabin.addEventListener("click", function() {
    if (!gameState.foundCabin) {
      return;
    }

    showScreen(interiorScene, "Chapter 02 · Inside");
  });
}

/* =========================
   FIND NOTE
========================= */

if (note) {
  note.addEventListener("click", function() {
    if (gameState.foundNote) {
      return;
    }

    gameState.foundNote = true;

    discoverClues("cabin-note");

    if (noteMessage) {
      noteMessage.classList.add("show");
    }
  });
}

/* =========================
   INTERIOR → MOUNTAIN
========================= */

if (continueCabin) {
  continueCabin.addEventListener("click", function() {
    if (!gameState.foundNote) {
      return;
    }

    gameState.chapter = 3;

    showScreen(mountainScene, "Chapter 03 · Mountain");
  });
}

/* =========================
   MOUNTAIN SYMBOL
========================= */

if (mountainSymbol) {
  mountainSymbol.addEventListener("click", function() {
    if (mountainMessage) {
      mountainMessage.classList.add("show");
    }
  });
}

/* =========================
   RESTART
========================= */

if (restart) {
  restart.addEventListener("click", function() {
    gameState.chapter = 0;
    gameState.foundSnowflake = false;
    gameState.foundCabin = false;
    gameState.foundNote = false;

    // Clear collected clues.
    discoveredClues.length = 0;

    if (forestMessage) {
      forestMessage.classList.remove("show");
    }

    if (cabinMessage) {
      cabinMessage.classList.remove("show");
    }

    if (noteMessage) {
      noteMessage.classList.remove("show");
    }

    if (mountainMessage) {
      mountainMessage.classList.remove("show");
    }

    if (snowflake) {
      snowflake.style.opacity = "1";
      snowflake.style.pointerEvents = "auto";
    }

    showScreen(intro, "Prologue");

    console.log("Game restarted. All clues cleared.");
  });
}

/* =========================
   START GAME
========================= */

createSnow();
showScreen(intro, "Prologue");
 