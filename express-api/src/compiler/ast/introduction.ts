import { TextualElement } from './textProducer';

export class Introduction {
  public textBody: TextualElement[];

  constructor(textBody: TextualElement[]) {
    this.textBody = textBody;
  }

  genC(): string {
    let text = '';
    this.textBody.forEach((item) => {
      text += item.genC();
    });
    return text;
  }
}
