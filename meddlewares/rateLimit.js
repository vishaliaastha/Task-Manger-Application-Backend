
// const User = require('../model/UserModel'); // Import your user model

// const rateLimiter = async (req, res, next) => {
//   const userId = req.user._id; // Assuming you have the user object attached to the request (e.g., using authentication middleware)
//   const currentTime = Date.now();

//   try {
//     // Retrieve the user from the database
//     const user = await User.findById(userId);
    
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Get the timestamp of the last API call made by the user
//     const lastApiCallTimestamp = user.lastApiCallTimestamp || 0;

//     // Calculate the time elapsed since the last API call in seconds
//     const timeElapsedInSeconds = Math.floor((currentTime - lastApiCallTimestamp) / 1000);

//     // Reset the API call count and update the last API call timestamp if the time elapsed exceeds 1 minute
//     if (timeElapsedInSeconds > 60) {
//       user.apiCallCount = 0;
//       user.lastApiCallTimestamp = currentTime;
//       await user.save();
//     }

//     // Check if the user has reached the API call limit
//     if (user.apiCallCount >= 10) {
//       return res.status(429).json({ error: 'API call limit exceeded' });
//     }

//     // Increment the API call count and update the last API call timestamp
//     user.apiCallCount += 1;
//     user.lastApiCallTimestamp = currentTime;
//     await user.save();

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error('Rate limiter error:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = rateLimiter;

// const Task = require('../model/TaskModel')
// const moment = require('moment')

// const tasklimiter = async (req, res, next) => {
//     const id = req.user 
//     console.log(id)
//     try {
//       const now = new Date();  
//       const oneMinuteAgo = moment().subtract(1, 'minute');  
//       const taskCount = await Task.countDocuments({
//         user:id,
//         startOn: { $gte: oneMinuteAgo, $lte: now }
//       });  
//       if (taskCount >= 2) {
//         return res.status(400).send({msg:"Try after one minute"});
//       }  
//       next();
//     } catch (error) {
//         console.log(error)
//       return res.status(400).send({msg:"Could not add task"});
//     }
//   };
//   module.exports =tasklimiter