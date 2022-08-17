import { AxiosError } from "axios";

export {};

declare global {
	/* Type of Params */
	interface Params {
		[key: string]: any;
	}

	/* Type of Error */
	namespace ErrorType {
		interface Props {
			error: AxiosError<AxiosData> | Error;
			onClick?: Function;
		}

		interface AxiosData {
			code: string;
			message: string;
			result: boolean;
		}
	}
}
