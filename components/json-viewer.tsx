"use client"

import { JSX, SVGProps, useState } from "react"

import { jsonApiToJs } from "@/lib/jsonUtils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

import { FormattedData } from "./formatted-data"

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
            placeholder="Paste your JSON here..."
            onChange={(e) => setJsonValue(e.target.value)}
          />
        </div>
      </aside>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Formatted JSON</h2>
        <FormattedData data={jsonValue} />
        <div className="flex gap-4">
          <Button onClick={downloadJson}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download JSON
          </Button>
          <Button onClick={copyToClipboard}>
            <ClipboardIcon className="mr-2 h-4 w-4" />
            Copy to Clipboard
          </Button>
        </div>
      </section>
    </main>
  )
}

function DownloadIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}

function ClipboardIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
}
