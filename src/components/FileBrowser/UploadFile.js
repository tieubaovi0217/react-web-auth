import { Upload, Button, message, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadFile = ({ path, onSuccess }) => {
  const props = {
    name: 'file',
    multiple: true,
    // showUploadList: false,
    action: `${process.env.REACT_APP_API_URL}/upload`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    data: {
      destination: path,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        onSuccess();
      } else if (info.file.status === 'error') {
        message.error(
          `${info.file.name} file upload failed: ${info.file.response.message}`,
        );
      }
    },
  };

  return (
    <Upload {...props} className="file-browser__upload">
      <Button
        type="text"
        icon={<UploadOutlined style={{ fontSize: '125%' }} />}
      >
        Upload
      </Button>
    </Upload>
  );
};

export default UploadFile;
