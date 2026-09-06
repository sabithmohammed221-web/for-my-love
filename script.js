let currentScreen = 1;

let cakeCelebrated = false;


/* =========================
   MUSIC
========================= */

const birthdaySong =
    document.getElementById("birthdaySong");


function startSong() {

    if (!birthdaySong) {
        return;
    }

    birthdaySong.volume = 0.7;

    birthdaySong.play()
        .then(() => {

            console.log("Song started successfully.");

        })
        .catch((error) => {

            console.log("Song could not start:", error);

        });

}


/* =========================
   START SURPRISE
========================= */

function startSurprise() {

    /*
       The user taps this button,
       so the browser allows music
       to start from this action.
    */

    startSong();

    showScreen(2);

}


/* =========================
   SCREEN CHANGE
========================= */

function showScreen(number) {

    const oldScreen =
        document.getElementById(
            "screen" + currentScreen
        );

    const newScreen =
        document.getElementById(
            "screen" + number
        );


    if (!newScreen) {
        return;
    }


    if (oldScreen) {
        oldScreen.classList.remove("active");
    }


    setTimeout(() => {

        newScreen.classList.add("active");

        currentScreen = number;

    }, 300);

}


/* =========================
   NO BUTTON
========================= */

const noButton =
    document.getElementById("noButton");


const questionHint =
    document.getElementById("questionHint");


function moveNoButton() {

    const card =
        document.querySelector(
            ".question-card"
        );


    if (!card || !noButton) {
        return;
    }


    const cardRect =
        card.getBoundingClientRect();


    const maxX =
        Math.max(
            80,
            cardRect.width / 2 - 80
        );


    const maxY =
        Math.max(
            60,
            cardRect.height / 2 - 80
        );


    const randomX =
        (Math.random() * 2 - 1) * maxX;


    const randomY =
        (Math.random() * 2 - 1) * maxY;


    noButton.style.transform =
        `translate(${randomX}px, ${randomY}px)`;


    if (questionHint) {

        questionHint.innerHTML =
            "Hmm… I don't think that button wants to be pressed 😏❤️";

    }

}


/* Desktop */

if (noButton) {

    noButton.addEventListener(
        "mouseenter",
        moveNoButton
    );


    noButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            moveNoButton();

        }
    );


    /* Mobile */

    noButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            moveNoButton();

        },
        {
            passive: false
        }
    );

}


/* =========================
   YES BUTTON
========================= */

function answerYes() {

    if (questionHint) {

        questionHint.innerHTML =
            "I knew you'd say YES, Baby. ❤️";

    }


    createConfetti();


    setTimeout(() => {

        showScreen(6);

    }, 1500);

}


/* =========================
   CAKE
========================= */

function blowCandles() {

    if (cakeCelebrated) {
        return;
    }


    cakeCelebrated = true;


    const candle =
        document.getElementById(
            "candle1"
        );


    const text =
        document.getElementById(
            "candleText"
        );


    const finalButton =
        document.getElementById(
            "finalButton"
        );


    if (candle) {

        candle.classList.add("off");

    }


    if (text) {

        text.innerHTML =
            "Happy Birthday, Haifa! 🎉❤️";

    }


    createConfetti();

    createConfetti();


    setTimeout(() => {

        if (finalButton) {

            finalButton.classList.add(
                "show"
            );

        }


        if (text) {

            text.innerHTML =
                "Your wish is made, Baby. ✨❤️";

        }

    }, 2500);

}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confetti-container"
        );


    if (!container) {
        return;
    }


    const symbols = [

        "❤️",
        "💜",
        "✨",
        "🎉",
        "💗",
        "⭐"

    ];


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti";


        piece.innerText =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random() *
            100 +
            "vw";


        piece.style.fontSize =
            (
                12 +
                Math.random() * 18
            ) +
            "px";


        piece.style.animationDelay =
            Math.random() *
            1.5 +
            "s";


        container.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, 4500);

    }

}
