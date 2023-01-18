import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import Unocss from 'unocss/vite';
import autoprefixer from 'autoprefixer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import mockPlugin from 'vite-plugin-file-mock';
import mkcert from "vite-plugin-mkcert";
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from "rollup-plugin-visualizer";
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import { getCurrentTime, getBuildEnv } from './config/util';
import { preBuildDepends } from './config/preBuild';
import unoCssConfig from './config/unoCssConfig/index';
import serverProxy from './config/serverProxy';
const commonLessPath = normalizePath(path.resolve(__dirname, './src/common/style/index.less'));


const assetsFile = 'static';
const currentNow = getCurrentTime();

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = getBuildEnv(command, mode);
  console.log({env});
  return {
    base: env.VITE_STATIC_URL || '',
    resolve: {
      extensions: ['.ts', '.js', '.mjs', '.jsx', '.tsx', '.json', '.less', '.css'],
      // 别名配置
      alias: {
        '@': path.join(__dirname, 'src'),
        common: path.join(__dirname, 'src/common'),
        components: path.join(__dirname, 'src/components'),
        assets: path.join(__dirname, 'src/assets'),
        views: path.join(__dirname, 'src/views'),
        stores: path.join(__dirname, 'src/stores'),
        apis: path.join(__dirname, 'src/apis'),
      }
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 8', '> 1%']
          })
        ]
      },
      preprocessorOptions: {
        less: {
          additionalData: `@import "${commonLessPath}";`,
        },
      },
    },
    server: {
      hmr: true,
      open: true,
      https: true,
      host: true,
      proxy: serverProxy
    },
    plugins: [
      vue(),
      legacy({
        targets: ['ie >= 11'],
      }),
      mkcert(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/
        ],
        imports: ['vue', 'vue-router', 'pinia', {
          'common/utils/useCache': ['useCache'],
          'common/utils/useEmitt': ['useEmitt'],
          'apis/index': [['*', 'API']]
        }],
        dts: 'src/auto-imports.d.ts',
        eslintrc: { enabled: true },
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dirs: ['src/components/**'],
        dts: 'src/auto-components.d.ts',
        resolvers: [ElementPlusResolver()]
      }),
      Unocss({
        presets: [presetUno(), presetAttributify(), presetIcons()],
        ...unoCssConfig
      }),
      createSvgIconsPlugin({
        iconDirs: [path.join(__dirname, 'src/assets/svgs')],
        symbolId: 'icon-[dir]-[name]',
        customDomId: '__svg__icons__dom__'
      }),
      mockPlugin({
        dir: path.resolve(__dirname, './mock'),
        enable: false
      }),
      ...(mode !== 'dev' ? [createHtmlPlugin({
        minify: true,
      })] : []),
      // visualizer({ // 包体积依赖分析的，在需要的时候开启它
      //   open: true,
      // }),
      chunkSplitPlugin({
        customSplitting: {
          sensors: [/src\/assets\/js\/sensors/]
        }
      })
    ],
    build: {
      outDir: 'dist',
      assetsDir: assetsFile,
      cssTarget: 'chrome61',
      minify: 'terser',
      chunkSizeWarningLimit: 500,
      sourcemap: mode === 'online' ? false : 'hidden',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          entryFileNames: `${assetsFile}/[name].${currentNow}.js`,
          assetFileNames: `${assetsFile}/[name].[hash][extname]`,
          chunkFileNames: `${assetsFile}/[name].${currentNow}.js`,
        },
      },
      terserOptions: {
        compress: {
          drop_debugger: env.VITE_DROP_DEBUGGER === 'true',
          drop_console: env.VITE_DROP_CONSOLE === 'true'
        }
      }
    },
    optimizeDeps: {
      include: preBuildDepends
    }
  }
});
