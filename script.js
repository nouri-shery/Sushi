
/* ================================================================== ==  ===============
   THE LAST SNOWFLAKE
   Interactive Adventure Game
========================================= */

/* =========================================
   1. HTML ELEMENTS
========================================= */

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

const fireplace = document.getElementById("fireplace");
const puzzlePanel = document.getElementById("puzzlePanel");
const puzzleFeedback = document.getElementById("puzzleFeedback");
const closePuzzle = document.getElementById("closePuzzle");
const puzzleOptions = document.querySelectorAll(".puzzle-option");

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


/* =========================================
   2. GAME STATE
   The current progress of the player
========================================= */

const gameState = {
  chapter: 0,
  foundSnowflake: false,
  foundCabin: false,
  puzzleSolved: false,
  foundNote: false,
  mountainUnlocked: false,
  gameCompleted: false,
  clues: []
};


/* =========================================
   3. CLUE LIBRARY
   All clues the player can discover
========================================= */

const clueLibrary = [
  {
    id: "snowflake",
    title: "The Last Snowflake",
    text: "The snowflake is still alive. Someone was here before you."
  },
  {
    id: "footprints",
    title: "The Footprints",
    text: "Every journey leaves a trace. Someone crossed the snow before you."
  },
  {
    id: "cabin-note",
    title: "The Old Note",
    text: "The snowflake was never meant to disappear. Its secret is hidden beneath the ice."
  }
];


/* =========================================
   4. SCREEN MANAGEMENT
========================================= */

function showScreen(screen, chapterName, chapterNumber) {
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

  if (typeof chapterNumber === "number") {
    gameState.chapter = chapterNumber;
  }
}


/* =========================================
   5. CLUE SYSTEM
========================================= */

function discoverClue(clueId) {
  const clue = clueLibrary.find(function (item) {
    return item.id === clueId;
  });

  if (!clue) {
    console.warn("Unknown clue:", clueId);
    return false;
  }

  const alreadyFound = gameState.clues.some(function (item) {
    return item.id === clueId;
  });

  if (alreadyFound) {
    return false;
  }

  gameState.clues.push(clue);

  renderClues();

  console.log("New clue discovered:", clue.title);

  return true;
}


function hasClue(clueId) {
  return gameState.clues.some(function (clue) {
    return clue.id === clueId;
  });
}


