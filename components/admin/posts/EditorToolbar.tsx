import { Editor } from '@tiptap/react';
import { useState } from 'react';
import { 
  FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaImage, 
  FaLink, FaTable, FaSubscript, FaSuperscript, FaCode,
  FaParagraph, FaQuoteRight, FaRedo, FaUndo, FaEraser,
  FaPalette, FaFont
} from 'react-icons/fa';
import { 
  MdFormatAlignLeft, MdFormatAlignCenter, 
  MdFormatAlignRight, MdFormatAlignJustify 
} from 'react-icons/md';
import { fontFamilyOptions, headingSizes, colorPalette } from '@/lib/editorExtensions';

interface EditorToolbarProps {
  editor: Editor | null;
  t: any;
}

export default function EditorToolbar({ editor, t }: EditorToolbarProps) {
  const [showColors, setShowColors] = useState(false);
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
        {/* Text Style Controls */}
        <div className="flex items-center space-x-1 border-r border-gray-600 pr-2">
          <div className="relative">
            <button
              onClick={() => setShowHeadings(!showHeadings)}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-gold-400 rounded"
            >
              {t.editor.heading || 'Heading'}
            </button>
            {showHeadings && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-gray-800 shadow-lg rounded-md border border-gray-600 py-1 z-50">
                {headingSizes.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: value }).run();
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
            t.editor.alignLeft
          )}
          {/* ...other alignment buttons... */}
        </div>

        {/* Lists and Indentation */}
        <div className="flex items-center space-x-1 border-r pr-2">
          {toolbarButton(
            () => editor.chain().focus().toggleBulletList().run(),
            <FaListUl />,
            editor.isActive('bulletList'),
            t.editor.bulletList
          )}
          {toolbarButton(
            () => editor.chain().focus().toggleOrderedList().run(),
            <FaListOl />,
            editor.isActive('orderedList'),
            t.editor.orderedList
          )}
        </div>

        {/* Color Picker */}
        <div className="relative">
          <button
            onClick={() => setShowColors(!showColors)}
            className="p-2 rounded hover:bg-gray-700 text-gray-300 hover:text-gold-400"
          >
            <FaPalette />
          </button>
          {showColors && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-gray-800 shadow-lg rounded-md border border-gray-600 z-50">
              <div className="grid grid-cols-10 gap-1">
                {colorPalette.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                      setShowColors(false);
                    }}
                    className="w-6 h-6 rounded-sm border border-gray-600 hover:border-gold-400 transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Additional Controls */}
        <div className="flex items-center space-x-1">
          {toolbarButton(
            () => editor.chain().focus().toggleSubscript().run(),
            <FaSubscript />,
            editor.isActive('subscript'),
            'Subscript'
          )}
          {toolbarButton(
            () => editor.chain().focus().toggleSuperscript().run(),
            <FaSuperscript />,
            editor.isActive('superscript'),
            'Superscript'
          )}
          {toolbarButton(
            () => editor.chain().focus().toggleCodeBlock().run(),
            <FaCode />,
            editor.isActive('codeBlock'),
            'Code Block'
          )}
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center space-x-1 border-l border-gray-600 pl-2">
          {toolbarButton(
            () => editor.chain().focus().undo().run(),
            <FaUndo />,
            false,
            'Undo'
          )}
          {toolbarButton(
            () => editor.chain().focus().redo().run(),
            <FaRedo />,
            false,
            'Redo'
          )}
          {toolbarButton(
            () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
            <FaEraser />,
            false,
            'Clear Formatting'
          )}
        </div>
      </div>
    </div>
  );
}
