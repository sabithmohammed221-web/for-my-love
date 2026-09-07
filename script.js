const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

const effects = document.getElementById("effects");

let currentScreen = 1;
let candlesBlown = false;


/* =================================
   SHOW SCREEN
================================= */

function showScreen(number) {

    const next =
        document.getElementById(
            "screen" + number
        );

    if (!next) {
        console.log("Screen not found:", number);
        return;
    }

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

    next.classList.add("active");

    currentScreen = number;

    window.scrollTo(0, 0);
}


/* =================================
   MUSIC
================================= */

async function playMusic() {

    try {

        await music.play();

        musicBtn.textContent = "🔊";

    } catch (error) {

        console.log(
            "Music could not start.",
            error
        );

    }
}


musicBtn.addEventListener(
    "click",
    async function () {

        if (music.paused) {

            await playMusic();

        } else {

            music.pause();

            musicBtn.textContent = "♪";

        }

    }
);


/* =================================
   OPEN SURPRISE
================================= */

document
    .getElementById("startBtn")
    .addEventListener(
        "click",
        function () {

            /*
             IMPORTANT:
             Music is attempted,
             but the page continues
             even if the music fails.
            */

            playMusic();

            createConfetti(30);

            createHearts(10);

            showScreen(2);

        }
    );


/* =================================
   NORMAL NEXT BUTTONS
================================= */

document
    .querySelectorAll(".next-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const number =
                    Number(
                        this.dataset.screen
                    );

                showScreen(number);

            }
        );

    });


/* =================================
   YES BUTTON
================================= */

document
    .getElementById("yesBtn")
    .addEventListener(
        "click",
        function () {

            document.getElementById(
                "hint"
            ).textContent =
                "I knew you'd say YES ❤️🥺";

            createConfetti(70);

            createHearts(25);

            setTimeout(
                function () {

                    showScreen(6);

                },
                1000
            );

        }
    );


/* =================================
   NO BUTTON
================================= */

const noBtn =
    document.getElementById("noBtn");

const hint =
    document.getElementById("hint");

let noCount = 0;


function moveNoButton() {

    noCount++;

    const buttonWidth =
        noBtn.offsetWidth;

    const buttonHeight =
        noBtn.offsetHeight;

    const maxX =
        window.innerWidth -
        buttonWidth -
        15;

    const maxY =
        window.innerHeight -
        buttonHeight -
        15;

    const x =
        Math.random() *
        Math.max(maxX, 20);

    const y =
        70 +
        Math.random() *
        Math.max(
            maxY - 70,
            20
        );

    noBtn.style.position = "fixed";

    noBtn.style.left =
        x + "px";

    noBtn.style.top =
        y + "px";


    if (noCount === 1) {

        hint.textContent =
            "Hehe... try again 😏";

    } else if (noCount === 2) {

        hint.textContent =
            "You can't escape the YES ❤️";

    } else {

        hint.textContent =
            "Just press YES 😌❤️";

    }

}


/* Desktop */

noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);


/* Click */

noBtn.addEventListener(
    "click",
    moveNoButton
);


/* Mobile */

noBtn.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveNoButton();

    },
    {
        passive: false
    }
);


/* =================================
   CAKE
================================= */

const cake =
    document.getElementById("cake");

const flame =
    document.getElementById("flame");

const candleText =
    document.getElementById(
        "candleText"
    );

const continueBtn =
    document.getElementById(
        "continueBtn"
    );


cake.addEventListener(
    "click",
    blowCandles
);


function blowCandles() {

    if (candlesBlown) {
        return;
    }

    candlesBlown = true;


    /* Blow out flame */

    flame.classList.add("blown");


    /* Change text */

    candleText.textContent =
        "✨ Wish made... ❤️";


    /* Big celebration */

    createConfetti(150);

    createHearts(50);


    setTimeout(
        function () {

            createConfetti(100);
            createHearts(30);

        },
        500
    );


    setTimeout(
        function () {

            createConfetti(80);
            createHearts(20);

        },
        1000
    );


    /* Show continue */

    setTimeout(
        function () {

            continueBtn.classList.remove(
                "hidden"
            );

        },
        1200
    );

}


/* =================================
   CONTINUE
================================= */

continueBtn.addEventListener(
    "click",
    function () {

        showScreen(7);

        createHearts(30);

        createConfetti(70);

    }
);


/* =================================
   CONFETTI
================================= */

function createConfetti(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );

        piece.className =
            "confetti";


        piece.style.left =
            Math.random() * 100 +
            "vw";


        piece.style.setProperty(
            "--x",
            (
                Math.random() * 260 -
                130
            ) + "px"
        );


        piece.style.animationDelay =
            Math.random() * .7 +
            "s";


        piece.style.animationDuration =
            2.5 +
            Math.random() * 2 +
            "s";


        piece.style.width =
            5 +
            Math.random() * 8 +
            "px";


        piece.style.height =
            8 +
            Math.random() * 12 +
            "px";


        effects.appendChild(
            piece
        );


        setTimeout(
            function () {

                piece.remove();

            },
            5000
        );

    }

}


/* =================================
   HEARTS
================================= */

function createHearts(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(
            function () {

                const heart =
                    document.createElement(
                        "div"
                    );

                heart.className =
                    "floating-heart";

                heart.textContent =
                    Math.random() > .5
                        ? "♥"
                        : "♡";


                heart.style.left =
                    Math.random() * 100 +
                    "vw";


                heart.style.setProperty(
                    "--x",
                    (
                        Math.random() * 220 -
                        110
                    ) + "px"
                );


                heart.style.fontSize =
                    18 +
                    Math.random() * 20 +
                    "px";


                effects.appendChild(
                    heart
                );


                setTimeout(
                    function () {

                        heart.remove();

                    },
                    5000
                );

            },
            i * 50
        );

    }

}


/* =================================
   SONG ERROR
================================= */

music.addEventListener(
    "error",
    function () {

        console.log(
            "❌ song.mpeg was not found."
        );

        console.log(
            "Put song.mpeg in the same folder as index.html."
        );

    }
);
