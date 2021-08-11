import React, { Component } from 'react'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    debugger
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    // 返回的是一个true的值
    return isJpgOrPng && isLt2M;
}
function onPreview (file) {
    debugger
    let src = file.url;
    console.log(file)
    if (!src) {
      src = new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };


export default class PhotoData extends Component {
    state = {
        loading: false,
        imageUrl: ''
    };

    handleChange = info => {
        debugger
        // 得到一个uploading的文件
        console.log(info, info.file)
        // 进入下面的判断条件
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
            debugger
            info.file.status = 'done'
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
        // style={{ marginTop: 8 }}
    };
   
    render() {
        const { loading, imageUrl } = this.state;
        console.log(imageUrl)
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div >Upload</div>
            </div>
        );
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                customRequest={() => false}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                onPreview={onPreview}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{width:'100%',height:'100%' }} /> : uploadButton}
            </Upload>
        )
    }
}
