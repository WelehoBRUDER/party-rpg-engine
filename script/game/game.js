class Game {
  constructor() {
    this.language = english;
  }

  getText(text) {
    let translatedText = text;
    if (this.language[text] !== undefined) {
      translatedText = this.language[text];
    }
    return translatedText;
  }
}

const game = new Game();
