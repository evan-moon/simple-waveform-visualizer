export class Track {
  constructor (context) {
    this.id = `track-${new Date().getTime()}`;
    this.name = this.id;
    this.audioContext = context;
    this.gainNode = this.audioContext.createGain();
    this.effects = [];
    this.sourceBuffer = this.audioContext.createBufferSource();
    this.effects = [];
  }

  setName (name) {
    this.name = name;
  }

  mute () {
    this.gainNode.gain.value = 0;
  }

  setGain (value) {
    this.gainNode.gain.value = value;
  }

  play () {
    this.sourceBuffer.loop = true;
    this.sourceBuffer.start();
  }

  addEffect (effect) {
    const lastNode = this.effects.length > 0
      ? this.effects[this.effects.length - 1].outputNode
      : this.sourceBuffer;

    lastNode.disconnect();
    lastNode.connect(effect.inputNode);
    effect.outputNode.connect(this.gainNode);

    this.effects = [...this.effects, effect];
  }

  changeEffect (effectId, newEffect) {
    const originEffectorIndex = this.effects.findIndex(e => e.id === effectId);
    const originEffector = this.effects[originEffectorIndex];

    const prevNode = originEffectorIndex === 0
      ? this.sourceBuffer
      : this.effects[originEffectorIndex - 1].outputNode;
    const targetNode = this.effects[originEffectorIndex + 1] || this.gainNode;

    prevNode.disconnect();
    originEffector.outputNode.disconnect();

    prevNode.connect(newEffect.inputNode);
    newEffect.outputNode.connect(targetNode);

    this.effects[originEffectorIndex] = newEffect;
    this.effects = [...this.effects];
  }

  removeEffect (effectId) {
    const index = this.effects.findIndex(e => e.id === effectId);
    if (!~index) {
      return;
    }

    const prevNode = index === 0
      ? this.sourceBuffer
      : this.effects[index - 1].outputNode;
    prevNode.disconnect();

    const targetNode = this.effects[index + 1] || this.gainNode;
    prevNode.connect(targetNode);

    this.effects = this.effects.filter(e => e.id !== effectId);
  }
}