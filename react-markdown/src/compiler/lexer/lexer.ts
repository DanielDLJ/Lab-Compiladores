import { CompilerError } from '../ast/compilerError';
import { SymbolType } from './symbol';

export class Lexer {
  private token: SymbolType = SymbolType.EOF;
  private text = '';
  private ident: string | undefined;
  private numero: number | undefined;
  private tokenPos: number;
  private lastTokenPos: number;
  private levelLexico: number;
  private lineNumber: number;
  private contadorAux: number;
  private input: string;
  private allowedSymbolsInTextProducer = [SymbolType.TEXT, SymbolType.NEW_LINE];
  private latexRef: string;
  private imageLink: string;
  private imageName: string;
  private codeName: string;

  constructor(input: string) {
    this.input = input + '\0';
    this.lineNumber = 1;
    this.tokenPos = 0;
    this.levelLexico = 0;
    this.contadorAux = 0;

    //Erro
    this.lastTokenPos = 0;
    this.latexRef = '';
    this.imageLink = '';
    this.imageName = '';
    this.codeName = '';
  }

  nextToken(): void {
    if (this.input[this.tokenPos] === '\n') {
      this.token = SymbolType.NEW_LINE;
      ++this.tokenPos;
    } else if (this.input[this.tokenPos] === '\0') this.token = SymbolType.EOF;
    else if (this.tokenPos < this.input.length) {
      const ch: string = this.input[this.tokenPos];
      if (ch === '	') {
        console.log('Passou Vazio');
      }
      if (ch === '\r') {
        if (
          this.tokenPos + 1 < this.input.length &&
          this.input[this.tokenPos + 1] === '\n'
        ) {
          this.lineNumber++;
          this.token = SymbolType.NEW_LINE;
          this.tokenPos += 2;
        } else {
          this.error('simbolo nao identificado apos barra r');
        }
      } else {
        switch (ch) {
          case '#':
            if (
              this.tokenPos + 4 < this.input.length &&
              this.input[this.tokenPos + 1] === '#' &&
              this.input[this.tokenPos + 2] === '#' &&
              this.input[this.tokenPos + 3] === '#' &&
              this.input[this.tokenPos + 4] === '#'
            ) {
              this.error(`'#' a mais`);
            } else if (
              this.tokenPos + 3 < this.input.length &&
              this.input[this.tokenPos + 1] === '#' &&
              this.input[this.tokenPos + 2] === '#' &&
              this.input[this.tokenPos + 3] === '#'
            ) {
              this.token = SymbolType.TITLE4;
              this.tokenPos += 4;
            } else if (
              this.tokenPos + 2 < this.input.length &&
              this.input[this.tokenPos + 1] === '#' &&
              this.input[this.tokenPos + 2] === '#'
            ) {
              this.token = SymbolType.TITLE3;
              this.tokenPos += 3;
            } else if (
              this.tokenPos + 1 < this.input.length &&
              this.input[this.tokenPos + 1] === '#'
            ) {
              this.token = SymbolType.TITLE2;
              // console.log('E titulo 2', this.input[this.tokenPos]);
              this.tokenPos += 2;
              // console.log('E titulo 2.2', this.input[this.tokenPos]);
            } else {
              if (this.checkWord('# TCC Config')) {
                this.token = SymbolType.TITLE_TCC_CONFIG;
                this.tokenPos += 12;
                break;
              } else if (this.checkWord('# Resumo')) {
                this.token = SymbolType.TITLE_RESUME;
                this.tokenPos += 8;
                break;
              } else if (this.checkWord('# Abstract')) {
                this.token = SymbolType.TITLE_ABSTRACT;
                this.tokenPos += 10;
                break;
              } else if (this.checkWord('# Introdução')) {
                this.token = SymbolType.TITLE_INTRODUCTION;
                this.tokenPos += 12;
                break;
              } else if (this.checkWord('# Apêndice ')) {
                this.token = SymbolType.TITLE_APPENDIX;
                this.tokenPos += 11;
                this.text = this.consumeUntilDelimiter('\n');
                ++this.tokenPos;
                break;
              } else if (this.checkWord('# Anexo ')) {
                this.token = SymbolType.TITLE_ATTACHMENTS;
                this.tokenPos += 8;
                this.text = this.consumeUntilDelimiter('\n');
                ++this.tokenPos;
                break;
              }
              this.token = SymbolType.TITLE1;
              console.log('E titulo 1', this.input[this.tokenPos]);
              ++this.tokenPos;
            }
            this.text = this.consumeUntilDelimiter('\n');
            ++this.tokenPos;
            break;
          case '_':
          case '*':
            if (this.isBold()) {
              this.token = SymbolType.BOLD_DELIMITER;
              this.consumeBold();
              console.log('E Bold');
              break;
            } else if (this.isItalic()) {
              this.token = SymbolType.ITALIC_DELIMITER;
              this.consumeItalic();
              break;
            }
            console.log('Nao E Bold Nem Italic');
            this.consumeTextProducer();
            break;
          case '!':
            if (this.isImage()) {
              this.token = SymbolType.IMAGE;
              this.consumeImage();
              console.log('E imagem');
              break;
            }

            console.log('Nao E imagem');
            this.consumeTextProducer();
            break;
          case '`':
            if (this.isCode()) {
              this.token = SymbolType.CODE_DELIMITER;
              this.consumeCode();
              console.log('E Codigo');
              break;
            }

            console.log('Nao E Codigo');
            this.consumeTextProducer();
            break;
          case 'a':
          case 'c':
          case 't':
          case 'd':
          case 'p':
          case 'o':
          case 'f':
          case 'm':
          case 'l':
          case 'i':
          case 'r':
            if (this.checkWord('autor: ')) {
              this.token = SymbolType.AUTHOR;
              this.tokenPos += 7;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('curso: ')) {
              this.token = SymbolType.COURSE;
              this.tokenPos += 7;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('titulo: ')) {
              this.token = SymbolType.TCC_TITLE;
              this.tokenPos += 8;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('data: ')) {
              this.token = SymbolType.TCC_DATE;
              this.tokenPos += 6;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('palavraChaveUm: ')) {
              this.token = SymbolType.KEYWORD1;
              this.tokenPos += 16;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('palavraChaveDois: ')) {
              this.token = SymbolType.KEYWORD2;
              this.tokenPos += 18;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('orientador: ')) {
              this.token = SymbolType.ADVISOR;
              this.tokenPos += 12;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('coorientador: ')) {
              this.token = SymbolType.CO_ADVISOR;
              this.tokenPos += 14;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('fichaCatalografica: ')) {
              this.token = SymbolType.CATALOG_SHEET;
              this.tokenPos += 20;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('dataDaAprovacao: ')) {
              this.token = SymbolType.APPROVAL_DATE;
              this.tokenPos += 17;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('membroConvidadoUm: ')) {
              this.token = SymbolType.GUEST_MEMBER1;
              this.tokenPos += 19;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('membroConvidadoDois: ')) {
              this.token = SymbolType.GUEST_MEMBER2;
              this.tokenPos += 21;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('local: ')) {
              this.token = SymbolType.LOCAL;
              this.tokenPos += 7;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('instituicao: ')) {
              this.token = SymbolType.INSTITUTION;
              this.tokenPos += 13;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('abstractPalavraChaveUm: ')) {
              this.token = SymbolType.ABSTRACT_KEYWORD1;
              this.tokenPos += 24;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('abstractPalavraChaveDois: ')) {
              this.token = SymbolType.ABSTRACT_KEYWORD2;
              this.tokenPos += 26;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('abstractPalavraChaveTres: ')) {
              this.token = SymbolType.ABSTRACT_KEYWORD3;
              this.tokenPos += 26;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('resumoPalavraChaveUm: ')) {
              this.token = SymbolType.RESUMO_KEYWORD1;
              this.tokenPos += 22;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('resumoPalavraChaveDois: ')) {
              this.token = SymbolType.RESUMO_KEYWORD2;
              this.tokenPos += 24;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            } else if (this.checkWord('resumoPalavraChaveTres: ')) {
              this.token = SymbolType.RESUMO_KEYWORD3;
              this.tokenPos += 24;
              this.text = this.consumeUntilDelimiter('\n');
              ++this.tokenPos;
              break;
            }
            this.consumeTextProducer();
            break;
          default:
            this.consumeTextProducer();
            break;
        }
      }
    }
  }

