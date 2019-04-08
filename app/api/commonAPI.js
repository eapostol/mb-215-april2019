export async function getData(url) {
  const result = await fetch(url).then(response => response.json())

  return result
}

export async function getDataByPayload(url, payload) {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(payload),
  }).then(response => response.json())

  return result
}
