FROM debian:buster-slim

RUN apt-get update && apt-get install -y ghostscript texlive-publishers texlive-lang-portuguese texlive-latex-extra texlive-font-utils texlive-fonts-recommended make

WORKDIR /home/latex
