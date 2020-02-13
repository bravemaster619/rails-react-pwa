import React from 'react';
import { toast } from 'react-toastify'

class AlertService {
    showSuccess(title, content = '') {
        toast.success(<div dangerouslySetInnerHTML={{ __html : title + '<br/>' + content }}></div>);
    }

    showError(title, content = '') {
        toast.error(<div dangerouslySetInnerHTML={{ __html : title + '<br/>' + content }}></div>);
    }
}

export const alertService = new AlertService();