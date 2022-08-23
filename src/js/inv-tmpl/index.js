import React, { Component, Suspense, lazy } from 'react';
const Template1 = lazy(() => import('./tmpl/1'));
const Template2 = lazy(() => import('./tmpl/2'));
const Template3 = lazy(() => import('./tmpl/3'));
const Template4 = lazy(() => import('./tmpl/4'));
const Template5 = lazy(() => import('./tmpl/5'));
const Template6 = lazy(() => import('./tmpl/6'));
const Template7 = lazy(() => import('./tmpl/7'));
const Template8 = lazy(() => import('./tmpl/8')); 

import Style from './scss/all.scoped.scss' 

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
        const id = this.props.data.invoice.template;
        return (
            <Suspense fallback={<div className="pi-preloader" style={{ padding: 0 }} />}>
                <> 
                    {id == 1 && <Template1 {...this.props} height={this.props.height} isPreviewLoaded={this.isPreviewLoaded} />}
                    {id == 2 && <Template2 {...this.props} height={this.props.height} isPreviewLoaded={this.isPreviewLoaded} />}
                    {id == 3 && <Template3 {...this.props} height={this.props.height} isPreviewLoaded={this.isPreviewLoaded} />}
                    {id == 4 && <Template4 {...this.props} height={this.props.height} isPreviewLoaded={this.isPreviewLoaded} />}  
                </>
            </Suspense>
        );
    }
} 