// import commonjs   from '@rollup/plugin-commonjs';
import resolve    from '@rollup/plugin-node-resolve';
// import { terser } from "rollup-plugin-terser";
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/main.ts',
  output: {
    file: 'bin/ha-config-generator.cjs',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    // commonjs(),
    typescript(),
    // terser() // Minify the bundle
  ],
  external: id => /node_modules/.test(id), // Mark dependencies in node_modules as external
};
