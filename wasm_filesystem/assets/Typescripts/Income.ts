import { _decorator, Component, Label } from "cc";
import { toMillimeter } from "./utils"

const { ccclass, property } = _decorator;

@ccclass("Income")
export class Income extends Component {
  @property(Label)
  IncomeNum: Label = null!;

  updateIncome(income: number) {
    this.IncomeNum.string = toMillimeter(income);
  }
}
