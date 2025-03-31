// overall-Progress state

export enum Progress {
	NewAssignment = 0,
	ChoosingCourse = 1,
	AttachingFile = 2,
  SettingUpFile = 3
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

// preprocessing args

export interface AbstractRange {
  start: number,
  end: number
};

export interface AbstractRangeProps extends FileProps {
  abstractRange: AbstractRange,
  setAbstractRange: React.Dispatch<React.SetStateAction<AbstractRange>>
};

export interface InternalProps extends FileProps, AbstractRangeProps {}