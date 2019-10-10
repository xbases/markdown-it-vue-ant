const MarkdownItLinkAttrs = md => {
  const temp =
    md.renderer.rules.link_open ||
    function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };
  md.renderer.rules.link_open = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    if (token.attrIndex) {
      const targetIndex = token.attrIndex("target");
      if (targetIndex < 0) {
        token.attrPush(["target", "_blank"]);
      }
    }
    return temp(tokens, idx, options, env, slf);
  };
};
export default MarkdownItLinkAttrs;
