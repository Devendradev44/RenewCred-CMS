import * as React from "react";

interface BlockRendererProps {
  content: any;
}

export default function BlockRenderer({
  content,
}: BlockRendererProps) {
  if (!content?.blocks) {
    return (
      <p className="text-gray-500">
        No content available.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {content.blocks.map((block: any, index: number) => {
        switch (block.type) {
          case "header":
            const Tag = `h${block.data.level}` as keyof React.JSX.IntrinsicElements;

            return (
              <Tag
                key={index}
                className="font-bold mt-8 mb-3 text-gray-900"
              >
                {block.data.text}
              </Tag>
            );

          case "paragraph":
            return (
              <p
                key={index}
                className="text-gray-700 leading-8"
              >
                {block.data.text}
              </p>
            );

          case "list":
            return (
              <ul
                key={index}
                className="list-disc pl-6 space-y-2"
              >
                {block.data.items.map(
                  (item: string, i: number) => (
                    <li key={i}>{item}</li>
                  )
                )}
              </ul>
            );

          case "table":
            return (
              <div
                key={index}
                className="overflow-x-auto"
              >
                <table className="w-full border border-gray-300">
                  <tbody>
                    {block.data.content.map(
                      (row: string[], r: number) => (
                        <tr key={r}>
                          {row.map(
                            (cell: string, c: number) => (
                              <td
                                key={c}
                                className="border p-3"
                              >
                                {cell}
                              </td>
                            )
                          )}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            );

          default:
            return (
              <div
                key={index}
                className="text-sm text-gray-400"
              >
                Unsupported block: {block.type}
              </div>
            );
        }
      })}
    </div>
  );
}