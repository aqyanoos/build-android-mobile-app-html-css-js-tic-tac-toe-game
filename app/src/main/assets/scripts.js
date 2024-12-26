let p1n = "Player 1", p2n = "Player 2", turnP1 = false, boxes = [], p1Boxes = [], p2Boxes = [];
const notificationEl = document.getElementById("notification")
const pn1El = document.getElementById("player1")
const pn2El = document.getElementById("player2")
const gameBoxes = document.querySelectorAll(".game-row div")

function setPlayerName(id, value) {
    if (id === 1) {
        p1n = value
    } else {
        p2n = value
    }
}

function start() {
    notificationEl.innerHTML = "Enjoy playing...";
    pn1El.classList.add("turn")
    turnP1 = true;
    gameBoxes.forEach(box => {
        box.innerHTML = ""
        box.addEventListener("click", handleGame)
    })

    toggleEvents()
}

function stop (txt) {
    notificationEl.innerHTML = txt || "Game stopped..."
    removeTurnAnim()

    boxes = [], p1Boxes = [], p2Boxes = []

    gameBoxes.forEach(box => {
        box.removeEventListener("click", handleGame)
    })

    toggleEvents()
}

function removeTurnAnim() {
    const anim = document.querySelector(".turn")
    if(anim) {
        anim.classList.remove("turn")
    }
}

function toggleEvents() {
    const startBtn = document.getElementById("start-game")
    const stopBtn = document.getElementById("stop-game")

    startBtn.classList.toggle("no-events")
    stopBtn.classList.toggle("no-events")
}

function handleGame(e) {
    if (boxes.includes(e.target.id)) {
        notificationEl.innerHTML = "The Selected Box is Take!"
    } else {
        notificationEl.innerHTML = "Enjoy playing..."

        boxes.push(e.target.id)

        pn1El.classList.toggle("turn")
        pn2El.classList.toggle("turn")

        if (turnP1) {
            e.target.innerHTML = "✖️"
            // check the winner
            checkWinner(p1n, p1Boxes, e.target.id)
        } else {
            e.target.innerHTML = "⭕"
            // check the winner
            checkWinner(p2n, p2Boxes, e.target.id)
        }

        turnP1 = !turnP1

        if (boxes.length === 9) {
            // stop the game
            stop()
        }
    }
}

function checkWinner(name, selectedBoxes, id) {
    selectedBoxes.push(Number(id))

    if (selectedBoxes.length > 2) {
        const winRow = [[101, 102, 103], [201, 202, 203], [301, 302, 303,], [101, 201, 301], [102, 202, 302],
        [103, 203, 303], [101, 202, 303], [103, 202, 301]]

        winRow.forEach(r => {
            let inclAll = 0;

            r.forEach(i=> {
                if(selectedBoxes.includes(i)) {
                    inclAll = inclAll + 1

                    if(inclAll === 3) {
                        const sound_ = document.querySelector(".winner-sound")
                        sound_.src = "001.mp3"
                        sound_.play()

                        setTimeout(()=> {
                            sound_.src = "004.mp3"
                            sound_.play()
                        }, 1500)

                       toggleWinner(name)

                       setTimeout(()=> {
                            tWinProg()
                       }, 12000)
                        // stop the game
                        stop(name + " is the Winner ✨🌟🏆🥇🎉 ")
                    }
                }
            })
        })
    }
}

const winPop = document.querySelector(".winner-popup")
function toggleWinner(name) {
    const winName = document.querySelector(".winner-name")
    winName.innerHTML = name
    winPop.classList.toggle("display")
}

function tWinProg() {
    if(winPop.className.includes("display")){
        winPop.classList.remove("display")
    }
}


winPop.addEventListener("click", function(e){
    if(e.target === winPop) {
        toggleWinner(turnP1 ? p2n : p1n)
    }
})

function toggleMenu() {
    
}
