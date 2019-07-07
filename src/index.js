import './index.css';
import AudioAnalyzer from './lib/AudioAnalyzer';

(function () {
  const inputDOM = document.getElementById('audio-uploader');
  inputDOM.onchange = e => {
    const file = e.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => AudioAnalyzer.setAudio(e.target.result);
      reader.readAsArrayBuffer(file);
    }
  }
})();