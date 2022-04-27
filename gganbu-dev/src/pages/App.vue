<template>
  <div>
    Vue3.x项目初始化
    <div>获取的数据</div>
    <div>{{ data }}</div>
    <input multiple type="file" @change="handleOnChange" />
  </div>
</template>
<script lang="ts">
import { onMounted } from "vue"
import { getInfo, createOrder } from "../api/manage/order"
import { uploadApi } from "../api/upload"
export default {
  mounted() {
    this.getInfoFromServer()
  },
  data() {
    return {
      data: "",
    }
  },
  methods: {
    async handleOnChange(e) {
      console.log(e.target.files)
      let files = e.target.files
      let formData = new FormData()
      formData.append("files", files)
      await uploadApi({ hello: formData })
    },
    async getInfoFromServer() {
      let res = await getInfo({ products: 1 })
      this.data = res
    },
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
