const validateRegistration = (req, res, next) => {
    const { username, password, email } = req.body;
  
    if (!username || !password || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ error: "Username must be between 3 and 20 characters" });
    }
  
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
  
    next();
  };
  
  const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ error: "Username must be between 3 and 20 characters" });
    }
  
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
  
    next();
  };
  
  module.exports = {
    validateRegistration,
    validateLogin,
  };
  