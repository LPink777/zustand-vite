import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { normalizePath } from "vite";
import autoprefixer from "autoprefixer";
import pxToVw from "postcss-px-to-viewport";
import path from "path";
import cssnano from "cssnano";
import tailwindcss from "tailwindcss";
import tailwindConfig from "./tailwind.config.js";
import eslintPlugin from "vite-plugin-eslint";
import viteStylelint from "vite-plugin-stylelint";
import svgr from "vite-plugin-svgr";
import viteImagemin from "vite-plugin-imagemin";
import inspect from "vite-plugin-inspect";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import legacy from "@vitejs/plugin-legacy";
import { visualizer } from "rollup-plugin-visualizer";
import babel from "vite-plugin-babel";

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve("./src/variable.scss"));

const isProduction = process.env.NODE_ENV === "production";

const CDN_URL = "/";

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? CDN_URL : "/",
  plugins: [
    react(),
    //https启动
    basicSsl(),
    eslintPlugin({
      fix: true,
      exclude: ["/virtual:/", "node_modules/**"],
    }),
    viteStylelint({
      // 对某些文件排除检查
      fix: true,
    }),
    //SVG 组件加载
    svgr(),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7,
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9],
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
    inspect(),
    chunkSplitPlugin({
      // 指定拆包策略
      customSplitting: {
        // 1. 支持填包名。`react` 和 `react-dom` 会被打包到一个名为`render-vendor`的 chunk 里面(包括它们的依赖，如 object-assign)
        "react-vendor": ["react", "react-dom"],
        // 2. 支持填正则表达式。src 中 components 和 utils 下的所有文件被会被打包为`component-util`的 chunk 中
        "components-util": [/src\/components/, /src\/utils/],
      },
    }),
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      targets: [
        "iOS >= 9",
        "Android >= 4.4",
        "last 2 versions",
        "> 0.2%, not dead",
      ],
    }),
    visualizer({
      // 打包完成后自动打开浏览器，显示产物体积报告
      open: true,
    }),
    babel({
      babelConfig: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
  server: {
    port: 5172,
    open: true,
    https: false,
  },
  resolve: {
    // 别名配置
    alias: {
      "@assets": path.join(__dirname, "src/assets"),
    },
  },
  optimizeDeps: {
    // 预构建 按需加载的依赖都可以声明到这个数组里
    include: ["react", "react-dom"],
  },
  // css 相关的配置
  css: {
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        // additionalData: `@import "${variablePath}";`,
      },
    },
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 10", "> 1%"],
        }),
        pxToVw({
          unitToConvert: "px",
          viewportWidth: 750,
          unitPrecision: 5,
          propList: ["*"],
          viewportUnit: "vw",
          fontViewportUnit: "vw",
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: [],
          landscape: false,
        }),
        //cssnano 用来压缩和清理 CSS 代码
        cssnano({
          preset: "default",
        }),
        // tailwindcss配置
        tailwindcss(tailwindConfig),
      ],
    },
  },
  build: {
    // 超过4 KB 打包成内联文件
    assetsInlineLimit: 4 * 1024,
    modulePreload: {
      polyfill: true,
    },
    // 默认为 `esbuild`
    minify: "esbuild",
    // 产物目标环境
    // target: [
    //     'iOS >= 9',
    //     'Android >= 4.4',
    //     'last 2 versions',
    //     '> 0.2%, not dead',
    // ],
    // 设置 CSS 的目标环境
    cssTarget: "",
    rollupOptions: {
      output: {
        // manualChunks 配置
        // manualChunks: {
        //     // 将 React 相关库打包成单独的 chunk 中
        //     'react-vendor': ['react', 'react-dom'],
        // },
        // manualChunks: (id, { getModuleInfo }) => {
        //     console.log('id :>> ', id);
        //     const importers = getModuleInfo(id).importers;
        //     console.log('moduleInfo.importers :>> ', importers);
        //     if (id.includes('react') || id.includes('react-dom')) {
        //         return 'react';
        //     }
        // },
      },
    },
  },
});
