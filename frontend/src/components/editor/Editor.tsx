"use client";

import { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";

interface EditorProps {
  data?: OutputData;
  onChange?: (data: OutputData) => void;
}

export default function Editor({ data, onChange }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!holderRef.current || editorRef.current) return;

    const editor = new EditorJS({
      holder: holderRef.current,

      data: data ?? {
        blocks: [],
      },

      tools: {
        header: Header,
        list: List,
        table: Table,
      },

      async onChange(api) {
        const saved = await api.saver.save();
        onChange?.(saved);
      },
    });

    editorRef.current = editor;

    return () => {
      editor.isReady
        .then(() => editor.destroy())
        .catch(() => {});

      editorRef.current = null;
    };
  }, []);

  return (
    <div
      ref={holderRef}
      className="rounded-lg border border-gray-300 bg-white p-4 min-h-[300px]"
    />
  );
}