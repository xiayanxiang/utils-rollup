import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import resolve from "rollup-plugin-node-resolve";
import alias from '@rollup/plugin-alias';
import path from 'path';


export default {
    input: "./src/index.ts",
    output: [
        {
            file: './lib/index.ems.js',
            
            // path: path.resolve(process.cwd(), 'lib')
            // format: "es"
        },
        {
            file: './lib/index.cjs.js',
            format: 'cjs'
        }
        // {
        //     path: path.resolve(process.cwd(), 'lib'),
        //     filename: "eevee-utils.umd.js",
        //     format: 'umd',
        //     name: "EveUtils"
        // }
        
    ],
    plugin: [
        
        typescript(),
        alias({
            entries: [
                {
                    find: /^@/,
                    replacement: "./src"
                }
            ],
            customResolver: resolve({
                extensions: [".ts"]
            })
        }),
        resolve(),
        babel({
            exclude: ['node_modules/**'],
            extensions: [
                ...DEFAULT_EXTENSIONS,
                '.ts',
            ]
        }),
    ],
    paths: {
        '@/': './src/'
    }
}