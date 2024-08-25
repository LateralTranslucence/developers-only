import React from 'react';
const { useEffect } = wp.element;
//import { doURLType } from 'src/utils/helpers.js';
import { DoTableOfContents } from 'src/utils/display';
import CTA from 'src/components/shared/CTA.js';
//import DownloadableContentWrapper from 'src/components/shared/DownloadableContentWrapper.js';
import 'assets/styles/components/table-of-contents.scss';

export default function TableOfContents( props ) {
    useEffect( () => {
        new DoTableOfContents();
    }, [] );
    return (
        <nav id="do-table-of-contents">
            <ul>
                <li id="do-toc-toggle" className="show" data-open-text="Expand Table of Contents" data-close-text="Close Table of Contents"><span>Table of Contents</span></li>
            { props.toc.map( ( tocPanel, index ) => {
                return (
                    <li key={ index }>
                        <CTA text={ tocPanel.label } url={ tocPanel.anchor } classes={ [ 'do-toc-label' ] } customAttributes={ { style: { '--toc-color': tocPanel.color } } } />
                    </li>
                );
            } ) }

            { props.file ?
                <li id="do-toc-download">
                    <CTA text="Download" 
                        url={ props.file } 
                        modal={ props.file.type === 'pdf' }
                        classes={ [ 'do-toc-label' ] } />
                        {/*modalClass={ props.file.type === 'pdf' ? 'do-downloadable-content' : false }
                        id="do-download-content"
                        iframeName="do-downloadable-iframe" />
                    <DownloadableContentWrapper />*/}
                </li>
            : null }
            </ul>
        </nav>
    );
}