import { jsonApiToJs } from "@/lib/jsonUtils"

interface FormattedDataProps {
  data: string
}

export const FormattedData = (props: FormattedDataProps) => {
  const formattedData = jsonApiToJs(props.data)

  const isArary = Array.isArray(formattedData)

  return (
    <div className="p-4 text-sm">
      <pre className="whitespace-pre-wrap" id="json-output">
        {JSON.stringify(formattedData, null, 2)}
      </pre>
    </div>
  )
}
