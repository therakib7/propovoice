import React, { Component, Suspense, lazy } from 'react';
const Template1 = lazy(() => import('./template/1'));
const Template2 = lazy(() => import('./template/2'));
const Template3 = lazy(() => import('./template/3'));
const Template4 = lazy(() => import('./template/4'));

const Feedback = lazy(() => import('./Feedback'));

import Style from './scss/all.scoped.scss'
import './scss/loading.css';

export default class Preview extends Component {
    constructor(props) {
        super(props);
    }

    isPreviewLoaded = () => {
        if (this.props.isPreviewLoaded) {
            this.props.isPreviewLoaded();
        }
    };

    updateDimensions = () => {
        if (this.props.isPreviewLoaded) {
            this.props.isPreviewLoaded();
        }
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        const { id } = this.props.data.invoice.template;
        return (
            <Suspense fallback={<div className="spinner loading" style={{ padding: 0 }} />}>
                <>
                    <Feedback status={this.props.data.status} /> 
                    {id == 1 && <Template1 {...this.props} height={this.props.height} isPreviewLoaded={this.isPreviewLoaded} />}
                    {id == 2 && <Template2 {...this.props} height={this.props.height} isPreviewLoaded={this.isPreviewLoaded} />}
                    {id == 3 && <Template3 {...this.props} height={this.props.height} isPreviewLoaded={this.isPreviewLoaded} />}
                    {id == 4 && <Template4 {...this.props} height={this.props.height} isPreviewLoaded={this.isPreviewLoaded} />} 
                </>
            </Suspense>
        );
    }
} 