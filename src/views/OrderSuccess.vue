<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>下单成功</span>
      </nav-bread>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>下单成功</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>确认</span> 地址</li>
            <li class="cur"><span>确认</span> 订单</li>
            <li class="cur"><span>支</span> 付</li>
            <li class="cur"><span>下单</span> 完成</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>恭喜您! <br>你的订单以及下单成功!</h3>
            <p>
              <span>订单ID：{{orderId}}</span>
              <span>订单总价：{{orderTotal|currency('￥')}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link class="btn btn--m" to="/cart">购物车</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link class="btn btn--m" to="/">继续购物</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'
  import axios from 'axios'
  export default{
      data(){
          return{
              orderId:'',
              orderTotal:0
          }
      },
      components:{
        NavBread,
        NavFooter,
        NavHeader
      },
      mounted() {
        let orderId = this.$route.query.orderId;
        if(!orderId){
          return;
        }
        axios.get("/users/orderDetail",{
          params:{
            orderId:orderId
          }
        }).then((response)=>{
            let res = response.data;
            if(res.status=='0'){
              this.orderId = orderId;
              this.orderTotal = res.result.orderTotal;
            }
        });
      }
  }
</script>
