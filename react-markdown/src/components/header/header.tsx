import React, { useContext, useEffect, useState } from 'react';
import { CompilerError } from '../../compiler/ast/compilerError';
import { CountdownContext } from '../../context/CountdownContext';
import { EditorContext } from '../../context/editorContext';
import { Container, Button, Title } from './style';
import io from 'socket.io-client';

interface ResultApi {
  text: object;
  error: CompilerError;
}
let socket: any;

export function Header() {
  const { markdownText, setError } = useContext(EditorContext);
  const [isActiveLocal, setIsActiveLocal] = useState(false);
  const [messageResponse, setMessageResponse] = useState('');
  const [connected, setConnected] = useState(false);
  const { startCountdown, isActive, resetCountdown, seconds } =
    useContext(CountdownContext);

  const onSubmit = () => {
    startCountdown();
    setIsActiveLocal(true);
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: markdownText, genC: true }),
    })
      .then((r) => r.json())
      .then((res: ResultApi) => {
        if (res.error) {
          setError({
            line: res.error.line,
            message: res.error.message,
            token: res.error.token,
          });
        } else {
          setError(null);
        }
        console.log(res);
      });
    console.log(markdownText);
  };
  useEffect(() => {
    socket = io('localhost:3001', { secure: false });
    const handleConnected = () => {
      setConnected(true);
    };
    socket.on('connected', handleConnected);
    return () => {
      socket.off('connected', handleConnected);
    };
  }, []);

  useEffect(() => {
    console.log('messageResponse', messageResponse);
    if (messageResponse === 'pdf criado') {
      setIsActiveLocal(false);
      resetCountdown();
      fetch('http://localhost:3001/download').then((response) => {
        response.blob().then((blob) => {
          // Creating new object of PDF file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          let alink = document.createElement('a');
          alink.href = fileURL;
          alink.download = 'tcc.pdf';
          alink.click();
        });
      });
    }
    socket.on('messageResponse', (data: any) => setMessageResponse(data));
  }, [socket, messageResponse]);

  useEffect(() => {
    if (isActiveLocal && seconds % 2 === 0) {
      if (isActive) socket.emit('pdf-status', 'ja foi criado?');
      else setIsActiveLocal(false);
    }
  }, [isActiveLocal, isActive, seconds]);

  return (
    <Container>
      <Title>Lab compila</Title>
      <Button onClick={onSubmit}> Gerar código </Button>
    </Container>
  );
}
