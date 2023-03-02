import { TextualElement } from './textProducer';

export class Attachments {
  public title: string;
  public textBody: TextualElement[];

  constructor(title: string, textBody: TextualElement[]) {
    this.title = title.replace(/\n|\r/g, '').trim();
    this.textBody = textBody;
  }

  genC(): string {
    let text = `\\chapter{${this.title}}\n`;
    this.textBody.forEach((item) => {
      text += item.genC();
    });
    return text;
  }
}
