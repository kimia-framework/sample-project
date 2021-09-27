import { ViewDefinition } from "../../core/server/interfaces";
import { site } from './site';


export type AppView = 'site';

export const AppViews: ViewDefinition<AppView>[] = [
   {
      name: 'site',
      class: site,
   },
];