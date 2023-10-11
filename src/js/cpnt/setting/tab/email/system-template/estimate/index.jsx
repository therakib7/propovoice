import { useState, useEffect } from "react";
import WithApi from 'hoc/Api';

import Default from './sub/Default';
import Reminder from './sub/Reminder';
import ProLabel from 'block/pro-alert/label';

const Main = (props) => {

	return (
		<>
			<Default {...props} />
			<Reminder {...props} />
		</>
	)
}
export default WithApi(Main) 