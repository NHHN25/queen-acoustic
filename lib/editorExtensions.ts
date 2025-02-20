import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import CodeBlock from '@tiptap/extension-code-block';
import FontFamily from '@tiptap/extension-font-family';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';

export const editorExtensions = [
  StarterKit.configure({
    heading: false, // we'll configure this separately
    codeBlock: false, // we'll configure this separately
  }),
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  Image.configure({
    HTMLAttributes: {
      class: 'max-w-full h-auto rounded-lg',
    },
    allowBase64: true,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-blue-600 hover:text-blue-800 underline',
    },
  }),
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: 'border-collapse table-auto w-full',
    },
  }),
  TableRow,
  TableCell.configure({
    HTMLAttributes: {
      class: 'border border-gray-300 p-2',
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: 'border border-gray-300 p-2 bg-gray-100 font-bold',
    },
  }),
  Underline,
  Subscript,
  Superscript,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class: 'bg-gray-100 rounded-md p-4 font-mono text-sm',
    },
  }),
  FontFamily.configure({
    types: ['textStyle'],
  }),
  Typography,
  Placeholder.configure({
    placeholder: 'Write something amazing...',
  }),
];

export const fontFamilyOptions = [
  { name: 'Default', value: 'roboto' },
  { name: 'Serif', value: 'serif' },
  { name: 'Monospace', value: 'monospace' },
  { name: 'Arial', value: 'Arial' },
  { name: 'Times New Roman', value: 'Times New Roman' },
];

export const headingSizes = [
  { label: 'Heading 1', value: 1 },
  { label: 'Heading 2', value: 2 },
  { label: 'Heading 3', value: 3 },
  { label: 'Heading 4', value: 4 },
  { label: 'Heading 5', value: 5 },
  { label: 'Heading 6', value: 6 },
];

export const colorPalette = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
  '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
];
