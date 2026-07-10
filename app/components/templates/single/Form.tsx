import React, { JSX } from 'react';
import { useEffect } from 'react';
import { getStringField } from '@/utils/helpers';
import { HeroProps } from '@/utils/types/HeroProps';
import { TemplateProps } from '@/utils/types/TemplateProps';
import Hero from '@/components/shared/Hero';
import PanelWrapper from '@/components/layout/PanelWrapper';
import RenderForm from '@/components/shared/RenderForm';
import StructuredData from '@/components/shared/StructuredData';
import '@/styles/components/forms.scss';

const Form: React.FC<TemplateProps> = ( {
    post,
    iframe = false,
    layoutClasses = () => {}
} ): JSX.Element | null => {
    useEffect( () => {
        if ( post ) {
            layoutClasses( [ 'single-content-item', 'single-' + post.post_type ] );
        }
    }, [] );

    if ( !post ) return null;

    const heroSettings: HeroProps = {
        title: getStringField( post.fields, 'form_form_name' ),
    };

    return (
        <>
            <StructuredData post={ post } />
            <Hero { ...heroSettings } />
            <article id="contentWrapper" className="container one-column">
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
    );
};
export default Form;
