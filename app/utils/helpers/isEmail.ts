const isEmail = ( value: string ): boolean => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value );
};
export default isEmail;