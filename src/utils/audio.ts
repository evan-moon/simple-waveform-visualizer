import { AudioObject } from '../models/audio';

export async function createAudio(
  context: AudioContext,
  audioFile: ArrayBuffer
): Promise<AudioObject> {
  const buffer = await context.decodeAudioData(audioFile);
  const bufferSourceNode = context.createBufferSource();
  bufferSourceNode.buffer = buffer;

  const masterGain = context.createGain();
  bufferSourceNode.connect(masterGain);
  masterGain.connect(context.destination);

  // test
  bufferSourceNode.loop = true;

  return {
    context,
    buffer,
    bufferSourceNode,
    masterGain,
  };
}
