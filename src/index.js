import './index.css';
import { Audio } from './lib/Audio';
import { WaveForm } from './lib/WaveForm';
import { Compressor } from './effects/Compressor';
import { Reverb } from './effects/Reverb';

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

  document.getElementById('add-reverb-button').onclick = e => {
    window.reverb = new Reverb(audioContext);
    audio.addEffect(reverb);
    document.getElementById('reverb-panel').style.display = 'block';
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
        document.getElementById('add-reverb-button').style.display = 'inline-block';
      };
      reader.readAsArrayBuffer(file);
    }
  };

  document.getElementById('master-gain-controller').oninput = e => {
    const gain = parseInt(e.target.value) / 100;
    audio.setGain(gain * 2);
  };

  document.getElementById('threshold-controller').oninput = e => {
    const value = parseInt(e.target.value);
    window.comp.setThreshold(value);
  };
  document.getElementById('knee-controller').oninput = e => {
    const value = parseFloat(e.target.value) / 1000;
    window.comp.setKnee(value);
  };
  document.getElementById('attack-controller').oninput = e => {
    const value = parseFloat(e.target.value) / 1000;
    window.comp.setAttack(value / 1000);
  };
  document.getElementById('release-controller').oninput = e => {
    const value = parseFloat(e.target.value);
    window.comp.setRelease(value / 100);
  };
  document.getElementById('ratio-controller').oninput = e => {
    const value = parseFloat(e.target.value);
    window.comp.setRatio(value);
  };
  document.getElementById('reverb-mix-controller').oninput = e => {
    const value = parseFloat(e.target.value) / 100;
    window.reverb.setMix(value);
  };
  document.getElementById('reverb-time-controller').oninput = e => {
    const value = parseFloat(e.target.value) / 100;
    window.reverb.setTime(value);
  };
  document.getElementById('reverb-decay-controller').oninput = e => {
    const value = parseFloat(e.target.value) / 100;
    window.reverb.setDecay(value);
  };
  document.getElementById('reverb-gain-controller').oninput = e => {
    const gain = parseFloat(e.target.value) / 100;
    window.reverb.setGain(gain * 2);
  }
})();