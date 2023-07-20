import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from "postcss-pxtorem"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'./',
  server:{
    port:7878
  },
  css:{
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue({file}){
            return file.indexOf('vant') !== -1 ? 37.5 :75
          },
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        })

      ]
    }
  },
})
