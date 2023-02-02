import { createGlobalStyle } from 'styled-components'



const Global = createGlobalStyle`
  :root {
    --frame-clr: #ddd !important;
    --dark-frame-clr: #bbb !important;
    --brand-clr: #0072ff !important;
    --white-clr: #fff !important;
    --font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Ubuntu', 'Oxygen', Helvetica Neue, sans-serif !important;
    --title-clr: #333 !important;
    --grey-clr: #777 !important;
    --yellow-clr: #e1e115 !important;
    --gold-clr: #FFD700 !important;
    --neutral: #888 !important;
    --dark-grey: #666 !important;
    --dark-clr: #222 !important;
    --answer: #484848 !important;
    --dark-hover-clr: #33333311 !important;
    --dark-shadow-clr: #00000044 !important;
    --bright-shadow-clr: #ffffffaa !important;
    --diabled-clr: #aaa !important;
    --almost-white: #eee !important;
    --transparent-border-clr: #f4f4f4 !important;
    --white-border-clr: #f8f8f8 !important;
    --searchbar-clr: #f9f9f9 !important;
    --disabled-clr: #aaa !important;
    --btn-hover-clr: #3355ff11 !important;
    --dark-green: #158151 !important;
    --dark-red: #c44444 !important;
    --light-brown: #911111 !important;
    --bright-brand: #00a6ff !important;
    --bright-green: #81ff91 !important;
    --mobile-treshold: 809px !important;
    --modal-shadow-clr: #33333388 !important;
    --window-shadow: rgb(0 0 0 / 28%) 0px 3px 8px !important;
    --border-shadow: 0 2px 8px rgb(0 0 0 / 26%) !important;
    --header-shadow: rgb(0 0 0 / 8%) 0px 1px 12px !important;
    --box-shadow: 0px 16px 32px rgb(0 0 0 / 15%), 0px 3px 8px rgb(0 0 0 / 10%) !important;
    --plain-shadow: 0px 6px 20px rgb(0 0 0 / 20%) !important;
    --thin-shadow: rgb(0 0 0 / 8%) 0px 1px 0px !important;
    --body-clr: #fff !important;
    --only-bright-box-shadow: 0px 16px 32px rgb(0 0 0 / 15%), 0px 3px 8px rgb(0 0 0 / 10%) !important;
    --bright-bg: #f0f0f0 !important;
    --opposite-contrast: #000 !important;
    --opacite-white: rgba(255, 255, 255, 0) !important;
    --brand-btn-clr-webkit: -webkit-linear-gradient(to right, #00a6ff, #0072ff);
    --brand-btn-clr: linear-gradient(to right, #00a6ff, #0072ff);
    --brand-bg-clr-webkit: -webkit-linear-gradient(to left, #00cc66, #0072ff);
    --brand-bg-clr: linear-gradient(to left, #00cc66, #0072ff);
  }
  *{
    margin: 0 !important;
    box-sizing: border-box !important;
    padding: 0 !important;
    outline: none !important;
  }
  html{
    -webkit-text-size-adjust: 100% !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;  
    background: transparent !important; 
  }
  hr {
    border: none !important;
    border-bottom: solid 1px var(--frame-clr) !important;
    margin: 8px 0 !important;
  }
  button {
    background-color: transparent;
    border: none;
  }
  body {
    font-family: var(--font-family) !important;
    color: var(--title-clr) !important;
    font-size: .9rem !important;
    line-height: 1.43 !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
    background-color: var(--body-clr) !important; 
    min-height: 120vh !important;
    margin: 0 !important;
  }
  a {
    text-decoration: none;
    display: inline-block;
    position: relative;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number]{
    -moz-appearance: textfield;
  }
  input[type=text] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  input {
    background-color: transparent !important;
  }
  @media screen and (-webkit-min-device-pixel-ratio:0) { 
    select,
    textarea,
    input {
      font-size: 16px;
    }
  }
  li{
    list-style-type: none !important;
  }
  input{
    background-color: transparent !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  button, 
  input[type="button"], 
  input[type="reset"], 
  input[type="submit"]{
    -webkit-appearance: button !important;
  }
  input[type="checkbox" i] {
    cursor: default !important;
    appearance: auto !important;
    margin: 3px 3px 3px 4px !important;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #222 !important;
  }
`


export { Global as GlobalStyleSheet }