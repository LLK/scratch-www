var keyMirror = require('keymirror');
var jar = require('../lib/jar.js');

var Types = keyMirror({
    SET_PERMISSIONS: null,
    SET_PERMISSIONS_ERROR: null
});

module.exports.reducer = function (state, action) {
    if (typeof state === 'undefined') {
        state = '';
    }
    switch (action.type) {
    case Types.SET_PERMISSIONS:
        return action.permissions;
    case Types.SET_PERMISSIONS_ERROR:
        return state;
    default:
        return state;
    }
};

module.exports.getPermissions = function () {
    return function (dispatch) {
        jar.getUnsignedValue('scratchsessionsid', 'permissions', function (err, value) {
            if (err) return dispatch(module.exports.setPermissionsError(err));
            return dispatch(module.exports.setPermissions(value));
        });
    };
};

module.exports.setPermissions = function (permissions) {
    return {
        type: Types.SET_PERMISSIONS,
        permissions: permissions
    };
};

module.exports.setPermissionsError = function (error) {
    return {
        type: Types.SET_PERMISSIONS_ERROR,
        error: error
    };
};
