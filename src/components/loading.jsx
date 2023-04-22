import React from "react";
import {Skeleton} from "@mui/material"
const LoadingBar = (props ) => (
    <Skeleton animation="wave"  variant="rounded" width={props.Width} height={props.height} />)
 
export default LoadingBar;