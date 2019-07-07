class AudioAnalyzer {
  constructor () {
    this.audioContext = new (AudioContext || webkitAudioContext)();
    this.sourceBuffer = this.audioContext.createBufferSource();
  }

  setAudio (audioFile) {
    this.audioContext.decodeAudioData(audioFile).then(buffer => {
      this.sourceBuffer.buffer = buffer;
      console.log(this.sourceBuffer);
    });
  }

  destroyAudio () {
    this.sourceBuffer = this.audioContext.createBufferSource();
  }
}

export default new AudioAnalyzer();