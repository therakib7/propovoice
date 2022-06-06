import React, { Suspense, lazy } from 'react';
import Breadcrumb from 'block/breadcrumb';
import Preloader from 'block/preloader/table';

import Empty from 'block/empty';

const Contact = lazy(() => import('./contact'));

const Person = (props) => {
    return (
        <div className="ncpi-components">
            <Breadcrumb title={'Title'} />

            <div className="pi-small-button-group pi-mb-30">
                <button className="pi-btn pi-active pi-btn-small pi-bg-stroke pi-bg-hover-shadow">
                    Person
                </button>
                <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow">
                    Organization
                </button>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <Contact />
            </Suspense>

        </div>
    );
}

export default Person;