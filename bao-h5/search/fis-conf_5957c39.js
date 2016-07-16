fis.set('statics', '/search');
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
  postprocessor: fis.plugin('autoprefixer'),
  useMap: true
});

fis.match(/^\/js\/.*\.js$/, {
    isMod: true,
    useMap: true,
    release: '${statics}/js/init.js'
})

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 {
    "res": {
        "css/csslib.less": {
            "uri": "/css/csslib.css",
            "type": "css"
        },
        "css/index.less": {
            "uri": "/css/index.css",
            "type": "css"
        },
        "css/mipad.less": {
            "uri": "/css/mipad.css",
            "type": "css"
        },
        "css/reset.less": {
            "uri": "/css/reset.css",
            "type": "css"
        },
        "fis-conf.js": {
            "uri": "/fis-conf_5957c39.js",
            "type": "js"
        },
        "lib/mod.js": {
            "uri": "/lib/mod_e3c86fb.js",
            "type": "js"
        },
        "lib/flexible.js": {
            "uri": "/lib/flexible_2600918.js",
            "type": "js"
        },
        "lib/zepto.js": {
            "uri": "/lib/zepto_e4c6ac9.js",
            "type": "js"
        },
        "lib/zepto/zepto.js": {
            "uri": "/lib/zepto/zepto_403509d.js",
            "type": "js"
        },
        "lib/zepto/ajax.js": {
            "uri": "/lib/zepto/ajax_9cbb62e.js",
            "type": "js"
        },
        "lib/zepto/event.js": {
            "uri": "/lib/zepto/event_a701b6c.js",
            "type": "js"
        },
        "lib/zepto/data.js": {
            "uri": "/lib/zepto/data_a188ed4.js",
            "type": "js"
        },
        "lib/zepto/fx.js": {
            "uri": "/lib/zepto/fx_5820fe4.js",
            "type": "js"
        },
        "lib/zepto/cookie.js": {
            "uri": "/lib/zepto/cookie_4b55a66.js",
            "type": "js"
        },
        "js/init.js": {
            "uri": "/search/js/init_068f36d.js",
            "type": "js",
            "extras": {
                "moduleId": "js/init"
            }
        },
        "lib/snap.svg.js": {
            "uri": "/lib/snap.svg_2173132.js",
            "type": "js",
            "deps": [
                "eve"
            ]
        },
        "lib/zepto/assets.js": {
            "uri": "/lib/zepto/assets_c33aae3.js",
            "type": "js"
        },
        "lib/zepto/callbacks.js": {
            "uri": "/lib/zepto/callbacks_eaa30f9.js",
            "type": "js"
        },
        "lib/zepto/deferred.js": {
            "uri": "/lib/zepto/deferred_d0bcbfe.js",
            "type": "js"
        },
        "lib/zepto/detect.js": {
            "uri": "/lib/zepto/detect_59c2176.js",
            "type": "js"
        },
        "lib/zepto/form.js": {
            "uri": "/lib/zepto/form_507c681.js",
            "type": "js"
        },
        "lib/zepto/fx_methods.js": {
            "uri": "/lib/zepto/fx_methods_f8bbbfe.js",
            "type": "js"
        },
        "lib/zepto/gesture.js": {
            "uri": "/lib/zepto/gesture_a043781.js",
            "type": "js"
        },
        "lib/zepto/ie.js": {
            "uri": "/lib/zepto/ie_e4dda0b.js",
            "type": "js"
        },
        "lib/zepto/ios3.js": {
            "uri": "/lib/zepto/ios3_e10d1bb.js",
            "type": "js"
        },
        "lib/zepto/selector.js": {
            "uri": "/lib/zepto/selector_f083818.js",
            "type": "js"
        },
        "lib/zepto/stack.js": {
            "uri": "/lib/zepto/stack_1fa404a.js",
            "type": "js"
        },
        "lib/zepto/touch.js": {
            "uri": "/lib/zepto/touch_fbeb20a.js",
            "type": "js"
        }
    },
    "pkg": {}
} 结构，来解决资源加载问题
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
// fis.media('prod')
  // .match('*.js', {
  //   optimizer: fis.plugin('uglify-js')
  // })
  // .match('*.css', {
  //   optimizer: fis.plugin('clean-css')
  // })
  // .match('*.less', {
  //   optimizer: fis.plugin('clean-css')
  // })

//
fis.media('git')
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

/****************git配置请勿随便修改******************/
fis.media('git')
  .match('**', {
    deploy: fis.plugin('local-deliver', {
      to: '../public'
    })
});

  /****************上线配置请勿随便修改******************/
fis.media('prod')
  .match('**', {
    deploy: fis.plugin('local-deliver', {
      to: '../bao-h5/search'
    })
  })
  .match('*.html', {
    deploy: fis.plugin('local-deliver', {
      to: '../bao-h5'
    })
  })
  