  private checkWord(word: string): boolean {
    if (
      word.length <= this.input.length &&
      this.input.substring(this.tokenPos, this.tokenPos + word.length) === word
    )
      return true;
    return false;
  }

  private consumeTextProducer() {
    this.text = '';
    let count = 0;
    let finishText = this.finishTextProducer();
    while (this.tokenPos < this.input.length && !finishText) {
      count++;
      finishText = this.finishTextProducer();
      if (count === 2000) break;
    }
  }

  private consumeImage() {
    //![imageREF](https://static.myfigurecollection.net/upload/items/big/687047.jpg 'Cerberus.')

    //consume ![
    this.tokenPos += 2;

    //![imageREF]
    this.latexRef = this.consumeUntilDelimiter(']');

    //consume ](
    this.tokenPos += 2;

    //![imageREF](https://static.myfigurecollection.net/upload/items/big/687047.jpg
    this.imageLink = this.consumeUntilDelimiter(' ');

    //consume space'
    this.tokenPos += 2;

    //![imageREF](https://static.myfigurecollection.net/upload/items/big/687047.jpg 'Cerberus.'
    this.imageName = this.consumeUntilDelimiter(`'`);

    //consume ')
    this.tokenPos += 2;
  }

  private isImage(): boolean {
    //![imageREF](https://static.myfigurecollection.net/upload/items/big/687047.jpg 'Cerberus.')
    let aux = this.tokenPos;

    //![
    if (this.input[aux] !== '!') return false;
    if (aux + 1 < this.input.length && this.input[aux + 1] !== '[')
      return false;

    aux += 2;

    //![imageREF]
    const resultBrackets = this.searchUntilDelimiter(']', aux);
    if (resultBrackets.findDelimiter === false) return false;

    aux = resultBrackets.pos;

    //![imageREF](
    if (aux + 1 < this.input.length && this.input[aux + 1] !== '(')
      return false;

    aux += 2;

    //![imageREF](https://static.myfigurecollection.net/upload/items/big/687047.jpg
    const resultSpace = this.searchUntilDelimiter(' ', aux);
    if (resultSpace.findDelimiter === false) return false;

    aux = resultSpace.pos;

    //![imageREF](https://static.myfigurecollection.net/upload/items/big/687047.jpg '
    if (aux + 1 < this.input.length && this.input[aux + 1] !== `'`)
      return false;

    aux += 2;

    //![imageREF](https://static.myfigurecollection.net/upload/items/big/687047.jpg 'Cerberus.'
    const resultApostrophe = this.searchUntilDelimiter(`'`, aux);
    if (resultApostrophe.findDelimiter === false) return false;

    aux = resultApostrophe.pos;

    //![imageREF](https://static.myfigurecollection.net/upload/items/big/687047.jpg 'Cerberus.')
    if (aux + 1 < this.input.length && this.input[aux + 1] !== ')')
      return false;

    aux += 2;

    return true;
  }

