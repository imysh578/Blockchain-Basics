import { AxiosError, AxiosResponse } from "axios";

declare global {
	namespace ErrorComponent {
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

	namespace BlockComponent {
		interface Props {
			peer?: number;
		}
	}
}
