<template>
  <div>
    <a-row type="flex">
      <a-card
        style="width:100%;margin:50px"
        :body-style="bodyStyle"
        spellcheck="false"
      >
        <a-col :span="12">
          <a-textarea
            class="markdown-it-vue-ant-content"
            :autosize="{ minRows: 20 }"
            v-model="currentContent"
            :rows="100"
          ></a-textarea>
        </a-col>
        <a-col :span="12">
          <div
            class="markdown-body markdown-it-vue-ant-preview"
            v-html="preview"
            :bordered="false"
          ></div>
        </a-col>
      </a-card>
    </a-row>
  </div>
</template>
<script>
import MarkdownIt from "markdown-it";
import MarkdownItGithubToc from "markdown-it-github-toc";
import MarkdownItHightlight from "markdown-it-highlight";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItMark from "markdown-it-mark";
import MarkdownItIns from "markdown-it-ins";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItAbbr from "markdown-it-abbr";
import "github-markdown-css";
import "markdown-it-highlight/dist/index.css";
export default {
  name: "MarkdownItVueAnt",
  props: {
    content: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      default() {
        return {
          markdownIt: {
            linkify: true,
          },
        };
      },
    },
  },
  data() {
    const DEFAULT_OPTIONS_GITHUBTOC = {
      tocFirstLevel: 2,
      tocLastLevel: 3,
      tocClassName: "toc",
      anchorLinkSymbol: "",
      anchorLinkSpace: false,
      anchorClassName: "anchor",
      anchorLinkSymbolClassName: "octicon octicon-link",
    };
    const md = new MarkdownIt()
      .use(MarkdownItGithubToc, DEFAULT_OPTIONS_GITHUBTOC)
      .use(MarkdownItHightlight)
      .use(MarkdownItSub)
      .use(MarkdownItSup)
      .use(MarkdownItMark)
      .use(MarkdownItIns)
      .use(MarkdownItFootnote)
      .use(MarkdownItAbbr);
    return {
      md: md,
      currentContent: this.content,
      bodyStyle: { padding: 0 },
    };
  },
  computed: {
    preview: function() {
      return this.md.render(this.currentContent);
    },
  },
};
</script>
<style>
.markdown-it-vue-ant-content {
  border: none;
  outline: none;
  font-size: 1.2rem;
  margin: 10px;
  overflow-y: hidden;
}
.markdown-it-vue-ant-content:hover {
  border: none;
  outline: none;
  box-shadow: none;
}
.markdown-it-vue-ant-content:focus {
  border: none;
  outline: none;
  box-shadow: none;
}
.markdown-it-vue-ant-preview {
  margin: 10px;
}
</style>
