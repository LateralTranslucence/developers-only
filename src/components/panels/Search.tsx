import React from 'react';
const { useEffect, useState } = wp.element;
import { useSearchParams } from 'react-router-dom';
import { doGetSearch } from 'src/utils/api';
import { DoSearch, DoSelectList } from 'src/utils/display';
import { doConvertNumberToWords, doLength } from 'src/utils/helpers';
import Heading from 'src/components/shared/Heading';
import FormFieldLoader from 'src/loaders/FormFieldLoader';
import PartialTemplateLoader from 'src/loaders/PartialTemplateLoader';
import 'assets/styles/components/search.scss';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/select-list.scss';
import { PanelProps } from 'src/utils/types/PanelProps';
import { MetaFieldKeyMap } from 'src/utils/types/MetaFieldKeyMap';
import { SearchArgs } from 'src/utils/types/SearchArgs';
import { APIResult } from 'src/utils/types/APIResult';
import { CustomAttributes } from 'src/utils/types/CustomAttributes';
import { Post } from 'src/utils/types/Post';

const Search: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const searchFieldKeys: MetaFieldKeyMap = {
        heading: panelPrefix + '_search_heading' + panelSuffix,
        templateType: panelPrefix + '_template_type' + panelSuffix,
        perRow: panelPrefix + '_posts_per_row' + panelSuffix,
        modal: panelPrefix + '_modal' + panelSuffix,
        hideSortBy: panelPrefix + '_hide_sort_by' + panelSuffix,
    };

    // Search heading
    const searchHeading: string = post.fields[ searchFieldKeys.heading ];
    const panelPerRow: number = post.fields[ searchFieldKeys.perRow ] ? post.fields[ searchFieldKeys.perRow ] : 3;
    const panelPostsModal: boolean = Boolean( post.fields[ searchFieldKeys.modal ] );

    // Search Result Style
    const templateType: string = post.fields[ searchFieldKeys.templateType ] ? post.fields[ searchFieldKeys.templateType ] : 'block';

    // Get search results
    const [ searchResults, setSearchResults ] = useState<Record<string, any>>( {} );
    const searchArgs: SearchArgs = {
        postID: post.ID, 
        metaPrefix: panelPrefix, 
        metaSuffix: panelSuffix, 
        query: {}
    }
    // Check for a keyword search and add to searchArgs
    const [ searchParams, setSearchParams ] = useSearchParams();
    if ( searchParams.get('s') ) {
        searchArgs.query.s = searchParams.get('s');
    }
    // Run the initial query
    useEffect( () => {
        getSearchResults();
    }, [ pageID ] );

    const getSearchResults: () => Promise<any> = async (): Promise<any> => {
        const panel: HTMLElement | null = document.getElementById( panelID );
        if ( panel ) {
            panel.classList.add( 'loading' );
        }
        await doGetSearch( searchArgs ).then( ( data: APIResult ) => {
            // Set searchResults
            setSearchResults( data.json );
            // Remove the loading indicator
            if ( panel ) {
                panel.classList.remove( 'loading' );
            }
        } );
    }

    // Handle form submit
    const searchSubmit: ( e: Event ) => void = ( e ): void => {
        e.preventDefault();
        // Get the currentTarget
        const target: HTMLFormElement | null = e.currentTarget as HTMLFormElement;
        const form: HTMLFormElement = target && target.tagName === 'FORM' ? target : target.form;
        // Create form data
        const formData: FormData = new FormData( form );
        // If the page is not changing, reset paged to 1
        if ( target.id !== 'paged' ) {
            formData.set( 'paged', '1' );
        }
        // Update the query based on current form data
        for ( const field of formData.entries() ) {
            const [ key, value ]: [ string, any ] = field;
            if ( doLength( value ) ) {
                // If the value isn't a key/value pair, make it one
                if ( value.indexOf( '=' ) !== -1 ) {
                    const [ _key, _value ]: [ string, any ] = value.split( '=' );
                    searchArgs.query[ key ] = _value;
                } else {
                    searchArgs.query[ key ] = value;
                }
            }
        };
        // Get the results
        getSearchResults();
    }

    // Handle a change in search criteria
    const updateCriteria: ( e: Event ) => void = ( e ): void => {
        const target: HTMLFormElement = e.currentTarget as HTMLFormElement;
        const fieldName: string = target ? target.name : '';
        const fieldValue: any = target ? target.value : '';
        // Find the form field with the same name
        const fieldValueElement: HTMLFormElement | null = document.getElementById( fieldName ) as HTMLFormElement;
        // If the element exists
        if ( fieldValueElement ) {
            // Set the new value
            fieldValueElement.value = fieldValue.indexOf( '=' ) === -1 ? fieldName + '=' + fieldValue : fieldValue;
            // Change the event currentTarget to the field element
            //e.currentTarget = fieldValueElement;
        }
        // Scroll to form
        new DoSearch();
        // Submit the form
        searchSubmit( e );
    }
    
    if ( doLength( searchResults ) ) {

        const SearchForm: React.FC = (): JSX.Element => {
            useEffect( () => {
                new DoSelectList();
            }, [] );
            return (
                <search id="do-search-filters-wrapper">
                    <form className="do-search" id="do-custom-search" role="search" onSubmit={ ( e ) => searchSubmit }>
                        <input type="hidden" value={ 'paged=' + searchResults.current_page } name="paged" id="paged" />
                        <input type="hidden" value={ 'sort=' + searchResults.sort.current_value } name="sort" id="sort" />
                        { doLength( searchResults.ui ) ?
                            <ul className="search-filter-list">
                                { Object.keys( searchResults.ui ).map( ( key: string, index: number ) => {
                                    const field: Record<string, any> = searchResults.ui[ key ];
                                    if ( doLength( field.options ) || ( doLength( field.type ) && field.type !== 'select_list' ) ) {
                                        return (
                                            <li key={ index } className={ field.type.replace( '_', '-' ) + '-filter' } id={ field.name + '-filter' }>
                                                <FormFieldLoader type={ field.type } field={ field } callback={ searchSubmit } />
                                            </li>
                                        );
                                    } else {
                                        return null;
                                    }
                                } ) }
                            </ul>
                        : null }
                    </form>
                </search>
            );
        }

        const SearchResultsStatement: React.FC = (): JSX.Element => {
            const criteriaArray: Array<Record<string, any>> = searchResults.results_statement.criteria;
            return (
                <p id="search-results-statement">
                    { doLength( searchResults.posts ) ?
                        searchResults.results_statement.text
                    : null }
                    { doLength( criteriaArray ) ?
                        <>
                        { doLength( searchResults.posts ) ?
                            <span> for </span>
                        : null }
                        { criteriaArray.map( ( criteria: Record<string, any>, index: number ) => {
                            return (
                                <button key={ index } type="button" className="remove-criteria do-search-action" name={ criteria.name } value={ criteria.value_string } onClick={ ( e ) => updateCriteria }>
                                    <span>{ criteria.name === 's' ? '"' + criteria.label + '"' : criteria.label }</span>
                                </button>
                            )
                        } ) }
                        </>
                    : null }
                </p>
            )
        }

        const SearchSortBy: React.FC = (): JSX.Element | null => {
            if ( doLength( searchResults.sort.options ) ) {
                const currentValue: string = doLength( searchResults.sort.current_value ) ? searchResults.sort.current_value.toLowerCase() : '';
                const sortOptions: Record<string, any> = {};
                Object.keys( searchResults.sort.options ).forEach( ( option: string, index: number ) => {
                    sortOptions[ option.toLowerCase() ] = searchResults.sort.options[ option ];
                } );
                return (
                    <div id="search-orderby-wrapper" className="">
                        <span id="search-orderby-label" className="select-label">Sort By</span>
                        <span className="select-list-toggle" data-toggle="search-orderby">
                            { doLength( currentValue ) ?
                                <>{ sortOptions[ currentValue ] }</>
                            : 'Select' }
                        </span>
                        <ul id="search-orderby" className="select-list">
                        { Object.keys( sortOptions ).map( ( value: string, index: number ) => {
                            const label: string = sortOptions[ value ];
                            return (
                                <li key={ index } className={ currentValue === value ? 'active' : '' }>
                                    <button type="button" value={ 'sort=' + value } data-value={ 'sort=' + value } className="do-search-action" name="sort" onClick={ ( e ) => updateCriteria }>
                                        { label }
                                    </button>
                                </li>
                            )
                        } ) }
                        </ul>
                    </div>
                )
            } else {
                return null;
            }
        }

        // Temp? Should probably be a helper component
        const PagingNav: React.FC = (): JSX.Element => {
            // Page info
            const totalPages: number = searchResults.pages;
            const currentPage: number = searchResults.current_page;
            const previousPage: number = currentPage - 1 >= 1 ? currentPage - 1 : 0;
            const nextPage: number = currentPage + 1 <= totalPages ? currentPage + 1 : 0;
            // Nav button props
            const previousBtn: CustomAttributes = {
                type: "button",
                name: "paged",
                value: 'paged=' + previousPage,
                onClick: updateCriteria,
            };
            if ( previousPage === 0 ) {
                previousBtn.disabled = 'disabled';
            }
            const totalPagesBtn: CustomAttributes = {
                type: "button",
                name: "paged",
                value: 'paged=' + ( totalPages > currentPage ? totalPages : 0 ),
                onClick: updateCriteria,
            };
            if ( totalPages <= currentPage ) {
                totalPagesBtn.disabled = 'disabled';
            }
            const nextBtn: CustomAttributes = {
                type: "button",
                name: "paged",
                value: 'paged=' + nextPage,
                onClick: updateCriteria,
            };
            if ( nextPage === 0 ) {
                nextBtn.disabled = 'disabled';
            }
            return (
                <div id="do-search-nav-wrapper">
                    <button { ...previousBtn }>
                        <span className="do-search-nav-previous">Previous</span>
                    </button>
                    <span className="do-search-nav-indicator-current-page">{ currentPage }</span>
                    <span className="do-search-nav-indicator-text">of</span>
                    <button { ...totalPagesBtn }>
                        <span className="do-search-nav-indicator-total-pages">{ String( totalPages ) }</span>
                    </button>
                    <button { ...nextBtn }>
                        <span className="do-search-nav-next">Next</span>
                    </button>
                </div>
            )
        }

        return (
            <div id="search-results">
                <Heading tag="h2" title={ doLength( searchHeading ) ? searchHeading : 'Search' } classes={ doLength( searchHeading ) ? [] : [ 'screen-reader-text' ] } />
                <SearchForm />
                <div id="search-results-statement-orderby-wrapper">
                    <SearchResultsStatement />
                    <SearchSortBy />
                </div>
                { doLength( searchResults.posts ) ?
                    <div id="search-results-wrapper">
                        <ul className={ 'blocks ' + ( templateType !== 'list' ? 'post ' + doConvertNumberToWords( panelPerRow ) : '' ) + ( panelPostsModal ? ' do-modals' : '' ) + ' ' + templateType }>
                            { searchResults.posts.map( ( post: Post, index: number ) => {
                                return <PartialTemplateLoader key={ index } index={ index } type={ templateType } post={ post } />
                            } ) }
                        </ul>
                        <PagingNav />
                    </div>
                : <div id="search-results-wrapper"><p className="search-failure">Sorry, but nothing matched your search criteria. Please try again</p></div> }
            </div>
        );
    } else {
        return null;
    }
}
export default Search;