export class AudioAnalyzer {
  constructor () {
    if (!window.AudioContext) {
      const errorMsg = 'Web Audio API is not supported';
      alert(errorMsg);
      throw new Error(errorMsg);
    }

    this.audioContext = new (AudioContext || webkitAudioContext)();
    this.audioBuffer = null;
    this.sampleRate = 0;
    this.peaks = [];
    this.sourceBuffer = null;
  }

  setAudio (audioFile) {
    return this.audioContext.decodeAudioData(audioFile).then(buffer => {
      this.audioBuffer = buffer;
      this.sampleRate = buffer.sampleRate;
      this.sourceBuffer = this.audioContext.createBufferSource();
      this.sourceBuffer.buffer = buffer;
      this.parsePeaks();
    });
  }
  
  play () {
    const sourceBuffer = this.sourceBuffer;
    sourceBuffer.connect(this.audioContext.destination);
    sourceBuffer.start();
  }

  parsePeaks () {
    // const buffer = this.sourceBuffer.buffer;
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
    this.audioContext = new (AudioContext || webkitAudioContext)();
    this.audioBuffer = null;
    this.sampleRate = 0;
    this.peaks = [];
  }
}