import blobToBase64 from "./blobToBase64";

const imgUrlToBase64 = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
            blobToBase64(xhr.response).then((res) => resolve(res));
        };
        xhr.onerror = (error) => reject(error);
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.send();
    });
}

export default imgUrlToBase64;
