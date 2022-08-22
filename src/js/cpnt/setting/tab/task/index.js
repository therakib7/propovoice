import { useState, useEffect } from "react";
import WithApi from 'hoc/Api';

import General from './sub/General';   

const Main = (props) => {  
	return (
		<General {...props} />
	) 
}  
export default WithApi(Main) 