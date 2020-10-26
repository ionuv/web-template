/*
 * @Author: Yu lin Liu
 * @Date: 2019-08-22 09:21:27
 * @Description: file content
 */
// vue.config.js  修改
const debug = process.env.NODE_ENV !== 'production'
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport')
const StylelintPlugin = require('stylelint-webpack-plugin')

const baseColor = '#70b913'

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  // 基本路径 rent/
  publicPath: debug ? '/' : '/',
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: process.env.NODE_ENV === 'development', // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  productionSourceMap: false,
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    // 配置别名
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('mixins', resolve('src/mixins'))

    if (process.env.NODE_ENV === 'production') {
      // 启用GZip压缩
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(() => {})
    }

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(process.env.NODE_ENV === 'development', config =>
      config.devtool('cheap-source-map')
    )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          vant: {
            name: 'chunk-vant', // split vant into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  },
  configureWebpack: config => {
    // 配置骨架屏
    config.plugins.push(
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: resolve('./src/components/zv-skeleton/index.js')
          }
        },
        quiet: true,
        minimize: true
      })
    )

    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new StylelintPlugin({
          files: ['src/**/*.{html,vue,css,sass,scss}'],
          fix: false,
          cache: true,
          emitErrors: true,
          failOnError: false
        })
      )
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8000,
    https: false,
    hot: true,
    hotOnly: true
  },
  parallel: require('os').cpus().length > 1,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375,
            viewportHeight: 667,
            unitPrecision: 3,
            viewportUnit: 'vw',
            selectorBlackList: ['.ignore', '.hairlines', 'van-circle__layer'],
            minPixelValue: 1,
            mediaQuery: false
          })
        ]
      },
      css: {
        localIdentName: '[name]-[hash]',
        camelCase: 'only'
      },
      sass: {
        data: `@import "@/assets/styles/variables.scss";@import "@/assets/styles/mixin.scss";`
      },
      less: {
        modifyVars: {
          black: '#212121',
          green: baseColor,
          blue: baseColor,
          red: '#e53935',
          orange: '#e53935',
          'text-color': '#212121',
          'action-sheet-item-font-size': '14px',
          'field-input-text-color': '#8b8b8b',
          'notice-bar-height': '44px',
          'dialog-header-padding-top': '14px',
          'dialog-has-title-message-padding-top': '30px',
          'button-border-radius': '5px',
          'button-disabled-opacity': '0.6',
          'button-default-background-color': '#fafafa',
          'button-small-height': '28px',
          'button-small-font-size': '14px',
          'button-small-min-width': '60px',
          'button-large-height': '44px',
          'button-large-line-height': '42px',
          'button-default-height': '36px',
          'button-default-line-height': '34px',
          'tabs-default-color': baseColor,
          'cell-value-color': '#8b8b8b',
          'cell-horizontal-padding': '16px',
          'cell-label-margin-top': '0',
          'nav-bar-height': '44px',
          'nav-bar-background-color': baseColor,
          'nav-bar-arrow-size': '16px',
          'nav-bar-icon-color': 'white',
          'nav-bar-text-color': 'white',
          'nav-bar-title-text-color': 'white'
        }
      }
    }
  }
}