  private consumeCode() {
    //"```" NewLine ProdutorDeTexto NewLine "``` NewLine ”[“ Text “]””[“ Text “]”

    //consume ```
    this.tokenPos += 3;

    //consume\r\n
    // or
    //consume \n
    if (
      this.tokenPos + 1 < this.input.length &&
      this.input[this.tokenPos + 1] === '\r'
    ) {
      if (
        this.tokenPos + 2 < this.input.length &&
        this.input[this.tokenPos + 2] === '\n'
      ) {
        this.tokenPos += 2;
      } else {
        this.tokenPos += 1;
      }
    } else if (
      this.tokenPos + 1 < this.input.length &&
      this.input[this.tokenPos + 1] === '\n'
    ) {
      this.tokenPos += 1;
    }

    //"```" NewLine ProdutorDeTexto NewLine "```
    this.text = this.consumeUntilDelimiter('```');

    //consume ```
    this.tokenPos += 3;

    this.consumeUntilDelimiter('[');

    //consume [
    this.tokenPos++;

    this.codeName = this.consumeUntilDelimiter(']');

    //consume ][
    this.tokenPos += 2;

    this.latexRef = this.consumeUntilDelimiter(']');

    //consume ]
    this.tokenPos++;
  }

  private isCode(): boolean {
    //"```" NewLine ProdutorDeTexto NewLine "``` NewLine ”[“ Text “]””[“ Text “]”
    let aux = this.tokenPos;

    //![
    if (this.input[aux] !== '`') return false;

    if (aux + 1 < this.input.length && this.input[aux + 1] !== '`')
      return false;

    if (aux + 2 < this.input.length && this.input[aux + 2] !== '`')
      return false;

    aux += 3;

    //\r\n
    if (aux + 1 < this.input.length && this.input[aux + 1] === '\r') {
      if (aux + 2 < this.input.length && this.input[aux + 2] === '\n') {
        aux += 2;
      } else {
        aux += 1;
      }
    } else if (aux + 1 < this.input.length && this.input[aux + 1] === '\n') {
      aux += 1;
    } else {
      return false;
    }

    //"```" NewLine ProdutorDeTexto NewLine "```
    const resultGraveAccent = this.searchUntilDelimiter('```', aux);
    if (resultGraveAccent.findDelimiter === false) return false;

    aux = resultGraveAccent.pos;

    //\r\n
    if (aux + 1 < this.input.length && this.input[aux + 1] === '\r') {
      if (aux + 2 < this.input.length && this.input[aux + 2] === '\n') {
        aux += 2;
      } else {
        aux += 1;
      }
    } else if (aux + 1 < this.input.length && this.input[aux + 1] === '\n') {
      aux += 1;
    } else {
      return false;
    }

    //"```" NewLine ProdutorDeTexto NewLine "``` NewLine ”[“ Text “]
    const resultBrackets1 = this.searchUntilDelimiter(']', aux);
    if (resultBrackets1.findDelimiter === false) return false;

    aux = resultBrackets1.pos;

    //"```" NewLine ProdutorDeTexto NewLine "``` NewLine ”[“ Text “]"["
    if (aux + 1 < this.input.length && this.input[aux + 1] !== '[')
      return false;

    aux++;

    //"```" NewLine ProdutorDeTexto NewLine "``` NewLine ”[“ Text “]””[“ Text “]”
    const resultBrackets2 = this.searchUntilDelimiter(']', aux);
    if (resultBrackets2.findDelimiter === false) return false;

    aux = resultBrackets2.pos;

    return true;
  }

