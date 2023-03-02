import { Abstract } from './ast/abstract';
import { Appendix } from './ast/appendix';
import { Attachments } from './ast/attachments';
import { BoldElement } from './ast/bold';
import { CodeElement } from './ast/code';
import { Development } from './ast/development';
import { ImageInput } from './ast/image';
import { Introduction } from './ast/introduction';
import { ItalicElement } from './ast/italic';
import { Paragraph } from './ast/paragraph';
import { Program } from './ast/program';
import { Resume } from './ast/resume';
import { TccConfig, TccConfigType } from './ast/tccConfig';
import { TextElement } from './ast/text';
import { TextualElement } from './ast/textProducer';
import { Title } from './ast/title';
import { Lexer } from './lexer/lexer';
import { SymbolType } from './lexer/symbol';

export class Compiler {
  public lexer: Lexer;
  public latexRrefName: string[] = [];
  public appendixRrefName: string[] = [];
  public attachmentsRrefName: string[] = [];
  private textProducerToken: SymbolType[] = [
    SymbolType.TEXT,
    SymbolType.ITALIC_DELIMITER,
    SymbolType.BOLD_DELIMITER,
    SymbolType.CODE_DELIMITER,
    SymbolType.NEW_LINE,
    SymbolType.TITLE1,
    SymbolType.TITLE2,
    SymbolType.TITLE3,
    SymbolType.TITLE4,
    SymbolType.IMAGE,
  ];

  private textProducerWithoutTitleToken: SymbolType[] = [
    SymbolType.TEXT,
    SymbolType.ITALIC_DELIMITER,
    SymbolType.BOLD_DELIMITER,
    SymbolType.CODE_DELIMITER,
    SymbolType.NEW_LINE,
    SymbolType.IMAGE,
  ];

  private tccConfigToken: SymbolType[] = [
    SymbolType.AUTHOR,
    SymbolType.COURSE,
    SymbolType.TCC_TITLE,
    SymbolType.TCC_DATE,
    SymbolType.KEYWORD1,
    SymbolType.KEYWORD2,
    SymbolType.ADVISOR,
    SymbolType.CO_ADVISOR,
    SymbolType.CATALOG_SHEET,
    SymbolType.APPROVAL_DATE,
    SymbolType.GUEST_MEMBER1,
    SymbolType.GUEST_MEMBER2,
    SymbolType.LOCAL,
    SymbolType.INSTITUTION,
    SymbolType.ABSTRACT_KEYWORD1,
    SymbolType.ABSTRACT_KEYWORD2,
    SymbolType.ABSTRACT_KEYWORD3,
    SymbolType.RESUMO_KEYWORD1,
    SymbolType.RESUMO_KEYWORD2,
    SymbolType.RESUMO_KEYWORD3,
    SymbolType.NEW_LINE,
  ];

  private acceptedImageTypes = ['png', 'jpg', 'jpeg'];

  constructor(input: string) {
    this.lexer = new Lexer(input);
  }

  public program(): Program {
    console.log('Start program');
    const tccConfig = this.tccConfig();
    const resume = this.resume();
    const abstract = this.abstract();
    const introduction = this.introduction();
    const development = this.development();
    const appendix = this.appendix();
    const attachments = this.attachments();

    return new Program(
      tccConfig,
      resume,
      abstract,
      introduction,
      development,
      appendix,
      attachments
    );
  }

