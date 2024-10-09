import axios from 'axios';

export const handleSubmitWithErrors = async <T>(
	action: () => Promise<T>,
	onSuccess: () => void,
	errorMessagePrefix: string,
) => {
	try {
		await action();
		onSuccess();
	} catch (error: unknown) {
		if (axios.isAxiosError(error) && error.response) {
			alert(
				`${errorMessagePrefix} error: ${error.response.data?.message || 'Unknown error occurred'}`,
			);
		} else {
			alert(`${errorMessagePrefix} error: Unknown error occurred`);
		}
	}
};
