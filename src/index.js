import './index.css';
import { Audio } from './lib/Audio';
import { WaveForm } from './lib/WaveForm';
import {Compressor} from './effects/Compressor';

(function () {
  if (!window.AudioContext) {
    const errorMsg = 'Web Audio API is not supported';
    alert(errorMsg);
    throw new Error(errorMsg);
  }

  const audioContext = new (AudioContext || webkitAudioContext)();
  const audio = new Audio(audioContext);

  document.getElementById('play-button').onclick = e => {
    audio.play();
  };

  document.getElementById('add-comp-button').onclick = e => {
    window.comp = new Compressor(audioContext);
    audio.addEffect(comp);
    document.getElementById('compressor-panel').style.display = 'block';
  };

  document.getElementById('audio-uploader').onchange = e => {
    const file = e.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        audio.setAudio(e.target.result).then(() => {
          const waveForm = new WaveForm(audio);
          waveForm.draw({ svgBoxId: 'waveform', pathGroupId: 'waveform-path-group' });
        });

        document.getElementById('play-button').style.display = 'inline-block';
        document.getElementById('add-comp-button').style.display = 'inline-block';
        document.getElementById('master-panel').style.display = 'inline-block';
      };
      reader.readAsArrayBuffer(file);
    }
  };

  document.getElementById('master-gain-controller').oninput = e => {
    const gain = parseInt(e.target.value);
    audio.setGain((gain / 100) * 2);
  };

  document.getElementById('threshold-controller').oninput = e => {
    const value = parseInt(e.target.value);
    window.comp.setThreshold(value);
  };
  document.getElementById('knee-controller').oninput = e => {
    const value = parseInt(e.target.value);
    window.comp.setKnee(value);
  };
  document.getElementById('attack-controller').oninput = e => {
    const value = parseInt(e.target.value);
    window.comp.setAttack(value / 1000);
  };
  document.getElementById('release-controller').oninput = e => {
    const value = parseInt(e.target.value);
    window.comp.setRelease(value / 100);
  };
  document.getElementById('ratio-controller').oninput = e => {
    const value = parseInt(e.target.value);
    window.comp.setRatio(value);
  };
})();