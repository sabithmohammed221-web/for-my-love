```javascript
/* =========================================
   MUSIC
========================================= */

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

let musicStarted = false;


/* Start music */

function startMusic() {

    if (!music) {
        console.log("Music element not found.");
        return;
    }

    music.volume = 0.7;

    const playPromise = music.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicStarted = true;

                if (musicButton) {
                    musicButton.innerHTML = "🔊";
                }

            })
            .catch(error => {

                console.log(
                    "Music could not start:",
                    error
                );

            });
    }
}


/* Music button */

function toggleMusic() {

    if (!music) return;


    if (music.paused) {

        music.play()
            .then(() => {

                if (musicButton) {
                    musicButton.innerHTML = "🔊";
                }

            })
            .catch(error => {

                console.log(
                    "Music error:",
                    error
                );

            });

    } else {

        music.pause();

        if (musicButton) {
            musicButton.innerHTML = "🎵";
        }
    }
}


/* =========================================
   SCREEN NAVIGATION
========================================= */

function showScreen(number) {

    const screens =
        document.querySelectorAll(".screen");


    screens.forEach(screen => {

        screen.classList.remove("active");

    });


    const nextScreen =
        document.getElementById(
            "screen" + number
        );


    if (nextScreen) {

        nextScreen.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        console.log(
            "Screen not found:",
            number
        );

    }
}


/* =========================================
   OPEN SURPRISE
========================================= */

function startSurprise() {

    /*
       The music starts here because
       this function is triggered by
       the user's button click.
    */

    startMusic();

    showScreen(2);

    createConfetti();

    createHearts();
}


/* =========================================
   YES BUTTON
========================================= */

function answerYes() {

    createConfetti();

    createHearts();

    const hint =
        document.getElementById("questionHint");

    if (hint) {

        hint.innerHTML =
            "I knew you'd say YES ❤️🥺";

    }


    setTimeout(() => {

        showScreen(6);

    }, 1200);
}


/* =========================================
   NO BUTTON
========================================= */

const noButton =
    document.getElementById("noButton");


if (noButton) {

    noButton.addEventListener(
        "click",
        function () {

            const buttonWidth =
                noButton.offsetWidth;

            const buttonHeight =
                noButton.offsetHeight;


            const maxX =
                window.innerWidth -
                buttonWidth -
                20;

            const maxY =
                window.innerHeight -
                buttonHeight -
                20;


            const randomX =
                Math.max(
                    10,
                    Math.random() * maxX
                );

            const randomY =
                Math.max(
                    10,
                    Math.random() * maxY
                );


            noButton.style.position =
                "fixed";

            noButton.style.left =
                randomX + "px";

            noButton.style.top =
                randomY + "px";


            const hint =
                document.getElementById(
                    "questionHint"
                );


            if (hint) {

                hint.innerHTML =
                    "Hehe 😏 You can't escape the YES ❤️";

            }

        }
    );
}


/* =========================================
   CAKE
========================================= */

let candlesBlown = false;


function blowCandles() {

    /*
       Prevent the cake from triggering
       repeatedly.
    */

    if (candlesBlown) return;

    candlesBlown = true;


    const flame =
        document.getElementById("flame");

    const candleText =
        document.getElementById(
            "candleText"
        );

    const finalButton =
        document.getElementById(
            "finalButton"
        );


    /* Blow out flame */

    if (flame) {

        flame.classList.add("blown");

    }


    /* Change text */

    if (candleText) {

        candleText.innerHTML =
            "✨ Wish made... ❤️";

        candleText.style.transform =
            "scale(1.1)";

    }


    /*
       BIG CELEBRATION
    */

    createConfetti(100);

    createHearts(30);


    /* Second wave */

    setTimeout(() => {

        createConfetti(80);

        createHearts(20);

    }, 500);


    /* Third wave */

    setTimeout(() => {

        createConfetti(60);

        createHearts(15);

    }, 1100);


    /*
       Show final button
    */

    setTimeout(() => {

        if (finalButton) {

            finalButton.style.display =
                "inline-block";

        }

    }, 1300);
}


/* =========================================
   CONFETTI
========================================= */

function createConfetti(amount = 50) {

    const container =
        document.getElementById(
            "confetti-container"
        );


    if (!container) return;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const confetti =
            document.createElement("div");


        confetti.className =
            "confetti";


        /*
           Random horizontal position
        */

        confetti.style.left =
            Math.random() * 100 + "%";


        /*
           Random size
        */

        const size =
            Math.random() * 8 + 5;

        confetti.style.width =
            size + "px";

        confetti.style.height =
            size * 1.6 + "px";


        /*
           Random animation duration
        */

        confetti.style.animationDuration =
            Math.random() * 2 + 2.5 + "s";


        /*
           Random delay
        */

        confetti.style.animationDelay =
            Math.random() * .8 + "s";


        /*
           Different shapes
        */

        if (Math.random() > .7) {

            confetti.style.borderRadius =
                "50%";

        }


        container.appendChild(confetti);


        /*
           Remove after animation
        */

        setTimeout(() => {

            confetti.remove();

        }, 5000);

    }
}


/* =========================================
   FLOATING HEARTS
========================================= */

function createHearts(amount = 12) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(() => {

            const heart =
                document.createElement("div");


            heart.className =
                "floating-heart";


            const hearts = [
                "❤️",
                "💗",
                "💖",
                "💕",
                "💓",
                "💘"
            ];


            heart.innerHTML =
                hearts[
                    Math.floor(
                        Math.random() *
                        hearts.length
                    )
                ];


            /*
               Random starting position
            */

            heart.style.left =
                Math.random() * 100 + "%";


            /*
               Random size
            */

            heart.style.fontSize =
                Math.random() * 20 + 18 + "px";


            /*
               Random sideways movement
            */

            const movement =
                (Math.random() * 200) - 100;


            heart.style.setProperty(
                "--heart-x",
                movement + "px"
            );


            /*
               Random speed
            */

            heart.style.animationDuration =
                Math.random() * 1.5 + 3 + "s";


            document.body.appendChild(
                heart
            );


            setTimeout(() => {

                heart.remove();

            }, 5000);

        }, i * 80);

    }
}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const screens =
            document.querySelectorAll(
                ".screen"
            );


        /*
           Make sure Screen 1 is
           the first screen.
        */

        screens.forEach(
            (screen, index) => {

                if (index === 0) {

                    screen.classList.add(
                        "active"
                    );

                } else {

                    screen.classList.remove(
                        "active"
                    );

                }

            }
        );


        /*
           Check whether song exists
           in the expected location.
        */

        if (music) {

            music.addEventListener(
                "error",
                function () {

                    console.log(
                        "⚠️ song.mpeg could not be loaded. Check the filename and location."
                    );

                }
            );

        }

    }
);
```
