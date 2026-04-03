const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// ✅ CORS (IMPORTANT FOR FRONTEND)
app.use(cors({
  origin: "*", // later you can restrict to your frontend URL
  credentials: true
}));

// ✅ Health check
app.get("/", (req, res) => {
  res.send("API Gateway Running 🚀");
});

// ✅ AUTH SERVICE
app.use("/api/auth", createProxyMiddleware({
  target: "https://auth-server-5zut.onrender.com",
  changeOrigin: true,
  pathRewrite: {
    "^/api/auth": ""
  },
  onProxyReq: (proxyReq, req) => {
    if (req.headers.cookie) {
      proxyReq.setHeader("cookie", req.headers.cookie);
    }
  }
}));

// ✅ ADMIN SERVICE
app.use("/api/admin", createProxyMiddleware({
  target: "https://auth-server-5zut.onrender.com",
  changeOrigin: true,
  pathRewrite: {
    "^/api/admin": ""
  },
  onProxyReq: (proxyReq, req) => {
    if (req.headers.cookie) {
      proxyReq.setHeader("cookie", req.headers.cookie);
    }
  }
}));

// ✅ PRODUCT SERVICE (FIXED 🚀)
app.use("/api/products", createProxyMiddleware({
  target: "https://product-server-g2ci.onrender.com", // ✅ FIXED
  changeOrigin: true,
  pathRewrite: {
    "^/api/products": ""
  }
}));

// ✅ 404 handler
app.use((req, res) => {
  console.log("Route not found:", req.method, req.url);
  res.status(404).send("Not Found");
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API Gateway running on ${PORT}`);
});