<template>
  <div style="margin:10px">
    <a-row type="flex">
      <a-button-group>
        <a-dropdown>
          <a-menu slot="overlay">
            <template v-for="h in 6">
              <a-menu-item :key="h" @click="insertHeading(h)"
                >Level {{ h }} heading</a-menu-item
              >
            </template>
          </a-menu>
          <a-button>H</a-button>
        </a-dropdown>
        <a-button>OK</a-button>
      </a-button-group>
    </a-row>
    <a-row type="flex" style="background-color:green">
      <a-card :body-style="bodyStyle" spellcheck="false" style="width:100%">
        <a-col :span="12">
          <a-textarea
            id="markdown-it-vue-ant-content"
            class="markdown-it-vue-ant-content"
            :autosize="{ minRows: 20 }"
            v-model="currentContent"
            :rows="100"
            :auto-focus="true"
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
import MarkdownItMermaid from "./markdown-it-mermaid";
import "github-markdown-css";
import "markdown-it-highlight/dist/index.css";

export default {
  name: "MarkdownItVueAnt",
  props: {
    content: {
      type: String,
      default: "# Hello World!",
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
      .use(MarkdownItAbbr)
      .use(MarkdownItMermaid);
    return {
      md: md,
      currentContent: "",
      preview: "",
      bodyStyle: { padding: 0 },
    };
  },
  methods: {
    async render() {
      const preview = await this.md.render(this.currentContent);
      this.preview = preview;
      return preview;
    },
    generatePreview() {
      this.render().then(() => {
        this.md.mermaid.init(undefined, document.querySelectorAll(".mermaid"));
      });
    },
    insert(val) {
      const editor = document.getElementById("markdown-it-vue-ant-content");
      if (editor.selectionStart || editor.selectionStart === 0) {
        const startPos = editor.selectionStart;
        const endPos = editor.selectionEnd;
        const restoreTop = editor.scrollTop;
        const content = this.currentContent;
        this.newStartPos = startPos + val.length;
        this.currentContent =
          content.substring(0, startPos) +
          val +
          content.substring(endPos, content.length);
        if (restoreTop > 0) {
          editor.scrollTop = restoreTop;
        }
      } else {
        this.currentContent += val;
      }
      this.render().then(() => {
        editor.focus();
        editor.setSelectionRange(this.newStartPos, this.newStartPos);
      });
    },
    insertHeading(level) {
      this.insert("#".repeat(level) + " ");
      const editor = document.getElementById("markdown-it-vue-ant-content");
      editor.focus();
      editor.setSelectionRange(3, 3);
    },
  },
  watch: {
    currentContent: {
      immediate: true,
      handler: function() {
        this.generatePreview();
      },
    },
  },
  mounted: function() {
    this.currentContent = this.content;
    this.generatePreview();
  },
};
</script>
<style scoped>
.markdown-it-vue-ant-content {
  border: none;
  outline: none;
  font-size: 1.2rem;
  margin: 10px;
  resize: none;
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
