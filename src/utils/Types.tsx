export interface Field {
  //Login Input Fields Type Interface
  type: string;
  placeholder: string;
  value?: string;
  Name: string;
  icon?: React.ReactNode;
}

export interface FormData {
  // Login Input Values Type
  username: string;
  password: string;
  [key: string]: string | undefined;
  captchaToken: string;
  captcha: string;
}

export interface DecodeToken {
  role: any;
}

export interface TopCardItem {
  Text?: string;
  counts?: string;
  percentage?: string;
  arrow?: JSX.Element;
}

interface GlobleState {
  showNotification: boolean;
}

export interface RootState {
  globlestate: GlobleState;
}

// Interface for the individual row data
interface RowDataType {
  userName: string;
  Status: string;
  Credits: string;
  TotalBets: string;
  TotalRecharge: string;
  TotalReddem: string;
  Action: React.ReactNode;
}

// Interface for the overall table data structure
interface TableDataType {
  Thead: string[];
  Tbody: RowDataType[];
}

// Props interface for the Table component
export interface TableProps {
  fieldsHeadings: string[];
  fieldData: string[];
  Page?: string; 
  data: string[];
}

export interface TransactionProps{
  data:any
}
export interface RecentBetsProps{
  data:any
}

export interface TabProps {
  tabs: string[];
  initialTab?: string;
}

export type AddFormData = {
  username: string;
  password: string;
  role: string;
};

export type EditFormData = {
  id:any;
  password: string;
  status: string;
 
};

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  Type?: String;
  data?: any;
  Page?:string;
  Tabs?: string[];
}
export interface DeleteUserProps {
  deleteToken: () => void;
}

export interface TableThreeDotsProps {
  data: any; 
}

export interface TableUserNameProps {
  username: string;
  index: number;
  Id: Number;
  Page?: string;
}

export interface ReportsData {
  globlestate: {
    Agent: {
      username: string;
      Id: Number;  
    }  
  }
}

export interface ReportModal {
  openModal: boolean;
}

export interface loader{
  show:Boolean
 }
 