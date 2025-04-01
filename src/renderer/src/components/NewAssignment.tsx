import { Progress, ProgressStateProps } from "./TrackedState";


interface NewAssignmentProps extends ProgressStateProps {
  message: string,
  reset: (() => void)
};

export const NewAssignment: React.FC<NewAssignmentProps> = ({ message, reset, progress, setProgress }) => {
  const handleReset = () => {
    reset();
    setProgress(Progress.ChoosingCourse);
  };
  
  return (<>
    <div className="action cool-invisible">
        <a className="new-assignment" target="_blank" rel="noreferrer" onClick={handleReset}>
          {message}
        </a>
    </div>
  </>);
};