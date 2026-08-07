/// <reference types="vite/client" />
declare module '*.scss';
declare module '*.svg?raw' {
    const content: string;
    export default content;
}
