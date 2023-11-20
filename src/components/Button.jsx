import React from "react";

const Button = ({
	children,
	type = 'button',
	bgColor = 'bg-blue-600',
	textColor = 'text-white',
	ClassName = '',
	...props //****** ek property default me hai className but agar user kuch properties pass karna chahta hai to usko  hum "...props" variable  me store karenge */

}) => {
	return (
		<button className={`py-2 px-4 rounded-full ${ClassName} ${bgColor} ${textColor} ${type} `} {...props}    >
			{children}
		</button>
	);
};

export default Button;