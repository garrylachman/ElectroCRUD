import splash from './splash.gif';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement
);
root.render(<>
  <img src={splash} width="720px" height="576" style={{marginTop: "-86px"}} />
</>)