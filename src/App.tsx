import { RecoilRoot } from 'recoil';
import AudioUploader from './components/AudioUploader';
import Controller from './components/Controller';
import WaveForm from './components/Waveform';

function App() {
  return (
    <RecoilRoot>
      <AudioUploader />
      <WaveForm />
      <Controller />
    </RecoilRoot>
  );
}

export default App;
