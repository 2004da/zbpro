const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const targetUrl = process.env.TARGETURL || 'http://example.com';
const port = process.env.PORT || 3000;

// 反向代理配置
const proxyOptions = {
    target: targetUrl,
    changeOrigin: true,
    ws: true, // 启用 WebSocket 支持
};

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

// 使用反向代理中间件
app.use('/api', createProxyMiddleware(proxyOptions));

// 监听app端口
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
