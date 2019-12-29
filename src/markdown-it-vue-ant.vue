<template>
  <div>
    <a-row type="flex" v-if="!isPreview">
      <a-button-group class="markdown-it-vue-ant-tools-bar">
        <a-dropdown>
          <a-menu slot="overlay">
            <template v-for="h in 6">
              <a-menu-item :key="h" @click="insertHeader(h)"
                >Level {{ h }} Header</a-menu-item
              >
            </template>
          </a-menu>
          <a-button>Header</a-button>
        </a-dropdown>
        <a-button @click="insertToc">ToC</a-button>
        <a-button @click="insertTable">Table</a-button>
        <a-button @click="insertScript">Script</a-button>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item @click="insertFlowchart">flowchart</a-menu-item>
            <a-menu-item @click="insertSequence">sequence</a-menu-item>
            <a-menu-item @click="insertGantt">gantt</a-menu-item>
          </a-menu>
          <a-button>Mermaid</a-button>
        </a-dropdown>
        <a-button @click="insertSub">Sub</a-button>
        <a-button @click="insertSup">Sup</a-button>
        <a-button @click="insertMark">Mark</a-button>
        <a-popconfirm
          title="Are you sure clean this markdown content?"
          @confirm="clean"
          ok-text="Clean"
        >
          <a-button>Clean</a-button></a-popconfirm
        >
      </a-button-group>
    </a-row>
    <a-row type="flex">
      <a-card
        :class="[
          isPreview
            ? 'markdown-it-vue-ant-card-preview'
            : 'markdown-it-vue-ant-card',
        ]"
        :body-style="bodyStyle"
        spellcheck="false"
        style="width:100%"
      >
        <a-col :span="12" v-if="!isPreview">
          <a-textarea
            id="markdown-it-vue-ant-content"
            class="markdown-it-vue-ant-content"
            :autosize="{ minRows: 20 }"
            v-model="currentContent"
            :rows="100"
            :auto-focus="true"
          ></a-textarea>
        </a-col>
        <a-col :span="previewSpan">
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
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItMark from "markdown-it-mark";
import MarkdownItIns from "markdown-it-ins";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItAbbr from "markdown-it-abbr";
import MarkdownItLinkAttrs from "./markdown-it-link-attrs";
import MarkdownItHightlight from "./markdown-it-highlight";
import MarkdownItMermaid from "./markdown-it-mermaid";
import "github-markdown-css";

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
  .use(MarkdownItMermaid)
  .use(MarkdownItLinkAttrs);

export default {
  name: "MarkdownItVueAnt",
  props: {
    content: {
      type: String,
      default: "",
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
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
        //const restoreTop = editor.scrollTop;
        const content = this.currentContent;
        this.newStartPos = startPos + val.length;
        this.currentContent =
          content.substring(0, startPos) +
          val +
          content.substring(endPos, content.length);
        /*if (restoreTop > 0) {
          editor.scrollTop = restoreTop;
        }*/
      } else {
        this.currentContent += val;
      }
      this.render().then(() => {
        editor.setSelectionRange(this.newStartPos, this.newStartPos);
        editor.focus();
      });
    },
    insertHeader(level) {
      this.insert("#".repeat(level) + " ");
    },
    insertToc() {
      this.insert("[toc]\n");
    },
    insertTable() {
      this.insert(
        "| First Header | Second Header |\n| :--: | :--: |\n| Content Cell | Content Cell |\n",
      );
    },
    insertSub() {
      this.insert("H~2~O\n");
    },
    insertSup() {
      this.insert("9^th^\n");
    },
    insertScript() {
      this.insert("```bash\nfor i in `seq 100`;do\n    echo $i\ndone\n```\n");
    },
    insertMark() {
      this.insert("==mark==\n");
    },
    insertFlowchart() {
      this.insert(
        "```mermaid\ngraph TD;\nA-->B;\nA-->C;\nB-->D;\nC-->D;\n```\n",
      );
    },
    insertSequence() {
      this.insert(
        "```mermaid\nsequenceDiagram\nparticipant Alice\nparticipant Bob\nAlice->>John: Hello John, how are you?\nloop Healthcheck\nJohn->>John: Fight against hypochondria\nend\nNote right of John: Rational thoughts <br/>prevail!\nJohn-->>Alice: Great!\nJohn->>Bob: How about you?\nBob-->>John: Jolly good!\n```\n",
      );
    },
    insertGantt() {
      this.insert(
        "```mermaid\ngantt\ndateFormat  YYYY-MM-DD\ntitle Adding GANTT diagram to mermaid\nexcludes weekdays 2014-01-10\nsection A section\nCompleted task:done,des1,2014-01-06,2014-01-08\nActive task:active,des2,2014-01-09,3d\nFuture task:des3,after des2,5d\nFuture task2:des4,after des3,5d\n```\n",
      );
    },
    clean() {
      this.currentContent = "";
    },
  },
  watch: {
    currentContent: {
      immediate: true,
      handler: function() {
        this.generatePreview();
      },
    },
    content: {
      immediate: true,
      handler: function() {
        this.currentContent = this.content;
      },
    },
  },
  computed: {
    previewSpan: function() {
      if (this.isPreview) {
        return 24;
      } else {
        return 12;
      }
    },
  },
  mounted: function() {
    this.currentContent = this.content;
    this.generatePreview();
  },
};
</script>
<style>
.markdown-body pre code {
  white-space: pre-wrap;
}
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
.markdown-it-vue-ant-tools-bar .ant-btn {
  border-bottom: none;
  font-style: oblique;
  font-weight: bold;
}
</style>
