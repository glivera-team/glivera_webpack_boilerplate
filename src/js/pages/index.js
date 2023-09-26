import { exist } from '../utils';
import dynamicVideo from '../components/dynamic-video';

const index = () => {
	exist('.qq');
	dynamicVideo();
};

export default index;
