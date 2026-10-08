const snowLayer = document.getElementById("snowLayer");

const intro = document.getElementById("intro");
const forestScene = document.getElementById("forestScene");
const finalScene = document.getElementById("final");

const enterButton = document.getElementById("enter");
const snowflake = document.getElementById("snowflake");
const message = document.getElementById("message");
const continueButton = document.getElementById("continue");
const restartButton = document.getElementById("restart");

const status = document.getElementById("status");



/* =========================
   CREATE SNOW
========================= */

function createSnow() {

  for (let i = 0; i < 80; i++) {

    const flake = document.createElement("i");

    flake.className = "flake";

    const size =
      Math.random() * 4 + 2;

    flake.style.width =
      `${size}px`;

    flake.style.height =
      `${size}px`;

    flake.style.left =
      `${Math.random() * 100}%`;

    flake.style.setProperty(
      "--drift",
      `${Math.random() * 30 - 15}px`
    );

    flake.style.setProperty(
      "--move",
      `${Math.random() * 90 - 45}px`
    );

    flake.style.animationDuration =
      `${Math.random() * 8 + 6}s`;

    flake.style.animationDelay =
      `${-Math.random() * 14}s`;

    flake.style.opacity =
      `${Math.random() * 0.55 + 0.2}`;

    snowLayer.appendChild(flake);
  }
}

createSnow();



/* =========================
   ENTER WORLD
========================= */

enterButton.addEventListener(
  "click",
  () => {

    intro.style.display = "none";

    forestScene.classList.add("active");

    status.textContent =
      "Chapter 01 · Forest";
  }
);



/* =========================
   FIND SNOWFLAKE
========================= */

snowflake.addEventListener(
  "click",
  () => {

    message.classList.add("show");

    snowflake.style.opacity = "0.15";

    snowflake.style.pointerEvents =
      "none";
  }
);



/* =========================
   CONTINUE
========================= */

continueButton.addEventListener(
  "click",
  () => {

    forestScene.classList.remove(
      "active"
    );

    finalScene.classList.add(
      "active"
    );

    status.textContent =
      "Fragment 01 / 03";
  }
);



/* =========================
   RESTART
========================= */

restartButton.addEventListener(
  "click",
  () => {

    finalScene.classList.remove(
      "active"
    );

    intro.style.display = "";

    message.classList.remove(
      "show"
    );

    snowflake.style.opacity = "";

    snowflake.style.pointerEvents =
      "auto";

    status.textContent =
      "Prologue";
  }
);



/* =========================
   MOUSE INTERACTION
========================= */

document
  .querySelector(".game")
  .addEventListener(
    "pointermove",
    (event) => {

      const game =
        document
          .querySelector(".game");

      const rect =
        game.getBoundingClientRect();

      const x =
        (event.clientX - rect.left)
        / rect.width
        - 0.5;

      const y =
        (event.clientY - rect.top)
        / rect.height
        - 0.5;


      /* Move snow */

      snowLayer.style.transform =
        `
        translate(
          ${-x * 10}px,
          ${-y * 7}px
        )
        `;


      /* Move glowing snowflake */

      snowflake.style.marginLeft =
        `${x * 12}px`;

      snowflake.style.marginTop =
        `${y * 8}px`;
    }
  ); 
