const React = require('react');

const navigationActions = require('../../redux/navigation.js');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');
const Search = require('./search.jsx');

render(
    <Page><Search /></Page>,
    document.getElementById('app'),
    {navigation: navigationActions.navigationReducer}
);
