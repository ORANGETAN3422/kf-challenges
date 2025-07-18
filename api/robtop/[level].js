export default async function handler(req, res) {
  const { level } = req.query;  // Get level from URL path

  if (!level || typeof level !== "string") {
    return res.status(400).json({ error: "Missing or invalid level parameter" });
  }

  const url = "http://www.boomlings.com/database/getGJLevels21.php";

  const data = new URLSearchParams({
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
      },
      body: data.toString(),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch data from Boomlings API" });
    }

    const text = await response.text();

    // Return raw level data
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
