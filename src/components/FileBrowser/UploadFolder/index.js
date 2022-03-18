import { useState } from 'react';
import { Input, Button, message, Modal } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import {
  createNewFolderAsync,
  fetchFileBrowserDataAsync,
} from '../../../actions/fileBrowser';

const UploadFolder = ({ path }) => {
  const dispatch = useDispatch();

  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const newFolderFormClickHandler = () => {
    setShowNewFolderForm(true);
  };

  const handleFormCancel = () => {
    setShowNewFolderForm(false);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(createNewFolderAsync(path, newFolderName))
      .then(() => {
        return dispatch(fetchFileBrowserDataAsync(path));
      })
      .then(() => {
        message.success(`Create new folder successfully`, 0.5);
      })
      .catch((err) => {
        console.log('here', err);
        message.error(err.message, 0.5);
      })
      .finally(() => {
        setConfirmLoading(false);
        setShowNewFolderForm(false);
        setNewFolderName('');
      });
  };

  return (
    <div>
      <Button
        type="text"
        icon={<FolderAddOutlined style={{ fontSize: '125%' }} />}
        onClick={newFolderFormClickHandler}
      >
        New folder
      </Button>
      <Modal
        title="Create a new folder"
        visible={showNewFolderForm}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleFormCancel}
      >
        <p>
          <Input
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </p>
      </Modal>
    </div>
  );
};

export default UploadFolder;
