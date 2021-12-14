let alert = require('alert');

/**
 * @description ensureAuth object will be used to redirect the user if they aren't logged in and continue if they are
 */
module.exports = {
    ensureAuth: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
            alert("Please login to continue");
        }
    }
}