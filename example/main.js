import Vue from "vue";

import { Button, Row, Col, Card, Input } from "ant-design-vue";

import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Input);

new Vue({
  render: h => h(App),
}).$mount("#app");
