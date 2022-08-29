import axios, { AxiosResponse } from "axios";
import Config from "../../utils/config";

const apiSample = () =>
	axios
		.request({
			baseURL: Config.BASE_URL,
			url: Config.URL,
			method: "post",
			data: {
			},
		})
		.then((res: AxiosResponse) => {
			return res
		});

export default apiSample;