  private tccConfig(): TccConfig {
    this.lexer.nextToken();
    const config: TccConfigType = {
      autor: '',
      curso: '',
      titulo: '',
      data: '',
      palavraChaveUm: '',
      palavraChaveDois: '',
      orientador: '',
      coorientador: '',
      fichaCatalografica: '',
      dataDaAprovacao: '',
      membroConvidadoUm: '',
      membroConvidadoDois: '',
      local: '',
      instituicao: '',
      abstractPalavraChaveUm: '',
      abstractPalavraChaveDois: '',
      abstractPalavraChaveTres: '',
      resumoPalavraChaveUm: '',
      resumoPalavraChaveDois: '',
      resumoPalavraChaveTres: '',
    };

    if (this.lexer.getToken() !== SymbolType.TITLE_TCC_CONFIG) {
      console.log('Erro tccConfig');
      this.lexer.error(`'#' expected title TCC Config`);
    }

    //Ignore TITLE_TCC_CONFIG
    this.lexer.nextToken();
    // //Ignore NEW_LINE
    // this.lexer.nextToken();

    console.log('Passou tccConfig', this.lexer.getToken());
    let count = 0;
    while (this.tccConfigToken.includes(this.lexer.getToken())) {
      count++;
      console.log('entrou 1 tccConfig', this.lexer.getToken());
      if (count === 100) break;
      switch (this.lexer.getToken()) {
        case SymbolType.NEW_LINE:
          this.lexer.nextToken();
          break;
        case SymbolType.AUTHOR:
          config.autor = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.COURSE:
          config.curso = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.TCC_TITLE:
          config.titulo = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.TCC_DATE:
          config.data = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.KEYWORD1:
          config.palavraChaveUm = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.KEYWORD2:
          config.palavraChaveDois = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.ADVISOR:
          config.orientador = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.CO_ADVISOR:
          config.coorientador = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.CATALOG_SHEET:
          config.fichaCatalografica = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.APPROVAL_DATE:
          config.dataDaAprovacao = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.GUEST_MEMBER1:
          config.membroConvidadoUm = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.GUEST_MEMBER2:
          config.membroConvidadoDois = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.LOCAL:
          config.local = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.INSTITUTION:
          config.instituicao = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.ABSTRACT_KEYWORD1:
          config.abstractPalavraChaveUm = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.ABSTRACT_KEYWORD2:
          config.abstractPalavraChaveDois = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.ABSTRACT_KEYWORD3:
          config.abstractPalavraChaveTres = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.RESUMO_KEYWORD1:
          config.resumoPalavraChaveUm = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.RESUMO_KEYWORD2:
          config.resumoPalavraChaveDois = this.lexer.getText();
          this.lexer.nextToken();
          break;
        case SymbolType.RESUMO_KEYWORD3:
          config.resumoPalavraChaveTres = this.lexer.getText();
          this.lexer.nextToken();
          break;
      }
    }
    console.log(
      'Passou tccConfig 2',
      this.lexer.getToken(),
      this.lexer.getText()
    );

    return new TccConfig(
      config.autor,
      config.curso,
      config.titulo,
      config.data,
      config.palavraChaveUm,
      config.palavraChaveDois,
      config.orientador,
      config.coorientador,
      config.fichaCatalografica,
      config.dataDaAprovacao,
      config.membroConvidadoUm,
      config.membroConvidadoDois,
      config.local,
      config.instituicao,
      config.abstractPalavraChaveUm,
      config.abstractPalavraChaveDois,
      config.abstractPalavraChaveTres,
      config.resumoPalavraChaveUm,
      config.resumoPalavraChaveDois,
      config.resumoPalavraChaveTres
    );
  }

  private resume(): Resume {
    console.log('entrou resume', this.lexer.getToken());
    if (this.lexer.getToken() !== SymbolType.TITLE_RESUME) {
      this.lexer.error(`'#' expected title Resumo`);
    }

    //Ignore TITLE_RESUME
    this.lexer.nextToken();

    const resumeBody: TextualElement[] = this.bodyWithoutTitle();
    console.log('end resume', this.lexer.getToken());
    return new Resume(resumeBody);
  }

  private abstract(): Abstract {
    console.log('entrou abstract', this.lexer.getToken());
    if (this.lexer.getToken() !== SymbolType.TITLE_ABSTRACT) {
      this.lexer.error(`'#' expected title abstract`);
    }

    //Ignore TITLE_ABSTRACT
    this.lexer.nextToken();

    const resumeBody: TextualElement[] = this.bodyWithoutTitle();
    console.log('end abstract', this.lexer.getToken());
    return new Abstract(resumeBody);
  }

  private appendix(): Appendix[] {
    console.log('entrou appendix', this.lexer.getToken());
    if (this.lexer.getToken() !== SymbolType.TITLE_APPENDIX) {
      return [];
    }

    let count = 0;
    const appendixs: Appendix[] = [];

    while (this.lexer.getToken() === SymbolType.TITLE_APPENDIX) {
      const title = this.lexer.getText();
      if (this.appendixRrefName.includes(title))
        this.lexer.error(
          `# Apêndice ${title} - Appendix has already been declared`
        );

      this.appendixRrefName.push(title);
      //Ignore TITLE_APPENDIX
      this.lexer.nextToken();
      count++;
      console.log('appendix 1', this.lexer.getToken());
      if (count === 100) break;
      const resumeBody: TextualElement[] = this.bodyWithoutTitle();
      appendixs.push(new Appendix(title, resumeBody));
    }
    console.log('end abstract', this.lexer.getToken());
    return appendixs;
  }

