import { create } from 'zustand';

type CurrentPageStore = {
    slug: string;
    setSlug: ( slug: string ) => void;
};

export const useCurrentPage = create<CurrentPageStore>()( ( set ) => ( {
    slug: '',
    setSlug: ( slug ) => set( { slug } ),
} ) );
