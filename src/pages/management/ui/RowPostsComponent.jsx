import OptionsButtonPosts from "./OptionsButtonPosts";

const RowPostsComponent = ({
  _id,
  name,
  platform,
  price,
  userId,
  onDeleteCard,
  onShowPostClick,
  onEditPost,
}) => {
  const handleDeleteClick = () => {
    onDeleteCard(_id);
  };

  const handleShowPostClick = () => {
    onShowPostClick(_id);
  };

  const handleEditPostClick = () => {
    onEditPost(_id);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{name}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{platform}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">₪{price}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
        {userId}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <OptionsButtonPosts
          onShowPostClick={handleShowPostClick}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditPostClick}
        />
      </td>
    </tr>
  );
};

export default RowPostsComponent;
