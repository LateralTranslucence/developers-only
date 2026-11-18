import React, { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearch, isAbortError } from '@/utils/api';
import { convertNumberToWords, getPostID } from '@/utils/helpers';
import { getSearchPanelConfig } from '@/utils/panels';
import { PanelProps } from '@/utils/types/PanelProps';
import { Post } from '@/utils/types/Post';
import { emptySearchResponse, normalizeSearchResponse, SearchCriteria, SearchResponse } from '@/utils/types/Search';
import FormFieldLoader from '@/loaders/FormFieldLoader';
import PartialTemplateLoader from '@/loaders/PartialTemplateLoader';
import Heading from '@/components/shared/Heading';
import '@/styles/components/search.scss';
import '@/styles/components/blocks.scss';
import '@/styles/components/select-list.scss';

/*
 * The filter form's fields are uncontrolled: they keep what the visitor types,
 * and the form is read with FormData on submit. Hidden fields hold
 * "name=value" strings (the server's query_string format); visible ones hold
 * plain values. Both are accepted when the form is read.
 */

type UpdateCriteria = ( fieldName: string, fieldValue: string ) => void;

interface SearchFormProps {
    formRef: React.RefObject<HTMLFormElement | null>;
    onSubmit: () => void;
    results: SearchResponse;
}

const SearchForm: React.FC<SearchFormProps> = ( { formRef, onSubmit, results } ): JSX.Element => {
    const uiFields = Object.values( results.ui );
    return (
        <search id="search-filters-wrapper">
            <form
                ref={ formRef }
                className="search"
                id="custom-search"
                role="search"
                onSubmit={ ( e ) => { e.preventDefault(); onSubmit(); } }>
                <input type="hidden" value={ 'paged=' + results.current_page } name="paged" id="paged" />
                <input type="hidden" value={ 'sort=' + ( results.sort.current_value ?? '' ) } name="sort" id="sort" />
                { uiFields.length > 0 &&
                    <ul className="search__filter-list">
                        { uiFields.map( ( field, index: number ) => (
                            <li key={ index } className={ 'search__filter search__filter--' + field.type.replace( '_', '-' ) } id={ `${ field.name }-filter` }>
                                <FormFieldLoader type={ field.type } field={ field } error={ false } callback={ onSubmit } />
                            </li>
                        ) ) }
                    </ul>
                }
            </form>
        </search>
    );
};

const SearchResultsStatement: React.FC<{ results: SearchResponse; updateCriteria: UpdateCriteria }> = ( { results, updateCriteria } ): JSX.Element => {
    const { criteria, text } = results.results_statement;
    return (
        <p id="search-results-statement">
            { results.posts.length > 0 ? text : null }
            { criteria.length > 0 &&
                <>
                { results.posts.length > 0 && <span> for </span> }
                { criteria.map( ( criterion: SearchCriteria, index: number ) => (
                    <button key={ index } type="button" className="search__remove-criteria search-action" name={ criterion.name } value={ criterion.value_string } onClick={ () => updateCriteria( criterion.name, criterion.value_string ) }>
                        <span>{ criterion.name === 's' ? '"' + criterion.label + '"' : criterion.label }</span>
                    </button>
                ) ) }
                </>
            }
        </p>
    );
};

const SearchSortBy: React.FC<{ results: SearchResponse; updateCriteria: UpdateCriteria }> = ( { results, updateCriteria } ): JSX.Element | null => {
    const { current_value, options } = results.sort;
    if ( ! options || ! Object.keys( options ).length ) return null;
    const sortOptions: Record<string, string> = {};
    Object.keys( options ).forEach( ( k ) => { sortOptions[ k.toLowerCase() ] = options[ k ]; } );
    const currentValue = current_value ? current_value.toLowerCase() : '';
    return (
        <div id="search-orderby-wrapper">
            <span id="search-orderby-label" className="search__select-label">Sort By</span>
            <select id="search-orderby" aria-labelledby="search-orderby-label" className="select-list-toggle" value={ currentValue || '' } onChange={ ( event ) => event.target.value ? updateCriteria( 'sort', 'sort=' + event.target.value ) : null }>
                <option value="">Select</option>
                { Object.keys( sortOptions ).map( ( value, index ) => (
                    <option key={ index } value={ value }>{ sortOptions[ value ] }</option>
                ) ) }
            </select>
        </div>
    );
};

