import { TextualElement } from './textProducer';

export class TextBody {
  public textProducer: TextualElement[];

  constructor(textProducer: TextualElement[]) {
    this.textProducer = textProducer;
  }

  genC(): string {
    let text = '';
    this.textProducer.forEach((item) => {
      text += item.genC();
    });
    return text;
  }
}
