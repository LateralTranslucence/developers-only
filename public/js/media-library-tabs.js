class DO_Media_Library_Tabs {
    constructor( options ) {
        const Library = wp.media.controller.Library;
        const frame = wp.media.view.MediaFrame.Post;
        // Extending the current media library frame to add a new tab
        const id = options.id;
        const title = options.title ? options.title : '';
        const priority = options.priority ? options.priority : 20;
        const queryParam = options.queryParam ? options.queryParam : {};
        wp.media.view.MediaFrame.Post = frame.extend( {
            initialize: function() {
                // Calling the initalize method from the current frame before adding new functionality
                frame.prototype.initialize.apply( this, arguments );
                var options = this.options;  
                // Adding new tab
                this.states.add( [
                    new Library( {
                        id: id,
                        title: title,
                        priority: priority,
                        toolbar: 'main-insert',
                        filterable: 'all',
                        library: wp.media.query( options.library ),
                        multiple: false,
                        editable: false,
                        library: wp.media.query( _.defaults( queryParam, options.library ) ), 
                        // Show the attachment display settings.
                        displaySettings: false,
                        // Update user settings when users adjust the
                        // attachment display settings.
                        displayUserSettings: false
                    } ), 
                ] );
            }, 
        } );
    }
}

// Icons
new DO_Media_Library_Tabs( {
    id: 'icons',
    title: 'Icon Library',
    priority: 20,
    queryParam: {
        icons: 'icons',
    },
} );

// //  Logos
// new DO_Media_Library_Tabs( {
//     id: 'logos',
//     title: 'Logo Library',
//     priority: 30,
//     queryParam: {
//         logos: 'logos',
//     },
// } );