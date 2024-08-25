const { useEffect } = wp.element;
import { useParams } from 'react-router-dom';
import { doLength } from 'src/utils/helpers.js';
import Hero from 'src/components/shared/Hero.js';
import PanelWrapper from 'src/components/layout/PanelWrapper.js';
import RenderDOForm from 'src/components/shared/RenderDOForm.js';
import StructuredData from 'src/components/shared/StructuredData.js';
import 'assets/styles/components/forms.scss';

export default function DOForm( props ) {
    const post = props.post;
    const { postType } = useParams();

    if ( doLength( post ) ) {
        const title = post.fields.form_form_name;
        const queryString = window.location.search;
        const formData = new URLSearchParams( queryString );
        const formID = post.ID;

        // Hero
        const heroSettings = {
            title: title,
        };

        useEffect( () => {
            // Set classes for <main>
            props.layoutClasses( [ 'single-content-item', 'single-' + postType ] );
        }, [] );

        return (
            <>
                <StructuredData post={ post } />
                <Hero { ...heroSettings } />
                <article id="content-wrapper" className="container one-column">
                    <PanelWrapper 
                        panelID="main-content" 
                        panelType="form"
                        classes={ [ 'panel', 'panel-type-form' ] }>
                            { formID ?
                                <div className="panel-form-wrapper">
                                    <RenderDOForm formID={ formID } formData={ formData } />
                                </div>
                            : null }
                    </PanelWrapper>
                </article>
            </>
        );
    } else {
        return null;
    }

}