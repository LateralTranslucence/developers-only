export default function ItemProp( props ) {
    const itemProp = props.itemPropSettings
    const headline = itemProp.headline;
    const headlineContent = itemProp.headlineContent;
    const image = itemProp.image;
    const imageContent = itemProp.imageContent;
    const name = itemProp.name;
    const nameContent = itemProp.nameContent;
    const uploadDate = itemProp.uploadDate;
    const uploadDateContent = itemProp.uploadDateContent;
    const virtualLocation = itemProp.virtualLocation;
    const virtualLocationContent = itemProp.virtualLocationContent;
    
    return (
        <>
        { headline ? 
            <meta itemProp={ headline } content={ headlineContent } />
        : null }
        { image ? 
            <meta itemProp={ image } content={ imageContent } />
        : null }
        { name ? 
            <meta itemProp={ name } content={ nameContent } />
        : null }
        { uploadDate ? 
            <meta itemProp={ uploadDate } content={ uploadDateContent } />
        : null }
        { virtualLocation ? 
            <meta itemProp={ virtualLocation } content={ virtualLocationContent } />
        : null }
        </>
    );
}