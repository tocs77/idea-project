import { createElement } from 'react';
import { IconBaseProps } from 'react-icons';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
const icons = {
  likeEmpty: AiOutlineHeart,
  likeFilled: AiFillHeart,
};

interface IconProps extends IconBaseProps {
  name: keyof typeof icons;
}

export const Icon = (props: IconProps) => {
  const { name, ...rest } = props;
  return createElement(icons[name], rest);
};
