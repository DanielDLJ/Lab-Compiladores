import { ResumeType } from '../compiler/ast/resume';
import { AbstractType } from '../compiler/ast/abstract';
import {
  InformacoesType,
  InformacoesEditaveisType,
} from '../compiler/ast/tccConfig';
import { createFile, createFoler } from './fileAndFolderHandler';

export function startFileText(title: string, autor: string) {
  return (
    'documentclass{article}\n\n\n\n' +
    '% Useful packages\n' +
    '\\usepackage{amsmath}\n' +
    '\\usepackage{graphicx}\n' +
    '\\usepackage[colorlinks=true, allcolors=blue]{hyperref}\n' +
    '\\newcommand{subsubsubsection}[1]{paragraph{#1}mbox{}\\\\}\n' +
    '\\setcounter{secnumdepth}{4}\n' +
    '\\setcounter{tocdepth}{4}\n\n\n\n' +
    '\\newcommand{codeStyle}{\n' +
    '\\lstset{\n' +
    '    basicstyle=\\ttfamilysmall,\n' +
    '    showspaces=false,\n' +
    '    showstringspaces=false,\n' +
    '    numbers=left,\n' +
    '    numberstyle=\\tiny,\n' +
    '    breaklines=true,\n' +
    '    backgroundcolor=color{cyan!10},\n' +
    '    breakautoindent=true,\n' +
    '    captionpos=b,\n' +
    '    xleftmargin=0pt,\n' +
    '   tabsize=2\n' +
    '}}\n\n\n\n' +
    `\\title{${title}}\n` +
    `\\author{${autor}}\n\n` +
    '\\begin{document}\n' +
    '\\maketitle\n\n\n\n'
  );
}

export function defaultt() {
  createFoler('editaveis');

  const text = '';

  createFile('editaveis/defaultt.tex', text);
}

export function first() {
  firstFile();
  makefile();
  dockerCompose();
  dockerfile();
  bibliografia();

  //editaveis
  abreviaturas();
  // abstract();
  agradecimentos();
  // anexos();
  // apendices();
  // aspectosgerais();
  consideracoes();
  dedicatoria();
  elementosdopostexto();
  elementosdotexto();
  epigrafe();
  errata();
  // informacoesEditaveis();
  // introducao();
  // resumo();
  simbolos();
  textoepostexto();

  //fixos
  comandos();
  customizacoes();
  fichaCatalografica();
  folhaDeAprovacao();
  indiceAutomatico();
  // informacoes();
  listasAutomaticas();
  pacotes();
  setup();
}
export function bibliografia() {
  const text =
    '@manual{inmetro2003,\n' +
    '	Author = {INMETRO},\n' +
    '	Title = {Vocabulário internacional de termos fundamentais e gerais de\n' +
    '	metrologia},\n' +
    '	Year = {2013},\n' +
    '	Address = {Rio de Janeiro, Brasil},\n' +
    '	Pages = {75},\n' +
    '	isbn = {85-87090-90-9},\n' +
    '}\n';

  createFile('bibliografia.bib', text);
}

export function dockerfile() {
  const text =
    'FROM debian:buster-slim\n' +
    '\n' +
    'RUN apt-get update && apt-get install -y ghostscript texlive-publishers texlive-lang-portuguese texlive-latex-extra texlive-font-utils texlive-fonts-recommended make\n' +
    '\n' +
    'WORKDIR /home/latex\n' +
    '\n';

  createFile('Dockerfile', text);
}

export function dockerCompose() {
  const text =
    "version: '3.5'\n" +
    '\n' +
    'services:\n' +
    '    latex:\n' +
    '      build:\n' +
    '        context: .\n' +
    '      volumes:\n' +
    '          - ./:/home/latex\n' +
    "      command: bash -c 'make clean && make'\n" +
    '\n';

  createFile('docker-compose.yml', text);
}

export function textoepostexto() {
  createFoler('editaveis');

  const text = '';

  createFile('editaveis/textoepostexto.tex', text);
}

export function simbolos() {
  createFoler('editaveis');

  const text =
    '\\begin{simbolos}\n' +
    '  \\item[$ \\Lambda $] Lambda\n' +
    '\\end{simbolos}\n';

  createFile('editaveis/simbolos.tex', text);
}

