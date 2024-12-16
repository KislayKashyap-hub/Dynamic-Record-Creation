import { LightningElement,api,wire,track } from 'lwc';
import getAllContacts from '@salesforce/apex/DynamicRecordClass.getAllContacts';
import deleteContacts from '@salesforce/apex/DynamicRecordClass.deleteContacts';
import { refreshApex } from '@salesforce/apex';
export default class Dynamic3 extends LightningElement {
    @api acid;
    @api showmodal;
    @track wiredalldata;
    @track allcontacts={};
    @track selectedContacts=new Set();
    @track showDelBtn=false;
    @track contactArray=[];
    @track curConId;
   
    closemodal1()
    {
        this.showmodal=false;
        const event=new CustomEvent('closemodal1');
        this.dispatchEvent(event);
    }
 
    navigate(event)
    {
       this.curConId=event.target.dataset.id;
       console.log(this.curConId);
    }
 
    @wire(getAllContacts,{acid:'$acid'})
    wiredGetContacts(result)
    {
      console.log('ID From Parent : '+this.acid);
      console.log('value is :',this.showmodal);
      this.wiredalldata=result;  
      if(result.data)
      {
        this.allcontacts=result.data;
      }
      else if(result.error)
      {
        this.allcontacts=result.error;
      }
    }
 
    handlerowselection(event)
    {
      console.log('check box selected..');
      const id=event.target.value;
      const ischecked=event.target.checked;
      if(ischecked)
      {
        this.selectedContacts.add(id);
      }
      else if(!ischecked)
      {
        this.selectedContacts.delete(id);
      }
     console.log(this.selectedContacts);
     this.showDelBtn=this.selectedContacts.size>0;
    }
 
    handleSelectAll(event)
    {
       const selectAll=event.target.checked;
       const checkboxes=this.template.querySelectorAll('lightning-input[data-id]');
       if(selectAll)
       {
        this.showDelBtn=true;
        checkboxes.forEach((c)=>
        {
           c.checked=true;
           const id=c.dataset.id;
           this.selectedContacts.add(id);
        });
       }
       else
       {
         this.selectedContacts.clear();
         checkboxes.forEach((c)=>
          {
             c.checked=false;
          });
         this.showDelBtn=false;
       }
       console.log(this.selectedContacts);
       
    }
 
    deleteCon()
    {
      this.contactArray=Array.from(this.selectedContacts);
      console.log(JSON.stringify(this.contactArray));
      deleteContacts({contactIds:this.contactArray})
      .then(()=>{
        console.log('Deleted Successfully....');
        this.showDelBtn=false;
        refreshApex(this.wiredalldata);
      })
      .catch((error)=>
      {
        console.log('Error while deleting the contacts',error);
      });
    }
 
   
}