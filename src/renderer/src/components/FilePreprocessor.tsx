import { Progress, ProgressStateProps, FileProps, FileType, FileTypeProps, AbstractRangeProps } from "./TrackedState";
import { Button } from "./Button";

import { PdfPreprocessor } from "./FilePreprocessors/PdfPreprocessor";

interface PreprocessorProps extends ProgressStateProps, FileProps, FileTypeProps, AbstractRangeProps {
  message: string
}

export const FilePreprocessor: React.FC<PreprocessorProps> = ({ message, progress, setProgress, fileType, setFileType, file, setFile, abstractRange, setAbstractRange }) => {
  
  const handleBack = () => {
		setProgress(Progress.AttachingFile);
	};
	const handleNext = () => {
		setProgress(Progress.ChoosingTask);
	};

  return (<>
    <div className="cool-container">
      <label className="file-label">{message}</label>
      {fileType == FileType.PDF &&
        <PdfPreprocessor
          file={file} setFile={setFile}
          abstractRange={abstractRange} setAbstractRange={setAbstractRange}
        />
      }
      {fileType == FileType.None && <>what</>}
    </div>

    <div className="prev-next-container">
      <Button title={"◀ Back"} action={handleBack}/>
      <Button title={"Next ▶"} action={handleNext}/>
    </div>
  </>);
};