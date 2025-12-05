import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

// fetch lichess user
app.get("/user/:username", async (req: Request, res: Response) => {
  const username = req.params.username;

  try {
    const response = await fetch(`https://lichess.org/api/user/${username}`);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Lichess returned status ${response.status}`,
      });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
