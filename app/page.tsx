import { JsonViewer } from "@/components/json-viewer"

export default function IndexPage() {
  return (
    <section className="grid items-center gap-6 p-12 pt-6 md:py-10">
      <JsonViewer />
    </section>
  )
}
