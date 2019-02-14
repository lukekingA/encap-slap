export default class Game {
  constructor() {
    this.session = {
      plays: 0,
      lastHitVal: 0,
      random: 0
    }
    this.count = 0
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
    },
    winGame() {
      Array.from(document.querySelectorAll("#actions button")).forEach(button => {
        button.disabled = true;
      });
      game.count++;
      let picture = $("#bearPicture").attr("src");
      if (monster.strength.health < player.strength.health) {
        player.wins++;
        $("#bearPicture").attr("src", "assetts/images/discraceBear.png");
        $("#bearPicture").addClass("win");
        setTimeout(() => {
          $("#bearPicture").removeClass("win");
          $("#bearPicture").attr("src", "assetts/images/cool-Bear.png");
        }, 1000);
      } else {
        $("#bearPicture").attr("src", "assetts/images/bear1.png");
        $("#bearPicture").addClass("lose");
        setTimeout(() => {
          $("#bearPicture").removeClass("lose");
          $("#bearPicture").attr("src", picture);
        }, 1800);
      }
      let winner = player.strength.health ? player.name : monster.name;

      game.updatePage();
      $("body").append(
        `<div id="winBox" class="card popup">
        <div class="card-body text-center">
          <h4 class="card-title">${winner} Has Won</h4>
          <button
            id="replay"
            class="btn btn-lg bg-dark text-white"
            type="button"
          onclick="game.replay()">
            Play Again
          </button>
        </div>
      </div>`
      );
    },
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
      Array.from(document.querySelectorAll("#actions button")).forEach(button => {
        button.disabled = false;
      });
      if (game.session.random * 10 < 50) {
        $("#bearPicture").attr("src", "assetts/images/bbear.png");
      } else {
        $("#bearPicture").attr("src", "assetts/images/bear3s.png");
      }
      game.updatePage();
      if ($("#winBox")) {
        $("#winBox").remove();
      }
    },
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
      $("#knife").attr('disabled', false);
      $("#sword").attr('disabled', false);
      $("#arrmor").attr('disabled', false);
      game.updatePage();
    },
    updatePage() {
      $("#monsterName").text(monster.name);
      $("#monsterAge").text(monster.strength.age);
      $("#monsterHunger").text(monster.hunger);
      $("#monsterHealth").text(monster.strength.health);
      if (monster.strength.health < 35) {
        $("#monsterName~div>.progressBar span").css("background-color", "red");
      } else {
        $("#monsterName~div>.progressBar span").css(
          "background-color",
          "rgb(43, 194, 83)"
        );
      }
      $("#monsterName~div>.progressBar span").css(
        "width",
        `${monster.strength.health}%`
      );
      if (player.strength.health < 35) {
        $("#playerName~div>.progressBar span").css("background-color", "red");
      } else {
        $("#playerName~div>.progressBar span").css(
          "background-color",
          "rgb(43, 194, 83)"
        );
      }
      $("#playerName~div>.progressBar span").css(
        "width",
        `${player.strength.health}%`
      );
      $("#playerName").text(player.name);
      $("#playerHealth").text(player.strength.health);
      $("#playerExperience").text(player.experience);
      $("#games").text(game.count);
      $("#wins").text(player.wins);
      $("#lastHitValue").text(game.session.lastHitVal);
    }
}