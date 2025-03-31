import { Progress, ProgressStateProps, FileProps, FileType, FileTypeProps } from "./TrackedState";
import { Button } from "./Button";

interface AttacherProps extends ProgressStateProps, FileProps, FileTypeProps {
  message: string
}

function extractFileType(file: File): FileType {
  const extension = file.name.split('.').pop()?.toLowerCase();
  switch (extension) {
    case "pdf":
      return FileType.PDF;
    default:
      return FileType.None;
  }
}

export const FileAttacher: React.FC<AttacherProps> = ({ message, progress, setProgress, file, setFile, fileType, setFileType }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const fileObject = event.target.files[0];
        const obtainedFileType = extractFileType(fileObject); 
        setFile(fileObject);
        setFileType(obtainedFileType);
      }
    };
  
  const handleBack = () => {
		setProgress(Progress.ChoosingCourse);
	};
	const handleNext = () => {
		setProgress(Progress.SettingUpFile);
	};
  
  return (<>
    <div className="cool-container ">
      <label className="file-label">{message}</label>
      <input type="file" onChange={handleFileChange} className="file-input" />
      
      {file && (
          <p className="file-name">Selected: {file.name}</p>
      )}
    </div>
    
    <div className="prev-next-container">
      <Button title={"◀ Back"} action={handleBack}/>
      <Button title={"Next ▶"} action={handleNext}/>
    </div>
  </>);
};