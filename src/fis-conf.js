fis.set('statics', '/static');
fis.set('tpl', '/page/');
fis.set('project.ignore', [
  'output/**',
  'node_modules/**',
  '.git/**',
  '.svn/**'
]);
//FIS modjs模块化方案
fis.hook('commonjs');

//hash配置,类似执行fis2 -m 
fis.match('*.{js,css}', {
    useHash: true
  })
  .match('image', {
    useHash: true
  });

fis.match('*.{js,es,es6,jsx,ts,tsx}', {
  preprocessor: fis.plugin('js-require-css')
})

/****************异构语言编译*****************/
fis.match('**/*.less', {
  rExt: '.css', // from .less to .css
  parser: fis.plugin('less', {
      
  }),
  useMap: true
});

fis.match(/^\/js\/init\.js$/, {
    isMod: true,
    useMap: true,
    release: '${statics}/js/$1.js'
})

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: false, // 资源映射表内嵌
        obtainScript: false,
        obtainStyle: false
    })
})