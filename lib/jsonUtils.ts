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
    console.log(e)
    return {}
  }
}