const PagingNav: React.FC<{ results: SearchResponse; updateCriteria: UpdateCriteria }> = ( { results, updateCriteria } ): JSX.Element => {
    const { pages: totalPages, current_page: currentPage } = results;
    const previousPage = currentPage - 1 >= 1 ? currentPage - 1 : 0;
    const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : 0;
    const lastPage = totalPages > currentPage ? totalPages : 0;
    return (
        <div id="search-nav-wrapper">
            <button type="button" name="paged" value={ 'paged=' + previousPage } disabled={ previousPage === 0 } onClick={ () => updateCriteria( 'paged', 'paged=' + previousPage ) }>
                <span className="search__nav-previous">Previous</span>
            </button>
            <span className="search__nav-current-page">{ currentPage }</span>
            <span className="search__nav-text">of</span>
            <button type="button" name="paged" value={ 'paged=' + lastPage } disabled={ lastPage === 0 } onClick={ () => updateCriteria( 'paged', 'paged=' + lastPage ) }>
                <span className="search__nav-total-pages">{ String( totalPages ) }</span>
            </button>
            <button type="button" name="paged" value={ 'paged=' + nextPage } disabled={ nextPage === 0 } onClick={ () => updateCriteria( 'paged', 'paged=' + nextPage ) }>
                <span className="search__nav-next">Next</span>
            </button>
        </div>
    );
};

