// workbox-config.js
module.exports = {
    globDirectory: 'build/',
    globPatterns: [
        '**/*.{html,js,css,png,jpg,jpeg,gif,svg,ico}'
    ],
    swDest: 'build/service-worker.js',
    mode: 'production',
    templatedURLs: {
        '/': ['index.html'],
    },
};
