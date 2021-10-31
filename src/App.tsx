import { RecoilRoot } from 'recoil';
import AudioUploader from './components/AudioUploader';
import Controller from './components/Controller';
import WaveForm from './components/Waveform';
import EffectorControllers from './components/EffectorControllers';

function App() {
  return (
    <RecoilRoot>
      <AudioUploader />
      <WaveForm />
      <Controller />
      <EffectorControllers />
    </RecoilRoot>
  );
}

export default App;
