// // INCOMPLETE CODE TIMESTAMP : 2:19:00

// const jwt = require("jsonwebtoken");

// function userMiddleware(req,res,next) {
//     const authHeader = req.headers.authorization;

//     if(!authHeader || !authHeader.startWith("Bearer "))
//     {
//         return res.status(401).json({errors: "no token provided"});

//     }
//     const token = authHeader.split(" ")(1);

//     console.log("Token: " + token);
//     try {
//         const decoded = jwt.verify(token );
//         req.userId = decoder.id;

//         next(); //To go to the next function (courseRoute/buy/courseId)
//     } catch (error) {
//         return res.status(401).json({errors: "Invalid token or expired"})
        
//     }
// };

// export default userMiddleware;