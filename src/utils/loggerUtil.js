import {  toast } from 'react-toastify';

function handleResponse(response) {
    if(response?.data?.result?.msg){
        toast.success(response.data.result.msg);
    }
    return response.data.result;
}

function handleError(error) {
    console.log(error);
    if(!error.response){
        toast.error("Unreachable Server.");
    }else
    if(error.response?.data?.code === 500){
        toast.error("Something Went Wrong");
    }else
    if(error.response?.data?.result?.msg){
        toast.error(error.response.data.result.msg);
    }
    return error;
}

export { handleResponse, handleError };