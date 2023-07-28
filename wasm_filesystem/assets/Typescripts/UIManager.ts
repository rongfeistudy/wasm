import { Node, find, resources, instantiate, Prefab } from "cc";

// UISetting.prefab
export enum DialogDef {
  Rule = "Rule",
  Guide = "Guide",
  Record = "Record",
}

export class UIManager {
  uiRoot: Node | null = null;

  panels: Map<string, Node> = new Map();

  private static _instance: UIManager | null = null;

  static get instance(): UIManager {
    if (this._instance === null) {
      this._instance = new UIManager();
    }
    return this._instance;
  }

  openPanel(name: string, bringToTop = false) {
    if (this.uiRoot === null) this.uiRoot = find("Canvas") as Node;
    if (this.panels.has(name)) {
      const panel = this.panels.get(name);
      if (!panel) return;

      panel.active = true;
      if (bringToTop) {
        const index = this.uiRoot.children.length - 1;
        panel.setSiblingIndex(index);
      }
      return;
    }

    resources.load(
      `ui/prefab/${name}`,
      Prefab,
      (error: Error, data: Prefab) => {
        if (error !== undefined) return;
        if (this.uiRoot === null) return;
        const panel = instantiate(data);
        panel.active = true;
        this.uiRoot.addChild(panel);
        this.panels.set(name, panel);
        if (bringToTop) {
          const index = this.uiRoot.children.length - 1;
          panel.setSiblingIndex(index);
        }
      }
    );
  }

  closePanel(name: string, destory = false) {
    if (!this.panels.has(name)) return;

    const panel = this.panels.get(name);
    if (!panel) return;

    panel.active = false;

    if (destory) {
      this.panels.delete(name);
      panel.removeFromParent();
    }
  }

  openDialog(name: string, bringToTop: boolean) {
    for (const dialogDef in DialogDef) {
      if (dialogDef === name) {
        this.openPanel(name, bringToTop);
      } else {
        this.closePanel(dialogDef);
      }
    }
  }

  closeDialog(destroy = false) {
    for (const Dialog in DialogDef) {
      this.closePanel(Dialog, destroy);
    }
  }
}
