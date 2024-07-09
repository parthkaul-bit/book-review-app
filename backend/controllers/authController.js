exports.registerUser = (req, res) => {
    const { email, username, password } = req.body;
    // Add your registration logic here (e.g., save to the database)
    res.status(200).json({ message: 'User registered successfully' });
  };
  