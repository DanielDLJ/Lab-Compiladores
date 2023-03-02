import { TextualElement } from './textProducer';

export class Paragraph extends TextualElement {
  public elements: TextualElement[];

  constructor(elements: TextualElement[]) {
    super();
    this.elements = elements;
  }

  pushTextualElement(newTextualElement: TextualElement) {
    this.elements.push(newTextualElement);
  }

  genC(): string {
    let text = '';
    this.elements.forEach((item) => {
      text += item.genC();
    });
    return text;
  }
}
