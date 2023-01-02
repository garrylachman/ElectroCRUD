import { useCustomCells } from '@glideapps/glide-data-grid';

import ButtonCellRenderer from './button-cell';
import MenuCellRenderer from './menu-cell';


const cells = [ButtonCellRenderer, MenuCellRenderer];

export function useExtraCells() {
  return useCustomCells(cells);
}

export { cells as allCells };

export { type ButtonCell as ButtonCellType } from './button-cell';
export { type MenuCell as MenuCellType } from './menu-cell';