  private attachments(): Attachments[] {
    console.log('entrou attachments', this.lexer.getToken());
    if (this.lexer.getToken() !== SymbolType.TITLE_ATTACHMENTS) {
      return [];
    }

    let count = 0;
    const attachments: Attachments[] = [];

    while (this.lexer.getToken() === SymbolType.TITLE_ATTACHMENTS) {
      const title = this.lexer.getText();
      if (this.attachmentsRrefName.includes(title))
        this.lexer.error(
          `# Anexo ${title} - Attachment has already been declared`
        );

      this.attachmentsRrefName.push(title);
      //Ignore TITLE_ATTACHMENTS
      this.lexer.nextToken();
      count++;
      console.log('attachments 1', this.lexer.getToken());
      if (count === 100) break;
      const resumeBody: TextualElement[] = this.bodyWithoutTitle();
      attachments.push(new Appendix(title, resumeBody));
    }
    console.log('end attachments', this.lexer.getToken());
    return attachments;
  }

  private introduction(): Introduction {
    console.log('entrou introduction', this.lexer.getToken());
    if (this.lexer.getToken() !== SymbolType.TITLE_INTRODUCTION) {
      this.lexer.error(`'#' expected title Introdução`);
    }

    //Ignore TITLE_INTRODUCTION
    this.lexer.nextToken();

    const resumeBody: TextualElement[] = this.bodyWithoutTitle();
    console.log('end abstract', this.lexer.getToken());
    return new Introduction(resumeBody);
  }

  private bodyWithoutTitle(): TextualElement[] {
    const arrayOfTextProducer: TextualElement[] = [];

    console.log('entrou 0', this.lexer.getToken());
    let paragraph: Paragraph | null = null;
    let count = 0;
    while (this.textProducerWithoutTitleToken.includes(this.lexer.getToken())) {
      count++;
      console.log('bodyWithoutTitle 1', this.lexer.getToken());
      if (count === 100) break;
      if (this.lexer.getToken() === SymbolType.TEXT) {
        if (paragraph === null) {
          paragraph = new Paragraph([new TextElement(this.lexer.getText())]);
          arrayOfTextProducer.push(paragraph);
        } else
          paragraph.pushTextualElement(new TextElement(this.lexer.getText()));
      } else if (this.lexer.getToken() === SymbolType.BOLD_DELIMITER) {
        if (paragraph === null) {
          paragraph = new Paragraph([
            new BoldElement(new TextElement(this.lexer.getText())),
          ]);
          arrayOfTextProducer.push(paragraph);
        } else
          paragraph.pushTextualElement(
            new BoldElement(new TextElement(this.lexer.getText()))
          );
      } else if (this.lexer.getToken() === SymbolType.ITALIC_DELIMITER) {
        if (paragraph === null) {
          paragraph = new Paragraph([
            new ItalicElement(new TextElement(this.lexer.getText())),
          ]);
          arrayOfTextProducer.push(paragraph);
        } else
          paragraph.pushTextualElement(
            new ItalicElement(new TextElement(this.lexer.getText()))
          );
      } else if (this.lexer.getToken() === SymbolType.CODE_DELIMITER) {
        const code = new CodeElement(
          new TextElement(this.lexer.getText()),
          this.lexer.getLatexRef(),
          this.lexer.getCodeName()
        );

        if (this.latexRrefName.includes(code.getLatexRrefName()))
          this.lexer.error(
            `${code.getLatexRrefName()} - reference has already been declared`
          );

        this.latexRrefName.push(code.getLatexRrefName());

        if (paragraph === null) {
          paragraph = new Paragraph([code]);
          arrayOfTextProducer.push(paragraph);
        } else paragraph.pushTextualElement(code);
      } else if (this.lexer.getToken() === SymbolType.IMAGE) {
        paragraph = null;
        const image = new ImageInput(
          this.lexer.getLatexRef(),
          this.lexer.getImageLink(),
          this.lexer.getImageName()
        );

        if (!this.acceptedImageTypes.includes(image.getLinkExtension()))
          this.lexer.error(
            `${image.getLinkExtension()} expected to be contained in ${
              this.acceptedImageTypes
            }`
          );
        if (this.latexRrefName.includes(image.getLatexRrefName()))
          this.lexer.error(
            `${image.getLatexRrefName()} - reference has already been declared`
          );

        this.latexRrefName.push(image.getLatexRrefName());
        arrayOfTextProducer.push(image);
      }
      this.lexer.nextToken();
    }
    return arrayOfTextProducer;
  }

