import { doStripTags } from '@/utils/helpers';
import { doWordCount } from '@/utils/helpers';

const doReadTime = ( content: string = '', wpm: number = 300 ): string => {
	const cleanContent: string = doStripTags( content );
	const wordCount: number = doWordCount( cleanContent );
	const time: number = Math.ceil( wordCount / wpm );
    const initialString: string = 'X minute read';
	return ( time > 0 ? initialString.replace( 'X', String( time ) ) : 'Less than 1 minute read');
}
export default doReadTime;