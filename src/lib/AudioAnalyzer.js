class AudioAnalyzer {
  constructor () {
    if (!window.AudioContext) {
      const errorMsg = 'Web Audio API is not supported';
      alert(errorMsg);
      throw new Error(errorMsg);
    }

    this.audioContext = new (AudioContext || webkitAudioContext)();
    this.sourceBuffer = this.audioContext.createBufferSource();
    this.sampleRate = 10000;
    this.peaks = [];
  }

  setAudio (audioFile) {
    this.audioContext.decodeAudioData(audioFile).then(buffer => {
      this.sourceBuffer.buffer = buffer;
      this.setPeaks();
      this.draw();
    });
  }

  setPeaks () {
    const buffer = this.sourceBuffer.buffer;
    const length = this.sampleRate;

    const sampleSize = buffer.length / this.sampleRate;
    const sampleStep = ~~(sampleSize / 10) || 1;
    const numberOfChannels = buffer.numberOfChannels;
    const mergedPeaks = [];

    for (let channelNumber = 0; channelNumber < numberOfChannels; channelNumber++) {
      const peaks = [];
      const channelData = buffer.getChannelData(channelNumber);

      for (let peakNumber = 0; peakNumber < length; peakNumber++) {
        const start = ~~(peakNumber * sampleSize);
        const end = ~~(start + sampleSize);
        let min = channelData[0];
        let max = channelData[0];

        for (let sampleIndex = start; sampleIndex < end; sampleIndex += sampleStep) {
          const value = channelData[sampleIndex];

          if (value > max) { max = value; }
          if (value < min) { min = value; }
        }

        peaks[2 * peakNumber] = max;
        peaks[2 * peakNumber + 1] = min;

        if (channelNumber === 0 || max > mergedPeaks[2 * peakNumber]) {
          mergedPeaks[2 * peakNumber] = max;
        }

        if (channelNumber === 0 || min < mergedPeaks[2 * peakNumber + 1]) {
          mergedPeaks[2 * peakNumber + 1] = min;
        }
      }
    }

    this.peaks = mergedPeaks;
  }

  draw () {
    const buffer = this.sourceBuffer.buffer;
    if (buffer) {
      const peaks = this.peaks;
      const totalPeaks = peaks.length;

      let d = '';
      for(let peakNumber = 0; peakNumber < totalPeaks; peakNumber++) {
        if (peakNumber%2 === 0) {
          d += ` M${~~(peakNumber/2)}, ${peaks.shift()}`;
        } else {
          d += ` L${~~(peakNumber/2)}, ${peaks.shift()}`;
        }
      }

      const svg = document.getElementById('waveform-path-group');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttributeNS(null, 'd', d);

      svg.appendChild(path);
    }
  }

  reset () {
    this.audioContext = new (AudioContext || webkitAudioContext)();
    this.sourceBuffer = this.audioContext.createBufferSource();
    this.sampleRate = 6000;
    this.peaks = [];
  }
}

export default new AudioAnalyzer();