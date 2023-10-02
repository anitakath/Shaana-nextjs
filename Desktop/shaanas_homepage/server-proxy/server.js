
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express();
const path = require('path')

// __dirname, um aktuelle URl zu erhalten (?)
const reactAppPath = path.join(__dirname, '../shaanashomepage/build')

const proxyPath = '/proxy'

const apiProxy = createProxyMiddleware({
  target: "http://localhost:5000/api/validate", //Die URL deiner Backend-API

  changeOrigin: true,
  pathRewrite: {
      [`^${proxyPath}`]: '', //Entfernt den Proxy-Pfad aus der Anfrage-URL
  },
});

app.use(proxyPath, apiProxy)

app.use(express.static(reactAppPath));
app.get('/proxy/*', (req, res) =>{
    res.sendFile(path.join(reactAppPath, 'index.html'))
})

const port = 3000;

app.listen(port, () =>{
    console.log(`Proxy server is running on port ${port}`)
});

