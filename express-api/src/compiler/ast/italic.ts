import { TextualElement } from './textProducer';

export class ItalicElement extends TextualElement {
  public textProducer: TextualElement;

  constructor(textProducer: TextualElement) {
    super();
    this.textProducer = textProducer;
  }

  genC(): string {
    return '\\textit{' + this.textProducer.genC() + '}';
  }
}
