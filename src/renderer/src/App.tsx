import { useState } from "react";
import { ChosenCourseProps, Progress, ProgressStateProps, FileProps, FileType, FileTypeProps } from "./components/TrackedState"

import { NewAssignment } from "./components/NewAssignment";
import { CourseSelector } from "./components/ChoiceSelector";
import { FileAttacher } from "./components/FileAttacher";
import { FilePreprocessor } from "./components/FilePreprocessor";

interface ProgressComponentsProps extends ProgressStateProps, ChosenCourseProps, FileProps, FileTypeProps {}

const ProgressComponent: React.FC<ProgressComponentsProps> = ({ progress, setProgress, course, setCourse, file, setFile, fileType, setFileType }) => {
  switch (progress) {
    case Progress.NewAssignment:
      return (<NewAssignment
        message={"New assignment"}
        progress={progress} setProgress={setProgress}
      />);
    case Progress.ChoosingCourse:
      return (<CourseSelector
        message={"Choose a course: "}
        options={["History", "Economics", "Other"]}
        progress={progress} setProgress={setProgress}
        course={course} setCourse={setCourse}
      />);
    case Progress.AttachingFile:
      return (<FileAttacher
        message={"Attach file"}
        progress={progress} setProgress={setProgress}
        file={file} setFile={setFile}
        fileType={fileType} setFileType={setFileType}
      />);
    case Progress.SettingUpFile:
      return (<FilePreprocessor
        message={"Setting up the file"}
        progress={progress} setProgress={setProgress}
        fileType={fileType} setFileType={setFileType}
        file={file} setFile={setFile}
      />);     
  }
};

const Home: React.FC = () => {
  const [progressState, setProgressState] = useState<Progress>(Progress.NewAssignment);
  const [course, setCourse] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<FileType>(FileType.None);

  return (
    <>
      <div className="title">
        IDGAF
      </div>
      <div className="text">
        Interactive <span className="react">Data Generator</span> & <span className="ts">Automator</span> Framework
      </div>
      <p className="tip">
        For when you, simply, just don't give a fuck.
      </p>
      <div className="actions">
        <ProgressComponent
          progress={progressState} setProgress={setProgressState}
          course={course} setCourse={setCourse}
          file={file} setFile={setFile}
          fileType={fileType} setFileType={setFileType}
        />
      </div>
    </>
  )
};

export default function App() {
  return (<>
    <Home/>
  </>);
}