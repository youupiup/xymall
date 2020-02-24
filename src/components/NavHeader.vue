<template>
  <header class="header">
    <symbol id="icon-cart" viewBox="0 0 38 32"><title>cart</title>
      <path
        d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"
        class="path1"></path>
      <path
        d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"
        class="path2"></path>
      <path
        d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"
        class="path3"></path>
      <path
        d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"
        class="path4"></path>
    </symbol>
    <div class="navbar">
      <div class="navbar-left-container"><a href="/"><img src="static/logo.png" class="navbar-brand-logo"></a></div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <span v-text="nickName" class="navbar-link" v-if="nickName"></span>

          <a href="javascript:void(0)" v-if="!nickName" class="navbar-link" @click="loginModalFlag=true">登录</a> <a
          href="javascript:void(0)" v-if="nickName" class="navbar-link" @click="logOut">退出</a>
          <div class="navbar-cart-container" ><span class="navbar-cart-count" v-if="cartCount>0">{{cartCount}}</span>
            <a href="/#/cart" class="navbar-link navbar-cart-link" >
              <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">登  录</div>
          <button class="md-close" @click="loginModalFlag=false">关闭</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input" placeholder="用户名">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2" name="password" v-model="userPwd" class="regi_login_input" @keyup.enter="login" placeholder="密码">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登   录</a>
            <a href="javascript:;" class="text-capitalize font-size-5x" @click="registerShow">没账号？去注册>></a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':registerModalFlag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">注   册</div>
          <button class="md-close" @click="registerModalFlag=false">关闭</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">{{msgTip}}</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input" placeholder="新账户">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2" name="password" v-model="userPwd" class="regi_login_input" placeholder="新密码">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="3" name="userConfPwd" v-model="userConfPwd" class="regi_login_input" @keyup.enter="register" placeholder="再次输入密码">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="register">注    册</a>
            <a href="javascript:;" class="text-capitalize font-size-5x" @click="loginModalFlag=true;registerModalFlag=false">有账号？去登录>></a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag=false"></div>
    <div class="md-overlay" v-if="registerModalFlag" @click="registerModalFlag=false"></div>
    <modal :mdShow="isMdShow" @close="mdShow=false">
      <p slot="message">
        恭喜你，注册成功！
      </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="isMdShow=false">确定</a>
      </div>
    </modal>
  </header>
</template>

<script>
  import './../assets/css/login.css'
  import Modal from "@/components/Modal.vue";
  import axios from 'axios'
  import {mapState} from 'vuex' //封装的函数，监听改变
  export default {
        data(){
          return{
            userName:'',
            userPwd:'',
            userConfPwd:'',
            errorTip:false,//错误信息显示
            loginModalFlag:false,//遮罩层显示
            registerModalFlag:false,
            isMdShow:false,
            msgTip:''
          }
        },
        components:{
          Modal
        },
        mounted() {
          this.checkLogin();
        },
        computed:{
          // ...mapState(['nickName','cartCount'])

          nickName:{
            // return this.$store.state.nickName;
            get: function() {
              // 获取当前路由
              return this.$store.state.nickName;
            },
            set: function() {}
          },
          cartCount:{
            // return this.$store.state.cartCount;
            get: function() {
              // 获取当前路由
              return this.$store.state.cartCount;
            },
            set: function() {}
          }
        },
        methods:{
          checkLogin(){
            axios.get("/users/checkLogin").then((response)=>{
              let res = response.data;
              if(res.status=='0'){
                this.nickName = res.result;
                this.getCartCount();
                this.$store.commit("updateUserInfo",res.result);
                this.loginModalFlag = false;
              }else{
                if(this.$route.path !="/goods"){
                  this.$router.push("/").catch((data) => {});
                }
              }
            });
          },
          login(){
            if(!this.userName || !this.userPwd){
              this.errorTip = true;
              return;
            }
            axios.post("/users/login",{
              userName:this.userName,
              userPwd:this.userPwd
            }).then((response)=>{
              let res = response.data;
              if(res.status=="0"){
                this.errorTip = false;
                this.loginModalFlag = false;
                // this.nickName = res.result.userName;
                this.getCartCount();
                this.$store.commit("updateUserInfo",res.result.userName);
              }else{
                this.errorTip = true;
              }
            })
          },
          logOut(){
            axios.post("/users/logout").then((response)=>{
              let res = response.data;
              if(res.status=='0'){
                this.$store.commit("updateUserInfo",'');
                this.$store.commit("updateCartCount",-(this.cartCount));
                this.$router.push("/").catch((data) => {});
              }
            })
          },
          getCartCount(){
            axios.get("/users/getCartCount").then((response)=>{
              let res = response.data;
              this.$store.commit("initCartCount",res.result);
            })
          },
          registerShow(){
            this.registerModalFlag = true;
            this.loginModalFlag = false;
          },
          register(){
            if(!this.userName || !this.userPwd || !this.userConfPwd){
              this.errorTip = true;
              this.msgTip = '账户密码不能为空';
              return;
            }
            if(this.userPwd != this.userConfPwd){
              this.errorTip = true;
              this.msgTip = '两次输入的密码不一致';
              return;
            }
            if(this.userPwd.length<6){
              this.errorTip = true;
              this.msgTip = '密码至少6个字符';
              return;
            }
            axios.post("/users/register",{
              userName:this.userName,
              userPwd:this.userPwd,
              userConfPwd:this.userConfPwd
            }).then((response)=>{
              let res = response.data;
              if(res.status == '0'){
                this.isMdShow = true;
                this.registerModalFlag=false;
                this.checkLogin();
              }else{
                this.errorTip = true;
                this.msgTip = res.msg;
              }
            })
          }
        }
    }
</script>

