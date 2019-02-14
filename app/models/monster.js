export default class Monster {
  constructor(d) {
    this.names = ['Ragnor', 'Terrorificus', 'Bill']
    this.name = ''
    this.strength = {
      health: 100,
      energy: 100, //affected by age, random
      age: ""
    }
    this.hunger = 0
    this.attacks = {
      bite: 18,
      claw: 10
    }
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