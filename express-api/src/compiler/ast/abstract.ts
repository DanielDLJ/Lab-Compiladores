import { TextualElement } from './textProducer';

export interface AbstractType {
  abstractPalavraChaveUm: string;
  abstractPalavraChaveDois: string;
  abstractPalavraChaveTres: string;
  body: string;
}

export class Abstract {
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
