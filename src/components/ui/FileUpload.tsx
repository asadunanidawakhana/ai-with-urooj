import React, { useRef } from 'react';
import { Button } from './Button';
import { Upload } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    accept?: string;
    className?: string;
    label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, accept = "image/*", className, label = "Upload Screenshot" }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <div className={cn("flex flex-col items-start gap-2", className)}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                accept={accept}
                className="hidden"
            />
            <Button type="button" variant="outline" onClick={handleClick} className="w-full flex items-center justify-center gap-2">
                <Upload className="h-4 w-4" />
                {label}
            </Button>
        </div>
    );
};
