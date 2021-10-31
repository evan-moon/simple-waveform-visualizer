import { RecoilRoot } from 'recoil';
import AudioUploader from './components/AudioUploader';
import WaveForm from './components/Waveform';

function App() {
  return (
    <RecoilRoot>
      <AudioUploader />
      <WaveForm />
    </RecoilRoot>
  );
}

export default App;
