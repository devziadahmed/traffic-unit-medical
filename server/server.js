import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(
  "/tensorflow",
  createProxyMiddleware({
    target: "https://tfhub.dev",
    changeOrigin: true,
    pathRewrite: {
      "^/tensorflow": "", // remove the /tensorflow prefix
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
