import { AudioObject } from '../models/audio';

export function parseWaveformPeaks({ buffer }: AudioObject) {
  const sampleRate = buffer.sampleRate;

  const sampleSize = buffer.length / sampleRate;
  const sampleStep = Math.floor(sampleSize / 10) || 1;
  const numberOfChannels = buffer.numberOfChannels;
  const mergedPeaks: number[] = [];

  for (let channelIndex = 0; channelIndex < numberOfChannels; channelIndex++) {
    const peaks = buffer.getChannelData(channelIndex);

    Array(sampleRate)
      .fill(0)
      .forEach((_, newPeakIndex) => {
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

export function getWaveformSVGPath(audio: AudioObject) {
  const peaks = parseWaveformPeaks(audio);
  if (audio.buffer) {
    const totalPeaks = peaks.length;

    let d = '';
    for (let peakNumber = 0; peakNumber < totalPeaks; peakNumber++) {
      if (peakNumber % 2 === 0) {
        d += ` M${Math.floor(peakNumber / 2)}, ${peaks.shift()}`;
      } else {
        d += ` L${Math.floor(peakNumber / 2)}, ${peaks.shift()}`;
      }
    }

    return d;
  } else {
    return '';
  }
}
