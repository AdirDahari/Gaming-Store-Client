import { useNavigate } from "react-router-dom";
import ROUTES from "../../../router/ROUTES";

const CategoryComponent = ({ children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.SHOP, { state: children });
  };

  return (
    <div className="max-w-[305px] max-h-[305px] mx-auto flex items-center justify-center">
      <div className="image-container w-full h-[200px] flex items-center justify-center">
        <img
          className="imageSmallScale block mx-auto cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 max-h-full max-w-full object-contain"
          onClick={handleClick}
          src={children.image}
          alt={children.alt}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default CategoryComponent;