export function resumo(props: ResumeType) {
  createFoler('editaveis');

  const text =
    '\\begin{resumo}\n' +
    props.body +
    '\n\n' +
    ' \\vspace{\\onelineskip}\n' +
    '    \n' +
    ' \\noindent\n' +
    ` \\textbf{Palavras-chave}: ${
      props.resumoPalavraChaveUm ? props.resumoPalavraChaveUm + '.' : ''
    } ${
      props.resumoPalavraChaveDois ? props.resumoPalavraChaveDois + '.' : ''
    } ${
      props.resumoPalavraChaveTres ? props.resumoPalavraChaveTres + '.' : ''
    }\n` +
    '\\end{resumo}\n' +
    '\n';

  createFile('editaveis/resumo.tex', text);
}

export function introducao(body: string) {
  createFoler('editaveis');

  const text =
    '\\chapter*[Introdução]{Introdução}\n' +
    '\\addcontentsline{toc}{chapter}{Introdução}\n' +
    '\n' +
    body +
    '\n\n';

  createFile('editaveis/introducao.tex', text);
}

export function informacoesEditaveis(props: InformacoesEditaveisType) {
  createFoler('editaveis');

  const text =
    '% Dados pessoais\n' +
    `\\autor{${props.autor}}\n` +
    `\\curso{${props.curso}}\n` +
    '\n' +
    '% Dados do trabalho\n' +
    `\\titulo{${props.titulo}}\n` +
    `\\data{${props.data}}\n` +
    `\\palavraChaveUm{${props.palavraChaveUm}}\n` +
    `\\palavraChaveDois{${props.palavraChaveDois}}\n` +
    '\n' +
    '% Dados da orientacao\n' +
    `\\orientador{${props.orientador}}\n` +
    `\\coorientador{${props.coorientador}}\n` +
    '\n' +
    '% Dados para a ficha catalográfica\n' +
    `\\cdu{${props.fichaCatalografica}}\n` +
    '\n' +
    '% Dados da aprovação do trabalho\n' +
    `\\dataDaAprovacao{${props.dataDaAprovacao}}\n` +
    `\\membroConvidadoUm{${props.membroConvidadoUm}}\n` +
    `\\membroConvidadoDois{${props.membroConvidadoDois}}\n` +
    '\n';

  createFile('editaveis/informacoes.tex', text);
}

export function errata() {
  createFoler('editaveis');

  const text = '';

  createFile('editaveis/errata.tex', text);
}

export function epigrafe() {
  createFoler('editaveis');

  const text = '';

  createFile('editaveis/epigrafe.tex', text);
}

export function elementosdotexto() {
  createFoler('editaveis');

  const text = '';

  createFile('editaveis/elementosdotexto.tex', text);
}

export function elementosdopostexto() {
  createFoler('editaveis');

  const text = '';

  createFile('editaveis/elementosdopostexto.tex', text);
}

export function dedicatoria() {
  createFoler('editaveis');

  const text = '';

  createFile('editaveis/dedicatoria.tex', text);
}

export function consideracoes() {
  createFoler('editaveis');

  const text = '';

  createFile('editaveis/consideracoes.tex', text);
}

export function aspectosgerais(text: string) {
  createFoler('editaveis');

  createFile('editaveis/aspectosgerais.tex', text);
}

export function apendices(body: string) {
  createFoler('editaveis');

  const text =
    '\\begin{apendicesenv}\n' +
    '\n' +
    '\\partapendices\n' +
    '\n' +
    body +
    '\n' +
    '\\end{apendicesenv}\n' +
    '\n';

  createFile('editaveis/apendices.tex', text);
}

export function anexos(body: string) {
  createFoler('editaveis');

  const text =
    '\\begin{anexosenv}\n' +
    '\n' +
    '\\partanexos\n' +
    '\n' +
    body +
    '\n' +
    '\\end{anexosenv}\n' +
    '\n';

  createFile('editaveis/anexos.tex', text);
}

export function agradecimentos() {
  createFoler('editaveis');

  const text =
    '\\begin{agradecimentos}\n' +
    'Agradeço ao professor xavier\n' +
    '\\end{agradecimentos}\n' +
    '\n';

  createFile('editaveis/agradecimentos.tex', text);
}

export function abstract(props: AbstractType) {
  createFoler('editaveis');

  const text =
    '\\begin{resumo}[Abstract]\n' +
    ' \\begin{otherlanguage*}{english}\n' +
    props.body +
    '\n' +
    '   \\vspace{\\onelineskip}\n' +
    ' \n' +
    '   \\noindent \n' +
    `   \\textbf{Key-words}: ${
      props.abstractPalavraChaveUm ? props.abstractPalavraChaveUm + '.' : ''
    } ${
      props.abstractPalavraChaveDois ? props.abstractPalavraChaveDois + '.' : ''
    } ${
      props.abstractPalavraChaveTres ? props.abstractPalavraChaveTres + '.' : ''
    }\n` +
    ' \\end{otherlanguage*}\n' +
    '\\end{resumo}\n' +
    '\n';

  createFile('editaveis/abstract.tex', text);
}

