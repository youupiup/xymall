// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router/index'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from "./util/currency";

Vue.use(Vuex);
Vue.config.productionTip = false
Vue.use(infiniteScroll);//懒加载
Vue.filter("currency",currency)

const store = new Vuex.Store({//运用vuex,store全局监听参数改变
  state:{//定义参数
    nickName:'',
    cartCount:0
  },
  mutations:{//参数改变函数
    updateUserInfo(state,nickName){
      state.nickName = nickName;
    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    },
    initCartCount(state,cartCount){
      state.cartCount = cartCount;
    }
  }
});

Vue.use(VueLazyLoad,{//懒加载的底部加载图片
  loading:"/static/loading-svg/loading-bars.svg"
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
