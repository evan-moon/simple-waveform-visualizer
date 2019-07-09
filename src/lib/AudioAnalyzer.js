class AudioAnalyzer {
  constructor () {
    if (!window.AudioContext) {
      const errorMsg = 'Web Audio API is not supported';
      alert(errorMsg);
      throw new Error(errorMsg);
    }

    this.audioContext = new (AudioContext || webkitAudioContext)();
    this.audioBuffer = null;
    this.waveFormBox = document.getElementById('waveform');
    this.waveFormPathGroup = document.getElementById('waveform-path-group');
    this.sampleRate = 0;
    this.peaks = [];

    this.updateViewboxSize();
  }

  setAudio (audioFile) {
    this.audioContext.decodeAudioData(audioFile).then(buffer => {
      this.audioBuffer = buffer;
      this.sampleRate = buffer.sampleRate;
      this.updateViewboxSize();
      this.parsePeaks();
      this.draw();
      this.play(buffer);
    });
  }
  
  play (buffer) {
    const sourceBuffer = this.audioContext.createBufferSource();
    sourceBuffer.buffer = buffer;
    sourceBuffer.connect(this.audioContext.destination);
    sourceBuffer.start();
  }

  updateViewboxSize () {
    this.waveFormBox.setAttribute('viewBox', `0 -1 ${this.sampleRate} 2`);
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

  draw () {
    if (this.audioBuffer) {
      const peaks = this.peaks;
      const totalPeaks = peaks.length;

      let d = '';
      for(let peakNumber = 0; peakNumber < totalPeaks; peakNumber++) {
        if (peakNumber % 2 === 0) {
          d += ` M${Math.floor(peakNumber / 2)}, ${peaks.shift()}`;
        } else {
          d += ` L${Math.floor(peakNumber / 2)}, ${peaks.shift()}`;
        }
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttributeNS(null, 'd', d);

      this.waveFormPathGroup.appendChild(path);
    }
  }

  reset () {
    this.audioContext = new (AudioContext || webkitAudioContext)();
    this.audioBuffer = null;
    this.sampleRate = 0;
    this.peaks = [];
    this.updateViewboxSize();
  }
}

export default new AudioAnalyzer();