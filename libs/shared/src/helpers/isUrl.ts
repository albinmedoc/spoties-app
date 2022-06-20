const urlExpression =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const urlRegex = new RegExp(urlExpression);

const imageUrlExpression = /(https?:\/\/.*\.(?:png|jpg))/gi;
const imageUrlRegex = new RegExp(imageUrlExpression);

const isUrl = (query: string): boolean => !!query && !!query.match(urlRegex);

const isImageUrl = (query: string): boolean => isUrl(query) && !!query.match(imageUrlRegex);

export { isUrl, isImageUrl };
