// import React from 'react';
// const { useEffect, useState } = wp.element;
// import { doGetPosts } from 'src/utils/api';
// import { doLength, doParse } from 'src/utils/helpers';
// import CTA from 'src/components/shared/CTA';
// import Heading from 'src/components/shared/Heading';
// import MediaLoader from 'src/components/shared/MediaLoader';
// import 'assets/styles/components/panels.scss';
// import 'assets/styles/components/text-media.scss';
// import { APIResult } from 'src/utils/types/APIResult';
// import { Post } from 'src/utils/types/Post';



// const CustomCTA: React.FC<Record<string, any>> = ( props ): JSX.Element | null => {
//     const [ customCTA, setcustomCTA ] = useState<Array<Post>>( [] );
//     useEffect( () => {
//         async function fetchData() {
//             await doGetPosts( 'cta' ).then( ( data: APIResult ) => {
//                 setcustomCTA( data.json as Array<Post> );
//             } );
//         }
//         fetchData();
//     }, [] );

//     const ctaID: string = props.ctaID;
//     const hideCTA: boolean = props.hideCTAPanel;
//     const defaultCTA: Record<string, any> = ( customCTA as Record<string, any>) .default_cta;
//     const ctaOption = doLength( customCTA ) ? customCTA.cta_options[ ctaID ? ctaID : defaultCTA ] : false;
//     if ( ctaOption && ! hideCTA ) {
//         // CTA panel settings
//         const titleAlign = 'left';
//         const panelType = 'text-media';
//         const title = ctaOption.title;
//         const copy = ctaOption.text;
//         const media = ctaOption.media;
//         const mediaType = media.type;
//         const buttonText = ctaOption.button_text;
//         const buttonURL = ctaOption.button_url;
//         const buttonModal = ctaOption.botton_modal === 1 ? true : false;
//         const buttonModalClass = ctaOption.button_modal_class;
//         const ctaButtonSettings = {
//             url: buttonURL,
//             text: buttonText,
//             modal: buttonModal,
//             modalClass: buttonModalClass,
//             classes: [ 'solid-button' ],
//         }
//         return (
//             <section id={ ctaID } className={ 'panel panel-type-' + panelType + ' media-alignment-left' }>
//                 <div className="panel-inner-wrapper container">
//                     { title && 
//                         <header className="panel-header">
//                             <Heading tag={ 'h2' } title={ title } align={ titleAlign }/>
//                         </header>
//                     }
//                     { copy && 
//                         <div className="panel-copy-wrapper">
//                             { doParse( copy ) }
//                         </div>
//                     }
//                     { media ?
//                         <MediaLoader media={ media } size="cinema_600" />
//                     : null }
//                     { buttonURL &&
//                         <p className="panel-cta">
//                             <CTA { ...ctaButtonSettings }/>
//                         </p>
//                     }
//                 </div>
//             </section>
//         );
//     } else {
//         return null;
//     }
// }