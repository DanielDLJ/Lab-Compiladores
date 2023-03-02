import { TextualElement } from './textProducer';

export class TextElement extends TextualElement {
  public text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }

  genC(): string {
    return this.text;
  }
}
