import { AxiosError, AxiosResponse } from "axios";

export {}

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

	namespace BlocksComponent {
		interface Props {
			peer: number;
		}
	}

	namespace BlockComponent {
		interface Props {
			peer: number;
			index: number;
			block: Block<Tx>;
		}
	}
}
