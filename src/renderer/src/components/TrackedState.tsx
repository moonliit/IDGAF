// overall-Progress state

export enum Progress {
	NewAssignment,
	ChoosingCourse,
	AttachingFile,
  SettingUpFile
};

export interface ProgressStateProps {
	progress: Progress,
	setProgress: React.Dispatch<React.SetStateAction<Progress>>
};

// chosen course

export interface ChosenCourseProps {
	course: string,
	setCourse: React.Dispatch<React.SetStateAction<string>>
};

// file attaching

export interface FileProps {
	file: File | null,
	setFile: React.Dispatch<React.SetStateAction<File | null>>
};

// file type

export enum FileType {
  None,
  PDF
};

export interface FileTypeProps {
	fileType: FileType,
	setFileType: React.Dispatch<React.SetStateAction<FileType>>
};