export function abreviaturas() {
  createFoler('editaveis');

  const text =
    '\\begin{siglas}\n' +
    '  \\item[456] Isto é um número\n' +
    '\\end{siglas}\n';

  createFile('editaveis/abreviaturas.tex', text);
}

export function firstFile() {
  const text =
    '\\input{fixos/pacotes}\n' +
    '\\input{fixos/comandos}\n' +
    '\\usepackage{fixos/customizacoes}\n' +
    '\n' +
    '\\input{editaveis/informacoes}\n' +
    '\\input{fixos/informacoes}\n' +
    '\\input{fixos/setup}\n' +
    '\n' +
    '\\begin{document}\n' +
    '\n' +
    '\\frenchspacing \n' +
    '\\imprimircapa\n' +
    '\\imprimirfolhaderosto*\n' +
    '\n' +
    '\\input{fixos/fichaCatalografica}\n' +
    '\\input{editaveis/errata}\n' +
    '\\input{fixos/folhaDeAprovacao}\n' +
    '\\input{editaveis/dedicatoria}\n' +
    '\\input{editaveis/agradecimentos}\n' +
    '\\input{editaveis/epigrafe}\n' +
    '\\input{editaveis/resumo}\n' +
    '\\input{editaveis/abstract}\n' +
    '\\input{fixos/listasAutomaticas}\n' +
    '\\input{editaveis/abreviaturas}\n' +
    '\\input{editaveis/simbolos}\n' +
    '\\input{fixos/indiceAutomatico}\n' +
    '\n' +
    '\\textual\n' +
    '\n' +
    '\\input{editaveis/introducao}\n' +
    '\\input{editaveis/aspectosgerais}\n' +
    '\\input{editaveis/consideracoes}\n' +
    '\\input{editaveis/textoepostexto}\n' +
    '\\input{editaveis/elementosdotexto}\n' +
    '\\input{editaveis/elementosdopostexto}\n' +
    '\n' +
    '\\bookmarksetup{startatroot} \n' +
    '\n' +
    '\\postextual\n' +
    '\n' +
    '\\bibliography{bibliografia} \n' +
    '\\input{editaveis/apendices}\n' +
    '\\input{editaveis/anexos}\n' +
    '\\printindex\n' +
    '\n' +
    '\\end{document}\n' +
    '\n' +
    '\n';

  createFile('tcc.tex', text);
}

