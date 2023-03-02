import { TextProducer } from './textProducer';

export class CodeElement {
  public textProducer: TextProducer;
  public refName: string;
  public codeName: string;

  constructor(textProducer: TextProducer, refName: string, codeName: string) {
    this.textProducer = textProducer;
    this.refName = refName;
    this.codeName = codeName;
  }

  genC(): string {
    return (
      '\\begin{scriptsize}\n' +
      '   \\codeStyle\n' +
      `    \\begin{lstlisting}[caption={${this.codeName}}, label=${this.refName}]\n\n` +
      this.textProducer.genC() +
      '\n\n' +
      '    \\end{lstlisting}\n' +
      '\\end{scriptsize}\n'
    );
  }

  getLatexRrefName(): string {
    return this.refName;
  }
}
