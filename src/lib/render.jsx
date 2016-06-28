var redux = require('redux');
var thunk = require('redux-thunk').default;
// JSX syntax transforms to React.createElement
var React = require('react'); // eslint-disable-line
var combineReducers = require('redux').combineReducers;
var ReactDOM = require('react-dom');
var StoreProvider = require('react-redux').Provider;

var IntlProvider = require('./intl.jsx').IntlProvider;
var sessionActions = require('../redux/session.js');

require('../main.scss');

var render = function (jsx, element, reducers) {
    var store = redux.createStore(
        combineReducers(reducers),
        redux.applyMiddleware(thunk)
    ); //TODO: spread things

    // Get locale and messages from global namespace (see "init.js")
    var locale = window._locale || 'en';
    var messages = {};
    if (typeof window._messages !== 'undefined') {
        if (typeof window._messages[locale] === 'undefined') {
            // Fall back on the split
            locale = locale.split('-')[0];
        }
        if (typeof window._messages[locale] === 'undefined') {
            // Language appears to not be supported – fall back to 'en'
            locale = 'en';
        }
        messages = window._messages[locale];
    }

    // Render view component
    ReactDOM.render(
        <StoreProvider store={store}>
            <IntlProvider locale={locale} messages={messages}>
                {jsx}
            </IntlProvider>
        </StoreProvider>,
        element
    );

    // Get initial session
    store.dispatch(sessionActions.refreshSession());
};

module.exports = render;
