function removeLeadingZeros(str: string) {
    const newStr = str.replace(/^0+(?=\d)/, '');
    return newStr;
}