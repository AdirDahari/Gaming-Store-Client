import OptionsButtonUsers from "./OptionsButtonUsers";

const RowUserComponent = ({
  _id,
  name,
  email,
  phone,
  country,
  onDeleteUser,
  onIsAdmin,
  isAdmin,
}) => {
  const handleDeleteClick = () => {
    onDeleteUser(_id);
  };

  const handleIsAdminClick = () => {
    onIsAdmin(_id);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{name}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{email}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{phone}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{country}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
        {_id}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <OptionsButtonUsers
          isAdmin={isAdmin}
          onDeleteClick={handleDeleteClick}
          onIsAdminClick={handleIsAdminClick}
        />
      </td>
    </tr>
  );
};

export default RowUserComponent;
