import React, { useContext } from 'react';
import { EditorContext } from '../../context/editorContext';
import ReactMarkdown from 'react-markdown';
import { Container, ResultArea, Title } from './style';

export function Result() {
  const { markdownText } = useContext(EditorContext);

  return (
    <Container>
      <Title>Converted Text</Title>
      <ResultArea>
        <ReactMarkdown children={markdownText} />
      </ResultArea>
    </Container>
  );
}
