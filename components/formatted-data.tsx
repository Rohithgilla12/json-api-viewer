import "ace-builds/src-noconflict/ace"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-cloud9_night"
import "ace-builds/src-noconflict/theme-cloud9_day"
import { useTheme } from "next-themes"
import AceEditor from "react-ace"

import { jsonApiToJs } from "@/lib/jsonUtils"

interface FormattedDataProps {
  data: string
}

export const FormattedData = (props: FormattedDataProps) => {
  const formattedData = jsonApiToJs(props.data)
  const { theme } = useTheme()

  return (
    <AceEditor
      className="overflow-y-scroll rounded-md border"
      readOnly
      mode="json"
      name="json-formatted"
      theme={theme === "dark" ? "cloud9_night" : "cloud9_day"}
      wrapEnabled
      height="800px"
      width="100%"
      value={JSON.stringify(formattedData, null, 2)}
    />
  )
}
