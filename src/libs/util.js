
export const getAssetFile = (url) => {
  return new URL(`/src/assets/images/${url}`, import.meta.url).href
}