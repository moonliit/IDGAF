import { Progress, ProgressStateProps, FileProps, FileType, FileTypeProps, AbstractRangeProps, ChosenTaskProps } from "./TrackedState";
import { Button } from "./Button";
import { useState } from "react";

interface TaskSelectionProps extends ProgressStateProps, ChosenTaskProps {
  message: string,
  options: string[]
}

export const TaskSelector: React.FC<TaskSelectionProps> = ({ message, options, progress, setProgress, task, setTask }) => {
  const [choice, setChoice] = useState<string>(options.includes(task) ? task : "Other");
  
  const handleBack = () => {
    if (choice.toLowerCase() !== "other") {
			setTask(choice);
		}
		setProgress(Progress.SettingUpFile);
	};
	const handleNext = () => {
    if (choice.toLowerCase() !== "other") {
			setTask(choice);
		}
		setProgress(Progress.FinalAsk);
	};
  
  return (<>
    <div className="cool-container choice-selector">
			<a>

				<label>
					{message}
					<br/>
					<select value={choice} onChange={(e) => setChoice(e.target.value)}>
						<option value="" disabled>Select an option</option>
						{options.map((option) => (
							<option key={option} value={option}>{option}</option>
						))}
					</select>
				</label>

				<br/>

				{choice.toLowerCase() === "other" && (
					<input
						type="text"
						placeholder="Enter your own task"
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>
				)}

				{choice.toLowerCase() !== "other" && (<p>Selected: {choice === "Other" ? task || "Other" : choice}</p>)}


			</a>
		</div>

		<div className="prev-next-container">
			<Button title={"◀ Back"} action={handleBack}/>
			<Button title={"Next ▶"} action={handleNext}/>
		</div>
  </>);
};