import { TextualElement } from './textProducer';

export interface ResumeType {
  resumoPalavraChaveUm: string;
  resumoPalavraChaveDois: string;
  resumoPalavraChaveTres: string;
  body: string;
}

export class Resume {
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
