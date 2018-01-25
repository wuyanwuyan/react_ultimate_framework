/**
 * 提取webpack 开发和生成环境下公有的配置
 * 包括 handlebars生成配置 ， 多页面entey入口配置
 * @type {{hbs_html_config: [*]}}
 */
const hotMiddlewareScript = 'webpack-hot-middleware/client?timeout=2000&reload=true';  // webpack-hot-middleware热更新需要添加到入口文件
const entry = {
    vendor: ['react', 'react-dom'],
    home: ['./client/page/home.js'],
    login: ['./client/page/login.js'],
    manager: ['./client/page/manager/index.js'],
    bitChart: ['./client/page/bitChart/index.js']
};

let entry_dev = {};
Object.keys(entry).forEach(key => {
    if (key !== 'vendor') {
        entry_dev[key] = [hotMiddlewareScript].concat(entry[key]);
    } else {
        entry_dev[key] = entry[key];
    }
})

/**
 * webpack entry有几个，这里就有几个handlebars的配置
 * @type {{hbs_html_config: [*], entry_dev: {}, entry: {vendor: [*], home: [*], login: [*]}}}
 */
module.exports = {
    hbs_html_config: [
        {
            template: './client/default.hbs',
            filename: 'home.hbs',
            chunks: ['manifest', 'vendor', 'home']
        },
        {
            template: './client/default.hbs',
            filename: 'login.hbs',
            chunks: ['manifest', 'vendor', 'login']
        },
        {
            template: './client/default.hbs',
            filename: 'manager.hbs',
            chunks: ['manifest', 'vendor', 'manager']
        },
        {
            template: './client/default.hbs',
            filename: 'bitChart.hbs',
            chunks: ['manifest', 'vendor', 'bitChart']
        }
    ],
    entry_dev,
    entry
};
