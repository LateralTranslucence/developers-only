import { stripTags } from '@/utils/helpers';
import { wordCount as getWordCount } from '@/utils/helpers';

const readTime = ( content: string = '', wpm: number = 300 ): string => {
	const cleanContent: string = stripTags( content );
	const wordCount: number = getWordCount( cleanContent );
	const time: number = Math.ceil( wordCount / wpm );
    const initialString: string = 'X minute read';
	return ( time > 0 ? initialString.replace( 'X', String( time ) ) : 'Less than 1 minute read');
};
export default readTime;