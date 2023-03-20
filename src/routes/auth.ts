import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { tokenController } from '../controllers/token.controller';

const router: Router = Router();

/**
 * @api {post} /auth/sign/in Sign In
 * 
 * @apiName Sign In
 * 
 * @apiGroup Authentication
 * 
 * @apiParam {String} email User's email address
 * @apiParam {String} password User's password
 * @apiParam {Boolean} [remember=false] Option to remember the user's session
 * 
 * @apiSuccess {String} message Success message
 * @apiSuccess {String} token Access token for the authenticated user
 * 
 * @apiError (400 Bad Request) InvalidCredentials The email or password provided are incorrect
 * @apiError (400 Bad Request) UserNotVerified The user's account has not been verified yet
 * @apiError (500 Internal Server Error) FailedToCheckCredentials There was an error checking the user's credentials
 * @apiError (500 Internal Server Error) FailedToCreateToken There was an error creating an access token for the user
 */
router.post('/sign/up', authController.sign.up);

/**
 * @api {post} auth/sign/up Signup a new user
 * 
 * @apiName Signup
 * 
 * @apiGroup Authentication
 * 
 * @apiParam {String} email User's email address (required)
 * @apiParam {String} name User's name (required)
 * @apiParam {String} surname User's surname (required)
 * @apiParam {String} phone User's phone number (required)
 * @apiParam {String} password User's password (required)
 * @apiParam {Object} deliveryAddress User's delivery address (required)
 * @apiParam {String} deliveryAddress.street Street address (required)
 * @apiParam {String} deliveryAddress.city City (required)
 * @apiParam {String} deliveryAddress.state State (required)
 * @apiParam {String} deliveryAddress.zip Zip code (required)
 * @apiParam {Object} company User's company information (required)
 * @apiParam {String} company.name Company name (required)
 * @apiParam {String} company.cin Company identification number (required)
 * @apiParam {String} company.vat Company value added tax number (required)
 * 
 * @apiSuccess {String} message Success message.
 * 
 * @apiError (400 Bad Request) {String} error Error message.
 * @apiError (500 Internal Server Error) {String} error Error message.
*/
router.post('/sign/in', authController.sign.in);

/**
 * @api {post} /auth/sign/up/:token Verify User Email
 * @apiName VerifyEmail
 * @apiGroup Authentication
 *
 * @apiParam {String} token User's email verification token
 *
 * @apiSuccess {String} message User verified
 *
 * @apiError (Error 400) {String} error Missing token or invalid token or user already verified
 * @apiError (Error 500) {String} error Failed to check if user exists or failed to verify user
 */
router.post('/sign/up/:token', authController.sign.confirm);

/**
 * @api {post} /auth/forgot/password Forgot Password
 * 
 * @apiName Forgot Password
 * 
 * @apiGroup Password
 * 
 * @apiDescription Sends an email to the user containing a reset token for their password.
 * 
 * @apiParam {String} email User's email address.
 * 
 * @apiSuccess {String} message Success message.
 * 
 * @apiError {String} error Error message.
*/
router.post('/forgot/passwd', authController.password.forgot);

/**
 * @api {post} /auth/reset/password Reset Password
 * 
 * @apiName Reset Password
 * 
 * @apiGroup Password
 * 
 * @apiParam {String} token Token received in the password reset email.
 * @apiParam {String} password New password for the user account.
 * 
 * @apiSuccess {String} message Success message.
 * 
 * @apiError (400 Bad Request) InvalidToken The token provided is invalid.
 * @apiError (400 Bad Request) UserNotFound The user associated with the token does not exist.
 * @apiError (400 Bad Request) InvalidToken The token provided has already been used.
 * @apiError (500 Internal Server Error) FailedToCheckToken The server failed to check the validity of the token.
 * @apiError (500 Internal Server Error) FailedToUpdateUserPassword The server failed to update the user's password.
 * @apiError (500 Internal Server Error) FailedToUpdateToken The server failed to update the token.
*/
router.post('/reset/passwd', authController.password.reset);

/**
 * @api {post} /auth/reset/email Reset Email Address
 * 
 * @apiName ResetEmail
 * 
 * @apiGroup Email
 * 
 * @apiParam {String} email New email address.
 * 
 * @apiSuccess {String} message Success message.
 * 
 * @apiError {String} error Error message.
*/
router.post('/reset/email', tokenController.verify, authController.email.reset);

/**
 * @api {post} /auth/reset/email/:token Confirm Email Change
 * 
 * @apiName ConfirmEmailChange
 * 
 * @apiGroup Email
 * 
 * @apiParam {String} token Token received via email to confirm email change
 * 
 * @apiSuccess (200) {String} message Success message
 * 
 * @apiError (400) MissingToken Missing token parameter
 * @apiError (400) InvalidToken Invalid token
 * @apiError (400) UserDoesNotExist User does not exist
 * @apiError (500) FailedToCheckIfTokenIsValid Failed to check if token is valid
 * @apiError (500) FailedToCheckIfUserExists Failed to check if user exists
 * @apiError (500) FailedToUpdateUser Failed to update user
 * @apiError (500) FailedToUpdateToken Failed to update token
*/
router.post('/reset/email/:token', authController.email.confirm);

export default router;
