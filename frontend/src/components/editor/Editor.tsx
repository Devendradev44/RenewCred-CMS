"use client";

import { useEffect, useRef } from "react";
import type EditorJS from "@editorjs/editorjs";
import type { OutputData } from "@editorjs/editorjs";

interface EditorProps {
  data?: OutputData;
  onChange?: (data: OutputData) => void;
}

export default function Editor({ data, onChange }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const initEditor = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const Table = (await import("@editorjs/table")).default;

      if (!holderRef.current || !isMounted) return;

      editorRef.current = new EditorJS({
        holder: holderRef.current,

        data: data || {
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
    };

    initEditor();

    return () => {
      isMounted = false;

      if (editorRef.current) {
        editorRef.current.isReady
          .then(() => editorRef.current?.destroy())
          .catch(() => {});
      }

      editorRef.current = null;
    };
  }, []);

  return (
    <div
      ref={holderRef}
      className="min-h-[300px] rounded-lg border border-gray-300 bg-white p-4"
    />
  );
}