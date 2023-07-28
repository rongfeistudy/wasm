import { find, resources, Prefab, instantiate, Node } from "cc";
import { AudioController } from "../AudioController";
import { AudioEnum } from "../Enums";

export class AudioManager {
  audioController: AudioController | null = null;
  private static _instance: AudioManager | null = null;

  static get instance(): AudioManager {
    if (this._instance === null) {
      this._instance = new AudioManager();
    }
    return this._instance;
  }

  insertGame() {
    const parent = find("Canvas");
    resources.load(
      "ui/prefab/AudioController",
      Prefab,
      (error: Error, data: Prefab) => {
        if (error !== undefined) return;
        const audioControllerNode = instantiate(data);
        if (audioControllerNode === null) return;
        audioControllerNode.active = true;
        this.audioController =
          audioControllerNode.getComponent(AudioController);
        find("Canvas")?.addChild(audioControllerNode);
      }
    );
  }

  // 播放音效
  playShot(shotType: AudioEnum) {
    if (this.audioController) this.audioController.playShot(shotType);
  }

  playBgm() {
    if (this.audioController) this.audioController.playBgm();
  }

  stopBgm() {
    if (this.audioController) this.audioController.stopBgm();
  }
}
