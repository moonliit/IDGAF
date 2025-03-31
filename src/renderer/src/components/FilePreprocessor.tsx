import { Progress, ProgressStateProps, FileProps, FileType, FileTypeProps } from "./TrackedState";
import { Button } from "./Button";

interface PreprocessorProps extends ProgressStateProps, FileProps, FileTypeProps {
  message: string
}

const PdfPreprocessor: React.FC<FileProps> = ({ file, setFile }) => {
  return (<>

  </>);
};

export const FilePreprocessor: React.FC<PreprocessorProps> = ({ message, progress, setProgress, fileType, setFileType, file, setFile }) => {
  
  const handleBack = () => {
		setProgress(Progress.AttachingFile);
	};
	const handleNext = () => {
		//setProgress(Progress.SettingUpFile);
	};

  const InternalSwitch: React.FC<PreprocessorProps> = ({ message, progress, setProgress, fileType, setFileType, file, setFile }) => {
    switch (fileType) {
      case FileType.PDF:
        return (<PdfPreprocessor
          file={file} setFile={setFile}
        />);
      default:
        return (<>what</>);
    }
  }

  return (<>
    <div className="cool-container">
      <label className="file-label">{message}</label>
      <InternalSwitch
        message={""}
        progress={progress} setProgress={setProgress}
        fileType={fileType} setFileType={setFileType}
        file={file} setFile={setFile}
      />
    </div>

    <div className="prev-next-container">
      <Button title={"◀ Back"} action={handleBack}/>
      <Button title={"Next ▶"} action={handleNext}/>
    </div>
  </>);
};