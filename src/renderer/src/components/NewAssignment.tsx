import { Progress, ProgressStateProps } from "./TrackedState";
import { Button } from "./Button";


interface NewAssignmentProps extends ProgressStateProps {
  message: string
};

export const NewAssignment: React.FC<NewAssignmentProps> = ({ message, progress, setProgress }) => {
  return (<>
    <div className="action cool-invisible">
        <a className="new-assignment" target="_blank" rel="noreferrer" onClick={() => setProgress(Progress.ChoosingCourse)}>
          {message}
        </a>
    </div>
  </>);
};