// import {getAudioContext} from 'wsrtc/ws-audio-context.js';
import microphoneWorkletUrl from './microphone-worklet.js?url';

let audioContext = null;
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

class AudioManager {
  constructor() {
    this.audioContext = null;
  }

  getAudioContext() {
    if (!this.audioContext) {
      this.audioContext = getAudioContext();
      this.audioContext.gain = this.audioContext.createGain();
      this.audioContext.gain.connect(this.audioContext.destination);
      this.audioContext.audioWorklet.addModule(microphoneWorkletUrl);
    }
    return this.audioContext;
  }

  setVolume(volume) {
    const audioContext = this.getAudioContext();
    audioContext.gain.gain.value = volume;
  }

  playBuffer(audioBuffer) {
    const audioContext = this.getAudioContext();
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioContext.destination);
    sourceNode.start();
  }
}
export default new AudioManager();