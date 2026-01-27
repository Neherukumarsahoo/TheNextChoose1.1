"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Button } from "@/components/ui/button"
import { 
    Bold, Italic, List, ListOrdered, Quote, Undo, Redo, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2, Code, Upload
} from 'lucide-react'
import { Toggle } from "@/components/ui/toggle"
import { useRef } from 'react'

interface RichTextEditorProps {
    content: string
    onChange: (content: string) => void
    editable?: boolean
}

export function RichTextEditor({ content, onChange, editable = true }: RichTextEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            Image,
        ],
        content: content,
        editable: editable,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 text-gray-900',
            },
        },
    })

    if (!editor) {
        return null
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) return
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    const addImage = () => {
        const url = window.prompt('Image URL')
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    const triggerFileUpload = () => {
        fileInputRef.current?.click()
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                if (result) {
                    editor.chain().focus().setImage({ src: result }).run()
                }
            }
            reader.readAsDataURL(file)
        }
    }

    if (!editable) {
        return <EditorContent editor={editor} />
    }

    return (
        <div className="border rounded-md shadow-sm bg-white overflow-hidden">
            <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/40 items-center">
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bold')}
                    onPressedChange={() => editor.chain().focus().toggleBold().run()}
                    className="text-gray-700 data-[state=on]:bg-gray-200"
                >
                    <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('italic')}
                    onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                    className="text-gray-700 data-[state=on]:bg-gray-200"
                >
                    <Italic className="h-4 w-4" />
                </Toggle>
                
                <div className="w-px h-6 bg-gray-300 mx-1" />

                <Toggle
                    size="sm"
                    pressed={editor.isActive('heading', { level: 2 })}
                    onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className="text-gray-700 data-[state=on]:bg-gray-200"
                >
                    <Heading2 className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bulletList')}
                    onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                    className="text-gray-700 data-[state=on]:bg-gray-200"
                >
                    <List className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('orderedList')}
                    onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                    className="text-gray-700 data-[state=on]:bg-gray-200"
                >
                    <ListOrdered className="h-4 w-4" />
                </Toggle>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <Toggle
                    size="sm"
                    pressed={editor.isActive('blockquote')}
                    onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                    className="text-gray-700 data-[state=on]:bg-gray-200"
                >
                    <Quote className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('codeBlock')}
                    onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
                    className="text-gray-700 data-[state=on]:bg-gray-200"
                >
                    <Code className="h-4 w-4" />
                </Toggle>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <Button variant="ghost" size="sm" onClick={setLink} className={`text-gray-700 hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}>
                    <LinkIcon className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="sm" onClick={triggerFileUpload} className="text-gray-700 hover:bg-gray-100" title="Upload Image">
                    <Upload className="h-4 w-4" />
                </Button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileUpload}
                />
                <Button variant="ghost" size="sm" onClick={addImage} className="text-gray-700 hover:bg-gray-100" title="Add Image URL">
                    <ImageIcon className="h-4 w-4" />
                </Button>

                <div className="flex-1" />

                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="text-gray-700 hover:bg-gray-100 disabled:opacity-30">
                    <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="text-gray-700 hover:bg-gray-100 disabled:opacity-30">
                    <Redo className="h-4 w-4" />
                </Button>
            </div>
            
            <div className="bg-white">
                <EditorContent editor={editor} className="min-h-[300px]" />
            </div>
        </div>
    )
}
