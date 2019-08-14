export class EffectControls {
  constructor (context, options, name) {
    this.context = context;
    this.options = options;
    this.effector = null;
    this.controllerDOM = $('<div />', { class: 'control-panels' });
    this.controllerDOM.append($('<h5 />', { text: this.name }));
    this.effectorName = name;
  }

  initEffect (effect) {
    this.effector = new effect(this.context, this.options);
  }

  _generateRange (text, { value, max, min }, onInput) {
    const label = $('<label />', { text });
    const mixRange = $('<input />', { type: 'range', value, max, min });
    mixRange.on('input', onInput);

    this.controllerDOM.append(label);
    this.controllerDOM.append(mixRange);
    return [label, mixRange];
  }
}