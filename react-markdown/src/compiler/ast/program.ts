import { excDocker } from '../../helpers/excDocker';
import {
  abstract,
  anexos,
  apendices,
  first,
  introducao,
  resumo,
} from '../../helpers/configLatex';
import { clearFolders, createFoler } from '../../helpers/fileAndFolderHandler';
import { Development } from './development';
import { TccConfig } from './tccConfig';
import { Resume } from './resume';
import { Abstract } from './abstract';
import { Introduction } from './introduction';
import { Appendix } from './appendix';
import { Attachments } from './attachments';

export class Program {
  public tccConfig: TccConfig;
  public development: Development;
  public resume: Resume;
  public abstract: Abstract;
  public introduction: Introduction;
  public appendix: Appendix[];
  public attachments: Attachments[];

  constructor(
    tccConfig: TccConfig,
    resume: Resume,
    abstract: Abstract,
    introduction: Introduction,
    development: Development,
    appendix: Appendix[],
    attachments: Attachments[]
  ) {
    this.tccConfig = tccConfig;
    this.resume = resume;
    this.abstract = abstract;
    this.introduction = introduction;
    this.development = development;
    this.appendix = appendix;
    this.attachments = attachments;
  }

  genC(): void {
    clearFolders();
    console.log('1');
    createFoler(''); //root Folder
    first();
    console.log('2');

    this.tccConfig.genC();
    resumo({
      resumoPalavraChaveUm: this.tccConfig.resumoPalavraChaveUm,
      resumoPalavraChaveDois: this.tccConfig.resumoPalavraChaveDois,
      resumoPalavraChaveTres: this.tccConfig.resumoPalavraChaveTres,
      body: this.resume.genC(),
    });
    abstract({
      abstractPalavraChaveUm: this.tccConfig.abstractPalavraChaveUm,
      abstractPalavraChaveDois: this.tccConfig.abstractPalavraChaveDois,
      abstractPalavraChaveTres: this.tccConfig.abstractPalavraChaveTres,
      body: this.abstract.genC(),
    });
    introducao(this.introduction.genC());

    this.development.genC();

    let textAppendix = '';
    this.appendix.forEach((appendix) => {
      textAppendix += appendix.genC() + '\n\n';
    });
    apendices(textAppendix);

    let textAttachments = '';
    this.attachments.forEach((attachment) => {
      textAttachments += attachment.genC() + '\n\n';
    });
    anexos(textAttachments);

    excDocker();
  }
}
