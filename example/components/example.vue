<template>
  <div class="container">
    <a-button @click="getCurrentMd">get md</a-button>
    <markdown-it-vue-ant
      class="md-body"
      :content="content"
      :options="options"
      ref="mdEditor"
    />
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
  },
};
</script>
