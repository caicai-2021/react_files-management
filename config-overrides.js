const {override, fixBabelImports} = require('customize-cra')

module.exports = override(
    fixBabelImports( 'import', { //配置上babel-piugin-import
            libraryName: 'antd' ,//针对的时antd
            libraryDirectory: 'es' ,//源码文件夹中的es文件夹
            style: 'css' ,//自动打包相关的css
        }),
        
);
