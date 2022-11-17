const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://ltdb.lantabur.sch.id/',
    // headers : {
    //   'Access-Control-Allow-Origin': '*', 
    //   'Access-Control-Allow-Headers' : '*'
    // }
  }
})
