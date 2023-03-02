# Framer Scripts ![https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://junhoyeo.notion.site/Framer-Scripts-6334bc617f544d6b8b17d6351755e5c6&count_bg=#008BFF&title_bg=#000000&icon=&icon_color=#E7E7E7&title=VIEWS&edge_flat=true](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://junhoyeo.notion.site/Framer-Scripts-6334bc617f544d6b8b17d6351755e5c6&count_bg=#008BFF&title_bg=#000000&icon=&icon_color=#E7E7E7&title=VIEWS&edge_flat=true)

Useful code snippets for deploying websites with Framer 🪄<br />
**[Framer](https://framer.com/)로 웹사이트를 배포할 때 유용하게 사용할 수 있는 코드 조각 모음 🪄**

By **Junho Yeo([i@junho.io](mailto:i@junho.io))**

# 🔐 Passcode Check (패스코드 체크)
TBD

## Demo
https://feedback-harm-302980.framer.app

# 🖍️ Highlighting Text In Framer

Highlighter for Framer, implemented by Code Overrides.

## Demo
https://reserved-offering-953297.framer.app

### Usage

1. Create a **Text** node and insert your content.
2. Select the text you want to highlight and create a link to `highlight-mock#000` with `#000` as the highlight color.
3. Select the **Text** node again, and create an new **Code** file in the **Code Overrides** section. Paste the [contents](https://github.com/junhoyeo/framer-code-overrides/blob/main/with-highlight.tsx) there.
4. Go back to the **Text** node and select `withHighlight` in the **Code Overrides** section.
