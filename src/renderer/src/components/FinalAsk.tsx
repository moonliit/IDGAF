import { Progress, ProgressStateProps } from "./TrackedState";
import { Button } from "./Button";

interface FinalAskProps extends ProgressStateProps {
  message: string
};

export const FinalAsk: React.FC<FinalAskProps> = ({ message, progress, setProgress }) => {
  const handleBack = () => {
		setProgress(Progress.ChoosingTask);
	};
	const handleNext = () => {
		setProgress(Progress.DisplayingAnswer);
	};
  
  return (<>
    <div className="cool-container">
      {message}
    </div>

    <div className="prev-next-container">
      <Button title={"◀ Back"} action={handleBack}/>
      <Button title={"Next ▶"} action={handleNext}/>
    </div>
  </>);
};