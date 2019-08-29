import { Effect } from './Effect';

export class Tremolo extends Effect {
  constructor (context, options) {
    const defaultOption = {
      speed: 4,
      depth: 1,
      mix: 0.8,
    };
    super(context, defaultOption, options);

    this.wetNode = this.context.createGain();
    this.dryNode = this.context.createGain();

    this.tremoloNode = this.context.createGain();
    this.tremoloNode.gain.value = 0;

    this.shaperNode = this.context.createWaveShaper();
    this.shaperNode.curve = new Float32Array([ 0, 1 ]);
    this.shaperNode.connect(this.tremoloNode.gain);

    this.lfoNode = this.context.createOscillator();
    this.lfoNode.connect(this.shaperNode);
    this.lfoNode.type = 'sine';

    this.inputNode.connect(this.dryNode);
    this.dryNode.connect(this.outputNode);

    this.lfoNode.start(0);
    this.inputNode.connect(this.tremoloNode);
    this.tremoloNode.connect(this.wetNode);
    this.wetNode.connect(this.outputNode);
  }

  setMix (value) {
    this.options.mix = value;
    this.wetNode.gain.value = value;
    this.dryNode.gain.value = 1 - value;
  }

  setSpeed (value) {
    this.options.speed = value;
    this.lfoNode.frequency.value = value;
  }

  setDepth (value) {
    this.options.depth = value;
    this.shaperNode.curve = new Float32Array([ 1 - value, 1]);
  }
}