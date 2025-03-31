interface ButtonProps {
	title: string,
	action: (() => void)
};

export const Button: React.FC<ButtonProps> = ({ title, action }) => {
	return (<>
		<div className="action">
			<a target="_blank" rel="noreferrer" onClick={action}>
				{title}
			</a>
		</div>
	</>);
};