export function makefile() {
  const text =
    'TARGET = TCC_FGA.pdf\n' +
    '\n' +
    'BIBTEX = bibtex\n' +
    'LATEX = pdflatex\n' +
    'DVIPS = dvips\n' +
    'PS2PDF = ps2pdf\n' +
    '\n' +
    'VERSION = 0.1.0\n' +
    '\n' +
    'FIXOS_DIR = fixos\n' +
    'FIXOS_SOURCES = informacoes.tex fichaCatalografica.tex \\\n' +
    '		folhaDeAprovacao.tex pacotes.tex comandos.tex setup.tex	\\\n' +
    '		listasAutomaticas.tex indiceAutomatico.tex\n' +
    '\n' +
    'FIXOS_FILES = $(addprefix $(FIXOS_DIR)/, $(FIXOS_SOURCES))\n' +
    '\n' +
    'EDITAVEIS_DIR = editaveis\n' +
    'EDITAVEIS_SOURCES = informacoes.tex errata.tex dedicatoria.tex \\\n' +
    '					agradecimentos.tex epigrafe.tex resumo.tex abstract.tex \\\n' +
    '					abreviaturas.tex simbolos.tex introducao.tex \\\n' +
    '					aspectosgerais.tex consideracoes.tex textoepostexto.tex \\\n' +
    '					elementosdotexto.tex elementosdopostexto.tex \\\n' +
    '					apendices.tex anexos.tex\n' +
    '\n' +
    'EDITAVEIS_FILES = $(addprefix $(EDITAVEIS_DIR)/, $(EDITAVEIS_SOURCES))\n' +
    '\n' +
    'MAIN_FILE = tcc.tex\n' +
    'DVI_FILE  = $(addsuffix .dvi, $(basename $(MAIN_FILE)))\n' +
    'AUX_FILE  = $(addsuffix .aux, $(basename $(MAIN_FILE)))\n' +
    'PS_FILE   = $(addsuffix .ps, $(basename $(MAIN_FILE)))\n' +
    'PDF_FILE  = $(addsuffix .pdf, $(basename $(MAIN_FILE)))\n' +
    '\n' +
    'SOURCES = $(FIXOS_FILES) $(EDITAVEIS_FILES)\n' +
    '\n' +
    '.PHONY: all clean dist-clean\n' +
    '\n' +
    'all: \n' +
    '	@make $(TARGET)\n' +
    '     \n' +
    '$(TARGET): $(MAIN_FILE) $(SOURCES) bibliografia.bib\n' +
    '	$(LATEX) $(MAIN_FILE) $(SOURCES)\n' +
    '	$(BIBTEX) $(AUX_FILE)\n' +
    '	$(LATEX) $(MAIN_FILE) $(SOURCES)\n' +
    '	$(LATEX) $(MAIN_FILE) $(SOURCES)\n' +
    '	$(DVIPS) $(DVI_FILE)\n' +
    '	$(PS2PDF) $(PS_FILE)\n' +
    '	@cp $(PDF_FILE) $(TARGET)\n' +
    '\n' +
    'clean:\n' +
    '	rm -f *~ *.dvi *.ps *.backup *.aux *.log\n' +
    '	rm -f *.lof *.lot *.bbl *.blg *.brf *.toc *.idx\n' +
    '	rm -f *.pdf\n' +
    '	\n' +
    'dist: clean\n' +
    '	tar vczf tcc-fga-latex-$(VERSION).tar.gz *\n' +
    '\n' +
    'dist-clean: clean\n' +
    '	rm -f $(PDF_FILE) $(TARGET)\n' +
    '\n';

  createFile('Makefile', text);
}

export function comandos() {
  createFoler('fixos');

  const text =
    '\\renewcommand{\\backrefpagesname}{Citado na(s) página(s):~}\n' +
    '\\renewcommand{\\backref}{}\n' +
    '\\renewcommand*{\\backrefalt}[4]{\n' +
    '	\\ifcase #1 %\n' +
    '		Nenhuma citação no texto.%\n' +
    '	\\or\n' +
    '		Citado na página #2.%\n' +
    '	\\else\n' +
    '		Citado #1 vezes nas páginas #2.%\n' +
    '	\\fi}%\n' +
    '% ---\n' +
    '\n' +
    '\n';

  createFile('fixos/comandos.tex', text);
}

export function customizacoes() {
  createFoler('fixos');

  const text =
    '\\newcommand{\\curso}[1]{\\def\\imprimircurso{#1}}\n' +
    '\n' +
    '\\newcommand{\\palavraChaveUm}[1]{\\def\\imprimirpalavrachaveum{#1}}\n' +
    '\\newcommand{\\palavraChaveDois}[1]{\\def\\imprimirpalavrachavedois{#1}}\n' +
    '\n' +
    '\\newcommand{\\cdu}[1]{\\def\\nomecdu{#1}}\n' +
    '\\newcommand{\\dataDaAprovacao}[1]{\\def\\imprimirdatadaaprovacao{#1}}\n' +
    '\n' +
    '\\newcommand{\\membroConvidadoUm}[1]{\\def\\imprimirmembroconvidadoum{#1}}\n' +
    '\\newcommand{\\membroConvidadoDois}[1]{\\def\\imprimirmembroconvidadodois{#1}}\n' +
    '\\newcommand{\\codeStyle}{\n' +
    '	\\lstset{\n' +
    '		basicstyle=\\ttfamily\\small,\n' +
    '		showspaces=false,\n' +
    '		showstringspaces=false,\n' +
    '		numbers=left,\n' +
    '		numberstyle=\\tiny,\n' +
    '		breaklines=true,\n' +
    '		backgroundcolor=\\color{cyan!10},\n' +
    '		breakautoindent=true,\n' +
    '		captionpos=b,\n' +
    '		xleftmargin=0pt,\n' +
    '		tabsize=2\n' +
    '	}\n' +
    '}\n' +
    '\n' +
    '\\renewcommand{\\imprimircapa}{%\n' +
    '  \\begin{capa}%\n' +
    '    \\center\n' +
    '\n' +
    '	\\begin{huge}\n' +
    '		\\textbf{\\textsc{Trabalho de Conclusão de Curso}}\n' +
    '	\\end{huge}\n' +
    '\n' +
    '    \\vspace*{2.9in}\n' +
    '	{\\textbf{\\large\\imprimirinstituicao}}\n' +
    '	\\par\n' +
    '	{\\textbf{\\large\\imprimircurso}}\n' +
    '\n' +
    '	\\vspace{1.5in}\n' +
    '\n' +
    '    {\\ABNTEXchapterfont\\bfseries\\LARGE\\imprimirtitulo}\n' +
    '    \\vspace*{\\fill}\n' +
    '    \n' +
    '	\\begin{flushright}\n' +
    '    	\\textbf{{\\large{Autor: \\imprimirautor}}}\n' +
    '		\\par\n' +
    '    	\\textbf{{\\large{Orientador: \\imprimirorientador}}}\n' +
    '	\\end{flushright}\n' +
    '		\n' +
    '    \\vspace*{0.2in}\n' +
    '    \\textbf{{\\large\\imprimirlocal}}\n' +
    '    \\par\n' +
    '    \\textbf{{\\large\\imprimirdata}}\n' +
    '    \n' +
    '    \\vspace*{1in}\n' +
    '  \\end{capa}\n' +
    '}\n';

  createFile('fixos/customizacoes.sty', text);
}

