// Makes a word plural
const doPluralize = ( word: string ): string => {
	if ( word.length ) {
		const lastChar: string = word[ word.length - 1 ];
		switch ( lastChar ) {
			case 'y':
				return word.substring( 0, word.length - 1 ) + 'ies';

			case 'h':
			case 'x':
				return word + 'es';

			case 's':
				return word;

			default:
				return word + 's';
		}
	}
	return '';
}
export default doPluralize;