import { Menus } from '@/utils/types/Menu';

export const APIEndpoint: string = window.homeURL + '/wp-json/wp/v2';
export const devoMenus: Menus = {};

// Read once at startup, before React replaces the server-rendered SEO tags
const metaContent = ( selector: string ): string => {
    return document.querySelector<HTMLMetaElement>( selector )?.content ?? '';
};

// The site's name, for the footer and SEO fallbacks. From window.devoSiteName
// when PHP provides it, else the server-rendered og:site_name.
export const siteName: string = typeof window.devoSiteName === 'string' ? window.devoSiteName : metaContent( 'meta[property="og:site_name"]' );

// The site's locale in WordPress form (en_US). From window.devoLocale when PHP
// provides it, else the <html lang> attribute WordPress prints (en-US).
export const siteLocale: string = typeof window.devoLocale === 'string' && window.devoLocale ? window.devoLocale : ( document.documentElement.lang || 'en-US' ).replace( '-', '_' );

// The privacy policy page set under Settings > Privacy, or '' when there's none
export const privacyPolicyURL: string = typeof window.devoPrivacyPolicyURL === 'string' ? window.devoPrivacyPolicyURL : '';