  private consumeBold() {
    //**Text**
    //OR
    //__Text__
    if (this.input[this.tokenPos] === '*') {
      //consume **
      this.tokenPos += 2;
      this.text = this.consumeUntilDelimiter('**');
    } else {
      //consume __
      this.tokenPos += 2;
      this.text = this.consumeUntilDelimiter('__');
    }
    //consume **
    //OR
    //consume __
    this.tokenPos += 2;
  }

  private isBold(): boolean {
    //**Text**
    //OR
    //__Text__
    let aux = this.tokenPos;

    //* OR _
    if (this.input[aux] !== '*' && this.input[aux] !== '_') return false;

    //*
    if (this.input[aux] === '*') {
      if (aux + 1 < this.input.length && this.input[aux + 1] !== '*')
        return false;
      aux += 2;
      //**TEXT**
      const resultAsterisk = this.searchUntilDelimiter('**', aux);
      return resultAsterisk.findDelimiter;
      //_
    } else {
      if (aux + 1 < this.input.length && this.input[aux + 1] !== '_')
        return false;
      aux += 2;

      //__Text__
      const resultUnderlined = this.searchUntilDelimiter('__', aux);
      return resultUnderlined.findDelimiter;
    }
  }

  private isItalic(): boolean {
    //*Text*
    //OR
    //_Text_
    let aux = this.tokenPos;

    //* OR _
    if (this.input[aux] !== '*' && this.input[aux] !== '_') return false;

    //*
    if (this.input[aux] === '*') {
      aux++;
      //*TEXT*
      const resultAsterisk = this.searchUntilDelimiter('*', aux);
      return resultAsterisk.findDelimiter;
      //_
    } else {
      aux++;

      //_Text_
      const resultUnderlined = this.searchUntilDelimiter('_', aux);
      return resultUnderlined.findDelimiter;
    }
  }

