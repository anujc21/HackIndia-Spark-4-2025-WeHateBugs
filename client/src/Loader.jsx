import React from "react";
import {Backdrop, CircularProgress} from "@mui/material";

function Loader(){
	return (
		<Backdrop
			sx={(theme) => ({
				color: "#fff",
				zIndex: "99"
			})}
			open={true}
		>
			<CircularProgress color="inherit"/>
		</Backdrop>

	);
}

export default Loader;