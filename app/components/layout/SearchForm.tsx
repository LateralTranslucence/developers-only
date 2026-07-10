/*
 * Site search in navbar
 * The template htmlFor displaying search forms
 * Requires that a landing page at /search exists
 */
import React from 'react';
import '@/styles/components/search.scss';

const SearchForm: React.FC = () => {
    return (
        <search id="site-search" className="search-toggle">
            <form role="search" method="get" className="search-toggle__form search" action={ window.relativeHomeURL + '/search/' }>
                <label className="screenReader" htmlFor="s">Search for:</label>
                <input type="search" className="search-toggle__field" autoComplete="off" placeholder="Search" name="s" id="s"></input>
                <button type="submit" className="search-submit" title="Search">
                    <span><span>Search</span></span>
                </button>
            </form>
        </search>
    );
};
export default SearchForm;