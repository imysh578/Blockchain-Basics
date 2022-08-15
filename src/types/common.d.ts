export {};

declare global {
	/* Type of Params */
	interface Params {
		[key: string]: any;
	}

	namespace ErrorType {
		interface Props {
			error: AxiosError<AxiosData> | Error;
			onClick?: Function;
		}
	}
}
