import { Track } from 'lib/Tracks/Track';

export class AudioTrack extends Track {
  constructor (context) {
    super(context);
    this.audioBuffer = null;
    this.sampleRate = 0;
  }

  setAudio (audioFile) {
    return this.audioContext.decodeAudioData(audioFile).then(buffer => {
      this.audioBuffer = buffer;
      this.sampleRate = buffer.sampleRate;
      this.sourceBuffer = this.audioContext.createBufferSource();
      this.sourceBuffer.buffer = buffer;
      this.sourceBuffer.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
    });
  }

  reset () {
    this.audioContext = new AudioContext();
    this.audioBuffer = null;
    this.sampleRate = 0;
    this.peaks = [];
  }
}