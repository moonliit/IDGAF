import { useEffect, useState } from "react";
import { ChosenCourseProps, Progress, ProgressStateProps, FileProps, FileType, FileTypeProps, AbstractRange, AbstractRangeProps } from "./components/TrackedState"
import { motion, AnimatePresence } from "framer-motion";

import { NewAssignment } from "./components/NewAssignment";
import { CourseSelector } from "./components/ChoiceSelector";
import { FileAttacher } from "./components/FileAttacher";
import { FilePreprocessor } from "./components/FilePreprocessor";

interface ProgressComponentsProps extends ProgressStateProps, ChosenCourseProps, FileProps, FileTypeProps, AbstractRangeProps {
  direction: number,
	setDirection: React.Dispatch<React.SetStateAction<number>>
}

const ProgressComponent: React.FC<ProgressComponentsProps> = ({ direction, setDirection, progress, setProgress, course, setCourse, file, setFile, fileType, setFileType, abstractRange, setAbstractRange }) => {
  
  const setProgressWrapper: React.Dispatch<React.SetStateAction<Progress>> = (( nextProgress: Progress ) => {
    if (progress < nextProgress) {
      setDirection(1);
    }
    else {
      setDirection(-1);
    }
  }) as React.Dispatch<React.SetStateAction<Progress>>;

  switch (progress) {
    case Progress.NewAssignment:
      return (<NewAssignment
        message={"New assignment"}
        progress={progress} setProgress={setProgressWrapper}
      />);
    case Progress.ChoosingCourse:
      return (<CourseSelector
        message={"Choose a course: "}
        options={["History", "Economics", "Other"]}
        progress={progress} setProgress={setProgressWrapper}
        course={course} setCourse={setCourse}
      />);
    case Progress.AttachingFile:
      return (<FileAttacher
        message={"Attach file"}
        progress={progress} setProgress={setProgressWrapper}
        file={file} setFile={setFile}
        fileType={fileType} setFileType={setFileType}
      />);
    case Progress.SettingUpFile:
      return (<FilePreprocessor
        message={"Setting up the file"}
        progress={progress} setProgress={setProgressWrapper}
        fileType={fileType} setFileType={setFileType}
        file={file} setFile={setFile}
        abstractRange={abstractRange} setAbstractRange={setAbstractRange}
      />);     
  }
};



const Home: React.FC = () => {
  const [direction, setDirection] = useState<number>(0);
  const [progressState, setProgressState] = useState<Progress>(Progress.NewAssignment);
  const [course, setCourse] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<FileType>(FileType.None);
  const [abstractRange, setAbstractRange] = useState<AbstractRange>({ start: 1, end: 1 });

  useEffect(() => {
    setProgressState(progressState + direction);
    setDirection(0);
  }, [direction]);

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
      
      <div className="motion-container">
        <AnimatePresence mode="wait">
          <motion.div className="menu-container"
            key={progressState}
            initial={{ x: direction * 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ProgressComponent
              direction={direction} setDirection={setDirection}
              progress={progressState} setProgress={setProgressState}
              course={course} setCourse={setCourse}
              file={file} setFile={setFile}
              fileType={fileType} setFileType={setFileType}
              abstractRange={abstractRange} setAbstractRange={setAbstractRange}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
};

export default function App() {
  return (<>
    <Home/>
  </>);
}