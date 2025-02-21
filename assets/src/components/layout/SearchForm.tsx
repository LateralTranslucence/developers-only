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
            {/* <div className="container"> */}
                {/* <button className="search-close search-toggle search-bar-open" uk-toggle="target: .search-toggle; cls: search-bar-open">
                    <span>Close</span>
                </button> */}
                <form role="search" method="get" className="search-form do-search" action={ relativeHomeURL + '/search/' }>
                    <label className="screen-reader-text" htmlFor="keyword">Search for:</label>
                    <input type="search" className="search-field" autoComplete="off" placeholder="Search" name="s" id="s"></input>
                    <button type="submit" className="search-submit" title="Search">
                        <span><span>Search</span></span>
                    </button>
                </form>
            {/* </div> */}
        </search>
    );
}
export default SearchForm;