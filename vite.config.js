import { glslify } from 'vite-plugin-glslify'

export default {
    root: 'src/',
    publicDir: '../static/',
    plugins: [glslify()],
    build: {
        outDir: '../dist',
    }
}
