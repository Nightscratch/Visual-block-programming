export default {
    build:{
        outDir:'./package',
        lib: 
            {
            entry:  './src/main.js',
            name: 'vb',
            formats :['cjs','es','umd'],
            fileName: (format) => `vb.${format}.js`,
        },
        
        sourcemap: true,
    },
    base:'/Visual-block-programming/'
  }