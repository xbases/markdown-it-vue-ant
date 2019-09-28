import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import go from "highlight.js/lib/languages/go";
import bash from "highlight.js/lib/languages/bash";
import python from "highlight.js/lib/languages/python";
import nginx from "highlight.js/lib/languages/nginx";
import "highlight.js/styles/github.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("go", go);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("python", python);
hljs.registerLanguage("nginx", nginx);

const MarkdownItHighlight = md => {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info.length > 0) {
      return `<pre><code class="hljs">${
        hljs.highlightAuto(code, [token.info]).value
      }</code></pre>`;
    }
    return temp(tokens, idx, options, env, slf);
  };
};

export default MarkdownItHighlight;
