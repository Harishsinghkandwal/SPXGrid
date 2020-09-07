import * as React from 'react';
import styles from './SpfxGridView.module.scss';
import { override } from "@microsoft/decorators";
import { ISpfxGridViewProps } from './ISpfxGridViewProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISPFXServices, SPFXServices } from "../Services/SPFXServices"
import{StudentTable} from "../components/Model/StudemtTable"
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
  IDetailsFooterProps,
  DetailsRow,
  IDetailsRowCheckProps,
  DetailsRowCheck
} from "office-ui-fabric-react/lib/DetailsList";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";


export interface ISpfxGridView { 
  isLoading:boolean;
  columns: IColumn[];
 // items: StudentTable[];
   
}
export default class SpfxGridView extends React.Component<ISpfxGridViewProps, ISpfxGridView> {

  private _SPFXServices: ISPFXServices;
  private _StudentTable = new Array<StudentTable>();
  constructor(props) {
    super(props);

    const _columns: IColumn[] = this.bindColumns();
   
    this.state={
      isLoading:true,
      columns:_columns
     
    }
    this._SPFXServices = new SPFXServices(this.context);
  
  }

  @override
  public async componentDidMount(): Promise<void> {
    try {

      const StudentTabledata = await this._SPFXServices.getStudentListData("StudentTable");
       let data = new Array<StudentTable>();
      //let objStudentTable= new StudentTable();
      for (let k = 0; k < StudentTabledata.length; k++) {
        let objStudentTable = new StudentTable();
        objStudentTable.ID=StudentTabledata[k].Id;
        objStudentTable.Title=StudentTabledata[k].Title;
        objStudentTable.RollNo=StudentTabledata[k].RollNo;
        objStudentTable.Subjects=StudentTabledata[k].Subjects;
        data.push(objStudentTable)
      }
      
    this._StudentTable=data
    console.log("this._StudentTable2"+ JSON.stringify(this._StudentTable))
    this.setState({ isLoading: false });
    } catch (error) {
      console.log("error message =" + error);
    }
  }
  public render(): React.ReactElement<ISpfxGridViewProps> {
    const _data=this._StudentTable;
    console.log("_data"+ JSON.stringify(_data))
    const { columns } = this.state;
    return (
      // <div className={styles.spfxGridView}>
      //   <div className={styles.container}>
      //     <div className={styles.row}>
      //       <div className={styles.column}>
      //         <span className={styles.title}>Welcome to SharePoint!</span>
      //         <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
      //         <p className={styles.description}>{escape(this.props.description)}</p>
      //         <a href="https://aka.ms/spfx" className={styles.button}>
      //           <span className={styles.label}>Learn more</span>
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      this.state.isLoading ?  <Spinner />:
      <DetailsList
           items={_data}
            compact={true}
            columns={columns}
           // onRenderItemColumn={this._renderItemColumn}
            // selectionMode={
            //   this.props.userinfo.Role === "GMA"
            //     ? SelectionMode.single
            //     : SelectionMode.none
            // }
            //className={styles.Custheader}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            //selection={this._selection}
          />
    );
  }

  private bindColumns() {
    let columns = Array<IColumn>();
    columns = [
      {
        key: "column1",
        //headerClassName: styles.col,
        name: "ID",
        fieldName: "ID",
        minWidth: 80,
        maxWidth: 80,
        isMultiline: false,
       //onColumnClick: this._onColumnClick,
        data: "number",
        onRender: (item: StudentTable) => {
          return <span>{item.ID}</span>;
        },
        isPadded: true
      },
      {
        key: "column2",
       // headerClassName: styles.col,
        name: "Title",
        fieldName: "Title",
        minWidth: 90,
        maxWidth: 90,
        isMultiline: false,
        //onColumnClick: this._onColumnClick,
        isResizable: true,
        data: "string",
        isPadded: true
      },
      {
        key: "column3",
       // headerClassName: styles.col,
        name: "RollNo",
        fieldName: "RollNo",
        minWidth: 110,
        maxWidth: 110,
        isMultiline: false,
      //  onColumnClick: this._onColumnClick,
        isResizable: true,
        data: "string",
        isPadded: true
      },
      {
        key: "column4",
      //  headerClassName: styles.col,
        name: "Subjects",
        fieldName: "Subjects",
       // onColumnClick: this._onColumnClick,
        minWidth: 70,
        maxWidth: 70,
        data: "string",
        isPadded: true
      }
    ]
    return columns;
  }
}
