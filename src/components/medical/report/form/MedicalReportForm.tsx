import { LoadingOverlay, rem, Button, Flex } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useEditor } from '@tiptap/react'
import { RichTextEditor, Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import React, { useCallback, useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications';
import { MedicalResult } from '@/lib/dtos/medical/result/response.dto';
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { PATCHMedicalResultReportRequestDto } from '@/lib/dtos/medical/result/request.dto';

type MedicalReportFormProps = {
    result: Omit<MedicalResult, 'order'>;
    onFormSubmittion?: (data: MedicalResult) => void;
    onClose: () => void;
}
const MedicalReportForm: React.FC<MedicalReportFormProps> = ({ result, onClose, onFormSubmittion }) => {

    const [shouldFetch, setShouldFetch] = useState<boolean>(false);

    const {
        data,
        body,
        error,
        loading,
        reload,
        request,
        reset
    } = useFetch<MedicalResult>(`/api/medical/results/report/${result ? result.id : ''}`, 'PATCH', { loadOnMount: false });

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
        content: result ? result.report?.content : ''
    });

    const handleCloseEvent = useCallback(() => onClose(), [onClose]);

    const handleSubmit = useCallback(() => {
        if (editor?.getText().trim() === '') {
            notifications.show({ message: 'Debe escribirse un reporte medico', color: 'red' });
            return;
        };
        request<PATCHMedicalResultReportRequestDto>({ content: editor?.getHTML() || '' });
        setShouldFetch(true);
    }, [editor, request]);

    useEffect(() => {
        if (body && shouldFetch) {
            reload();
            setShouldFetch(false);
        }
    }, [body, shouldFetch, reload])


    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
    }, [error]);

    useEffect(() => {
        if (data) {
            onFormSubmittion?.(data);
            onClose();
            reset();
        }
    }, [data, onFormSubmittion, onClose]);



    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Flex h='100%' direction='column' gap={rem(8)}>

                <LayoutSubFormTitle
                    title={'Formulario de reporte medico'}
                    onClose={handleCloseEvent} />

                <ModularBox flex={1} align='center'>

                    <RichTextEditor editor={editor}>
                        <RichTextEditor.Toolbar sticky stickyOffset={0}>
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

                </ModularBox>
                <ModularBox direction='row'>
                    <Button
                        onClick={handleSubmit}
                        flex={1}
                        size='xs'
                        leftSection={
                            <IconDeviceFloppy
                                style={{ width: rem(18), height: rem(18) }}
                                stroke={1.5} />}>Guardar
                    </Button>
                </ModularBox>

            </Flex>
        </>
    )
}

export { MedicalReportForm }