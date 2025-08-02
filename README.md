 Caching Proxy CLI
A simple CLI tool that starts a caching proxy server which forwards requests to an origin server and caches the responses.

  Usage
bash
Copy
Edit
npx github:soumyabrata1234/caching --port 3000 --origin https://dummyjson.com or {url}
Now visit:

bash
Copy
Edit
http://localhost:3000/products
First request → X-Cache: MISS
Subsequent requests → X-Cache: HIT

  Available Commands
Command	Description
--port <number>	Port to run the caching proxy
--origin <url>	The origin server to forward requests to
--clear-cache	Clears the in-memory cache

  Example
bash
Copy
Edit
npx github:soumyabrata1234/caching --port 4000 --origin  {url}

