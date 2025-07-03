



// module.exports=(req,res,next)=>{
//     const authHeader = req.headers.authorization
//    if(!authHeader || !authHeader.startswith("Bearer ")){
//         return res.status(401).json({ message: "Unauthorized access" });
//     }


//     const token = authHeader.split(" ")[1];
//     try {
//         const decoded = jwt.verify(token. process.env.JWT_SECRET);
//         //   req.user = decoded;
//         req.user ={ id: decoded._id };
//           next()
//     } catch (error) {
//           res.status(401).json({ success: false, message: "Invalid token" });``
        
//     }
//    }



const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('received',token);
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    console.log(req.user)
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
