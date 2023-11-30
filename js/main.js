let startSpan = document.querySelector(".start-buttom span")
let gameBlocks = document.querySelectorAll(".memory-game-blocks .game-block")
let mainGame = document.querySelector(".memory-game-blocks")
let timer = document.querySelector(".timer span")
startSpan.onclick = function() {

  let yourName = prompt("What Is Your Name")

  document.querySelector(".start-buttom").remove()

  if (yourName != "") {
    document.querySelector(".info-container .name span").innerHTML = yourName
  } else {
    document.querySelector(".info-container .name span").innerHTML = "unknown"
  }

  let counte = setInterval(() => {
    timer.innerHTML--
    if (timer.innerHTML == 0) {
      clearInterval(counte)
      for (let i = 0; i < gameBlocks.length; i++) {
        var blocklArray = Array.from([gameBlocks[i].classList.contains("has-matched")])
      }
      console.log(blocklArray == 'true' ? "yes" : "no")
      if (blocklArray == 'true') {
        document.querySelector(".good-game").style.display = "block"
      } else {
        document.querySelector(".ooh-shit").style.display = "block"
      }
    }
  }, duratin)
}

// gameBlocks.forEach((block => {
//   let blocklArray = Array.from([block.classList.contains("has-matched")])
//   console.log(blocklArray.includes(true))
//   if (blocklArray.includes(true) && timer.textContent == 0) {
//     document.querySelector(".good-game").style.display = "block"
//   } else {
//     document.querySelector(".ooh-shit").style.display = "block"
//   }
  
// }))
let duratin = 1000

let order = [...Array(gameBlocks.length).keys()]

shuffle(order)

gameBlocks.forEach((block, index) => {

  block.style.order = order[index]

  block.addEventListener("click", (e) => {

    flipBlock(block)

  })
})

function flipBlock(currentBlock) {

  currentBlock.classList.add("is-flipped")

  let allflippedBlocks = Array.from(gameBlocks).filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

  if (allflippedBlocks.length === 2) {

    stopClicking()

    checkMatchedBlocks(allflippedBlocks[0], allflippedBlocks[1])

  }
}

function checkMatchedBlocks(blockOne, blockTwo) {

  let tries = document.querySelector(".tries span")

  if (blockOne.dataset.technology !== blockTwo.dataset.technology) {
    setTimeout(() => {
      tries.innerHTML++
      blockOne.classList.remove("is-flipped")
      blockTwo.classList.remove("is-flipped")
    }, duratin);
  } else if (blockOne.dataset.technology === blockTwo.dataset.technology) {
      blockOne.classList.remove("is-flipped")
      blockTwo.classList.remove("is-flipped")

      blockOne.classList.add("has-matched")
      blockTwo.classList.add("has-matched")
  }

}

function shuffle(array) {
  let current = array.length,
      tamp,
      random

  while (current > 0) {
    random = Math.floor(Math.random() * current)

    current--

    tamp = array[current]

    array[current] = array[random]

    array[random] = tamp
  }

  return array
}

function stopClicking() {

  document.querySelector(".memory-game-blocks").classList.add("no-clicking")

  setTimeout(() => {
    document.querySelector(".memory-game-blocks").classList.remove("no-clicking")
  }, duratin)

}