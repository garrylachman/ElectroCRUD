import { getBoolElementToolbox } from '../elements/bool-element';
import { ElementType } from '../elements/elements';
import { getImageElementToolbox } from '../elements/image-element';
import { getStaticTextElementToolbox } from '../elements/static-text-element';
import { getTextElementToolbox } from '../elements/text-element';

export const ToolboxConfig = {
  [ElementType.TEXT]: getTextElementToolbox(),
  [ElementType.BOOL]: getBoolElementToolbox(),
  [ElementType.STATIC_TEXT]: getStaticTextElementToolbox(),
  [ElementType.IMAGE]: getImageElementToolbox(),
};
