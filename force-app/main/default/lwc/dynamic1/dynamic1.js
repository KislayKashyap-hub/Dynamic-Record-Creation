import { LightningElement,wire,track } from 'lwc';
import getAllAccount from '@salesforce/apex/DynamicRecordClass.getAllAccount';
 
export default class Dynamic1 extends LightningElement {
    @track allaccount;
    @track accounts=[];
    @track ismodal=false;
    @track showmodal=false;
    @track accid;
    @track acid;
 
    @wire(getAllAccount)
    wiredGetAccounts(result)
    {
      this.allaccount=result;
      if(result.data)
      {
        this.accounts=result.data;
      }
      else if(result.error)
      {
        this.accounts=result.error;
      }
    }
 
    onCreate(event)
    {
      this.ismodal=true;
      this.accid=event.target.dataset.id;
      console.log(this.accid);
    }
 
    closemodal()
    {
      this.ismodal=false;
    }
 
    showContacts(event)
    {
      console.log('clicked..');
      const id=event.target.dataset.id;
      console.log(id);
      if(id)
      {
        this.acid=id;
        this.showmodal=true;
      }
     console.log(this.acid);
     console.log(this.showmodal);
    }
 
    closemodal1()
    {
      this.showmodal=false;
    }
}