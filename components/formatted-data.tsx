import "ace-builds/src-noconflict/ace"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-cloud9_night"
import AceEditor from "react-ace"

import { jsonApiToJs } from "@/lib/jsonUtils"

interface FormattedDataProps {
  data: string
}

export const FormattedData = (props: FormattedDataProps) => {
  const formattedData = jsonApiToJs(props.data)

  return (
    <AceEditor
      className="overflow-y-scroll rounded-md border"
      readOnly
      mode="json"
      name="json-formatted"
      theme="cloud9_night"
      wrapEnabled
      height="100%"
      width="100%"
      value={JSON.stringify(formattedData, null, 2)}
    />
  )
}
