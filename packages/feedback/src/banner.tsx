import {
  Banner as OrininalBanner,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerProps,
  BannerTitle,
} from '@saas-ui/react';
import { FC } from 'react';

export type BannerProperties = {
  bannerProperties?: BannerProps;
  title: string;
  body: string;
};

export const Banner: FC<BannerProperties> = ({
  bannerProperties = {},
  title,
  body,
}) => (
  <OrininalBanner
    status="info"
    mb={5}
    variant="subtle"
    motionPreset="scale"
    borderRadius="lg"
    {...bannerProperties}
  >
    <BannerIcon />
    <BannerContent>
      <BannerTitle fontWeight="bold">{title}</BannerTitle>
      <BannerDescription fontWeight="normal">{body}</BannerDescription>
    </BannerContent>
  </OrininalBanner>
);
