"use client"

import "ace-builds/src-noconflict/ace"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-cloud9_day"
import "ace-builds/src-noconflict/theme-cloud9_night"
import { useRef, useState } from "react"
import AceEditor from "react-ace"
import ReactAce from "react-ace/lib/ace"

import { copyToClipboard, downloadJson, jsonApiToJs } from "@/lib/jsonUtils"
import { Button } from "@/components/ui/button"

import { FormattedData } from "./formatted-data"
import { Icons } from "./icons"

export function JsonViewer() {
  const [jsonValue, setJsonValue] = useState("")
  const aceEditorRef = useRef<ReactAce | null>(null)

  return (
    <main className="grid grid-cols-2 gap-8 p-4 md:p-8">
      <aside className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Input JSON</h2>
        <div className="grid w-full gap-1.5">
          <AceEditor
            ref={aceEditorRef}
            theme="cloud9_night"
            height="900px"
            width="100%"
            mode="json"
            name="json-input"
            wrapEnabled
            editorProps={{ $blockScrolling: true }}
            onChange={(value) => {
              setJsonValue(value)
            }}
          />
        </div>
        Ø
        <div className="flex flex-row gap-4">
          <Button variant={"destructive"} onClick={() => setJsonValue("")}>
            Clear
          </Button>
        </div>
      </aside>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Formatted JSON</h2>
        <FormattedData readonly data={jsonValue} />
        <div className="flex flex-row-reverse gap-4">
          <Button
            variant={"outline"}
            onClick={() => downloadJson(jsonApiToJs(jsonValue))}
          >
            <Icons.download className="mr-2 h-4 w-4" />
            Download JSON
          </Button>
          <Button
            variant={"secondary"}
            onClick={async () => await copyToClipboard(jsonApiToJs(jsonValue))}
          >
            <Icons.clipboard className="mr-2 h-4 w-4" />
            Copy to Clipboard
          </Button>
        </div>
      </section>
    </main>
  )
}
