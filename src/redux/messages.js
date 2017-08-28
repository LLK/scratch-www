var defaultsDeep = require('lodash.defaultsdeep');
var keyMirror = require('keymirror');

var api = require('../lib/api');
var log = require('../lib/log');

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null,
    MESSAGES_ERROR: null,
    ADMIN_ERROR: null,
    INVITE_ERROR: null,
    CLEAR_ERROR: null,
    DELETE_ERROR: null
});

module.exports.getInitialState = function () {
    return {
        status: {
            admin: module.exports.Status.NOT_FETCHED,
            message: module.exports.Status.NOT_FETCHED,
            clear: module.exports.Status.NOT_FETCHED,
            delete: module.exports.Status.NOT_FETCHED
        },
        messages: {
            admin: [],
            social: [],
            invite: {}
        }
    };
};

module.exports.messagesReducer = function (state, action) {
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }

    switch (action.type) {
    case 'SET_MESSAGES':
        return defaultsDeep({
            messages: {social: action.messages}
        }, state);
    case 'SET_ADMIN_MESSAGES':
        return defaultsDeep({
            messages: {admin: action.messages}
        }, state);
    case 'SET_MESSAGES_OFFSET':
        return defaultsDeep({
            messages: {socialOffset: action.offset}
        }, state);
    case 'SET_SCRATCHER_INVITE':
        return defaultsDeep({
            messages: {invite: action.invite}
        }, state);
    case 'ADMIN_STATUS':
        return defaultsDeep({status: {admin: action.status}}, state);
    case 'MESSAGE_STATUS':
        return defaultsDeep({status: {message: action.status}}, state);
    case 'CLEAR_STATUS':
        return defaultsDeep({status: {clear: action.status}}, state);
    case 'DELETE_STATUS':
        return defaultsDeep({status: {delete: action.status}}, state);
    case 'ERROR':
        log.error(action.error);
        return state;
    default:
        return state;
    }
};

module.exports.setMessagesError = function (error) {
    return {
        type: 'ERROR',
        error: error
    };
};

module.exports.setMessages = function (messages) {
    return {
        type: 'SET_MESSAGES',
        messages: messages
    };
};

module.exports.setMessagesOffset = function (offset) {
    return {
        type: 'SET_MESSAGES_OFFSET',
        offset: offset
    };
};

module.exports.setAdminMessages = function (messages) {
    return {
        type: 'SET_ADMIN_MESSAGES',
        messages: messages
    };
};

module.exports.setScratcherInvite = function (invite) {
    return {
        type: 'SET_SCRATCHER_INVITE',
        invite: invite
    };
};

module.exports.setStatus = function (type, status){
    return {
        type: type,
        status: status
    };
};

module.exports.clearMessageCount = function () {
    return function (dispatch) {
        dispatch(module.exports.setStatus('CLEAR_STATUS', module.exports.Status.FETCHING));
        api({
            host: '',
            uri: '/site-api/messages/messages-clear/',
            method: 'POST'
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setStatus('CLEAR_STATUS', module.exports.Status.CLEAR_ERROR));
                dispatch(module.exports.setMessagesError(err));
                return;
            }
            if (!body.success) {
                dispatch(module.exports.setStatus('CLEAR_STATUS', module.exports.Status.CLEAR_ERROR));
                dispatch(module.exports.setMessagesError('messages not cleared'));
                return;
            }
            dispatch(module.exports.setStatus('CLEAR_STATUS', module.exports.Status.FETCHED));
        });
    };
};

module.exports.clearAdminMessage = function (messageType, messageId, adminMessages) {
    return function (dispatch) {
        dispatch(module.exports.setStatus('CLEAR_STATUS', module.exports.Status.FETCHING));
        api({
            host: '',
            uri: '/site-api/messages/messages-delete/',
            method: 'POST',
            body: {
                alertType: messageType,
                alertId: messageId
            }
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setStatus('DELETE_STATUS', module.exports.Status.DELETE_ERROR));
                dispatch(module.exports.setMessagesError(err));
                return;
            }
            if (!body.success) {
                dispatch(module.exports.setStatus('DELETE_STATUS', module.exports.Status.DELETE_ERROR));
                dispatch(module.exports.setMessagesError('messages not cleared'));
            }

            if (messageType === 'invite') {
                // invite cleared, so set the invite prop to an empty object
                dispatch(module.exports.setScratcherInvite({}));
            } else {
                // find the admin message and remove it
                var toRemove = -1;
                for (var i in adminMessages) {
                    if (adminMessages[i].id === messageId) {
                        toRemove = i;
                        break;
                    }
                }
                adminMessages.splice(toRemove, 1);
                dispatch(module.exports.setAdminMessages(adminMessages));
            }
            dispatch(module.exports.setStatus('DELETE_STATUS', module.exports.Status.FETCHED));
        });
    };
};

module.exports.getMessages = function (username, token, messages, offset) {
    return function (dispatch) {
        dispatch(module.exports.setStatus('MESSAGE_STATUS', module.exports.Status.FETCHING));
        api({
            uri: '/users/' + username + '/messages?limit=40&offset=' + offset,
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setStatus('MESSAGE_STATUS', module.exports.Status.MESSAGES_ERROR));
                dispatch(module.exports.setMessagesError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setStatus('MESSAGE_STATUS', module.exports.Status.MESSAGES_ERROR));
                dispatch(module.exports.setMessagesError('No session content'));
                return;
            }
            dispatch(module.exports.setStatus('MESSAGE_STATUS', module.exports.Status.FETCHED));
            dispatch(module.exports.setMessages(messages.concat(body)));
            dispatch(module.exports.setMessagesOffset(offset + 40));
            dispatch(module.exports.clearMessageCount(token)); // clear count once messages loaded
        });
    };
};

module.exports.getAdminMessages = function (username, token) {
    return function (dispatch) {
        dispatch(module.exports.setStatus('ADMIN_STATUS', module.exports.Status.FETCHING));
        api({
            uri: '/users/' + username + '/messages/admin',
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setStatus('ADMIN_STATUS', module.exports.Status.ADMIN_ERROR));
                dispatch(module.exports.setMessagesError(err));
                dispatch(module.exports.setAdminMessages([]));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setStatus('ADMIN_STATUS', module.exports.Status.ADMIN_ERROR));
                dispatch(module.exports.setMessagesError('No session content'));
                dispatch(module.exports.setAdminMessages([]));
                return;
            }
            dispatch(module.exports.setAdminMessages(body));
            dispatch(module.exports.setStatus('ADMIN_STATUS', module.exports.Status.FETCHED));
        });
    };
};

module.exports.getScratcherInvite = function (username, token) {
    return function (dispatch) {
        api({
            uri: '/users/' + username + '/invites',
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setStatus('ADMIN_STATUS', module.exports.Status.INVITE_ERROR));
                dispatch(module.exports.setMessagesError(err));
                dispatch(module.exports.setScratcherInvite({}));
                return;
            }
            if (typeof body === 'undefined') return dispatch(module.exports.setMessagesError('No session content'));
            dispatch(module.exports.setScratcherInvite(body));
        });
    };
};
