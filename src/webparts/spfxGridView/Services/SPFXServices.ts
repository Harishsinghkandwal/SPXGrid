import pnp from "sp-pnp-js";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import{StudentTable} from "../components/Model/StudemtTable"

export interface ISPFXServices {
    getStudentListData( listName: string): Promise<any[]>;
 
}
export class SPFXServices implements ISPFXServices{

    public constructor(webPartContext: IWebPartContext) {}

    public async getStudentListData(listName): Promise<any[]> {
        console.log("called to getStudentListData =" + listName );
        const columns =
          "Id,Title,RollNo,Subjects,Author/ID,Author/Title";
          console.log("columns=" + columns);
        return pnp.sp.web.lists
          .getByTitle(listName)
          .items.orderBy("Modified", false).select(columns).expand("Author")
          .get()
          .then((items: any[]) => {
            console.log("items=" + items);
            return items;
          });
      }
}