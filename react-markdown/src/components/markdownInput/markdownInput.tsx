import React, { useContext, useEffect, useState } from 'react';
import { CompilerError } from '../../compiler/ast/compilerError';
import { Compiler } from '../../compiler/compiler';
import { EditorContext } from '../../context/editorContext';
import { Container, TextArea, Title } from './style';

interface ResultApi {
  text: object;
  error: CompilerError;
}

export function MarkedInput() {
  const { setMarkdownText, setError } = useContext(EditorContext);
  const [value, setValue] = useState<string>('');

  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.currentTarget.value;
    // printString(newValue);
    setValue(newValue);
    setMarkdownText(newValue);
  };

  const printString = (toPrint: string) => {
    let i = 0;
    console.log('Inicio For');
    for (i = 0; i < toPrint.length; i++) {
      if (toPrint[i] === ' ') console.log('espaço');
      else if (toPrint[i] === '\n') console.log('Pula Linha');
      else if (toPrint[i] === '\r') console.log('barra r');
      else console.log(toPrint[i]);
    }
    console.log('Fim For');
    console.log(toPrint.length);
  };

  useEffect(() => {
    fetch('/exampleMarkdown.md')
      .then((r) => r.text())
      .then((startValue) => {
        // console.log('text decoded:', startValue);
        // printString(startValue);
        setValue(startValue);
        setMarkdownText(startValue);
      });
  }, []);

  useEffect(() => {
    //Internal Compiler
    const compiler = new Compiler(value);
    try {
      const result = compiler.program();
      console.log(result);
    } catch (error) {
      if (error instanceof CompilerError) {
        setError(error);
      } else {
        console.log('error', error);
      }
    }

    //External Compiler
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: value, genC: false }),
    })
      .then((r) => r.json())
      .then((res: ResultApi) => {
        // if (res.error) {
        //   setError({
        //     line: res.error.line,
        //     message: res.error.message,
        //     token: res.error.token,
        //   });
        // } else {
        //   setError(null);
        // }
        // console.log(res);
      });
  }, [value]);

  return (
    <Container>
      <Title>Markdown Text</Title>
      <TextArea value={value} onChange={onInputChange} />
    </Container>
  );
}
