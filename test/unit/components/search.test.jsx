import React from 'react';
const {shallowWithIntl} = require('../../helpers/intl-helpers.jsx');
import configureStore from 'redux-mock-store';
import Search from '../../../src/views/search/search';

describe('Search', () => {
    const mockStore = configureStore();
    let store;
    beforeEach(() => {
        store = mockStore({
            navigation: {
                searchTerm: '',
                setSearchTerm: jest.fn()
            }
        });
    });

    const getSearchWrapper = props => {
        const wrapper = shallowWithIntl(
            <Search
                {...props}
            />
            , {context: {store}}
        );
        return wrapper
            .dive() // unwrap redux connect(injectIntl(Search))
            .dive(); // unwrap injectIntl(Search)
    };

    test('search query in URL is parsed', () => {
        const searchInstance = getSearchWrapper().instance();
        /* eslint-disable no-undef */
        const trueSearchVal = window.location.search; // save true value to restore
        // mock the requesting URL
        const mockedLocation = {
            ...window.location,
            search: '?q=cat'
        };
        Object.defineProperty(window, 'location', {
            writable: true,
            value: mockedLocation
        });
        const searchTerm = searchInstance.getSearchTermFromURL();
        expect(searchTerm).toEqual('cat');
        // set window.location back to normal
        window.location.search = trueSearchVal;
        /* eslint-enable no-undef */
    });

    test('search query with pluses to indicate spaces replaces them', () => {
        const searchInstance = getSearchWrapper().instance();
        /* eslint-disable no-undef */
        const trueSearchVal = window.location.search; // save true value to restore
        // mock the requesting URL
        const mockedLocation = {
            ...window.location,
            search: '?q=spider+man'
        };
        Object.defineProperty(window, 'location', {
            writable: true,
            value: mockedLocation
        });
        const searchTerm = searchInstance.getSearchTermFromURL();
        expect(searchTerm).toEqual('spider man');
        // set window.location back to normal
        window.location.search = trueSearchVal;
        /* eslint-enable no-undef */
    });

    test('simple search query results in searching for that term', () => {
        const searchInstance = getSearchWrapper().instance();
        const searchTerm = searchInstance.getSearchTermFromQuery('?q=cat');
        expect(searchTerm).toEqual('cat');
    });

    test('empty search query results in searching for empty string', () => {
        const searchInstance = getSearchWrapper().instance();
        let searchTerm = searchInstance.getSearchTermFromQuery('?q=');
        expect(searchTerm).toEqual('');
    });

    test('specifying mode but not search query results in searching for empty string', () => {
        const searchInstance = getSearchWrapper().instance();
        const searchTerm = searchInstance.getSearchTermFromQuery('?mode=trending');
        expect(searchTerm).toEqual('');
    });

    test('simple search query with trending results in searching for that term', () => {
        const searchInstance = getSearchWrapper().instance();
        const searchTerm = searchInstance.getSearchTermFromQuery('?q=cat&mode=trending');
        expect(searchTerm).toEqual('cat');
    });

    test('simple search query with trending first results in searching for that term', () => {
        const searchInstance = getSearchWrapper().instance();
        const searchTerm = searchInstance.getSearchTermFromQuery('?mode=trending&q=cat');
        expect(searchTerm).toEqual('cat');
    });

    test('search query with urlencoded chars results in searching for unencoded version', () => {
        const searchInstance = getSearchWrapper().instance();
        let searchTerm = searchInstance.getSearchTermFromQuery('?q=%3Fq%3Dcat%26mode%3Dtrending');
        expect(searchTerm).toEqual('?q=cat&mode=trending');
    });
});
