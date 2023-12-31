import { deattribute, deserialise, linkRelationships } from "kitsu-core"

const normalizeResponse = (data?: object) => {
  if (!data) return null
  // when data does not have "include", "deserialise" does not work.
  const newData = Object.prototype.hasOwnProperty.call(data, "included")
    ? data
    : { ...data, included: [] }
  return deserialise(newData)
}

export const jsonApiToJs = (
  input: any
): Record<string, any> | Record<string, any>[] => {
  try {
    const jsonApi = JSON.parse(input)

    const data = normalizeResponse(jsonApi)

    const handleNestedArrays = (obj: any) => {
      for (const key of Object.keys(obj)) {
        if (!!obj[key]?.data) {
          obj[key] = obj[key].data
        }
        if (typeof obj[key] === "object" && obj[key] !== null) {
          handleNestedArrays(obj[key])
        }
      }
    }

    handleNestedArrays(data)

    data.meta = jsonApi.meta

    return data
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const downloadJson = (data: any) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "data.json"
  a.click()
  URL.revokeObjectURL(url)
}

export const copyToClipboard = async (data: any) => {
  const formatted = JSON.stringify(data, null, 2)
  await navigator.clipboard.writeText(formatted)
}
