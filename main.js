var saveGame = localStorage.getItem('goldMinerSave')
var gameData = {
  gold: 0,
  goldPerClick: 1,
  goldPerClickCost: 10,
  cursor: 0,
  cursorGoldPerSec: 0.1,
  cursorCost: 15,
  mine1: 0,
  mine1GoldPerSec: 1,
  mine1Cost: 100,
  mine2: 0,
  mine2GoldPerSec: 10,
  mine2Cost: 1100,
  mine4: 0,
  mine4GoldPerSec: 20,
  mine4Cost: 0,
  mine5: 0,
  mine5GoldPerSec: 40,
  mine5Cost: 0,
  mine6: 0,
  mine6GoldPerSec: 80,
  mine6Cost: 0,
  lastTick: Date.now()
}

var upgrades = {
  reinforced: 2
}

function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

function mineGold() {
  gameData.gold += gameData.goldPerClick
  update("goldMined", gameData.gold + " Gold Mined")
}

function buyGoldPerClick() {
  if (gameData.gold >= gameData.goldPerClickCost) {
    gameData.gold -= gameData.goldPerClickCost
    gameData.goldPerClick += 1
    gameData.goldPerClickCost *= 2
    update("goldMined", gameData.gold + " Gold Mined")
    update("perClickUpgrade", "Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold")
  }
}

var mainGameLoop = window.setInterval(function() {
  diff = Date.now() - gameData.lastTick;
  gameData.lastTick = Date.now()
  gameData.gold += gameData.goldPerClick * (diff / 1000)
  update("goldMined", format(gameData.gold, "scientific") + " Gold Mined")
  update("perClickUpgrade", "Upgrade Pickaxe (Currently Level " + format(gameData.goldPerClick, "scientific") + ") Cost: " + format(gameData.goldPerClickCost, "scientific") + " Gold")
}, 1000)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('goldMinerSave', JSON.stringify(gameData))
}, 15000)

function format(number, type) {
	let exponent = Math.floor(Math.log10(number))
	let mantissa = number / Math.pow(10, exponent)
	if (exponent < 3) return number.toFixed(1)
	if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
	if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}

if (typeof saveGame.gold !== "undefined") gameData.gold = saveGame.gold;
if (typeof saveGame.goldPerClick !== "undefined") gameData.goldPerClick = saveGame.goldPerClick;
if (typeof saveGame.goldPerClickCost !== "undefined") gameData.goldPerClickCost = saveGame.goldPerClickCost;
if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;

function tab(tab) {
  // hide all your tabs, then show the one the user selected
  document.getElementById("mineGoldMenu").style.display = "none"
  document.getElementById("shopMenu").style.display = "none"
  document.getElementById(tab).style.display = "inline-block"
}
// go to a tab for the first time, so not all show
tab("mineGoldMenu")

function buyCursor(cursor, cursorCost) {
  gameData.cursor += 1;
  gameData.cursorCost *= 1.12;
  gameData.cursorGoldPerSec += 0.1;
}
function buyMine1(mine1, mine1Cost) {
  gameData.mine1 += 1;
  gameData.mine1Cost *= 1.15;
  gameData.mine1GoldPerSec += 1;
}
function buyMine2(mine2, mine2Cost, mine2GoldPerSec) {
  gameData.mine2 += 1;
  gameData.mine2Cost *= 1.15;
  gameData.mine2GoldPerSec += 8;
}

/*var mineLoop = window.setInterval(function() {
  if gameData.cursor >= 1 {
    gameData.gold += gameData.cursorGoldPerSec
  }
  if gameData.mine1 >= 1 {
    gameData.gold += gameData.mine1GoldPerSec
  }
  if gameData.mine2 >= 1 {
    gameData.gold += gameData.mine2GoldPerSec
  }
}, 1000)*/
