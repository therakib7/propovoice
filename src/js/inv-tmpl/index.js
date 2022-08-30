 
import { useEffect, Suspense, lazy } from "react";
import Spinner from 'block/preloader/spinner';
const Template1 = lazy(() => import('./tmpl/1'));
const Template2 = lazy(() => import('./tmpl/2'));
const Template3 = lazy(() => import('./tmpl/3'));
const Template4 = lazy(() => import('./tmpl/4'));
const Template5 = lazy(() => import('./tmpl/5'));
const Template6 = lazy(() => import('./tmpl/6'));
const Template7 = lazy(() => import('./tmpl/7'));
const Template8 = lazy(() => import('./tmpl/8'));

import Style from './scss/all.scoped.scss'

export default (props) => {

    useEffect(() => {
        document.documentElement.style.setProperty('--pv-inv-primary', props.data.invoice.style.primary_color);
        
        window.addEventListener('resize', updateDimensions);   
        return () => {
            window.removeEventListener('resize', updateDimensions);
        }
    }, []);

    const isPrvwLoad = () => {
        if (props.isPrvwLoad) {
            props.isPrvwLoad();
        }
    };

    const updateDimensions = () => {
        if (props.isPrvwLoad) {
            props.isPrvwLoad();
        }
    }

    const id = props.data.invoice.template;
    return (
        <Suspense fallback={<Spinner />}>
            <style>{"@media print { body {--pv-inv-primary: "+props.data.invoice.style.primary_color+"} } "}</style>
            {id == 1 && <Template1 {...props} height={props.height} isPrvwLoad={isPrvwLoad} />}
            {id == 2 && <Template2 {...props} height={props.height} isPrvwLoad={isPrvwLoad} />}
            {id == 3 && <Template3 {...props} height={props.height} isPrvwLoad={isPrvwLoad} />}
            {id == 4 && <Template4 {...props} height={props.height} isPrvwLoad={isPrvwLoad} />}
        </Suspense>
    )
} 