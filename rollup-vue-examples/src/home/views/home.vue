<template>
  <div>
    <h6 class="head_h6">{{name}} 演示</h6>
    <div class="head_div">Hello {{name}}的样式渲染效果是否成功？</div>
    <p class="head_p"><strong>渲染成功啦!!!!!</strong>,接下来我会再接再厉...</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: function(){
    return {
      name: 'Rollup+vue'
    }
  }
}
</script>

<style>
</style>
