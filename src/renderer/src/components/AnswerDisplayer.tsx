import { ProgressStateProps, ChosenCourseProps, FileProps, FileTypeProps, AbstractRangeProps, ChosenTaskProps } from "./TrackedState";

interface DisplayerProps extends ProgressStateProps, ChosenCourseProps, FileProps, FileTypeProps, AbstractRangeProps, ChosenTaskProps {}

export const AnswerDisplayer: React.FC = ({ progress, setProgress, course, setCourse, file, setFile, fileType, setFileType, abstractRange, setAbstractRange, task, setTask }) => {
  return (<>
    aaa
  </>);
};