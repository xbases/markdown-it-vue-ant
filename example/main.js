import Vue from "vue";

import {
  Button,
  Row,
  Col,
  Card,
  Input,
  Icon,
  Dropdown,
  Menu,
} from "ant-design-vue";

import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Dropdown);
Vue.use(Menu);

new Vue({
  render: h => h(App),
}).$mount("#app");
