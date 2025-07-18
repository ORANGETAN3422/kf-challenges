import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { level } = req.query;

  if (!level || typeof level !== "string") {
    return res.status(400).json({ error: "Missing or invalid level parameter" });
  }

  const url = "http://www.boomlings.com/database/getGJLevels21.php";

  const body = new URLSearchParams({
    str: level,
    star: "1",
    type: "0",
    secret: "Wmfd2893gb7",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "GeometryDash/2.206",  // some Boomlings APIs may need this
      },
      body: body.toString(),
    });

    const text = await response.text();

    if (!response.ok || text.includes("-1")) {
      return res.status(502).json({ error: "Boomlings API failed or returned no data", raw: text });
    }

    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
