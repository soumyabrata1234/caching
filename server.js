app.use(express.json());

app.use(async (req, res) => {
  const fullUrl = origin + req.url;

  if (req.method === 'GET') {
    const cached = getCache(fullUrl);
    if (cached) {
      console.log(`[HIT] ${req.method} ${req.url}`);
      res.set("X-Cache", "HIT");
      return res.status(cached.status).set(cached.headers).send(cached.data);
    }

    try {
      const response = await axios.get(fullUrl);
      setCache(fullUrl, {
        status: response.status,
        headers: response.headers,
        data: response.data,
      });

      console.log(`[MISS] ${req.method} ${req.url}`);
      res.set("X-Cache", "MISS");
      res.status(response.status).set(response.headers).send(response.data);
    } catch (err) {
      console.error("Error (GET):", err.message);
      res.status(500).send("Error fetching from origin server");
    }
  } else {
    try {
      const axiosConfig = {
        method: req.method,
        url: fullUrl,
        data: req.body,
        headers: req.headers,
      };

      const response = await axios(axiosConfig);

      console.log(`[FORWARDED] ${req.method} ${req.url}`);
      res.status(response.status).set(response.headers).send(response.data);
    } catch (err) {
      console.error(`Error (${req.method}):`, err.message);
      res.status(500).send("Error forwarding request to origin server");
    }
  }
});
