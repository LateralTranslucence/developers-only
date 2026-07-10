import React, { JSX } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearch } from '@/utils/api';
import { convertNumberToWords } from '@/utils/helpers';
import { getSearchPanelConfig } from '@/utils/panels';
import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { PanelProps } from '@/utils/types/PanelProps';
import { Post } from '@/utils/types/Post';
import { emptySearchResponse, normalizeSearchResponse, SearchCriteria, SearchResponse } from '@/utils/types/Search';
import FormFieldLoader from '@/loaders/FormFieldLoader';
import PartialTemplateLoader from '@/loaders/PartialTemplateLoader';
import Heading from '@/components/shared/Heading';
import '@/styles/components/search.scss';
import '@/styles/components/blocks.scss';
import '@/styles/components/select-list.scss';

const Search: React.FC<PanelProps> = ( {
    post,
    panelPrefix = '',
    panelSuffix = ''
} ): JSX.Element | null => {
    const formRef = useRef<HTMLFormElement | null>( null );

    const { heading: searchHeading, modal: panelPostsModal } = getSearchPanelConfig( post.fields, panelPrefix, panelSuffix );
    const panelPerRow: number = 4;
    const templateType: string = 'block';

    const [ searchParams ] = useSearchParams();
    const searchKeyword = searchParams.get( 's' ) || '';

    const [ query, setQuery ] = useState<Record<string, string>>( searchKeyword ? { s: searchKeyword } : {} );
    const [ results, setResults ] = useState<SearchResponse>( emptySearchResponse );
    const [ hasFetched, setHasFetched ] = useState( false );

    const fetchResults = useCallback( async () => {
        try {
            const data = await getSearch( { postID: post.ID, metaPrefix: panelPrefix, metaSuffix: panelSuffix, query } );
            setResults( normalizeSearchResponse( data.json ) );
        } catch ( e ) {
            console.error( 'Search fetch error:', e );
        } finally {
            setHasFetched( true );
        }
    }, [ query, post.ID, panelPrefix, panelSuffix ] );

    useEffect( () => {
        fetchResults();
    }, [ fetchResults ] );

    const submitInputElement = ( inputName: string, value: string ) => {
        const el = document.getElementById( inputName ) as HTMLInputElement | null;
        if ( ! el ) return;
        el.value = value;
        updateCriteria( inputName, value );
    };

    const searchSubmit = (): void => {
        const form = formRef.current;
        if ( ! form ) return;

        const formData = new FormData( form );
        if ( document.activeElement?.id !== 'paged' ) {
            formData.set( 'paged', '1' );
        }
        const nextQuery: Record<string, string> = {};
        for ( const [ key, value ] of formData.entries() ) {
            if ( typeof value === 'string' && value.length > 0 ) {
                if ( value.indexOf( '=' ) !== -1 ) {
                    const [ , parsedValue ] = value.split( '=' );
                    nextQuery[ key ] = parsedValue;
                } else {
                    nextQuery[ key ] = value;
                }
            }
        }
        setQuery( nextQuery );
    };

    const updateCriteria = ( fieldName: string, fieldValue: string ): void => {
        const el = document.getElementById( fieldName ) as HTMLInputElement | null;
        if ( el ) {
            el.value = fieldValue.indexOf( '=' ) === -1 ? fieldName + '=' + fieldValue : fieldValue;
        }
        formRef.current?.scrollIntoView( { block: 'start' } );
        searchSubmit();
    };

    if ( hasFetched || Object.keys( results.ui ).length > 0 || results.posts.length > 0 || results.results_statement.criteria.length > 0 ) {

        const SearchForm: React.FC = (): JSX.Element => {
            const uiFields = Object.values( results.ui );
            return (
                <search id="search-filters-wrapper">
                    <form
                        ref={ formRef }
                        className="search"
                        id="custom-search"
                        role="search"
                        onSubmit={ ( e ) => { e.preventDefault(); searchSubmit(); } }>
                        <input type="hidden" value={ 'paged=' + results.current_page } name="paged" id="paged" />
                        <input type="hidden" value={ 'sort=' + ( results.sort.current_value ?? '' ) } name="sort" id="sort" />
                        { uiFields.length > 0 &&
                            <ul className="search__filter-list">
                                { uiFields.map( ( field, index: number ) => (
                                    <li key={ index } className={ 'search__filter search__filter--' + field.type.replace( '_', '-' ) } id={ `${ field.name }-filter` }>
                                        <FormFieldLoader type={ field.type } field={ field } error={ false } callback={ searchSubmit } />
                                    </li>
                                ) ) }
                            </ul>
                        }
                    </form>
                </search>
            );
        };

        const SearchResultsStatement: React.FC = (): JSX.Element => {
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

        const SearchSortBy: React.FC = (): JSX.Element | null => {
            const { current_value, options } = results.sort;
            if ( ! options || ! Object.keys( options ).length ) return null;
            const sortOptions: Record<string, string> = {};
            Object.keys( options ).forEach( ( k ) => { sortOptions[ k.toLowerCase() ] = options[ k ]; } );
            const currentValue = current_value ? current_value.toLowerCase() : '';
            return (
                <div id="search-orderby-wrapper">
                    <span id="search-orderby-label" className="search__select-label">Sort By</span>
                    <select id="search-orderby" className="select-list-toggle" value={ currentValue || '' } onChange={ ( event ) => event.target.value ? submitInputElement( 'sort', 'sort=' + event.target.value ) : null }>
                        <option value="">Select</option>
                        { Object.keys( sortOptions ).map( ( value, index ) => (
                            <option key={ index } value={ value }>{ sortOptions[ value ] }</option>
                        ) ) }
                    </select>
                </div>
            );
        };

        const PagingNav: React.FC = (): JSX.Element => {
            const { pages: totalPages, current_page: currentPage } = results;
            const previousPage = currentPage - 1 >= 1 ? currentPage - 1 : 0;
            const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : 0;
            const previousBtn: CustomAttributes = {
                type: 'button', name: 'paged', value: 'paged=' + previousPage,
                onClick: () => updateCriteria( 'paged', 'paged=' + previousPage ),
                ...( previousPage === 0 && { disabled: 'disabled' } ),
            };
            const totalPagesBtn: CustomAttributes = {
                type: 'button', name: 'paged', value: 'paged=' + ( totalPages > currentPage ? totalPages : 0 ),
                onClick: () => updateCriteria( 'paged', 'paged=' + ( totalPages > currentPage ? totalPages : 0 ) ),
                ...( totalPages <= currentPage && { disabled: 'disabled' } ),
            };
            const nextBtn: CustomAttributes = {
                type: 'button', name: 'paged', value: 'paged=' + nextPage,
                onClick: () => updateCriteria( 'paged', 'paged=' + nextPage ),
                ...( nextPage === 0 && { disabled: 'disabled' } ),
            };
            return (
                <div id="search-nav-wrapper">
                    <button { ...previousBtn }><span className="search__nav-previous">Previous</span></button>
                    <span className="search__nav-current-page">{ currentPage }</span>
                    <span className="search__nav-text">of</span>
                    <button { ...totalPagesBtn }><span className="search__nav-total-pages">{ String( totalPages ) }</span></button>
                    <button { ...nextBtn }><span className="search__nav-next">Next</span></button>
                </div>
            );
        };

        return (
            <div id="search-results">
                <Heading tag="h2" title={ searchHeading || 'Search' } classes={ searchHeading ? [] : [ 'screenReader' ] } />
                <SearchForm />
                <div id="search-results-statement-orderby-wrapper">
                    <SearchResultsStatement />
                    <SearchSortBy />
                </div>
                { results.posts.length > 0 ?
                    <div id="search-results-wrapper">
                        <ul className={ 'search__results blocks ' + ( templateType !== 'list' ? 'blocks--post blocks--' + convertNumberToWords( panelPerRow ) : '' ) + ( panelPostsModal ? ' blocks--modals' : '' ) + ' blocks--' + templateType }>
                            { results.posts.map( ( post: Post, index: number ) => (
                                <PartialTemplateLoader key={ index } index={ index } type={ templateType } post={ post } />
                            ) ) }
                        </ul>
                        <PagingNav />
                    </div>
                : <div id="search-results-wrapper"><p className="search__no-results">Sorry, but nothing matched your search criteria. Please try again</p></div> }
            </div>
        );
    } else {
        return null;
    }
};
export default Search;
