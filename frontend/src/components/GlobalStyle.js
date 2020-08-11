import { createGlobalStyle } from 'styled-components'

import comicSansWoff from '../fonts/comic-sans.woff'
import comicSansWoff2 from '../fonts/comic-sans.woff2'

export default createGlobalStyle`

    * {
      box-sizing: border-box;
    }

    @font-face {
        font-family: 'Comic Sans';
        src: local('Comic Sans'), local('ComicSans'),
        url(${comicSansWoff2}) format('woff2'),
        url(${comicSansWoff}) format('woff');
        font-weight: 300;
        font-style: normal;
    }

    body {
      padding: 1rem 2rem;
      height: 100vh;
      color: ${props => props.theme.color};
      font-family: ${props => props.theme.font};
      background: ${props => props.theme.background};
    }

    div#root {
      height: 100%;
      width: 100%;
    }

    a {
      color: ${props => props.theme.color};
      text-decoration: none;
    }
`