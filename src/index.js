import './index.css';
import AudioAnalyzer from './lib/AudioAnalyzer';

(function () {
  const inputDOM = document.getElementById('audio-uploader');
  const playButtonDOM = document.getElementById('play-button');

  playButtonDOM.onclick = e => {
    AudioAnalyzer.play();
  }

  inputDOM.onchange = e => {
    const file = e.currentTarget.files[0];
    if (file) {
      AudioAnalyzer.reset();
      const reader = new FileReader();
      reader.onload = e => {
        AudioAnalyzer.setAudio(e.target.result)
        playButtonDOM.style.display = 'inline-block';
      };
      reader.readAsArrayBuffer(file);
    }
  }
})();