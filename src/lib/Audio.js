export class Audio {
  constructor (context) {
    if (!context) {
      throw new Error('There is no AudioContext');
    }
    this.id = new Date().getTime();
    this.audioContext = context;
    this.audioBuffer = null;
    this.sampleRate = 0;
    this.peaks = [];
    this.sourceBuffer = null;
    this.gainNode = this.audioContext.createGain(); // 트랙 마스터 볼륨
    this.effects = [];
  }

  setAudio (audioFile) {
    return this.audioContext.decodeAudioData(audioFile).then(buffer => {
      this.audioBuffer = buffer;
      this.sampleRate = buffer.sampleRate;
      this.sourceBuffer = this.audioContext.createBufferSource();
      this.sourceBuffer.buffer = buffer;
      this.sourceBuffer.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
      this.parsePeaks();
    });
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

  parsePeaks () {
    const buffer = this.audioBuffer;
    const sampleRate = this.sampleRate;

    const sampleSize = buffer.length / sampleRate;
    const sampleStep = Math.floor(sampleSize / 10) || 1;
    const numberOfChannels = buffer.numberOfChannels;
    const mergedPeaks = [];

    for (let channelIndex = 0; channelIndex < numberOfChannels; channelIndex++) {
      const peaks = buffer.getChannelData(channelIndex);

      Array(sampleRate).fill().forEach((v, newPeakIndex) => {
        const start = Math.floor(newPeakIndex * sampleSize);
        const end = Math.floor(start + sampleSize);
        let min = peaks[0];
        let max = peaks[0];

        for (let sampleIndex = start; sampleIndex < end; sampleIndex += sampleStep) {
          const v = peaks[sampleIndex];

          if (v > max) {
            max = v;
          }
          else if (v < min) {
            min = v;
          }
        }

        if (channelIndex === 0 || max > mergedPeaks[2 * newPeakIndex]) {
          mergedPeaks[2 * newPeakIndex] = max;
        }
        if (channelIndex === 0 || min < mergedPeaks[2 * newPeakIndex + 1]) {
          mergedPeaks[2 * newPeakIndex + 1] = min;
        }
      });
    }

    this.peaks = mergedPeaks;
  }

  reset () {
    this.audioContext = new AudioContext();
    this.audioBuffer = null;
    this.sampleRate = 0;
    this.peaks = [];
  }

  addEffect (effect) {
    const lastNode = this.effects.length > 0
      ? this.effects[this.effects.length - 1].outputNode
      : this.sourceBuffer;

    lastNode.disconnect();
    lastNode.connect(effect.inputNode);
    effect.outputNode.connect(this.gainNode);

    this.effects.push(effect);
  }

  removeEffect (effect) {
    const index = this.effects(effect);
    if (!~index) {
      return;
    }

    const prevNode = index === 0
      ? this.sourceBuffer
      : this.effects[index - 1].outputNode;
    prevNode.disconnect();

    const effector = this.effects[index];
    effector.disconnect();
    this.effects.splice(index, 1);

    const targetNode = this.effects[index] || this.gainNode;
    prevNode.connect(targetNode);
  }
}