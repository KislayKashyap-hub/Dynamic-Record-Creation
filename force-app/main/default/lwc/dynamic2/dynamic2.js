import { LightningElement,api,track } from 'lwc';
import createContact from '@salesforce/apex/DynamicRecordClass.createContact';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
 
export default class Dynamic2 extends LightningElement
{
  @api ismodal;
  @api accid;
  @track newContact={};
  @track uploadfiles=[];
 
 
  closemodal()
  {
    this.uploadfiles=[]
    this.newContact={};
    const event=new CustomEvent('closemodal');
    this.dispatchEvent(event);
  }
 
  inputvalue(event)
  {
    const field=event.target.dataset.field;
    const value=event.target.value;
    this.newContact={...this.newContact,[field]:value,AccountId:this.accid};
    console.log(JSON.stringify(this.newContact));
  }
 
  handleUploadFinished(event)
  {
    this.uploadfiles=event.detail.files;
    console.log('No of files uploaded..',this.uploadfiles.length);
  }
 
  creation()
  {
    console.log(this.uploadfiles.length);
    if(!this.newContact.FirstName || !this.newContact.LastName || !this.newContact.Phone || !this.newContact.Email ||(this.uploadfiles.length===0))
    {
      this.showToast('Warning','All Fields are Mandatory','warning');
      return;
    }
    createContact({newContact:this.newContact})
    .then((data)=>
    {
       console.log('Created Successfully....');
       this.closemodal();
       this.showToast('Success','Contact created successfully....','success');
    })
    .catch((error)=>
    {
       console.log('Some error while creating contact...');
       this.showToast('Error','Error while creating Contact','error');
    });
  }
 
 
 
  showToast(title,message,variant)
  {
    const event=new ShowToastEvent({
      title:title,
      message:message,
      variant:variant
    });
    this.dispatchEvent(event);
  }
}