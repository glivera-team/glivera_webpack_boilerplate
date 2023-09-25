export const exist = (elementOrArray) => {
	if (!elementOrArray && elementOrArray !== 0) return false;
	if (elementOrArray.length === 0) {
		return false;
	}
	return true;
};
