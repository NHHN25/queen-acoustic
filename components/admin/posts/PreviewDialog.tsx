import Dialog from '@/components/shared/Dialog';

interface PreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content?: string;
}

export default function PreviewDialog({
  isOpen,
  onClose,
  title,
  content
}: PreviewDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title || "Preview"}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">{title}</h1>
          <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: content || '' }} />
        </div>
      </div>
    </Dialog>
  );
}
