import Underline from '@editorjs/underline';
import Table from '@editorjs/table'
import NestedList from '@editorjs/nested-list';
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
import Paragraph from '@editorjs/paragraph'
import Quote from '@editorjs/quote'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import ColorPlugin from 'editorjs-text-color-plugin'
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune'
import FontSize from 'editorjs-inline-font-size-tool'
import Invoice from './custom-tools/invoice'
//New Item: font-size, alignment, color, maker, nested-list, underline 
import { toast } from 'react-toastify';
import Api from 'api/media';

export const EDITOR_JS_TOOLS = {
    invoice: Invoice,
    underline: Underline,
    fontSize: FontSize,
    Color: {
        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        config: {
            colorCollections: ['#FF1300', '#EC7878', '#9C27B0', '#673AB7', '#3F51B5', '#0070FF', '#03A9F4', '#00BCD4', '#4CAF50', '#8BC34A', '#CDDC39', '#FFF'],
            defaultColor: '#FF1300',
            type: 'text',
        }
    },
    Marker: {
        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        config: {
            defaultColor: '#FFBF00',
            type: 'marker',
        }
    },
    embed: Embed,
    table: Table,
    list: {
        class: NestedList,
        inlineToolbar: true,
    },
    //TODO: make a documentation about editor like: tab for nested list and shifrt+tab for back
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    // image: Image,
    image: {
        class: Image,
        config: {
            /**
             * Custom uploader
             */
            uploader: {
                /**
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                uploadByFile(file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('type', 'editor_img');

                    return Api.create(formData)
                        .then(resp => {
                            if (resp.data.success) {
                                return {
                                    success: 1,
                                    file: {
                                        url: resp.data.data.src,
                                        // any other image data you want to store, such as width, height, color, extension, etc
                                    }
                                };
                            } else {
                                resp.data.data.forEach(function (value, index, array) {
                                    toast.error(value);
                                });
                            }
                        });
                },
            }
        }
    },
    raw: Raw,
    header: {
        class: Header,
        inlineToolbar: true,
        tunes: ['anyTuneName'],
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        tunes: ['anyTuneName'],
    },
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
    anyTuneName: {
        class: AlignmentTuneTool,
        config: {
            default: "left",
            blocks: {
                header: 'left',
                list: 'left'
            }
        },
    }
}
