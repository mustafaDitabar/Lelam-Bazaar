const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    
     // استخراج دقیق اطلاعات
     req.user = decoded.userInfo.username;
     req.roles = decoded.userInfo.roles;
     req.userId = decoded.userInfo.userId;
    
    
    // 👈 همه اطلاعات در req.user
    next();
  });
};

module.exports = verifyJWT;



//کد سابق

// const jwt = require("jsonwebtoken");

// const verifyJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization || req.headers.Authorization;
//   if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
//   const token = authHeader.split(" ")[1];

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) return res.sendStatus(403);

//     req.user = decoded.userInfo.username;
//     req.roles = decoded.userInfo.roles;

//     next();
//   });
// };

// module.exports = verifyJWT;
