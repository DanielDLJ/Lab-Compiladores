import { aspectosgerais } from '../../helpers/configLatex';
import { TextualElement } from './textProducer';
import { Title } from './title';

export class Development {
  public title: Title;
  public textBody: TextualElement[];

  constructor(title: Title, textBody: TextualElement[]) {
    this.title = title;
    this.textBody = textBody;
  }

  genC(): void {
    // console.log('Development');
    let text = this.title.genC();
    this.textBody.forEach((item) => {
      text += item.genC();
    });
    aspectosgerais(text);
    console.log('4');
  }
}
