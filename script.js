/* =========================
   THE LAST SNOWFLAKE
   Main JavaScript
========================= */

/* =========================
   HTML ELEMENTS
========================= */

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

const cluesButton = document.getElementById("cluesButton");
const cluesPanel = document.getElementById("cluesPanel");
const closeClues = document.getElementById("closeClues");
const clueCount = document.getElementById("clueCount");
const cluesList = document.getElementById("cluesList");
const emptyClues = document.getElementById("emptyClues");

const fireplace = document.getElementById("fireplace");
const puzzlePanel = document.getElementById("puzzlePanel");
const puzzleFeedback = document.getElementById("puzzleFeedback");
const closePuzzle = document.getElementById("closePuzzle");
const puzzleOptions = document.querySelectorAll(".puzzle-option");

/* =========================
   GAME STATE
========================= */

const gameState = {
  chapter: 0,
  foundSnowflake: false,
  foundCabin: false,
  foundNote: false,
  puzzleSolved: false,
  clues: []
};

/* =========================
   CLUE LIBRARY
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
  },
  {
    id: "footprints",
    title: "The Footprints",
    text: "Every journey leaves a trace. Someone crossed the snow before you."
  }
];

/* =========================
   CLUE SYSTEM
========================= */

function discoverClues(clueId) {
  const clue = clueLibrary.find(function (item) {
    return item.id === clueId;
  });

  if (!clue) {
    console.warn("Clue not found:", clueId);
    return;
  }

  const alreadyFound = gameState.clues.some(function (item) {
    return item.id === clueId;
  });

  if (alreadyFound) {
    return;
  }

  gameState.clues.push(clue);

  renderClues();

  console.log("Clue discovered:", clue.title);
  console.log("Total clues:", gameState.clues.length);
}

function renderClues() {
  if (!cluesList || !clueCount || !emptyClues) {
    return;
  }

  cluesList.replaceChildren();

  clueCount.textContent = gameState.clues.length;
  emptyClues.hidden = gameState.clues.length > 0;

  gameState.clues.forEach(function (clue) {
    const item = document.createElement("li");
    const title = document.createElement("strong");
    const description = document.createElement("p");

    title.textContent = clue.title;
    description.textContent = clue.text;

    item.append(title, description);
    cluesList.appendChild(item);
  });
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

  screens.forEach(function (currentScreen) {
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
   SNOW EFFECT
========================= */

function createSnow() {
  const snowLayer = document.getElementById("snowLayer");

  if (!snowLayer) {
    return;
  }

  snowLayer.replaceChildren();

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
  enterButton.addEventListener("click", function () {
    gameState.chapter = 1;

    showScreen(forestScene, "Chapter 01 · Forest");
  });
}

/* =========================
   FIND THE LAST SNOWFLAKE
========================= */

if (snowflake) {
  snowflake.addEventListener("click", function () {
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
  continueForest.addEventListener("click", function () {
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
  cabinDoor.addEventListener("click", function () {
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
  enterCabin.addEventListener("click", function () {
    if (!gameState.foundCabin) {
      return;
    }

    showScreen(interiorScene, "Chapter 02 · Inside");
  });
}

/* =========================
   FIREPLACE RIDDLE
========================= */

if (fireplace && puzzlePanel) {
  fireplace.addEventListener("click", function () {
    if (gameState.puzzleSolved && puzzleFeedback) {
      puzzleFeedback.textContent =
        "The riddle is solved. Look for the note.";

      puzzleFeedback.classList.add("success");
    }

    puzzlePanel.hidden = false;
  });
}

puzzleOptions.forEach(function (option) {
  option.addEventListener("click", function () {
    if (gameState.puzzleSolved) {
      return;
    }

    const answer = option.dataset.answer;

    if (answer === "footprints") {
      gameState.puzzleSolved = true;

      if (puzzleFeedback) {
        puzzleFeedback.textContent =
          "Correct. Every journey leaves a trace.";

        puzzleFeedback.classList.add("success");
      }

      discoverClues("footprints");
    } else {
      if (puzzleFeedback) {
        puzzleFeedback.textContent =
          "Not quite. Think about what you leave behind.";

        puzzleFeedback.classList.remove("success");
      }
    }
  });
});

if (closePuzzle && puzzlePanel) {
  closePuzzle.addEventListener("click", function () {
    puzzlePanel.hidden = true;
  });
}

/* =========================
   FIND THE OLD NOTE
========================= */

if (note) {
  note.addEventListener("click", function () {
    if (!gameState.puzzleSolved) {
      if (puzzlePanel) {
        puzzlePanel.hidden = false;
      }

      if (puzzleFeedback) {
        puzzleFeedback.textContent =
          "The note is sealed in silence. Solve the fireplace riddle first.";

        puzzleFeedback.classList.remove("success");
      }

      return;
    }

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
  continueCabin.addEventListener("click", function () {
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
  mountainSymbol.addEventListener("click", function () {
    if (mountainMessage) {
      mountainMessage.classList.add("show");
    }
  });
}

/* =========================
   CLUES PANEL
========================= */

if (cluesButton && cluesPanel) {
  cluesButton.addEventListener("click", function () {
    cluesPanel.classList.toggle("open");
  });
}

if (closeClues && cluesPanel) {
  closeClues.addEventListener("click", function () {
    cluesPanel.classList.remove("open");
  });
}

/* =========================
   RESTART GAME
========================= */

if (restart) {
  restart.addEventListener("click", function () {
    gameState.chapter = 0;
    gameState.foundSnowflake = false;
    gameState.foundCabin = false;
    gameState.foundNote = false;
    gameState.puzzleSolved = false;

    gameState.clues.length = 0;

    if (puzzlePanel) {
      puzzlePanel.hidden = true;
    }

    if (puzzleFeedback) {
      puzzleFeedback.textContent = "";
      puzzleFeedback.classList.remove("success");
    }

    renderClues();

    if (cluesPanel) {
      cluesPanel.classList.remove("open");
    }

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
renderClues();
showScreen(intro, "Prologue");