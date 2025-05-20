/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import CharacterCount from "@tiptap/extension-character-count";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import FontFamily from "@tiptap/extension-font-family";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import ResizeImage from "tiptap-extension-resize-image";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiLink,
  FiImage,
  FiTable,
  FiRotateCw,
  FiRotateCcw,
  FiCode,
} from "react-icons/fi";
import {
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdCode,
  MdHorizontalRule,
  MdStrikethroughS,
} from "react-icons/md";
import { AiOutlineFontColors } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";

interface Props {
  content: string;
  setContent: (html: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  const [showColor, setShowColor] = React.useState(false);
  const [showHighlight, setShowHighlight] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [showLinkInput, setShowLinkInput] = React.useState(false);
  const [linkValue, setLinkValue] = React.useState("");
  const linkButtonRef = React.useRef<HTMLButtonElement>(null);
  if (!editor) return null;
  const charCount = editor.storage.characterCount?.characters() || 0;
  const wordCount = editor.storage.characterCount?.words() || 0;
  // Color and highlight palettes
  const colors = [
    "#000000",
    "#FF0000",
    "#FFA500",
    "#FFFF00",
    "#008000",
    "#0000FF",
    "#4B0082",
    "#EE82EE",
  ];
  const highlights = [
    "#FFFF00",
    "#FFD700",
    "#90EE90",
    "#ADD8E6",
    "#FFB6C1",
    "#FFA07A",
    "#E0FFFF",
    "#FFFACD",
  ];

  return (
    <>
      <style>{`
        .ProseMirror table, .ProseMirror th, .ProseMirror td {
          border: 1px solid #ccc;
          border-collapse: collapse;
        }
        .ProseMirror th, .ProseMirror td {
          padding: 4px 8px;
        }
        .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
          cursor: pointer;
        }
        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }
        .ProseMirror h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        .ProseMirror ul {
          list-style-type: disc;
          margin-left: 2em;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          margin-left: 2em;
        }
        .ProseMirror li {
          margin-bottom: 0.25em;
        }
      `}</style>
      <div className="flex flex-wrap items-center gap-1 bg-white border-b px-4 py-2">
        {/* Block type - First Row */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <button
            type="button"
            title="Paragraph"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive("paragraph") ? "bg-gray-200 font-bold" : ""
            }`}
          >
            P
          </button>
          <button
            type="button"
            title="Heading 1"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`px-2 py-1 rounded ${
              editor.isActive("heading", { level: 1 })
                ? "bg-gray-200 font-bold"
                : ""
            }`}
          >
            H1
          </button>
          <button
            type="button"
            title="Heading 2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`px-2 py-1 rounded ${
              editor.isActive("heading", { level: 2 })
                ? "bg-gray-200 font-bold"
                : ""
            }`}
          >
            H2
          </button>
          <button
            type="button"
            title="Heading 3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`px-2 py-1 rounded ${
              editor.isActive("heading", { level: 3 })
                ? "bg-gray-200 font-bold"
                : ""
            }`}
          >
            H3
          </button>
        </div>
        {/* Font Selector */}
        <select
          className="ml-2 border rounded px-2 py-1 text-sm"
          defaultValue="Arial"
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
        >
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times</option>
          <option value="Courier New">Courier</option>
          <option value="Verdana">Verdana</option>
        </select>
        {/* Color and Highlight as Icon Buttons */}
        <div className="flex items-center gap-1 ml-2 mr-2">
          <div className="relative">
            <button
              type="button"
              title="Font Color"
              onClick={() => setShowColor((v) => !v)}
              className="p-1.5 rounded"
            >
              <AiOutlineFontColors />
            </button>
            {showColor && (
              <div className="absolute z-10 bg-white border rounded shadow p-2 flex flex-wrap gap-1 mt-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    className="w-5 h-5 rounded-full border"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                      setShowColor(false);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              title="Highlight"
              onClick={() => setShowHighlight((v) => !v)}
              className="p-1.5 rounded"
            >
              <BsFillPenFill />
            </button>
            {showHighlight && (
              <div className="absolute z-10 bg-white border rounded shadow p-2 flex flex-wrap gap-1 mt-1">
                {highlights.map((color) => (
                  <button
                    key={color}
                    className="w-5 h-5 rounded-full border"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      editor.chain().focus().toggleHighlight({ color }).run();
                      setShowHighlight(false);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Formatting - Bold, Italic, Underline */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <button
            type="button"
            title="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded ${
              editor.isActive("bold") ? "bg-gray-200" : ""
            }`}
          >
            <FiBold />
          </button>
          <button
            type="button"
            title="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded ${
              editor.isActive("italic") ? "bg-gray-200" : ""
            }`}
          >
            <FiItalic />
          </button>
          <button
            type="button"
            title="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded ${
              editor.isActive("underline") ? "bg-gray-200" : ""
            }`}
          >
            <FiUnderline />
          </button>
        </div>
        {/* List, Numbered, Link, Image, Table */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <button
            type="button"
            title="Bullet List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded ${
              editor.isActive("bulletList") ? "bg-gray-200" : ""
            }`}
          >
            <FiList />
          </button>
          <button
            type="button"
            title="Numbered List"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded ${
              editor.isActive("orderedList") ? "bg-gray-200" : ""
            }`}
          >
            <MdFormatListNumbered />
          </button>
          <button
            type="button"
            title="Link"
            ref={linkButtonRef}
            onClick={() => setShowLinkInput((v) => !v)}
            className={`p-1.5 rounded ${
              editor.isActive("link") ? "bg-gray-200" : ""
            }`}
          >
            <FiLink />
          </button>
          {showLinkInput && (
            <div
              style={{
                position: "absolute",
                zIndex: 20,
                background: "white",
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: 8,
                top: 40,
                left: 0,
              }}
            >
              <input
                type="text"
                placeholder="Paste or type a link..."
                value={linkValue}
                onChange={(e) => setLinkValue(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
                style={{ minWidth: 200 }}
              />
              <button
                onClick={() => {
                  editor.chain().focus().setLink({ href: linkValue }).run();
                  setShowLinkInput(false);
                  setLinkValue("");
                }}
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                  setShowLinkInput(false);
                  setLinkValue("");
                }}
                className="ml-2 px-2 py-1 bg-gray-300 rounded"
              >
                Remove
              </button>
            </div>
          )}
          <button
            type="button"
            title="Image"
            onClick={() => {
              const url = window.prompt("Enter image URL");
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }}
            className={`p-1.5 rounded ${
              editor.isActive("image") ? "bg-gray-200" : ""
            }`}
          >
            <FiImage />
          </button>
          <button
            type="button"
            title="Upload Image"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded"
          >
            <FiImage style={{ opacity: 0.6 }} />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                  const src = event.target?.result as string;
                  editor.chain().focus().setImage({ src }).run();
                  e.target.value = ""; // clear input
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <button
            type="button"
            title="Table"
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
            className={`p-1.5 rounded ${
              editor.isActive("table") ? "bg-gray-200" : ""
            }`}
          >
            <FiTable />
          </button>
        </div>
        {/* Undo, Redo */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <button
            type="button"
            title="Undo"
            onClick={() => editor.chain().focus().undo().run()}
            className="p-1.5 rounded"
          >
            <FiRotateCcw />
          </button>
          <button
            type="button"
            title="Redo"
            onClick={() => editor.chain().focus().redo().run()}
            className="p-1.5 rounded"
          >
            <FiRotateCw />
          </button>
        </div>
        {/* Alignment */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <button
            type="button"
            title="Align Left"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-1.5 rounded ${
              editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
            }`}
          >
            <MdFormatAlignLeft />
          </button>
          <button
            type="button"
            title="Align Center"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-1.5 rounded ${
              editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
            }`}
          >
            <MdFormatAlignCenter />
          </button>
          <button
            type="button"
            title="Align Right"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-1.5 rounded ${
              editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
            }`}
          >
            <MdFormatAlignRight />
          </button>
          <button
            type="button"
            title="Justify"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={`p-1.5 rounded ${
              editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : ""
            }`}
          >
            <MdFormatAlignJustify />
          </button>
        </div>
        {/* Blockquote, Code, Horizontal Rule */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <button
            type="button"
            title="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded ${
              editor.isActive("blockquote") ? "bg-gray-200" : ""
            }`}
          >
            <MdFormatQuote />
          </button>
          <button
            type="button"
            title="Code Block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 rounded ${
              editor.isActive("codeBlock") ? "bg-gray-200" : ""
            }`}
          >
            <MdCode />
          </button>
          <button
            type="button"
            title="Horizontal Rule"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-1.5 rounded"
          >
            <MdHorizontalRule />
          </button>
        </div>
        {/* Code and Strike */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <button
            type="button"
            title="Code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded ${
              editor.isActive("code") ? "bg-gray-200" : ""
            }`}
          >
            <FiCode />
          </button>
          <button
            type="button"
            title="Strike"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded ${
              editor.isActive("strike") ? "bg-gray-200" : ""
            }`}
          >
            <MdStrikethroughS />
          </button>
        </div>
        {/* Subscript and Superscript */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <button
            type="button"
            title="Subscript"
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            className={`p-1.5 rounded ${
              editor.isActive("subscript") ? "bg-gray-200" : ""
            }`}
          >
            x<sub>1</sub>
          </button>
          <button
            type="button"
            title="Superscript"
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            className={`p-1.5 rounded ${
              editor.isActive("superscript") ? "bg-gray-200" : ""
            }`}
          >
            x<sup>1</sup>
          </button>
        </div>
      </div>
      <div className="flex justify-end text-xs text-gray-500 px-4 py-1 bg-white">
        Words: {wordCount} | Characters: {charCount}
      </div>
    </>
  );
};

export default function TextEditor({ content, setContent }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      Underline,
      Link.configure({
        autolink: true,
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-600 underline",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      ResizeImage,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      CharacterCount.configure(),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      FontFamily,
      Blockquote,
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[200px] p-4 focus:outline-none",
      },
    },
  });

  // Effect to update the editor content when the prop changes
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
