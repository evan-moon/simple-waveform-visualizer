import './index.css';
import { Audio } from './lib/Audio';
import { WaveForm } from './lib/WaveForm';
import { CompressorControls } from './effectControls/Compressor';
import { ConvolutionReverbControls } from './effectControls/ConvolutionReverb';
import { AlgorithmReverbControls } from './effectControls/AlgorithmReverb';
import { LowPassFilterControls } from './effectControls/LowPassFilter';
import { HighPassFilterControls } from './effectControls/HighPassFilter';

(function () {
  if (!window.AudioContext) {
    const errorMsg = 'Web Audio API is not supported';
    alert(errorMsg);
    throw new Error(errorMsg);
  }
  window.audioEffects = {};
  const audioContext = new (AudioContext || webkitAudioContext)();
  const audio = new Audio(audioContext);

  $('#play-button').on('click', e => {
    audio.play();
  });

  $('#audio-uploader').on('change', e => {
    const file = e.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        audio.setAudio(e.target.result).then(() => {
          const waveForm = new WaveForm(audio);
          waveForm.draw({ svgBoxId: 'waveform', pathGroupId: 'waveform-path-group' });
        });

        document.getElementById('audio-controls').style.display = 'block';
        document.getElementById('master-panel').style.display = 'block';
        document.getElementById('audio-uploader-wrapper').style.display = 'none';
      };
      reader.readAsArrayBuffer(file);
    }
  });

  $('.add-effect-btn').on('click', function () {
    const type = $(this).data('name');

    let effectControl = null;
    switch (type) {
      case 'compressor':
        effectControl = new CompressorControls(audioContext);
        break;
      case 'convolutionReverb':
        effectControl = new ConvolutionReverbControls(audioContext);
        break;
      case 'algorithmReverb':
        effectControl = new AlgorithmReverbControls(audioContext);
        break;
      case 'lowPassFilter':
        effectControl = new LowPassFilterControls(audioContext);
        break;
      case 'highPassFilter':
        effectControl = new HighPassFilterControls(audioContext);
        break;
      default:
        break;
    }

    if (!effectControl || window.audioEffects[type]) {
      return;
    }

    audio.addEffect(effectControl.effector);
    window.audioEffects[type] = effectControl;

    $(`.control-panels-wrapper[data-name="${type}"]`).append(effectControl.getControlDOM());
  });

  document.getElementById('master-gain-controller').oninput = e => {
    const gain = parseInt(e.target.value) / 100;
    audio.setGain(gain * 2);
  };
})();