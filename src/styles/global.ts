import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
  margin: 0;
  padding:0;
  outline:0;
  box-sizing: border-box;
}

body{
  background: #121212 ;
  --webkit-font-smoothing: antialiased;
  color: #fff;

}


body, input, button {
  font: 16px Roboto, sans-serif;
}


button{
  cursor: pointer;
  outline: 0;

}

h1{
  font-size: 3rem;
}

`;
