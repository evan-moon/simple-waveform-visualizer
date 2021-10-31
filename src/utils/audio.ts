import { AudioObject } from '../models/audio';

export async function createAudio(
  context: AudioContext,
  audioFile: ArrayBuffer
): Promise<AudioObject> {
  const buffer = await context.decodeAudioData(audioFile);
  const bufferSourceNode = context.createBufferSource();
  bufferSourceNode.buffer = buffer;
  return {
    context,
    buffer,
    bufferSourceNode,
  };
}
