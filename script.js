// ===============================
// SCREEN NAVIGATION
// ===============================

function showScreen(screenNumber) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const nextScreen = document.getElementById("screen" + screenNumber);

    if (nextScreen) {
        nextScreen.classList.add("active");

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


// ===============================
// MUSIC
// ===============================

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

let musicStarted = false;


function startMusic() {

    if (!music) return;

    music.volume = 0.7;

    music.play()
        .then(() => {
            musicStarted = true;

            if (musicButton) {
                musicButton.innerHTML = "🔊";
            }
        })
        .catch(error => {
            console.log("Music could not start:", error);
        });
}


function toggleMusic() {

    if (!music) return;

    if (music.paused) {

        music.play()
            .then(() => {
                musicButton.innerHTML = "🔊";
            })
            .catch(error => {
                console.log("Music error:", error);
            });

    } else {

        music.pause();

        musicButton.innerHTML = "🎵";
    }
}


// ===============================
// OPEN SURPRISE
// ===============================

function startSurprise() {

    // Start music after the user's button click
    startMusic();

    // Move to screen 2
    showScreen(2);

    // Create confetti
    createConfetti();
}


// ===============================
// YES BUTTON
// ===============================

function answerYes() {

    createConfetti();

    setTimeout(() => {
        showScreen(6);
    }, 800);
}


// ===============================
// NO BUTTON
// ===============================

const noButton = document.getElementById("noButton");

if (noButton) {

    noButton.addEventListener("click", function () {

        const maxX = window.innerWidth - noButton.offsetWidth - 30;
        const maxY = window.innerHeight - noButton.offsetHeight - 30;

        const randomX = Math.max(20, Math.random() * maxX);
        const randomY = Math.max(20, Math.random() * maxY);

        noButton.style.position = "fixed";
        noButton.style.left = randomX + "px";
        noButton.style.top = randomY + "px";

        const hint = document.getElementById("questionHint");

        if (hint) {
            hint.innerHTML = "Hehe 😏 Try again ❤️";
        }
    });
}


// ===============================
// CAKE / CANDLES
// ===============================

let candlesBlown = false;


function blowCandles() {

    if (candlesBlown) return;

    candlesBlown = true;

    const flame = document.querySelector(".flame");
    const candleText = document.getElementById("candleText");
    const finalButton = document.getElementById("finalButton");

    if (flame) {
        flame.style.opacity = "0";
        flame.style.transform = "scale(0)";
    }

    if (candleText) {
        candleText.innerHTML = "Wish made... ✨❤️";
    }

    if (finalButton) {
        finalButton.style.display = "inline-block";
    }

    createConfetti();
}


// ===============================
// CONFETTI
// ===============================

function createConfetti() {

    const container = document.getElementById("confetti-container");

    if (!container) return;

    for (let i = 0; i < 50; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.animationDelay = Math.random() * 2 + "s";
        confetti.style.transform =
            "rotate(" + Math.random() * 360 + "deg)";

        container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // Make sure only screen 1 is visible initially
    document.querySelectorAll(".screen").forEach((screen, index) => {

        if (index === 0) {
            screen.classList.add("active");
        } else {
            screen.classList.remove("active");
        }

    });

});
