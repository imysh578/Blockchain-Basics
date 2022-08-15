import React from "react";
import { useRecoilValue } from "recoil";
import CalHash from "../components/CalHash";
import StoredHash from "../components/StoredHash";
import { storedHashedValuesState } from "../states/recoil/hash";

const HashPage = () => {
	const storedHashedValues = useRecoilValue(storedHashedValuesState);

	return (
		<>
			<CalHash />
			{storedHashedValues.map((hasedValue, index) => (
				<StoredHash key={index} hasedValue={hasedValue} index={index}/>
			))}
		</>
	);
};

export default HashPage;
