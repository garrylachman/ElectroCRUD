import { FC } from 'react';

import { BoolElement, BoolElementRO } from './bool-element';
import { ElementType } from './elements';
import { ImageElement, ImageElementRO } from './image-element';
import { StaticTextElement, StaticTextElementRO } from './static-text-element';
import { TextElement, TextElementRO } from './text-element';

export type ElementTypes =
  | TextElementRO
  | BoolElementRO
  | StaticTextElementRO
  | ImageElementRO;

type RenderElementProperties = {
  item: ElementTypes;
  row: Record<string, any>;
};

export const RenderElement: FC<RenderElementProperties> = ({ item, row }) => {
  return (
    <>
      {item.type === ElementType.TEXT && <TextElement item={item} row={row} />}
      {item.type === ElementType.BOOL && <BoolElement item={item} row={row} />}
      {item.type === ElementType.IMAGE && (
        <ImageElement item={item} row={row} />
      )}
      {item.type === ElementType.STATIC_TEXT && (
        <StaticTextElement item={item} />
      )}
    </>
  );
};
