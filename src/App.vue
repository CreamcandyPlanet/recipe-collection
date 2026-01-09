<template>
  <!-- 唯一核心：路由出口，所有页面/布局都通过路由渲染到这里 -->
  <router-view />
</template>

<script setup>
// 无需任何导入或逻辑，保持空即可
// 所有全局配置（Element Plus、Pinia、路由）都在main.js中完成
</script>

<style scoped>
/* 根组件样式留空，全局样式在src/assets/css/main.scss中定义（如有需要） */
/* 若想加全局通用样式，可去掉scoped，或在main.scss中写 */
/* 示例全局样式（可选）：
body {
  margin: 0;
  padding: 0;
  font-family: "Microsoft YaHei", sans-serif;
}
*/
</style>