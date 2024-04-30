import { useMedicalResult } from '@/hooks/useMedicalResult'
import { LoadingOverlay, Group, rem, ActionIcon, Box, Button, Text } from '@mantine/core'
import { IconX, IconDeviceFloppy } from '@tabler/icons-react'
import { useEditor } from '@tiptap/react'
import { RichTextEditor, Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import React from 'react'
import { MedicalResult } from '@/services/api/medical-result/dtos'
import { notifications } from '@mantine/notifications';

type MedicalResultReportFormProps = {
    result: MedicalResult;
    onClose: () => void;
}
const MedicalResultReportForm: React.FC<MedicalResultReportFormProps> = ({ result, onClose }) => {

    const medicalResultHook = useMedicalResult();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Escribe tu reporte medico aqui' })
        ],
        content: result.report ? result.report?.content : ''
    });

    const handleSubmit = () => {
        if(editor?.getText().trim() === '') {
            notifications.show({
                message: 'Debe escribirse un reporte medico',
                color: 'red'
            })
            return;
        };
        try {
            medicalResultHook.insertMedicalReport({
                id: result.id,
                content: editor?.getHTML() || ''
            });
            onClose();
        } catch (error) { }
    }

    return (
        <>
            <LoadingOverlay visible={medicalResultHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Group w='100%' justify='flex-end'>
                <ActionIcon variant='transparent' onClick={onClose}>
                    <IconX />
                </ActionIcon>
            </Group>
            <Group justify='center'>
                <Box miw={rem(800)} pt={rem(8)} px='lg'>
                    <Box mb={rem(12)}>
                        <Text
                            tt="uppercase"
                            fw={500}
                            component='span'
                            variant='text'
                            c="omegaColors"
                            size='md'>
                            Formulario de reporte medico
                        </Text>
                    </Box>

                    <RichTextEditor editor={editor}>
                        <RichTextEditor.Toolbar sticky stickyOffset={60}>
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

                    <Group justify="center" mt="xl">
                        <Button
                            onClick={handleSubmit}
                            size='xs'
                            leftSection={
                                <IconDeviceFloppy
                                    style={{ width: rem(18), height: rem(18) }}
                                    stroke={1.5} />}>Guardar
                        </Button>
                    </Group>
                </Box>
            </Group>
        </>
    )
}

export default MedicalResultReportForm