export function fichaCatalografica() {
  createFoler('fixos');

  const text =
    '\\begin{fichacatalografica}\n' +
    '	\\vspace*{\\fill}					% Posição vertical\n' +
    '	\\hrule							% Linha horizontal\n' +
    '	\\begin{center}					% Minipage Centralizado\n' +
    '	\\begin{minipage}[c]{12.5cm}		% Largura\n' +
    '	\n' +
    '	\\imprimirautor\n' +
    '	\n' +
    '	\\hspace{0.5cm} \\imprimirtitulo  / \\imprimirautor. --\n' +
    '	\\imprimirlocal, \\imprimirdata-\n' +
    '	\n' +
    '	\\hspace{0.5cm} \\pageref{LastPage} p. : il. (algumas color.) ; 30 cm.\\\\\n' +
    '	\n' +
    '	\\hspace{0.5cm} \\imprimirorientadorRotulo~\\imprimirorientador\\\\\n' +
    '	\n' +
    '	\\hspace{0.5cm}\n' +
    '	\\parbox[t]{\\textwidth}{\\imprimirtipotrabalho~--~\\imprimirinstituicao,\n' +
    '	\\imprimirdata.}\\\\\n' +
    '	\n' +
    '	\\hspace{0.5cm}\n' +
    '		1. \\imprimirpalavrachaveum.\n' +
    '		2. \\imprimirpalavrachavedois.\n' +
    '		I. \\imprimirorientador.\n' +
    '		II. Universidade de Brasília.\n' +
    '		III. Faculdade UnB Gama.\n' +
    '		IV. \\imprimirtitulo\\\\ 			\n' +
    '	\n' +
    '	\\hspace{8.75cm} CDU \\nomecdu\\\\\n' +
    '	\n' +
    '	\\end{minipage}\n' +
    '	\\end{center}\n' +
    '	\\hrule\n' +
    '\\end{fichacatalografica}\n' +
    '\n';

  createFile('fixos/fichaCatalografica.tex', text);
}

export function folhaDeAprovacao() {
  createFoler('fixos');

  const text =
    '\\begin{folhadeaprovacao}\n' +
    '\n' +
    '  \\begin{center}\n' +
    '    {\\ABNTEXchapterfont\\large\\imprimirautor}\n' +
    '\n' +
    '    \\vspace*{\\fill}\\vspace*{\\fill}\n' +
    '    {\\ABNTEXchapterfont\\bfseries\\Large\\imprimirtitulo}\n' +
    '    \\vspace*{\\fill}\n' +
    '    \n' +
    '    \\hspace{.45\\textwidth}\n' +
    '    \\begin{minipage}{.5\\textwidth}\n' +
    '        \\imprimirpreambulo\n' +
    '    \\end{minipage}%\n' +
    '    \\vspace*{\\fill}\n' +
    '   \\end{center}\n' +
    '    \n' +
    '   Trabalho aprovado. \\imprimirlocal, \\imprimirdatadaaprovacao:\n' +
    '\n' +
    '   \\assinatura{\\textbf{\\imprimirorientador} \\\\ Orientador} \n' +
    '   \\assinatura{\\textbf{\\imprimirmembroconvidadoum} \\\\ Convidado 1}\n' +
    '   \\assinatura{\\textbf{\\imprimirmembroconvidadodois} \\\\ Convidado 2}\n' +
    '      \n' +
    '   \\begin{center}\n' +
    '    \\vspace*{0.5cm}\n' +
    '    {\\large\\imprimirlocal}\n' +
    '    \\par\n' +
    '    {\\large\\imprimirdata}\n' +
    '    \\vspace*{1cm}\n' +
    '  \\end{center}\n' +
    '  \n' +
    '\\end{folhadeaprovacao}\n' +
    '\n';

  createFile('fixos/folhaDeAprovacao.tex', text);
}

