import { deattribute, deserialise, linkRelationships } from "kitsu-core"

export const jsonApiToJs = (
  input: any
): Record<string, any> | Record<string, any>[] => {
  try {
    const jsonApi = JSON.parse(input)

    const output = linkRelationships(jsonApi.data, jsonApi.included)
    const normalized = deattribute(output)

    for (const key of Object.keys(normalized)) {
      if (!!normalized[key]?.data) {
        normalized[key] = normalized[key].data
      }
    }

    normalized.meta = jsonApi.meta

    return normalized
  } catch (e) {
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
