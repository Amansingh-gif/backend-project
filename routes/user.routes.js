import {Router} from "express"
import { logoutUser, registerUser } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { loginUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router= Router()
router.route('/register').post(
    upload.fields([
         {
            name:"avatar",
            maxCount:1
         }
        ,{
            name:"coverimage",
            maxCount:1
        }]),
    registerUser)

router.route('/login').post(loginUser)


//talking about the logout route
//secured routes because this functionality will only get by User
//who is already logged in means they have the access or refreshtoken
router.route('/logout').post(verifyJWT,logoutUser)
export default router