import { TextProducer } from './textProducer';

export class Title extends TextProducer {
  public level: number;
  public title: string;

  constructor(title: string, level: number) {
    super();
    this.title = title.replace(/\n|\r/g, '').trim();
    this.level = level;
  }

  genC(): string {
    if (this.level === 1) return `\\section{${this.title}}\n`;
    if (this.level === 2) return `\\subsection{${this.title}}\n`;
    if (this.level === 3) return `\\subsubsection{${this.title}}\n`;
    return `\\subsubsubsection{${this.title}}\n`;
  }
}
