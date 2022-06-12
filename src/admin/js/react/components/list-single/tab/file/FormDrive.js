import { useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker'


function GoogleDrive() {
    const [openPicker, authResponse] = useDrivePicker();

    useEffect(() => {
        openPicker({
            clientId: "360087475802-7mg8et7lg5rfm4njqea5t8243ksmlh69.apps.googleusercontent.com",
            //secret: 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
            developerKey: "AIzaSyClbXH25aGlYTmIxtAyxjClp2icaRlIpgQ",
            viewId: "DOCS",
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
    }, []);  
    return (
        <div>
            <button>Open Picker</button>
        </div>
    );
}

export default GoogleDrive;