import React from 'react';
import {SvgFromXml} from 'react-native-svg';
import {colors} from '../constants/colors';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  svgFile: string;
}

const SvgComponent = (props: Props) => {
  const {color, width, height, svgFile} = props;

  const icon = (
    <SvgFromXml
      xml={svgFile
        .replace(/color/g, color ? color : colors.dark)
        .replace(/imageWidth/g, width ? `"${width}"` : '24')
        .replace(/imageHeight/g, height ? `"${height}"` : '24')}
    />
  );

  return icon;
};

export default SvgComponent;
