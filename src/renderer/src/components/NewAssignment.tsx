import { Progress, ProgressStateProps } from "./TrackedState";
import { Button } from "./Button";

interface NewAssignmentProps extends ProgressStateProps {
  message: string
};

export const NewAssignment: React.FC<NewAssignmentProps> = ({ message, progress, setProgress }) => {
  return (<>
    <Button title={message} action={() => setProgress(Progress.ChoosingCourse)}/>
  </>);
};