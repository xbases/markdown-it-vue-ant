import MarkdownItVueAnt from "./markdown-it-vue-ant";
const install = function (Vue) {
  Vue.component(MarkdownItVueAnt.name, MarkdownItVueAnt);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

MarkdownItVueAnt.install = install;
export default MarkdownItVueAnt;
