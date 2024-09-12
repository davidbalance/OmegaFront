'use client'

import { Button, Box } from '@mantine/core'
import { BubbleMenu, useEditor } from '@tiptap/react'
import { RichTextEditor, Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import React from 'react'
import { RichTextEditorPageBreak } from './_base/rich-text-editor/rich-rext-editor-page-break';

interface MedicalReportFormProps extends Omit<React.HTMLProps<HTMLFormElement>, 'ref'> {
    content?: string
}
const MedicalReportForm = React.forwardRef<HTMLFormElement, MedicalReportFormProps>(({
    content,
    ...props }, ref) => {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({
                placeholder: 'Escribe tu reporte medico aqui'
            })
        ],
        content: content ?? ''
    });

    return (
        <Box
            ref={ref}
            component='form'
            {...props}>
            <input type='hidden' name='content' value={editor?.getHTML() || ''} />
            <RichTextEditor editor={editor} style={{ width: '100%' }} >
                {editor && (
                    <BubbleMenu editor={editor}>
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Bold />
                            <RichTextEditor.Italic />
                            <RichTextEditor.Underline />
                            <RichTextEditor.Highlight />
                            <RichTextEditor.Code />
                        </RichTextEditor.ControlsGroup>
                    </BubbleMenu>
                )}

                <RichTextEditor.Toolbar sticky stickyOffset={0}>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditorPageBreak />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content h={400} style={{ overflowY: 'auto' }} />
            </RichTextEditor>

            <Button type='submit' style={{ display: 'none' }} />
        </Box>
    )
});

MedicalReportForm.displayName = 'MedicalReportForm'

export default MedicalReportForm;