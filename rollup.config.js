import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

export default defineConfig([
  {
    input: "src/app.ts",
    output: {
      dir: "dist",
      format: "es",
      sourcemap: true,
      name: "quizzy-server",
    },
    plugins: [
      resolve(), // helps Rollup find node modules
      commonjs(), // converts commonjs modules to ES6
      typescript({ tsconfig: "tsconfig.json" }), // compiles TypeScript
      json(), // allows Rollup to import JSON files
      terser(), // minify the bundle
    ],
    external: [
      "express",
      "mongoose",
      "dotenv",
      "morgan",
      "cors"
    ],
  }
]);