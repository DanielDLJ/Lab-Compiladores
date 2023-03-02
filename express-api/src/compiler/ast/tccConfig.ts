import { informacoes, informacoesEditaveis } from '../../helpers/configLatex';

export interface TccConfigType {
  autor: string;
  curso: string;
  titulo: string;
  data: string;
  palavraChaveUm: string;
  palavraChaveDois: string;
  orientador: string;
  coorientador: string;
  fichaCatalografica: string;
  dataDaAprovacao: string;
  membroConvidadoUm: string;
  membroConvidadoDois: string;
  local: string;
  instituicao: string;
  abstractPalavraChaveUm: string;
  abstractPalavraChaveDois: string;
  abstractPalavraChaveTres: string;
  resumoPalavraChaveUm: string;
  resumoPalavraChaveDois: string;
  resumoPalavraChaveTres: string;
}

export interface InformacoesEditaveisType {
  autor: string;
  curso: string;
  titulo: string;
  data: string;
  palavraChaveUm: string;
  palavraChaveDois: string;
  orientador: string;
  coorientador: string;
  fichaCatalografica: string;
  dataDaAprovacao: string;
  membroConvidadoUm: string;
  membroConvidadoDois: string;
}

export interface InformacoesType {
  local: string;
  instituicao: string;
  instituicaoSemSigla: string;
}

export class TccConfig {
  public autor: string;
  public curso: string;
  public titulo: string;
  public data: string;
  public palavraChaveUm: string;
  public palavraChaveDois: string;
  public orientador: string;
  public coorientador: string;
  public fichaCatalografica: string;
  public dataDaAprovacao: string;
  public membroConvidadoUm: string;
  public membroConvidadoDois: string;
  public local: string;
  public instituicao: string;
  public abstractPalavraChaveUm: string;
  public abstractPalavraChaveDois: string;
  public abstractPalavraChaveTres: string;
  public resumoPalavraChaveUm: string;
  public resumoPalavraChaveDois: string;
  public resumoPalavraChaveTres: string;

  constructor(
    autor: string,
    curso: string,
    titulo: string,
    data: string,
    palavraChaveUm: string,
    palavraChaveDois: string,
    orientador: string,
    coorientador: string,
    fichaCatalografica: string,
    dataDaAprovacao: string,
    membroConvidadoUm: string,
    membroConvidadoDois: string,
    local: string,
    instituicao: string,
    abstractPalavraChaveUm: string,
    abstractPalavraChaveDois: string,
    abstractPalavraChaveTres: string,
    resumoPalavraChaveUm: string,
    resumoPalavraChaveDois: string,
    resumoPalavraChaveTres: string
  ) {
    this.autor = autor.replace(/\n|\r/g, '').trim();
    this.curso = curso.replace(/\n|\r/g, '').trim();
    this.titulo = titulo.replace(/\n|\r/g, '').trim();
    this.data = data.replace(/\n|\r/g, '').trim();
    this.palavraChaveUm = palavraChaveUm.replace(/\n|\r/g, '').trim();
    this.palavraChaveDois = palavraChaveDois.replace(/\n|\r/g, '').trim();
    this.orientador = orientador.replace(/\n|\r/g, '').trim();
    this.coorientador = coorientador.replace(/\n|\r/g, '').trim();
    this.fichaCatalografica = fichaCatalografica.replace(/\n|\r/g, '').trim();
    this.dataDaAprovacao = dataDaAprovacao.replace(/\n|\r/g, '').trim();
    this.membroConvidadoUm = membroConvidadoUm.replace(/\n|\r/g, '').trim();
    this.membroConvidadoDois = membroConvidadoDois.replace(/\n|\r/g, '').trim();
    this.local = local.replace(/\n|\r/g, '').trim();
    this.instituicao = instituicao.replace(/\n|\r/g, '').trim();
    this.abstractPalavraChaveUm = abstractPalavraChaveUm
      .replace(/\n|\r/g, '')
      .trim();
    this.abstractPalavraChaveDois = abstractPalavraChaveDois
      .replace(/\n|\r/g, '')
      .trim();
    this.abstractPalavraChaveTres = abstractPalavraChaveTres
      .replace(/\n|\r/g, '')
      .trim();
    this.resumoPalavraChaveUm = resumoPalavraChaveUm
      .replace(/\n|\r/g, '')
      .trim();
    this.resumoPalavraChaveDois = resumoPalavraChaveDois
      .replace(/\n|\r/g, '')
      .trim();
    this.resumoPalavraChaveTres = resumoPalavraChaveTres
      .replace(/\n|\r/g, '')
      .trim();
  }

  genC(): TccConfigType {
    informacoesEditaveis({
      autor: this.autor,
      curso: this.curso,
      titulo: this.titulo,
      data: this.data,
      palavraChaveUm: this.palavraChaveUm,
      palavraChaveDois: this.palavraChaveDois,
      orientador: this.orientador,
      coorientador: this.coorientador,
      fichaCatalografica: this.fichaCatalografica,
      dataDaAprovacao: this.dataDaAprovacao,
      membroConvidadoUm: this.membroConvidadoUm,
      membroConvidadoDois: this.membroConvidadoDois,
    });

    const instituicaoSemSigla = this.instituicao.includes('--')
      ? this.instituicao.split('--')[0].trim()
      : this.instituicao;
    informacoes({
      local: this.local,
      instituicao: this.instituicao,
      instituicaoSemSigla,
    });
    return {
      autor: this.autor,
      curso: this.curso,
      titulo: this.titulo,
      data: this.data,
      palavraChaveUm: this.palavraChaveUm,
      palavraChaveDois: this.palavraChaveDois,
      orientador: this.orientador,
      coorientador: this.coorientador,
      fichaCatalografica: this.fichaCatalografica,
      dataDaAprovacao: this.dataDaAprovacao,
      membroConvidadoUm: this.membroConvidadoUm,
      membroConvidadoDois: this.membroConvidadoDois,
      local: this.local,
      instituicao: this.instituicao,
      abstractPalavraChaveUm: this.abstractPalavraChaveUm,
      abstractPalavraChaveDois: this.abstractPalavraChaveDois,
      abstractPalavraChaveTres: this.abstractPalavraChaveTres,
      resumoPalavraChaveUm: this.resumoPalavraChaveUm,
      resumoPalavraChaveDois: this.resumoPalavraChaveDois,
      resumoPalavraChaveTres: this.resumoPalavraChaveTres,
    };
  }
}
