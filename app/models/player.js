export default class Player {
  constructor(name) {
    this.name = name
    this.wins = 0
    this.strength = {
      health: 100,
      energy: 100
    }
    this.experience = 0
    this.attacks = {
      punch: 5,
      kick: 10,
      slap: 1
    }
    this.adons = {
      slap: {
        name: 'knife',
        set: false,
        value: 2,
        cost: 3,
        timer: 8,
        resetTimer: 8
      },
      punch: {
        name: "sword",
        set: false,
        value: 5,
        cost: 6,
        timer: 12,
        resetTimer: 12
      },
      armor: {
        name: "armor",
        set: false,
        value: -5,
        cost: 15,
        timer: 200,
        resetTimer: 200
      }
    }
  }
  setName(event) {
    if ($("#setPlayerName").val()) {
      player.name = $("#setPlayerName").val();
    } else {
      player.name = "Soldier";
    }
    $("#nameBox").remove();
    game.updatePage();
  }
  setAddons(event) {
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
  addonMonitor() {
    for (let addon in player.addons) {
      let tool = player.addons[addon];
      if (!tool.timer) {
        tool.set = false;
        $(`#${tool.name}`).attr("disabled", false);
        tool.timer = tool.resetTimer;
        $(`#${addon}`).text(addon);
      }
    }
  }
}