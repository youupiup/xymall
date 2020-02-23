<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">首页</a>
<!--        插槽-->
        <slot></slot>
      </nav>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NavBear"
    }
</script>

