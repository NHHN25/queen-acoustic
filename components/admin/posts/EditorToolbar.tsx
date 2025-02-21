import { Editor } from '@tiptap/react';
import { useState } from 'react';
import { 
  FaBold, FaItalic, FaUnderline, FaListUl, FaListOl,
  FaSubscript, FaSuperscript, FaCode, FaFont,
  FaUndo, FaRedo, FaEraser, FaQuoteRight, FaLink, FaTable,
  FaParagraph
} from 'react-icons/fa';
import { 
  MdFormatAlignLeft, MdFormatAlignCenter, 
  MdFormatAlignRight, MdFormatAlignJustify,
  MdFormatQuote
} from 'react-icons/md';
import { fontFamilyOptions, headingSizes } from '@/lib/editorExtensions';
import ImageUploadButton from './ImageUploadButton';
import { TranslationKey } from '@/types/translations';

interface EditorToolbarProps {
  editor: Editor | null;
  t: TranslationKey['admin']['posts'];
  onAddLink?: () => void;
  onAddTable?: () => void;
}

export default function EditorToolbar({ editor, t, onAddLink, onAddTable }: EditorToolbarProps) {
  const [showFonts, setShowFonts] = useState(false);
  const [showHeadings, setShowHeadings] = useState(false);

  if (!editor) return null;

  const toolbarButton = (
    onClick: () => void,
    icon: React.ReactNode,
    isActive = false,
    label: string
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-700 tooltip ${
        isActive ? 'bg-gray-700 text-gold-400' : 'text-gray-300'
      }`}
      title={label}
    >
      {icon}
    </button>
  );

  return (
    <div className="bg-gray-800 border-b border-gray-600 p-1 sticky top-0 z-10">
      <div className="flex flex-wrap gap-1 items-center">
        {/* Heading Control */}
        <div className="flex items-center space-x-1 border-r border-gray-600 pr-2">
          <div className="relative">
            <button
              onClick={() => setShowHeadings(!showHeadings)}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-gold-400 rounded"
            >
              {t.editor.heading}
            </button>
            {showHeadings && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-gray-800 shadow-lg rounded-md border border-gray-600 py-1 z-50">
                {headingSizes.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: value as 1 | 2 | 3 | 4 | 5 | 6 }).run();
                      setShowHeadings(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      editor.isActive('heading', { level: value })
                        ? 'bg-gray-700 text-gold-400'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-gold-400'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Font Controls */}
        <div className="flex items-center space-x-1 border-r border-gray-600 pr-2">
          {toolbarButton(
            () => editor.chain().focus().toggleBold().run(),
            <FaBold />,
            editor.isActive('bold'),
            t.editor.bold
          )}
          {toolbarButton(
            () => editor.chain().focus().toggleItalic().run(),
            <FaItalic />,
            editor.isActive('italic'),
            t.editor.italic
          )}
          {toolbarButton(
            () => editor.chain().focus().toggleUnderline().run(),
            <FaUnderline />,
            editor.isActive('underline'),
            t.editor.underline
          )}
          {/* Font Family Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFonts(!showFonts)}
              className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-gold-400 rounded"
            >
              <FaFont />
            </button>
            {showFonts && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 shadow-lg rounded-md border border-gray-600 py-1 z-50">
                {fontFamilyOptions.map(({ name, value }) => (
                  <button
                    key={value}
                    onClick={() => {
                      editor.chain().focus().setFontFamily(value).run();
                      setShowFonts(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-gold-400"
                    style={{ fontFamily: value }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Alignment Controls */}
        <div className="flex items-center space-x-1 border-r pr-2">
          {toolbarButton(
            () => editor.chain().focus().setTextAlign('left').run(),
            <MdFormatAlignLeft />,
            editor.isActive({ textAlign: 'left' }),
            t.editor?.alignLeft || 'Align Left'
          )}
          {toolbarButton(
            () => editor.chain().focus().setTextAlign('center').run(),
            <MdFormatAlignCenter />,
            editor.isActive({ textAlign: 'center' }),
            t.editor?.alignCenter || 'Center'
          )}
          {toolbarButton(
            () => editor.chain().focus().setTextAlign('right').run(),
            <MdFormatAlignRight />,
            editor.isActive({ textAlign: 'right' }),
            t.editor?.alignRight || 'Align Right'
          )}
          {toolbarButton(
            () => editor.chain().focus().setTextAlign('justify').run(),
            <MdFormatAlignJustify />,
            editor.isActive({ textAlign: 'justify' }),
            t.editor?.alignJustify || 'Justify'
          )}
        </div>

        {/* Lists Controls - Removed indent/outdent */}
        <div className="flex items-center space-x-1 border-r pr-2">
          {toolbarButton(
            () => editor.chain().focus().toggleBulletList().run(),
            <FaListUl />,
            editor.isActive('bulletList'),
            t.editor?.bulletList || 'Bullet List'
          )}
          {toolbarButton(
            () => editor.chain().focus().toggleOrderedList().run(),
            <FaListOl />,
            editor.isActive('orderedList'),
            t.editor?.orderedList || 'Ordered List'
          )}
        </div>

        {/* Quote Controls */}
        <div className="flex items-center space-x-1 border-r pr-2">
          {toolbarButton(
            () => editor.chain().focus().toggleBlockquote().run(),
            <MdFormatQuote />,
            editor.isActive('blockquote'),
            t.editor?.quote || 'Quote'
          )}
          {toolbarButton(
            () => editor.chain().focus().toggleNode('paragraph', 'blockquote').run(),
            <FaQuoteRight />,
            editor.isActive('blockquote'),
            t.editor?.blockquote || 'Block Quote'
          )}
        </div>

        {/* Insert Controls */}
        <div className="flex items-center space-x-1 border-r pr-2">
          {toolbarButton(
            onAddLink || (() => {}),
            <FaLink />,
            editor.isActive('link'),
            t.editor.addLink || 'Add Link'
          )}
          {toolbarButton(
            onAddTable || (() => {}),
            <FaTable />,
            false,
            t.editor.addTable || 'Add Table'
          )}
        </div>

        {/* Style Controls */}
        <div className="flex items-center space-x-1 border-r pr-2">
          {toolbarButton(
            () => editor.chain().focus().setParagraph().run(),
            <FaParagraph />,
            editor.isActive('paragraph'),
            t.editor.paragraph || 'Paragraph'
          )}
        </div>

        {/* Additional Controls with translations */}
        <div className="flex items-center space-x-1">
          {toolbarButton(
            () => editor.chain().focus().toggleSubscript().run(),
            <FaSubscript />,
            editor.isActive('subscript'),
            t.editor.subscript
          )}
          {toolbarButton(
            () => editor.chain().focus().toggleSuperscript().run(),
            <FaSuperscript />,
            editor.isActive('superscript'),
            t.editor.superscript
          )}
          {toolbarButton(
            () => editor.chain().focus().toggleCodeBlock().run(),
            <FaCode />,
            editor.isActive('codeBlock'),
            t.editor.codeBlock
          )}
        </div>

        {/* Replace FaImage button with ImageUploadButton */}
        <div className="flex items-center space-x-1 border-r border-gray-600 pr-2">
          <ImageUploadButton editor={editor} translations={t} />
        </div>

        {/* Undo/Redo with translations */}
        <div className="flex items-center space-x-1 border-l border-gray-600 pl-2">
          {toolbarButton(
            () => editor.chain().focus().undo().run(),
            <FaUndo />,
            false,
            t.editor.undo
          )}
          {toolbarButton(
            () => editor.chain().focus().redo().run(),
            <FaRedo />,
            false,
            t.editor.redo
          )}
          {toolbarButton(
            () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
            <FaEraser />,
            false,
            t.editor.clearFormat
          )}
        </div>
      </div>
    </div>
  );
}
