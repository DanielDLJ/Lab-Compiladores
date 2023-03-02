import {
  createFile,
  createFoler,
  getFileExtension,
} from '../../helpers/fileAndFolderHandler';
import { TextualElement } from './textProducer';

export class ImageInput extends TextualElement {
  public latexRrefName: string;
  public link: string;
  public imageName: string;
  public linkExtension: string;

  constructor(latexRrefName: string, link: string, imageName: string) {
    super();
    this.latexRrefName = latexRrefName;
    this.link = link;
    this.imageName = imageName;
    const linkExtension = getFileExtension(link);
    this.linkExtension = linkExtension
      ? linkExtension.trim().toLowerCase()
      : '';
  }

  genC(): string {
    createFoler('images');
    const path = 'images/' + this.latexRrefName + '.' + this.linkExtension;
    fetch(this.link)
      .then(({ body }) => {
        if (body) {
          createFile(path, body);
        }
      })
      .catch((error) => console.log(error));

    return (
      '\\begin{figure}[h]\n' +
      '\\centering\n' +
      `\\includegraphics[keepaspectratio=true,scale=0.3]{${path}}\n` +
      `\\caption{${this.imageName}}\n` +
      `\\label{${this.latexRrefName}}\n` +
      '\\end{figure}\n'
    );
  }

  getLinkExtension(): string {
    return this.linkExtension;
  }

  getLatexRrefName(): string {
    return this.latexRrefName;
  }
}
