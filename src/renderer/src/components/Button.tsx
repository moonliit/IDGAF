interface ButtonProps {
	title: string,
	action: (() => void),
  enabled?: boolean
};

export const Button: React.FC<ButtonProps> = ({ title, action, enabled }) => {
	let isEnabled: boolean;
  if (enabled === undefined) {
    isEnabled = true;
  }
  else {
    isEnabled = enabled;
  }

  const handleAction = () => {
    if (isEnabled) {
      action();
    }
  };
  
  return (<>
		<div className={isEnabled ? "action" : "disabled-action"}>
			<a target="_blank" rel="noreferrer" onClick={handleAction}>
				{title}
			</a>
		</div>
	</>);
};