  private development(): Development {
    // this.lexer.nextToken();
    if (this.lexer.getToken() !== SymbolType.TITLE1)
      this.lexer.error(`'#' expected title`);

    const title = this.lexer.getText();

    //Ignore NEW_LINE
    this.lexer.nextToken();

    //Ignore ALL NEW_LINE
    while (this.lexer.getToken() === SymbolType.NEW_LINE) {
      this.lexer.nextToken();
    }
    console.log('Teste', this.lexer.getToken());
    console.log(this.lexer.getText());

    const arrayOfTextProducer: TextualElement[] = [];

    console.log('entrou 0', this.lexer.getToken());
    let paragraph: Paragraph | null = null;
    let count = 0;
    while (this.textProducerToken.includes(this.lexer.getToken())) {
      count++;
      console.log('entrou 1');
      if (count === 100) break;
      if (this.lexer.getToken() === SymbolType.TEXT) {
        if (paragraph === null) {
          paragraph = new Paragraph([new TextElement(this.lexer.getText())]);
          arrayOfTextProducer.push(paragraph);
        } else
          paragraph.pushTextualElement(new TextElement(this.lexer.getText()));
      } else if (this.lexer.getToken() === SymbolType.BOLD_DELIMITER) {
        if (paragraph === null) {
          paragraph = new Paragraph([
            new BoldElement(new TextElement(this.lexer.getText())),
          ]);
          arrayOfTextProducer.push(paragraph);
        } else
          paragraph.pushTextualElement(
            new BoldElement(new TextElement(this.lexer.getText()))
          );
      } else if (this.lexer.getToken() === SymbolType.ITALIC_DELIMITER) {
        if (paragraph === null) {
          paragraph = new Paragraph([
            new ItalicElement(new TextElement(this.lexer.getText())),
          ]);
          arrayOfTextProducer.push(paragraph);
        } else
          paragraph.pushTextualElement(
            new ItalicElement(new TextElement(this.lexer.getText()))
          );
      } else if (this.lexer.getToken() === SymbolType.CODE_DELIMITER) {
        const code = new CodeElement(
          new TextElement(this.lexer.getText()),
          this.lexer.getLatexRef(),
          this.lexer.getCodeName()
        );

        if (this.latexRrefName.includes(code.getLatexRrefName()))
          this.lexer.error(
            `${code.getLatexRrefName()} - reference has already been declared`
          );

        this.latexRrefName.push(code.getLatexRrefName());

        if (paragraph === null) {
          paragraph = new Paragraph([code]);
          arrayOfTextProducer.push(paragraph);
        } else paragraph.pushTextualElement(code);
      } else if (this.lexer.getToken() === SymbolType.TITLE1) {
        paragraph = null;
        arrayOfTextProducer.push(new Title(this.lexer.getText(), 1));
      } else if (this.lexer.getToken() === SymbolType.TITLE2) {
        paragraph = null;
        arrayOfTextProducer.push(new Title(this.lexer.getText(), 2));
      } else if (this.lexer.getToken() === SymbolType.TITLE3) {
        paragraph = null;
        arrayOfTextProducer.push(new Title(this.lexer.getText(), 3));
      } else if (this.lexer.getToken() === SymbolType.TITLE4) {
        paragraph = null;
        arrayOfTextProducer.push(new Title(this.lexer.getText(), 4));
        paragraph = null;
      } else if (this.lexer.getToken() === SymbolType.IMAGE) {
        paragraph = null;
        const image = new ImageInput(
          this.lexer.getLatexRef(),
          this.lexer.getImageLink(),
          this.lexer.getImageName()
        );

        if (!this.acceptedImageTypes.includes(image.getLinkExtension()))
          this.lexer.error(
            `${image.getLinkExtension()} expected to be contained in ${
              this.acceptedImageTypes
            }`
          );
        if (this.latexRrefName.includes(image.getLatexRrefName()))
          this.lexer.error(
            `${image.getLatexRrefName()} - reference has already been declared`
          );

        this.latexRrefName.push(image.getLatexRrefName());

        arrayOfTextProducer.push(image);
      }
      this.lexer.nextToken();
    }
    console.log('3 this.lexer.getToken()', this.lexer.getToken());
    const development = new Development(
      new Title(title, 1),
      arrayOfTextProducer
    );
    return development;
  }
}
