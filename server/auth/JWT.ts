const { sign, verify } = require("jsonwebtoken");

const createTokens = (user: any) => {
  const accessToken = sign(
    { email: user.email, id: user.id },
    "jswsecretPlsChange"
  );
  return accessToken;
};

const validateToken = (req: any, res: any, next: any) => {
  const accessToken = req.cookies["access-token"];
  console.log(accessToken, req)
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, "jswsecretPlsChange");
    if (validToken) {
      req.authenticated = true;
      res.send(`Access Token: ${accessToken}`);
      return next()
    }
  } catch (err) {
    return res.status(400).json({error : err})
  }
};

module.exports = { createTokens, validateToken };
export {};
