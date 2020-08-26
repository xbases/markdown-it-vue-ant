import mermaid from "mermaid";

const mermaidParse = (code) => {
  try {
    mermaid.parse(code);
    return `<div class="mermaid">${code}</div>`;
  } catch ({ str, hash }) {
    return `<pre>${str}</pre>`;
  }
};
const MarkdownItMermaid = (md) => {
  mermaid.initialize({
    flowchart: {
      useMaxWidth: true,
    },
    theme: "forest",
  });
  md.mermaid = mermaid;
  const temp = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, renderer) => {
    const token = tokens[idx];
    const code = token.content.trim();
    const type = token.content.split(/\n/)[0].trim();
    if (token.info === "mermaid") {
      return mermaidParse(code);
    } else if (
      type === "gantt" ||
      type === "sequenceDiagram" ||
      type.match(/^graph (?:TB|BT|RL|LR|TD);?$/)
    ) {
      return mermaidParse(code);
    } else {
      return temp(tokens, idx, options, env, renderer);
    }
  };
};
export default MarkdownItMermaid;
