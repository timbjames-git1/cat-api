import React, { useState } from 'react';
import { toastr } from 'react-redux-toastr';

import CatService from '../services/cat.service';

const Form: React.FC = () => {

    const [progress, updateProgress] = useState(0);

    let fileInput: HTMLInputElement;

    const handleFileUploadProgress = (progressEvent: any) => {
        updateProgress(Math.round((100 * progressEvent.loaded) / progressEvent.total));
    };

    const handleUpload = (): void => {
        if (fileInput && fileInput.files){
            CatService.upload(fileInput.files[0], handleFileUploadProgress).then(() => {
                toastr.success('Upload', 'File Uploaded Successfully');

                setTimeout(() => {

                    if (process.env.NODE_ENV === 'production'){
                        window.location.href = process.env.PUBLIC_URL;
                    } else {
                        window.location.href = '/';
                    }
                }, 1500);
            }).catch((error) => {
                console.log(error.response);
                toastr.error('Upload Error', error.response.data.message);
                updateProgress(0);
            });
        }        
    };

    return (
        <form>
            <div className="form-group">
                <label>Your Cat Picture</label>
                <input type="file" className="form-control" placeholder="Enter email" ref={(component: HTMLInputElement) => { fileInput = component }} />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>                
            
            <div className="form-group">
                <button type="button" className="btn btn-primary" onClick={handleUpload}>Upload</button>
            </div>

            {
                progress > 0 && (
                    <div className="form-group">

                        <div className="progress">
                            <div className="progress-bar progress-bar-info progress-bar-striped"
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: progress + "%" }}>
                                {progress}%
                            </div>
                        </div>

                    </div>
                )
            }
            
        </form>
    );
};

export {
    Form
}