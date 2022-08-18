import React from "react";
import { useRecoilValue } from "recoil";
import AsyncBoundary from "../components/AsyncBoundary/AsyncBoundary";
import HashForm from "../components/HashForm";
import Error from "../components/Error";
import Loading from "../components/Loading";
import StoredHash from "../components/StoredHash";
import { storedHashedValuesState } from "../states/recoil/hash";

const HashPage = () => {
	const storedHashedValues = useRecoilValue(storedHashedValuesState);

	return (
		<>
			<AsyncBoundary
				ErrorFallback={(arg) => <Error error={arg.error} />}
				SuspenseFallback={<Loading />}
			>
				<HashForm />
				{storedHashedValues.map((hasedValue, index) => (
					<StoredHash key={`${hasedValue}${index}`} hasedValue={hasedValue} index={index} />
				)).reverse()}
			</AsyncBoundary>
		</>
	);
};

export default HashPage;