const Search: React.FC<PanelProps> = ( {
    post,
    panelPrefix = '',
    panelSuffix = ''
} ): JSX.Element | null => {
    const formRef = useRef<HTMLFormElement | null>( null );

    const { heading: searchHeading, modal: panelPostsModal } = getSearchPanelConfig( post.fields, panelPrefix, panelSuffix );
    const panelPerRow: number = 4;
    const templateType: string = 'block';
    const postID: number = getPostID( post );

    const [ searchParams ] = useSearchParams();
    const searchKeyword = searchParams.get( 's' ) || '';

    const [ query, setQuery ] = useState<Record<string, string>>( searchKeyword ? { s: searchKeyword } : {} );
    const [ results, setResults ] = useState<SearchResponse>( emptySearchResponse );
    const [ hasFetched, setHasFetched ] = useState( false );
    // The last request failed: say so, rather than "nothing matched"
    const [ failed, setFailed ] = useState( false );
    // Bumped by the Try Again button to re-send the same query. Without it a
    // failed first request left no form (its fields come from the response),
    // so only a reload could retry.
    const [ attempt, setAttempt ] = useState( 0 );
    // Counts failed requests. Keys the error alert, so a request that fails
    // again replaces it and it is announced again, rather than staying put
    // and saying nothing.
    const [ failures, setFailures ] = useState( 0 );
    // Set by Try Again, so the results take focus when they arrive: the
    // button that had it is gone by then, and focus would drop to <body>.
    // Only for that retry: it is cleared if the retry fails, and when any
    // other search starts (the form, sorting, paging or a new URL keyword).
    const focusResultsRef = useRef<boolean>( false );
    const resultsRef = useRef<HTMLDivElement | null>( null );

    // Layout keys the page by pathname, so a link from /search/?s=foo to
    // /search/?s=bar keeps this panel mounted. Start a new query from the
    // URL's keyword when it changes (adjusting state during render, as React
    // recommends, rather than in an effect).
    const [ urlKeyword, setURLKeyword ] = useState( searchKeyword );
    if ( searchKeyword !== urlKeyword ) {
        setURLKeyword( searchKeyword );
        setQuery( searchKeyword ? { s: searchKeyword } : {} );
    }
    // The keyword field (forms/Search.tsx) is uncontrolled, so its
    // defaultValue won't follow; set it directly
    useEffect( () => {
        const keywordField = formRef.current?.querySelector<HTMLInputElement>( 'input[type="search"]' );
        if ( keywordField ) {
            keywordField.value = searchKeyword;
        }
        focusResultsRef.current = false;
    }, [ searchKeyword ] );

    useEffect( () => {
        // A newer query aborts the request for the previous one, so results
        // can't arrive out of order
        const controller = new AbortController();
        getSearch( { postID, metaPrefix: panelPrefix, metaSuffix: panelSuffix, query }, { signal: controller.signal } )
            .then( ( data ) => {
                setResults( normalizeSearchResponse( data.json ) );
                setFailed( false );
                setHasFetched( true );
            } )
            .catch( ( error: unknown ) => {
                if ( ! isAbortError( error ) ) {
                    focusResultsRef.current = false;
                    setFailed( true );
                    setFailures( ( n ) => n + 1 );
                    setHasFetched( true );
                }
            } );
        return () => controller.abort();
    }, [ query, postID, panelPrefix, panelSuffix, attempt ] );

    // After a retry that worked, focus the results (or the "nothing matched"
    // message) where the Try Again button was. A retry that fails leaves the
    // button, and focus, in place, and clears the flag.
    useEffect( () => {
        if ( ! focusResultsRef.current || failed || ! hasFetched ) {
            return;
        }
        focusResultsRef.current = false;
        resultsRef.current?.focus();
    }, [ results, failed, hasFetched ] );

    // Reads the form into the query. Any change but paging starts again at
    // page 1.
    const searchSubmit = ( keepPage: boolean = false ): void => {
        const form = formRef.current;
        if ( ! form ) return;
        focusResultsRef.current = false;

        const formData = new FormData( form );
        if ( ! keepPage ) {
            formData.set( 'paged', '1' );
        }
        const nextQuery: Record<string, string> = {};
        for ( const [ key, value ] of formData.entries() ) {
            if ( typeof value === 'string' && value.length > 0 ) {
                // Hidden fields hold "name=value"; strip only that prefix, so
                // a value that itself contains "=" (a keyword like "a=b", or
                // "x=1=2") isn't cut short
                const parsedValue = value.startsWith( key + '=' ) ? value.slice( key.length + 1 ) : value;
                if ( parsedValue ) {
                    nextQuery[ key ] = parsedValue;
                }
            }
        }
        setQuery( nextQuery );
    };

    const updateCriteria: UpdateCriteria = ( fieldName, fieldValue ) => {
        const el = document.getElementById( fieldName ) as HTMLInputElement | null;
        if ( el ) {
            const queryString: string = fieldValue.indexOf( '=' ) === -1 ? fieldName + '=' + fieldValue : fieldValue;
            // A visible field shows the plain value, not "name=value"
            el.value = el.type === 'hidden' ? queryString : queryString.slice( queryString.indexOf( '=' ) + 1 );
        }
        formRef.current?.scrollIntoView( { block: 'start' } );
        searchSubmit( fieldName === 'paged' );
    };

    const resultsAnnouncement = results.posts.length > 0
        ? ( results.results_statement.text || `${ results.posts.length } results` )
        : 'Nothing matched your search criteria.';

    if ( hasFetched || Object.keys( results.ui ).length > 0 || results.posts.length > 0 || results.results_statement.criteria.length > 0 ) {
        return (
            <div id="search-results">
                <Heading tag="h2" title={ searchHeading || 'Search' } classes={ searchHeading ? [] : [ 'screenReader' ] } />
                <SearchForm formRef={ formRef } onSubmit={ () => searchSubmit() } results={ results } />
                <div id="search-results-statement-orderby-wrapper">
                    <SearchResultsStatement results={ results } updateCriteria={ updateCriteria } />
                    <SearchSortBy results={ results } updateCriteria={ updateCriteria } />
                </div>
                {/* Announces each new set of results; the visible statement
                    holds buttons, so it can't be the live region itself */}
                <p className="screenReader" role="status">{ failed ? '' : resultsAnnouncement }</p>
                { failed ?
                    <div id="search-results-wrapper">
                        <p key={ failures } className="search__error" role="alert">Sorry, the search couldn't be completed.</p>
                        <button type="button" className="search__retry search-action" onClick={ () => { focusResultsRef.current = true; setAttempt( ( n ) => n + 1 ); } }>Try again</button>
                    </div>
                : results.posts.length > 0 ?
                    <div id="search-results-wrapper" ref={ resultsRef } tabIndex={ -1 }>
                        <ul className={ 'search__results blocks ' + ( templateType !== 'list' ? 'blocks--post blocks--' + convertNumberToWords( panelPerRow ) : '' ) + ( panelPostsModal ? ' blocks--modals' : '' ) + ' blocks--' + templateType }>
                            { results.posts.map( ( resultPost: Post, index: number ) => (
                                <PartialTemplateLoader key={ index } index={ index } type={ templateType } post={ resultPost } />
                            ) ) }
                        </ul>
                        <PagingNav results={ results } updateCriteria={ updateCriteria } />
                    </div>
                : <div id="search-results-wrapper" ref={ resultsRef } tabIndex={ -1 }><p className="search__no-results">Sorry, but nothing matched your search criteria. Please try again</p></div> }
            </div>
        );
    } else {
        return null;
    }
};
export default Search;
