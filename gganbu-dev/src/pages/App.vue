<template>
  <div>
    Vue3.x项目初始化
    <div>获取的数据</div>
    <div>{{ data }}</div>
    <input name="file" multiple type="file" @change="handleOnChange" />
  </div>
</template>
<script lang="ts">
import { instance } from "../../Gganbu/src/request"
import { getInfo, postInfo, uploadImage } from "../api/manage/order"

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
      let files = e.target.files
      console.log(files)
      let payload = new FormData()
      payload.append("file", files[0])
      payload.append("file1", files[1])
      let res = await uploadImage(payload)
      this.data = res
    },
    async getInfoFromServer() {
      let res1 = await getInfo({ hello: "helloworld", world: "helloworld" })
      // let res1 = await postInfo({ hello: "hello" })
      console.log(res1, 19199)
      this.data = res1
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
