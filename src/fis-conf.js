fis.set('statics', '/static');
fis.set('tpl', '/page/');
fis.set('project.ignore', [
  'output/**',
  'node_modules/**',
  '.git/**',
  '.svn/**'
]);
var domain = '//leavenfe.com/ezhan/public';
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
    release: '${statics}/js/init.js'
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

//tmpl、tpl作为js模板，直接Inline到js中，不需要发布
fis.match('*.tmpl', {
      parser: fis.plugin('utc'),
      isJsLike: true,
      release: false
    })
    .match('*.tpl', {
      release: false
    })
    .match('*.inline.less', {
      release: false
    })
    .match('*.md', {
      release: false
    })
/**********************生产环境下CSS、JS压缩合并*****************/
//发布上线的时候进行压缩合并js、css
fis.media('prod')
  .match('*.js', {
    optimizer: fis.plugin('uglify-js'),
    domain: domain
  })
  .match('*.css', {
    optimizer: fis.plugin('clean-css'),
    domain: domain
  })
  .match('*.less', {
    optimizer: fis.plugin('clean-css'),
    domain: domain
  })
  .match('*', {
    domain: domain
  });

/****************上线配置请勿随便修改******************/
fis.media('prod')
  .match('**', {
    deploy: fis.plugin('local-deliver', {
      to: '../public'
    })
});
