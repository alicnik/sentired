import { createGlobalStyle } from 'styled-components'

import comicSansWoff from './comic-sans.woff'
import comicSansWoff2 from './comic-sans.woff2'

export default createGlobalStyle`
    @font-face {
        font-family: 'Comic Sans';
        src: local('Comic Sans'), local('ComicSans'),
        url(${comicSansWoff2}) format('woff2'),
        url(${comicSansWoff}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
`