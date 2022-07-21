import 'ScssComponents/_popup.scss';
import initPopup from './initPopup';

const somePopup = () => {
	initPopup(
		'.popupSomeBtn',
		'.popupSome',
		'.popupSomeContent',
		'.popupSomeClose',
	);
};

export default somePopup;
