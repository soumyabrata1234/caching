# 🔄 Caching Proxy CLI

A simple Node.js CLI tool that starts a caching proxy server. It forwards HTTP requests to a specified origin server and caches the GET responses. On repeated requests, it serves from cache with an `X-Cache: HIT` header, otherwise from origin with `X-Cache: MISS`.

 🚀 Usage

```bash
npx github:soumyabrata1234/caching --port 3000 --origin https://dummyjson.com
