var keyMirror = require('keymirror');
var api = require('../mixins/api.jsx').api;
var defaultsDeep = require('lodash.defaultsdeep');

var Types = keyMirror({
    SET_ACTIVITY: null,
    SET_ACTIVITY_STATUS: null,
    SET_ACTIVITY_ERROR: null
});

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

module.exports.getInitialState = function () {
    return {status: module.exports.Status.NOT_FETCHED, activity: []};
};

module.exports.activityReducer = function (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_ACTIVITY:
        return defaultsDeep({activity: action.activity}, state);
    case Types.SET_ACTIVITY_STATUS:
        return defaultsDeep({status: action.status}, state);
    case Types.SET_ACTIVITY_ERROR:
        // TODO: do something with action.error
        return state;
    default:
        return state;
    }
};

module.exports.setActivityError = function (error) {
    return {
        type: Types.SET_ACTIVITY_ERROR,
        error: error
    };
};

module.exports.setActivity = function (activity) {
    return {
        type: Types.SET_ACTIVITY,
        activity: activity
    };
};

module.exports.setStatus = function (status){
    return {
        type: Types.SET_ACTIVITY_STATUS,
        status: status
    };
};

module.exports.getActivity = function (username) {
    return function (dispatch) {
        dispatch(module.exports.setStatus(module.exports.Status.FETCHING));
        api({
            uri: '/proxy/users/' + username + '/activity?limit=5'
        }, function (err, body) {
            if (err) return dispatch(module.exports.setActivityError(err));

            if (typeof body !== 'undefined') {
                dispatch(module.exports.setActivity(body));
                dispatch(module.exports.setStatus(module.exports.Status.FETCHED));
                return;
            }
        });
    };
};
