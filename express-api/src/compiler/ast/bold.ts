import { TextualElement } from './textProducer';

export class BoldElement extends TextualElement {
  public textProducer: TextualElement;

  constructor(textProducer: TextualElement) {
    super();
    this.textProducer = textProducer;
  }

  genC(): string {
    return '\\textbf{' + this.textProducer.genC() + '}';
  }
}
