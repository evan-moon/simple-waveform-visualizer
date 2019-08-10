export class Compressor {
  constructor (options) {
    const defaultOption = {
      threshold: -24,
      knee: 30,
      attack: 0.003,
      release: 0.250,
      ratio: 12,
    };
    this.options = Object.assign({}, defaultOption, options);

  }
}