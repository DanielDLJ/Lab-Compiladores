import { Header } from '../../components/header/header';
import { MarkedInput } from '../../components/markdownInput/markdownInput';
import { Result } from '../../components/markdownResult/markdownResult';
import { AppContainer, EditorContainer } from './style';

function Home() {
  return (
    <AppContainer>
      <Header />
      <EditorContainer>
        <MarkedInput />
        <Result />
      </EditorContainer>
    </AppContainer>
  );
}

export default Home;
