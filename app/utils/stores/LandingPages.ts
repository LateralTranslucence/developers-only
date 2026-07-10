'use client';
import { create } from 'zustand';
import { LandingPage } from '../types/LandingPage';
import { getPost } from '../api';


type LandingPageStore = {
    page: LandingPage | null;
    set: (page: LandingPage | null) => void;
    fetchPage: (postType: string, slug: string) => Promise<void>;
};

export const useLandingPage = create<LandingPageStore>((set) => ({
    page: null,
    set: (page: LandingPage | null) => set({ page }),
    fetchPage: async (postType: string, slug: string) => {
        
        await getPost(postType, slug);
        

        set({
            page: null,
        });
    },
}));

