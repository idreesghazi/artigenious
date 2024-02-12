export async function handler(req, res) {
    const endpoint = "https://oauth2.googleapis.com/tokeninfo";
  
    // Send request to Google to authenticate token
    try {
      const result = await fetch(`${endpoint}?id_token=${req.body.credential}`);
      if (!result.ok) {
        throw new Error("Failed to authenticate token");
      }
      const jwt = await result.json();
      /**
       * TODO: Code to look up user in DB by jwt.email
       */
    } catch (err) {
      return res.status(500).text(err.message);
    }
  }