<template>
  <div class="container">
    <markdown-it-vue-ant
      class="md-body"
      :content="content"
      :options="options"
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
};
</script>

<style scoped>
.containerd {
  display: inline-flex;
  width: 60%;
}

.md-textd {
  width: 47%;
}

.md-bodyd {
  width: 50%;
  margin-left: 20px;
}
</style>
