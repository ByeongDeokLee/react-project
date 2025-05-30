const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/oauth2.0",
    createProxyMiddleware({
      target: "https://nid.naver.com",
      changeOrigin: true,
      secure: false,
    })
  );

  app.use(
    "/v1/nid",
    createProxyMiddleware({
      target: "https://openapi.naver.com",
      changeOrigin: true,
      secure: false,
    })
  );
};
