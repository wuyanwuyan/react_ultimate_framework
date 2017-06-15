/**
 * 提取webpack 开发和生成环境下公有的配置
 * 包括 handlebars生成配置 ， 多页面entey入口配置
 * @type {{hbs_html_config: [*]}}
 */
const hotMiddlewareScript = 'webpack-hot-middleware/client?timeout=2000&reload=true';  // webpack-hot-middleware热更新需要添加到入口文件
const entry = {
    vendor: ['react', 'react-dom'],
    home: ['./src/page/home.js'],
    login: ['./src/page/login.js']
};




let entry_dev = {};
Object.keys(entry).forEach(key => {
    if (key !== 'vendor') {
        entry_dev[key] = [hotMiddlewareScript].concat(entry[key]);
    }else{
        entry_dev[key] = entry[key];
    }
})

module.exports = {
    hbs_html_config: [
        {
            template: './src/home.hbs',
            filename: 'home.hbs',
            chunks: ['vendor', 'home']
        },
        {
            template: './src/login.hbs',
            filename: 'login.hbs',
            chunks: ['vendor', 'login']
        },
        {
            template: './src/about.hbs',
            filename: 'about.hbs',
            chunks: ['vendor', 'index']
        }
    ],
    entry_dev,
    entry
};
