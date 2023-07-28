import { _decorator, Component, AudioClip, AudioSource, assert } from "cc";
import { AudioEnum } from "./Enums";
const { ccclass, property } = _decorator;

@ccclass("AudioController")
export class AudioController extends Component {
  @property({ type: AudioClip })
  clips: AudioClip[] = [];

  _audioSource: AudioSource = null!;

  onLoad() {
    this._audioSource = this.node.getComponent(AudioSource) as AudioSource;
    assert(this._audioSource);
    this.playAllAudio();
  }

  playAllAudio() {
    this._audioSource.volume = 0;

    for (let index = 0; index < this.clips.length; index++) {
      const clip = this.clips[index];
      this._audioSource.playOneShot(clip);
    }
  }

  // 播放音效
  playShot(shotType: AudioEnum) {
    this._audioSource.volume = Number(
      localStorage.getItem("_SlotVoiceStatus") ?? 1
    );
    if (this.clips[shotType])
      this._audioSource.playOneShot(this.clips[shotType]);
  }

  playBgm() {
    this._audioSource.volume = Number(
      localStorage.getItem("_SlotVoiceStatus") ?? 1
    );
    this._audioSource.play();
  }

  stopBgm() {
    this._audioSource.stop();
  }
}
