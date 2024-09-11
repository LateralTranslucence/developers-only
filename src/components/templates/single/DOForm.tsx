import React from 'react';
const { useEffect } = wp.element;
import { HeroProps } from 'src/utils/types/HeroProps';
import { TemplateProps } from 'src/utils/types/TemplateProps';
import { doLength } from 'src/utils/helpers';
import Hero from 'src/components/shared/Hero';
import PanelWrapper from 'src/components/layout/PanelWrapper';
import RenderForm from 'src/components/shared/RenderForm';
import StructuredData from 'src/components/shared/StructuredData';
import 'assets/styles/components/forms.scss';

const DOForm: React.FC<TemplateProps> = ( {
    post, 
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {

    if ( doLength( post ) ) {

        const heroSettings: HeroProps = {
            title: post.fields.form_form_name,
        }

        useEffect( () => {
            // Set classes for <main>
            layoutClasses( [ 'single-content-item', 'single-' + post.post_type ] );
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
                            { post.ID ?
                                <div className="panel-form-wrapper">
                                    <RenderForm formID={ post.ID } panelID="main-content" />
                                </div>
                            : null }
                    </PanelWrapper>
                </article>
            </>
        )
    } else {
        return null;
    }
}
export default DOForm;