"use client"

import { useState } from "react"

import { jsonApiToJs } from "@/lib/jsonUtils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { FormattedData } from "./formatted-data"
import { Icons } from "./icons"

export function JsonViewer() {
  const [jsonValue, setJsonValue] = useState("")

  const copyToClipboard = async () => {
    const formattedData = jsonApiToJs(jsonValue)
    const formattedJson = JSON.stringify(formattedData, null, 2)

    await navigator.clipboard.writeText(formattedJson)
  }

  const downloadJson = async () => {
    const formattedData = jsonApiToJs(jsonValue)
    const formattedJson = JSON.stringify(formattedData, null, 2)

    const blob = new Blob([formattedJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="grid grid-cols-2 gap-8 p-4 md:p-8">
      <aside className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Input JSON</h2>
        <div className="grid w-full gap-1.5">
          <Textarea
            className="h-[800px] overflow-y-scroll"
            id="json-input"
            value={jsonValue}
            placeholder="Paste your JSON here..."
            onChange={(e) => setJsonValue(e.target.value)}
          />
        </div>
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
          <Button variant={"outline"} onClick={downloadJson}>
            <Icons.download className="mr-2 h-4 w-4" />
            Download JSON
          </Button>
          <Button variant={"secondary"} onClick={copyToClipboard}>
            <Icons.clipboard className="mr-2 h-4 w-4" />
            Copy to Clipboard
          </Button>
        </div>
      </section>
    </main>
  )
}
