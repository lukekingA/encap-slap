import GameService from "./gameService.js"

let _gameService = new GameService()



export default class GameControler {



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
  reset() {
    $("#knife").attr('disabled', false);
    $("#sword").attr('disabled', false);
    $("#arrmor").attr('disabled', false);
    game.updatePage();
  }
  replay() {
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
  }
  winGame() {
    Array.from(document.querySelectorAll("#actions button")).forEach(button => {
      button.disabled = true;
    });
    if (monster.strength.health < player.strength.health) {
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
  }
  playerSetName(event) {
    if ($("#setPlayerName").val()) {
      player.name = $("#setPlayerName").val();
    } else {
      player.name = "Soldier";
    }
    $("#nameBox").remove();
    game.updatePage();
  }
  playerSetAddons(event) {
    let value = event.target.dataset.upgrade;

    if (player.experience >= player.addons[value].cost) {
      player.addons[value].set = true;
      event.target.disabled = true;
      player.experience -= player.addons[value].cost;
      $(`#${value}`).text(event.target.id);
    } else {
      $(".col-6").prepend(
        `<h5 id='drop'>You Need ${player.addons[value].cost -
          player.experience} More Experience</h5>`
      );
      setTimeout(() => {
        $("#drop").remove();
      }, 800);
    }
    game.updatePage();
  }
}