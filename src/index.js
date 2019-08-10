import './index.css';
import { Audio } from './lib/Audio';
import { WaveForm } from './lib/WaveForm';

(function () {
  const inputDOM = document.getElementById('audio-uploader');
  const playButtonDOM = document.getElementById('play-button');
  const gainController = document.getElementById('gain-controller');
  const analyzer = new Audio();

  playButtonDOM.onclick = e => {
    analyzer.play();
  };

  gainController.oninput = e => {
    const gain = parseInt(e.target.value);
    analyzer.setGain((gain / 100) * 2);
  };

  inputDOM.onchange = e => {
    const file = e.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        analyzer.setAudio(e.target.result).then(res => {
          const waveForm = new WaveForm(analyzer);
          waveForm.draw({ svgBoxId: 'waveform', pathGroupId: 'waveform-path-group' });
        });

        playButtonDOM.style.display = 'inline-block';
      };
      reader.readAsArrayBuffer(file);
    }
  }
})();