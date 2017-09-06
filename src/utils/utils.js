export function classNames (element, classNameData) {
	const currentClassNames = element.className.trim().split(/\s+/);

	Object.keys(classNameData).forEach((classNameKey) => {
		const index = currentClassNames.indexOf(classNameKey);

		if (classNameData[classNameKey]) {
			index === -1 && currentClassNames.push(classNameKey);
		} else {
			index !== -1 && currentClassNames.splice(index, 1);
		}
	});

	element.className = currentClassNames.join(' ');
}
