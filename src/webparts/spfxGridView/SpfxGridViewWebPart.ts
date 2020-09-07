import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxGridViewWebPartStrings';
import SpfxGridView from './components/SpfxGridView';
import { ISpfxGridViewProps } from './components/ISpfxGridViewProps';
import pnp from "sp-pnp-js";
export interface ISpfxGridViewWebPartProps {
  description: string;
}

export default class SpfxGridViewWebPart extends BaseClientSideWebPart<ISpfxGridViewWebPartProps> {
   public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      console.log("*****Inside onInit method*******************");
      // other init code may be present     
      pnp.setup({
        spfxContext: this.context
      });
      pnp.sp.web.get().then(w => {
        console.log("Current Web URL = " + w.Url);
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ISpfxGridViewProps> = React.createElement(
      SpfxGridView,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
