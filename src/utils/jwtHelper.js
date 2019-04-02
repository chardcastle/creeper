import jwt from 'jwt-simple';

/**
 * For access to the jwt's values
 *
 * example:
 *
 *    let tokenData = jwtHelper.extractTokenData(localStorage.getItem('id_token'));
 *
 *    if (! tokenData.isOk) {
 *        return dispatch => {
 *            dispatch(failUserUpdate("Login expired, please login again."));
 *        };
 *    } else {
 *        console.log('token is ok');
 *        console.log(tokenData.value);
 *    }
 *
 * @todo Remove or use securley
 */
export default class jwtHelper {

    static extractTokenData(token)
    {
        try {
            let jwtData = jwt.decode(token, 'DJPVEVEO6WiyvUxRW8UABKAMIGQmb29d', false);
            return {
              isOk: true,
              value: jwtData
            };
        } catch (e) {
            return {
                isOk: false,
                message: e.message
            };
        }
    }
}