import Underline from '@editorjs/underline';
import Embed from '@editorjs/embed'
import Table from '@editorjs/table' 
import NestedList from '@editorjs/nested-list';
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote' 
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import ColorPlugin from 'editorjs-text-color-plugin' 

export const EDITOR_JS_TOOLS = {
    underline: Underline, 
    Color: {
        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        config: {
           colorCollections: ['#FF1300','#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
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
    image: Image,
    raw: Raw,
    header: Header,
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
}
