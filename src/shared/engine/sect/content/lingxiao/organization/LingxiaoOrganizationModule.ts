import {
  StandardSectOrganizationModule,
  type SectOrganizationTheme,
} from '../../../core';


export const LINGXIAO_ORGANIZATION_THEME: SectOrganizationTheme = {
  elderTrial: {
    name: '听剑老人·试炼化身',
    description: '执一柄旧剑立于场中，只问弟子的剑为何而出。',
  },
};

export class LingxiaoOrganizationModule extends StandardSectOrganizationModule {
  constructor() {
    super(LINGXIAO_ORGANIZATION_THEME);
  }
}

export const LINGXIAO_ORGANIZATION = new LingxiaoOrganizationModule();
