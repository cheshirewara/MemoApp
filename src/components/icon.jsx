import React from 'react';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useFonts } from '@use-expo/font';
import { number, oneOf, string } from 'prop-types';

import icomoon from '../../assets/fonts/icomoon.ttf';
import selection from '../../assets/fonts/selection.json';

export default function Icon(props) {
  const { name, size, color } = props;
  const CustomIcon = createIconSetFromIcoMoon(selection);

  const [fontLoaded] = useFonts({ icomoon });
  if (!fontLoaded) {
    return null;
  }

  return <CustomIcon name={name} size={size} color={color} style={{ lineHeight: size - 1 }} />;
}

Icon.propTypes = {
  name: oneOf(['plus', 'delete', 'pencil', 'check']).isRequired,
  size: number,
  color: string,
};

Icon.defaultProps = {
  size: 12,
  color: '#000000',

};
