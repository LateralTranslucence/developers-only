import Address from 'src/utils/types/Address';

const doFormatAddress = ( address: Address, lineBreak: string = '<br/>' ): string => {
    let addressString: string = '';
    if ( address.name && address.name.length ) {
        addressString += '<b>' + address.name + '</b>';
    }
    if ( address.address1 && address.address1.length ) {
        addressString += addressString.length ? lineBreak + address['address1'] : address['address1'];
    }
    if ( address.address2 && address.address2.length ) {
        addressString += addressString.length ? lineBreak + address.address2 : address.address2;
    }
    if ( address.city && address.city.length ) {
        addressString += addressString.length ? lineBreak + address.city : address.city;
    }
    if ( address.state && address.state.length ) {
        addressString += addressString.length ? ', ' + address.state : address.state;
    }
    if ( address.zip && address.zip.length ) {
        addressString += addressString.length ? ' ' + address.zip : address.zip;
    }
    if ( address.country && address.country.length ) {
        addressString += addressString.length ? lineBreak + address.country : address.country;
    }
    return addressString;
}
export default doFormatAddress;