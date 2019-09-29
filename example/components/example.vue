<template>
  <div class="container" style="margin:100px">
    <a-button @click="getCurrentMd">get md</a-button>
    <a-button @click="changePreview">change Preview</a-button>

    <div style="margin-top:50px">
      <markdown-it-vue-ant
        class="md-body"
        :content="content"
        :options="options"
        :is-preview="isPreview"
        ref="mdEditor"
      />
    </div>
  </div>
</template>

<script>
import MarkdownText from "./example";
import MarkdownItVueAnt from "../../src";
export default {
  components: {
    MarkdownItVueAnt,
  },
  data() {
    return {
      visible: false,
      isPreview: false,
      content: MarkdownText,
      options: {
        markdownIt: {
          linkify: true,
        },
        linkAttributes: {
          attrs: {
            target: "_self",
            rel: "noopener",
          },
        },
      },
    };
  },
  methods: {
    getCurrentMd() {
      alert(this.$refs.mdEditor.currentContent);
    },
    changePreview() {
      this.isPreview = !this.isPreview;
    },
  },
};
</script>
<style>
.markdown-it-vue-ant-card-preview {
  border: none;
}
</style>
