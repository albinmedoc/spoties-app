const upperCaseEachWord = (str: string, separator: string) => str.split(separator).map((word) => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');

export default upperCaseEachWord;