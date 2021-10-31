export class WaveForm {
  constructor(audio) {
    if (!audio) {
      throw new Error('WaveForm needs Audio object');
    }
    this.audio = audio;
  }

  parsePeaks() {
    const buffer = this.audio.audioBuffer;
    const sampleRate = this.audio.sampleRate;

    const sampleSize = buffer.length / sampleRate;
    const sampleStep = Math.floor(sampleSize / 10) || 1;
    const numberOfChannels = buffer.numberOfChannels;
    const mergedPeaks = [];

    for (let channelIndex = 0; channelIndex < numberOfChannels; channelIndex++) {
      const peaks = buffer.getChannelData(channelIndex);

      Array(sampleRate)
        .fill()
        .forEach((v, newPeakIndex) => {
          const start = Math.floor(newPeakIndex * sampleSize);
          const end = Math.floor(start + sampleSize);
          let min = peaks[0];
          let max = peaks[0];

          for (let sampleIndex = start; sampleIndex < end; sampleIndex += sampleStep) {
            const v = peaks[sampleIndex];

            if (v > max) {
              max = v;
            } else if (v < min) {
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

    return mergedPeaks;
  }

  draw({ svgBox, pathGroup }) {
    const sampleRate = this.audio.sampleRate;

    svgBox.setAttribute('viewBox', `0 -1 ${sampleRate} 2`);

    const audioBuffer = this.audio.audioBuffer;
    const peaks = this.parsePeaks();
    if (audioBuffer) {
      const totalPeaks = peaks.length;

      let d = '';
      for (let peakNumber = 0; peakNumber < totalPeaks; peakNumber++) {
        if (peakNumber % 2 === 0) {
          d += ` M${Math.floor(peakNumber / 2)}, ${peaks.shift()}`;
        } else {
          d += ` L${Math.floor(peakNumber / 2)}, ${peaks.shift()}`;
        }
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttributeNS(null, 'd', d);

      pathGroup.appendChild(path);
    }
  }
}