  private consumeItalic() {
    //*Text*
    //OR
    //_Text_
    if (this.input[this.tokenPos] === '*') {
      //consume *
      this.tokenPos++;
      this.text = this.consumeUntilDelimiter('*');
    } else {
      //consume _
      this.tokenPos++;
      this.text = this.consumeUntilDelimiter('_');
    }
    //consume *
    //OR
    //consume _
    this.tokenPos++;
  }

  private searchUntilDelimiter(
    delimiter: string,
    intialPos: number
  ): {
    text: string;
    pos: number;
    line: number;
    findDelimiter: boolean;
  } {
    let middleText = '';
    let findDelimiter = false;
    let auxPos = intialPos;
    let auxLine = this.lineNumber;

    while (auxPos < this.input.length) {
      middleText += this.input[auxPos];
      if (this.input[auxPos] === '\n') auxLine++;
      if (
        auxPos + delimiter.length < this.input.length &&
        this.input.substring(auxPos, auxPos + delimiter.length) === delimiter
      ) {
        findDelimiter = true;
        auxPos += delimiter.length - 1;
        // auxPos++;
        break;
      }
      auxPos++;
    }
    return {
      text: middleText,
      pos: auxPos,
      line: auxLine,
      findDelimiter,
    };
  }

  private consumeUntilDelimiter(delimiter: string): string {
    let middleText = '';
    let findDelimiter = false;
    while (this.tokenPos < this.input.length) {
      if (this.input[this.tokenPos] === '\n') this.lineNumber++;
      if (
        this.tokenPos + delimiter.length < this.input.length &&
        this.input.substring(
          this.tokenPos,
          this.tokenPos + delimiter.length
        ) === delimiter
      ) {
        findDelimiter = true;
        break;
      } else {
        middleText += this.input[this.tokenPos];
      }
      this.tokenPos++;
      this.contadorAux++;
    }

    if (!findDelimiter) this.error(`Delimiter not found ${delimiter}`);
    return middleText;
  }

  private finishTextProducer(): boolean {
    const char: string = this.input[this.tokenPos];
    switch (char) {
      case '*':
      case '_':
        if (this.isBold() || this.isItalic()) {
          return true;
        }
        this.concatText(char);
        return false;
      // this.error(`'*' a mais`);
      case '#':
        if (
          this.tokenPos + 4 < this.input.length &&
          this.input[this.tokenPos + 1] === '#' &&
          this.input[this.tokenPos + 2] === '#' &&
          this.input[this.tokenPos + 3] === '#' &&
          this.input[this.tokenPos + 4] === '#'
        ) {
          this.error(`0 '#' a mais`);
          return false;
        }
        return true;
      case '!':
        if (this.isImage()) {
          console.log('E imagem');
          return true;
        }
        console.log('Nao E imagem');
        this.concatText(char);
        return false;
      case '`':
        if (this.isCode()) {
          console.log('E Code');
          return true;
        }
        console.log('Nao E Code 2');
        this.concatText(char);
        return false;
      default:
        if (char === '\n') this.token = SymbolType.NEW_LINE;
        if (char === '\0') return true;

        this.concatText(char);
        return false;
    }
  }

  private concatText(char: string) {
    this.token = SymbolType.TEXT;
    this.text += char;
    ++this.tokenPos;
  }

  error(message: string): void {
    throw new CompilerError(this.lineNumber, message, this.token);
  }

  getToken(): SymbolType {
    return this.token;
  }
  getLine(): number {
    return this.lineNumber;
  }
  getText(): string {
    return this.text;
  }
  getLatexRef(): string {
    return this.latexRef;
  }
  getImageLink(): string {
    return this.imageLink;
  }
  getImageName(): string {
    return this.imageName;
  }
  getCodeName(): string {
    return this.codeName;
  }
}
