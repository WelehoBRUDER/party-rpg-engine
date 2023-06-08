updateScreen();

function createBattleEvent(event) {
  console.log(event);
  if (event.type === "attack") {
    let initialText = `<f>2rem<f><c>green<c>${event.data.attacker.name}<c>white<c> uses <c>gold<c>${event.data.skill.id}<c>white<c> on <c>red<c>${event.data.target.name}!`;
    if (event.success) {
      initialText += ` <c>darkred<c>(-${event.data.totalDamage})`;
    }
    textScreen.append(textSyntax(initialText));
  }
}
