import { useEffect, useState } from "react";
import { ChosenCourseProps, Progress, ProgressStateProps, FileProps, FileType, FileTypeProps, AbstractRange, AbstractRangeProps, ChosenTaskProps } from "./components/TrackedState"
import { motion, AnimatePresence } from "framer-motion";
import { courseChoices, taskChoices } from "./global";

import { NewAssignment } from "./components/NewAssignment";
import { CourseSelector } from "./components/CourseSelector";
import { FileAttacher } from "./components/FileAttacher";
import { FilePreprocessor } from "./components/FilePreprocessor";
import { TaskSelector } from "./components/TaskSelector";
import { FinalAsk } from "./components/FinalAsk";
import { AnswerDisplayer } from "./components/AnswerDisplayer";

interface ProgressComponentsProps extends ProgressStateProps, ChosenCourseProps, FileProps, FileTypeProps, AbstractRangeProps, ChosenTaskProps {
  direction: number,
	setDirection: React.Dispatch<React.SetStateAction<number>>,
  reset: (() => void)
}

const ProgressComponent: React.FC<ProgressComponentsProps> = ({ direction, setDirection, reset, progress, setProgress, course, setCourse, file, setFile, fileType, setFileType, abstractRange, setAbstractRange, task, setTask }) => {
  
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
        reset={reset}
        progress={progress} setProgress={setProgressWrapper}
      />);
    case Progress.ChoosingCourse:
      return (<CourseSelector
        message={"Choose a course: "}
        options={courseChoices}
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
    case Progress.ChoosingTask:
      return (<TaskSelector
        message={"Choose a task:"}
        options={taskChoices}
        progress={progress} setProgress={setProgressWrapper}
        task={task} setTask={setTask}
      />);
    case Progress.FinalAsk:
      return (<FinalAsk
        message={"Are you ready?"}
        progress={progress} setProgress={setProgressWrapper}
      />);
    case Progress.DisplayingAnswer:
      return (<AnswerDisplayer
        progress={progress} setProgress={setProgressWrapper}
        course={course} setCourse={setCourse}
        file={file} setFile={setFile}
        fileType={fileType} setFileType={setFileType}
        abstractRange={abstractRange} setAbstractRange={setAbstractRange}
        task={task} setTask={setTask}
      />);
  }
};

const Home: React.FC = () => {
  const [direction, setDirection] = useState<number>(0);
  const [progressState, setProgressState] = useState<Progress>(Progress.NewAssignment);
  const [course, setCourse] = useState<string>(courseChoices[0]);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<FileType>(FileType.None);
  const [abstractRange, setAbstractRange] = useState<AbstractRange>({ full: true, start: 0, end: 0 });
  const [task, setTask] = useState<string>(taskChoices[0]);

  const handleReset = () => {
    setDirection(0);
    setProgressState(Progress.NewAssignment);
    setCourse(courseChoices[0]);
    setFile(null);
    setFileType(FileType.None);
    setAbstractRange({ full: true, start: 0, end: 0 });
    setTask(taskChoices[0]);
  };

  useEffect(() => {
    if (direction === 0) return;
    setProgressState(progressState + direction);
    const animationDuration: number = 1000;
    const timeout = setTimeout(() => {
      setDirection(0);
    }, animationDuration);
    return () => clearTimeout(timeout); 
  }, [direction]);

  return (<>
    <div className="main-container">
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
              reset={handleReset}
              direction={direction} setDirection={setDirection}
              progress={progressState} setProgress={setProgressState}
              course={course} setCourse={setCourse}
              file={file} setFile={setFile}
              fileType={fileType} setFileType={setFileType}
              abstractRange={abstractRange} setAbstractRange={setAbstractRange}
              task={task} setTask={setTask}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </>)
};

export default function App() {
  return (<>
    <Home/>
  </>);
}