export function indiceAutomatico() {
  createFoler('fixos');

  const text =
    '\\pdfbookmark[0]{\\contentsname}{toc}\n' +
    '\\tableofcontents*\n' +
    '\\cleardoublepage\n' +
    '\n';

  createFile('fixos/indiceAutomatico.tex', text);
}

export function informacoes(props: InformacoesType) {
  createFoler('fixos');

  const text =
    `\\local{${props.local}}\n` +
    '\\instituicao{%\n' +
    `  ${props.instituicao}` +
    '}\n' +
    '\\tipotrabalho{Trabalho de Conclusão de Curso}\n' +
    '\\preambulo{Monografia submetida ao curso de graduação em \\imprimircurso\\ \n' +
    `da ${props.instituicaoSemSigla}, como requisito parcial para obtenção do Título \n` +
    'de Bacharel em \\imprimircurso.}\n' +
    '\n';

  createFile('fixos/informacoes.tex', text);
}

export function listasAutomaticas() {
  createFoler('fixos');

  const text =
    '\\pdfbookmark[0]{\\listfigurename}{lof}\n' +
    '\\listoffigures*\n' +
    '\\cleardoublepage\n' +
    '\\pdfbookmark[0]{\\listtablename}{lot}\n' +
    '\\listoftables*\n' +
    '\\cleardoublepage\n' +
    '\n';

  createFile('fixos/listasAutomaticas.tex', text);
}

export function pacotes() {
  createFoler('fixos');

  const text =
    '\\documentclass[12pt,openright,twoside,a4paper,english,french,spanish,brazil]{abntex2}\n' +
    '\n' +
    '\\usepackage{cmap}	\n' +
    '\\usepackage{lmodern}	\n' +
    '\\usepackage[T1]{fontenc}	\n' +
    '\\usepackage[utf8]{inputenc}		\n' +
    '\\usepackage{lastpage}		\n' +
    '\\usepackage{indentfirst}\n' +
    '\\usepackage{color}	\n' +
    '\\usepackage{graphicx}	\n' +
    '\\usepackage{units}\n' +
    '\\usepackage[brazilian,hyperpageref]{backref}\n' +
    '\\usepackage[alf]{abntex2cite}\n' +
    '\\usepackage{bold-extra}\n' +
    '\\usepackage{eso-pic}\n' +
    '\\usepackage{listings}\n' +
    '\\usepackage[dvipsnames]{xcolor}\n' +
    '\\usepackage{gensymb}\n' +
    '\\usepackage{textcomp}\n' +
    '\n';

  createFile('fixos/pacotes.tex', text);
}

export function setup() {
  createFoler('fixos');

  const text =
    '\\definecolor{blue}{RGB}{41,5,195}\n' +
    '\\makeatletter\n' +
    '\\hypersetup{\n' +
    '   %pagebackref=true,\n' +
    '		pdftitle={\\@title}, \n' +
    '		pdfauthor={\\@author},\n' +
    '   pdfsubject={\\imprimirpreambulo},\n' +
    '	  pdfcreator={LaTeX with abnTeX2},\n' +
    '		pdfkeywords={abnt}{latex}{abntex}{abntex2}{trabalho acadêmico}, \n' +
    '		colorlinks=true,       		% false: boxed links; true: colored links\n' +
    '   linkcolor=blue,          	% color of internal links\n' +
    '   citecolor=blue,        		% color of links to bibliography\n' +
    '   filecolor=magenta,      	% color of file links\n' +
    '		urlcolor=blue,\n' +
    '		bookmarksdepth=4\n' +
    '}\n' +
    '\\makeatother\n' +
    '\\setlength{\\parindent}{1.3cm}\n' +
    '\\setlength{\\parskip}{0.2cm}  \n' +
    '\\makeindex\n' +
    '\n';

  createFile('fixos/setup.tex', text);
}
