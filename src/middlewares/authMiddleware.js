import tokenService from "../services/tokenService.js";

export default function (req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return next(res.status(400).json('User not authorized'))

    const accessToken = authHeader.split(' ')[1] 
    if (accessToken === 'null') {
      return next(res.status(400).json('User not authorized'));
    }
    const user = tokenService.validateAccessToken(accessToken)
    if (!user) return next(res.status(401).json('Invalid token')) 

    req.user = user
    next()
  } catch (error) {
    return next('User not authorized middleware')
  }
};