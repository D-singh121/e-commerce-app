import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
	options,
	label,
	ClassName = '',
	...props
}, ref) {
	const id = useId();
	return (
		<div>
			{label &&
				<label
					htmlFor={id} className=''
				>
					<select
						{...props}
						id={id}
						ref={ref}
						className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${ClassName} `}
					>
						{options?.map((option) => (

							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>

				</label>}

		</div>
	);
});

export default Select;