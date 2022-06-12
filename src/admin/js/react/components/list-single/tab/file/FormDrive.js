import { useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker'


function App() {
    const [openPicker, authResponse] = useDrivePicker();
    // const customViewsArray = [new google.picker.DocsView()]; // custom view
    const handleOpenPicker = () => {
        openPicker({
            clientId: "360087475802-7mg8et7lg5rfm4njqea5t8243ksmlh69.apps.googleusercontent.com", 
            developerKey: "AIzaSyD5mPs_ifRKqVXdpEu4xu0FFDuSNEmt6Ws",
            viewId: "DOCS",
            // token: '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',
            // token: token, // pass oauth token in case you already have one
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            // customViews: customViewsArray, // custom view
            callbackFunction: (data) => {
                if (data.action === 'cancel') {
                    console.log('User clicked cancel/close button')
                }
                console.log(data)
            },
        })
    }



    return (
        <div>
            <button onClick={() => handleOpenPicker()}>Open Picker</button>
        </div>
    );
}

export default App;