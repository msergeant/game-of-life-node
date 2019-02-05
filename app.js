const http = require('http');
const url = require('url');
const utils = require('./utilities');
const worldHandler = require('./worldHandler');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const parts = url.parse(req.url);
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, X-Prototype-Version, Token, Content-Type",
    "Access-Control-Max-Age": "1728000",
  };

  Object.keys(corsHeaders).forEach((key) => {
    res.setHeader(key, corsHeaders[key]);
  });

  if (req.method == 'OPTIONS') {
    utils.sendResponse(res, '', 200);
  }
  else if (parts.pathname === '/worlds/next') {
    worldHandler(req, res);
  } else {
    utils.sendResponse(res, "Not found", 404);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
