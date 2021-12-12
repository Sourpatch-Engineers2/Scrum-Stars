let alert = require('alert');

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