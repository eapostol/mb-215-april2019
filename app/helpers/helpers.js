import env from '../config/env'

export const ImageLink = imageName => env.imageURL + imageName

export const FormatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns)
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns)
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
    numberOfElementsLastRow += 1
  }
  return data
}
