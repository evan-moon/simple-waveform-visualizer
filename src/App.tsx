import { RecoilRoot } from 'recoil';
import AudioUploader from './components/AudioUploader';
import Controller from './components/Controller';
import WaveForm from './components/Waveform';
import Effectors from './components/Effectors';

function App() {
  return (
    <RecoilRoot>
      <AudioUploader />
      <WaveForm />
      <Controller />
      <Effectors />
    </RecoilRoot>
  );
}

export default App;
