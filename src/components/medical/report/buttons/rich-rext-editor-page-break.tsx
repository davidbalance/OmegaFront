import { useRichTextEditorContext, RichTextEditor } from "@mantine/tiptap";
import { IconPageBreak } from "@tabler/icons-react";

const RichTextEditorPageBreak: React.FC = () => {
    const { editor } = useRichTextEditorContext();
    return (
        <RichTextEditor.Control
            onClick={() => editor?.chain().insertContent('<p><br /></p>').run()}
            title="Break page"
        >
            <IconPageBreak stroke={1.5} size="1rem" />
        </RichTextEditor.Control>
    );
}

export { RichTextEditorPageBreak }