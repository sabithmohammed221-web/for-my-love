let currentScreen = 1;

let cakeCelebrated = false;

let musicStarted = false;


/* =================================
   ELEMENTS
================================= */

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const noButton =
    document.getElementById("noButton");

const questionHint =
    document.getElementById("questionHint");


/* =================================
   START SURPRISE + MUSIC
================================= */

function startSurprise() {

    /* Start the music because this function
       is triggered by the user's tap */

    if (!musicStarted) {

        music.play()
            .then(() => {

                musicStarted = true;

                musicButton.innerHTML = "🔊";

            })
            .catch(() => {

                musicButton.innerHTML = "🎵";

            });

    }

    showScreen(2);
}


/* =================================
   MUSIC PLAY / PAUSE
================================= */

function toggleMusic() {

    if (music.paused) {

        music.play()
            .then(() => {

                musicStarted = true;

                musicButton.innerHTML = "🔊";

            })
            .catch(() => {

                musicButton.innerHTML = "🎵";

            });

    } else {

        music.pause();

        musicButton.innerHTML = "🔇";

    }
}


/* =================================
   CHANGE SCREEN
================================= */

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

        oldScreen.classList.remove(
            "active"
        );

    }


    setTimeout(() => {

        newScreen.classList.add(
            "active"
        );

        currentScreen =
            number;

    }, 300);
}


/* =================================
   LOVE QUESTION
================================= */

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
        (Math.random() * 2 - 1)
        * maxX;


    const randomY =
        (Math.random() * 2 - 1)
        * maxY;


    noButton.style.transform =
        `translate(${randomX}px, ${randomY}px)`;


    if (questionHint) {

        questionHint.innerHTML =
            "Hmm… I don't think that button wants to be pressed 😏❤️";

    }
}


noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


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


noButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        moveNoButton();

    }
);


/* =================================
   YES ANSWER
================================= */

function answerYes() {

    if (questionHint) {

        questionHint.innerHTML =
            "I knew you'd say YES. ❤️";

    }


    createConfetti();


    setTimeout(() => {

        showScreen(6);

    }, 1500);
}


/* =================================
   CAKE CELEBRATION
================================= */

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


    /* Turn flame off */

    candle.classList.add(
        "off"
    );


    /* Birthday message */

    text.innerHTML =
        "Happy Birthday, Haifa! 🎉❤️";


    /* Celebration */

    createConfetti();

    createConfetti();


    /* Show Continue after celebration */

    setTimeout(() => {

        finalButton.classList.add(
            "show"
        );


        text.innerHTML =
            "Your wish is made. ✨❤️";

    }, 2500);
}


/* =================================
   CONFETTI
================================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confetti-container"
        );


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
                    Math.random()
                    *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random()
            *
            100
            +
            "vw";


        piece.style.fontSize =
            (
                12
                +
                Math.random()
                *
                18
            )
            +
            "px";


        piece.style.animationDelay =
            Math.random()
            *
            1.5
            +
            "s";


        container.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, 4500);

    }
}
