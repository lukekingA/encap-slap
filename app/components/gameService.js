import Game from '../models/game.js'
import Player from "../models/player.js"
import Monster from "../models/monster.js"

//Private
let _state = {
  game: new Game(),
  player: new Player('Soldier'),
  monster: new Monster()
}

let _subscribers = {
  game: [],
  player: [],
  monster: []
}



//Public
export default class GameService {
  constructor() {
    console.log('gameService built')
  }

  get Game() {
    return _state.game
  }
  get Player() {
    return _state.player
  }
  get Monster() {
    return _state.monster
  }

  attack(event) {
    let attack = event.target.id;
    let value = player.attacks[attack];
    if (player.addons[attack] && player.addons[attack].set) {
      player.addons[attack].timer--;
      value += player.addons[attack].value;
    }
    player.addonMonitor();
    value = Math.floor(value + value * ((100 - monster.strength.energy) / 100));
    game.session.plays++;
    player.experience++;
    if (monster.strength.health - value < 0) {
      monster.strength.health = 0;
    } else {
      monster.strength.health -= value;
    }
    game.session.lastHitVal = value;
    monster.monsterAttack();
    game.updatePage();
    if (!monster.strength.health || !player.strength.health) {
      game.winGame();
    }
  }
  replay() {
    player.strength.health = 100;
    monster.strength.health = 100;
    monster.strength.energy = 100;
    game.session.random = Math.floor(Math.random() * 10);
    monster.attacks.bite++;
    monster.attacks.claw++;
    monster.monsterName();
    monster.monsterAge();
    monster.monsterHunger();
    //   This Needsd to be in the controler 
    //
    // Array.from(document.querySelectorAll("#actions button")).forEach(button => {
    //    button.disabled = false;
    //  });
    //  if (game.session.random * 10 < 50) {
    //    $("#bearPicture").attr("src", "assetts/images/bbear.png");
    //  } else {
    //    $("#bearPicture").attr("src", "assetts/images/bear3s.png");
    //  }
    //  game.updatePage();
    //  if ($("#winBox")) {
    //    $("#winBox").remove();
    //  }
  }
  winGame() {
    game.count++;
    if (monster.strength.health < player.strength.health) {
      player.wins++;
    }
  }
  replay() {
    player.strength.health = 100;
    monster.strength.health = 100;
    monster.strength.energy = 100;
    game.session.random = Math.floor(Math.random() * 10);
    monster.attacks.bite++;
    monster.attacks.claw++;
    monster.monsterName();
    monster.monsterAge();
    monster.monsterHunger();
    //   This needs to be in the controler
    //
    //  Array.from(document.querySelectorAll("#actions button")).forEach(button => {
    //    button.disabled = false;
    //  });
    //  if (game.session.random * 10 < 50) {
    //    $("#bearPicture").attr("src", "assetts/images/bbear.png");
    //  } else {
    //    $("#bearPicture").attr("src", "assetts/images/bear3s.png");
    //  }
    //  game.updatePage();
    //  if ($("#winBox")) {
    //    $("#winBox").remove();
    //  }
  }
  reset() {
    game.replay();
    player.experience = 0;
    monster.attacks.claw = 10;
    monster.attacks.bite = 18;
    for (let addon in player.addons) {
      let tool = player.addons[addon];
      tool.set = false;
      tool.timer = tool.resetTimer;
    }
    player.name = "Soldier";
    player.wins = 0;
    game.count = 0;
    game.session.lastHitVal = 0
    for (let addon in player.addons) {
      player.addons[addon].set = false;
    }
    //    This needs to be in the controler
    //
    // $("#knife").attr('disabled', false);
    // $("#sword").attr('disabled', false);
    // $("#arrmor").attr('disabled', false);
    // game.updatePage();
  }
  monsterAge() {
    let age = game.session.random * 5;
    monster.strength.energy -= age + 15;
    monster.strength.age = age < 15 ? "strong" : age < 30 ? "young" : "old";
  }
  monsterHunger() {
    monster.hunger = game.session.random * 10;
  }
  monsterName() {
    let index = 0;
    if (game.session.random < 4) {
      index = 0;
    } else if (game.session.random < 7) {
      index = 1;
    } else {
      index = 2;
    }
    monster.name = monster.names[index];
  }
  monsterAttack() {
    let attackValue = monster.attacks.claw;
    if (Math.ceil(Math.random() * 10) > 5) {
      attackValue = monster.attacks.bite;
    }
    attackValue -= player.addons.armor.set ? player.addons.armor.value : 0;
    attackValue += attackValue * Math.floor(monster.hunger / 100);
    attackValue -= Math.floor(
      attackValue * (monster.strength.energy / 2 / 100)
    );
    if (player.strength.health - attackValue < 0) {
      player.strength.health = 0;
    } else {
      player.strength.health -= attackValue;
    }
  }
}