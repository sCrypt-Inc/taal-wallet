import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import bsv from 'bsv';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/src/store';
import light from '@/themes/light';

// adjust DUST_AMOUNT to 0 in frontend enry point
// @ts-expect-error DUST_AMOUNT is not typed
bsv.Transaction.DUST_AMOUNT = 0;

const GlobalStyle = createGlobalStyle`
  body, html {
    padding: 0;
    margin: 0;
    min-height: 100vh;
  }

  body {
    background-color: #f6f6f6;
    font-family: 'Varta', sans-serif;
    font-size: 14px;
    line-height: 1.25;
    color: ${light.color.grey[600]};

    * {
      box-sizing: border-box;
    }
  }

  body.main-app-in-popup {
    width: 375px;
    height: 500px;

    #app-container {
      min-height: 100vh;
    }
  }

  body.main-app-in-tab {
    padding-top: 2rem;

    #app-container {
      min-height: 600px;
      
      @media only screen and (min-width: 400px) {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin-left: 2rem;
        margin-right: 2rem;
      }
    }
  }

  #app {
    max-width: 800px;
    margin: 0 auto;
    min-height: 100vh;
  }
  
  #app-container {
    background-color: #fafafa;
    margin-left: auto;
    margin-right: auto;
    min-height: 100vh;
  }

  #tooltip-container {
    position: relative;

    > * {
      position: absolute;
      z-index: 1000;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Varta', Helvetica, sans-serif;
    font-weight: 400;
    color: ${light.color.grey[700]};
  }
  h1 {
    font-size: 1.7rem;
    margin-bottom: .5rem;
  }

  svg {
    fill: currentColor;
  }

  a {
    text-decoration: none;
    color: ${light.color.primary[700]};

    &:hover {
      text-decoration: underline;
    }

    svg {
      max-height: .8rem;
      max-width: .7rem;
      margin: 0 .2rem;
    }
  }

  @keyframes fadein {
    0% { opacity: 0 }
    100% { opacity: 1 }
  }
  .fadein {
    animation-name: fadein;
    animation-duration: .5s;
    animation-timing-function: ease-in-out;
  }
`;

type Props = {
  domElement: HTMLElement | null;
  component: ReactNode;
  theme?: typeof light;
};

export const createPage = ({ domElement, component, theme = light }: Props) => {
  if (!domElement) {
    throw new Error('Can not find DOM element');
  }
  const root = createRoot(domElement);
  root.render(
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {component}
      </ThemeProvider>
    </ReduxProvider>
  );
};
