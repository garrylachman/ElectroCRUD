import { BannerProps } from '@saas-ui/react';
import { FC } from 'react';

type BannerProperties = {
    bannerProperties?: BannerProps;
    title: string;
    body: string;
};
declare const Banner: FC<BannerProperties>;

export { Banner, BannerProperties };
