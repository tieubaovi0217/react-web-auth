import { Tree } from 'antd';

const { DirectoryTree } = Tree;

const TreeView = ({
  treeData,
  selectedKeys,
  expandedKeys,
  onSelect,
  onExpand,
  onSelectDrive,
}) => {
  const handleExpand = (expandedKeysValue) => {
    onExpand(expandedKeysValue);
  };

  const handleSelect = (selectedKeysValue, info) => {
    if (selectedKeysValue[0] === 'google:drive') {
      onSelectDrive();
    } else if (info.node.type === 'directory') {
      onSelect(selectedKeysValue[0]);
    }
  };

  return (
    <DirectoryTree
      expandAction="doubleClick"
      className="directory-tree"
      treeData={treeData}
      selectedKeys={selectedKeys}
      expandedKeys={expandedKeys}
      onSelect={handleSelect}
      onExpand={handleExpand}
      style={{ maxHeight: '510px' }}
    />
  );
};

export default TreeView;
