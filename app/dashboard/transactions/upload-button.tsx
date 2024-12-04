/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCSVReader } from 'react-papaparse';
import { File } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  onUpload: (results: any) => void
}

export function UploadButton({ onUpload }: Props) {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button
          {...getRootProps()}
          className="flex items-center"
          size="sm"
          variant="outline"
        >
          <p className="text-sm font-medium">
            Import CSV
          </p>
          <File className="size-4" />
        </Button>
      )}
    </CSVReader>
  );
}