function renderClues() {
  if (!cluesList || !clueCount || !emptyClues) {
    return;
  }

  cluesList.replaceChildren();

  clueCount.textContent = String(gameState.clues.length);

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


/* =========================================
   6. CLUES PANEL
========================================= */

function openCluesPanel() {
  if (cluesPanel) {
    cluesPanel.classList.add("open");
  }
}


function closeCluesPanel() {
  if (cluesPanel) {
    cluesPanel.classList.remove("open");
  }
}


if (cluesButton) {
  cluesButton.addEventListener("click", function () {
    if (!cluesPanel) return;

    cluesPanel.classList.toggle("open");
  });
}


if (closeClues) {
  closeClues.addEventListener("click", closeCluesPanel);
}


/* =========================================
   7. SNOW ANIMATION
========================================= */

function createSnow() {
  const snowLayer = document.getElementById("snowLayer");

  if (!snowLayer) return;

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


/* =========================================
   8. INTRO → FOREST
========================================= */

if (enterButton) {
  enterButton.addEventListener("click", function () {
    showScreen(
      forestScene,
      "Chapter 01 · Forest",
      1
    );
  });
}


/* =========================================
   9. DISCOVER THE SNOWFLAKE
========================================= */

if (snowflake) {
  snowflake.addEventListener("click", function () {
    if (gameState.foundSnowflake) return;

    gameState.foundSnowflake = true;

    discoverClue("snowflake");

    if (forestMessage) {
      forestMessage.classList.add("show");
    }

    snowflake.classList.add("discovered");
    snowflake.style.opacity = "0";
    snowflake.style.pointerEvents = "none";

    console.log("The last snowflake has been discovered.");
  });
}


/* =========================================
   10. FOREST → CABIN
========================================= */

if (continueForest) {
  continueForest.addEventListener("click", function () {
    if (!gameState.foundSnowflake) {
      return;
    }

    showScreen(
      cabinScene,
      "Chapter 02 · Cabin",
      2
    );
  });
}


/* =========================================
   11. OPEN THE CABIN
========================================= */

if (cabinDoor) {
  cabinDoor.addEventListener("click", function () {
    if (gameState.foundCabin) return;

    gameState.foundCabin = true;

    if (cabinMessage) {
      cabinMessage.classList.add("show");
    }
  });
}


/* =========================================
   12. CABIN → INTERIOR
========================================= */

if (enterCabin) {
  enterCabin.addEventListener("click", function () {
    if (!gameState.foundCabin) return;

    showScreen(
      interiorScene,
      "Chapter 02 · Inside",
      2
    );
  });
}


/* =========================================
   13. FIREPLACE RIDDLE
========================================= */

function openPuzzle() {
  if (!puzzlePanel) return;

  puzzlePanel.hidden = false;

  if (gameState.puzzleSolved && puzzleFeedback) {
    puzzleFeedback.textContent =
      "You solved the riddle. The footprints reveal the way.";
    puzzleFeedback.classList.add("success");
  }
}


function closePuzzlePanel() {
  if (puzzlePanel) {
    puzzlePanel.hidden = true;
  }
}


if (fireplace) {
  fireplace.addEventListener("click", openPuzzle);
}


if (closePuzzle) {
  closePuzzle.addEventListener("click", closePuzzlePanel);
}


puzzleOptions.forEach(function (option) {
  option.addEventListener("click", function () {
    if (gameState.puzzleSolved) return;

    const answer = option.dataset.answer;

    if (answer === "footprints") {
      gameState.puzzleSolved = true;

      if (puzzleFeedback) {
        puzzleFeedback.textContent =
          "Correct! The more steps you take, the more footprints you leave behind.";

        puzzleFeedback.classList.add("success");
      }

      discoverClue("footprints");

      puzzleOptions.forEach(function (button) {
        button.disabled = true;
      });

      console.log("Fireplace riddle solved.");
    } else {
      if (puzzleFeedback) {
        puzzleFeedback.textContent =
          "Not quite. Think carefully: what do your steps leave behind?";

        puzzleFeedback.classList.remove("success");
      }
    }
  });
});


/* =========================================
   14. DISCOVER THE OLD NOTE
========================================= */

if (note) {
  note.addEventListener("click", function () {
    if (!gameState.puzzleSolved) {
      openPuzzle();

      if (puzzleFeedback) {
        puzzleFeedback.textContent =
          "The note is sealed. Solve the fireplace riddle first.";

        puzzleFeedback.classList.remove("success");
      }

      return;
    }

    if (gameState.foundNote) return;

    gameState.foundNote = true;

    discoverClue("cabin-note");

    if (noteMessage) {
      noteMessage.classList.add("show");
    }

    console.log("The old note has been discovered.");
  });
}


/* =========================================
   15. INTERIOR → MOUNTAIN
========================================= */

if (continueCabin) {
  continueCabin.addEventListener("click", function () {
    if (!gameState.foundNote) return;

    gameState.mountainUnlocked = true;

    showScreen(
      mountainScene,
      "Chapter 03 · Mountain",
      3
    );
  });
}


/* =========================================
   16. MOUNTAIN DISCOVERY
========================================= */

if (mountainSymbol) {
  mountainSymbol.addEventListener("click", function () {
    if (!gameState.mountainUnlocked) {
      return;
    }

    if (!hasClue("snowflake") ||
        !hasClue("footprints") ||
        !hasClue("cabin-note")) {
      if (mountainMessage) {
        mountainMessage.classList.add("show");

        const heading = mountainMessage.querySelector("h3");
        const paragraph = mountainMessage.querySelector("p:not(.message-label)");

        if (heading) {
          heading.textContent = "Something is still missing.";
        }

        if (paragraph) {
          paragraph.textContent =
            "The symbol responds to the clues you have collected. Keep searching.";
        }
      }

      return;
    }

    gameState.gameCompleted = true;

    if (mountainMessage) {
      mountainMessage.classList.add("show");

      const heading = mountainMessage.querySelector("h3");
      const paragraph = mountainMessage.querySelector("p:not(.message-label)");

      if (heading) {
        heading.textContent = "The winter remembers.";
      }

      if (paragraph) {
        paragraph.textContent =
          "You followed the footprints, solved the riddle, and uncovered the truth. The last snowflake was never lost. It was waiting for someone to find its story.";
      }
    }

    if (status) {
      status.textContent = "The End · A New Beginning";
    }

    console.log("The Last Snowflake: story completed.");
  });
}


/* =========================================
   17. RESTART GAME
========================================= */

function restartGame() {
  gameState.chapter = 0;
  gameState.foundSnowflake = false;
  gameState.foundCabin = false;
  gameState.puzzleSolved = false;
  gameState.foundNote = false;
  gameState.mountainUnlocked = false;
  gameState.gameCompleted = false;
  gameState.clues.length = 0;

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

    const heading = mountainMessage.querySelector("h3");
    const paragraph = mountainMessage.querySelector("p:not(.message-label)");

    if (heading) {
      heading.textContent = "You finally found the source.";
    }

    if (paragraph) {
      paragraph.textContent =
        "But the last answer is waiting beneath the ice.";
    }
  }

  if (snowflake) {
    snowflake.style.opacity = "1";
    snowflake.style.pointerEvents = "auto";
    snowflake.classList.remove("discovered");
  }

  if (puzzlePanel) {
    puzzlePanel.hidden = true;
  }

  if (puzzleFeedback) {
    puzzleFeedback.textContent = "";
    puzzleFeedback.classList.remove("success");
  }

  puzzleOptions.forEach(function (button) {
    button.disabled = false;
  });

  closeCluesPanel();

  renderClues();

  showScreen(intro, "Prologue", 0);

  console.log("Game restarted. Progress has been reset.");
}


if (restart) {
  restart.addEventListener("click", restartGame);
}


/* =========================================
   18. ESCAPE KEY
   Close open panels using the keyboard
========================================= */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePuzzlePanel();
    closeCluesPanel();
  }
});


/* =========================================
   19. INITIALIZE GAME
========================================= */

createSnow();
renderClues();

showScreen(intro, "Prologue", 0);
