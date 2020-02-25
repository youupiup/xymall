<!--弹出模态框组件-->
<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
        <div class="md-modal-inner">
          <div class="md-top">

            <button class="md-close" @click="closeModal">Close</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
<!--              插槽，指定名字进行绑定数据-->
              <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
              <slot name="btnGroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
    </div>
</template>

<script>
    export default {
        props:['mdShow'],//获取父组件的参数
        data(){
          return{}
        },
        methods:{
          closeModal(){
            this.$emit("close");//传输参数到父组件
          }
        }
    }
</script>

<style scoped>

</style>
