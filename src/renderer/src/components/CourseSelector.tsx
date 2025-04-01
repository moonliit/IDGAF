import { useState } from "react";
import { Button } from "./Button";
import { ChosenCourseProps, Progress, ProgressStateProps } from "./TrackedState";

interface CourseProps extends ProgressStateProps, ChosenCourseProps {
	message: string,
	options: string[]
};

export const CourseSelector: React.FC<CourseProps> = ({ message, options, progress, setProgress, course, setCourse }) => {
  const [choice, setChoice] = useState<string>(options.includes(course) ? course : "Other");

	const handleBack = () => {
		if (choice.toLowerCase() !== "other") {
			setCourse(choice);
		}
		setProgress(Progress.NewAssignment);
	};
	const handleNext = () => {
		if (choice.toLowerCase() !== "other") {
			setCourse(choice);
		}
		setProgress(Progress.AttachingFile);
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
						placeholder="Enter your own course"
						value={course}
						onChange={(e) => setCourse(e.target.value)}
					/>
				)}

				{choice.toLowerCase() !== "other" && (<p>Selected: {choice === "Other" ? course || "Other" : choice}</p>)}


			</a>
		</div>

		<div className="prev-next-container">
			<Button title={"◀ Back"} action={handleBack}/>
			<Button title={"Next ▶"} action={handleNext}/>
		</div>
	
	</>);
}
