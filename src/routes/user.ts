import { Router } from 'express';
import { tokenController } from '../controllers/token.controller';
import { userController } from '../controllers/user.controller';

const router: Router = Router();

/**
 * @api {get} /user/me/info Get user profile
 * 
 * @apiName GetUserProfile
 * 
 * @apiGroup User
 *
 * @apiDescription Get the profile of the authenticated user.
 *
 * @apiHeader {String} Authorization User's access token in the format "Bearer {token}"
 *
 * @apiSuccess {String} email User's email address
 * @apiSuccess {String} name User's first name
 * @apiSuccess {String} surname User's last name
 * @apiSuccess {String} role User's role (e.g., "admin", "customer")
 * @apiSuccess {String} phone User's phone number
 * @apiSuccess {Object} deliveryAddress User's delivery address (see example below)
 * @apiSuccess {String} company User's company
 * @apiSuccess {Boolean} news Whether the user is subscribed to news
 * @apiSuccess {Boolean} verified Whether the user has been verified
*/
router.get('/me/info', tokenController.verify, userController.get.me);

/**
 * @api {patch} /user/me/info Update user profile
 * 
 * @apiName UpdateUser
 * 
 * @apiGroup User
 * 
 * @apiParam {String} [name] User's first name
 * @apiParam {String} [surname] User's last name
 * @apiParam {String} [phone] User's phone number
 * @apiParam {String} [deliveryAddress] User's delivery address
 * @apiParam {String} [company] User's company name
 * @apiParam {Boolean} [news] Whether the user wants to receive news or not
 * 
 * @apiSuccess {String} message User patched
 * 
 * @apiError (400) UserNotFound The user does not exist
 * @apiError (400) ValidationError A validation error has occurred
 * @apiError (500) ServerError The server encountered an error while updating the user
 */
router.patch('/me/info', tokenController.verify, userController.patch.me);

/**
 * @api {get} /user/me/orders Get User Orders
 * 
 * @apiName GetUserOrders
 * 
 * @apiGroup User
 * 
 * @apiDescription Get the orders of the authenticated user.
 * 
 * @apiHeader {String} Authorization User's access token in the format "Bearer {token}".
 * 
 * @apiSuccess {Array} orders Array of orders made by the user.
*/
router.get('/me/orders', tokenController.verify, userController.get.orders);

export default router;
