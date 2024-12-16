# ✨ Dynamic Record Creation ✨

Welcome to the **Dynamic Record Creation** project! This project demonstrates the creation, management, and visualization of Salesforce records using Lightning Web Components (LWC) and Apex.

---

## 📚 Project Overview
This project focuses on dynamically managing **Accounts** and their related **Contacts**. It provides an interactive UI for CRUD (Create, Read, Update, Delete) operations and a seamless user experience through modals and data tables.

### 🔧 Features:
- ➕ **Create** Accounts and Contacts dynamically.
- 🔀 **View** and manage related Contacts per Account.
- ✅ **Update** existing records through modals.
- ❌ **Delete** multiple Contacts efficiently.

---

## 🔨 Technology Stack
- **Salesforce Lightning Web Components (LWC)** for the frontend.
- **Apex** for server-side logic.
- **HTML & CSS** for styling and responsive UI.

---

## 🖋️ Components Overview

### 1. **Dynamic1**
- Displays a list of **Accounts**.
- Enables opening modals for creating Contacts and viewing related Contacts.

### 2. **ContactManagementModal**
- Modal component for creating a new Contact.
- Features dynamic binding and validation.

### 3. **ViewDeletion**
- Displays Contacts related to a selected Account.
- Allows bulk deletion of Contacts.

---

## 🔧 Setup Instructions

### Prerequisites:
1. Salesforce Developer Org.
2. Salesforce CLI.
3. Git installed on your system.

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/Dynamic-Record-Creation.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Dynamic-Record-Creation
   ```

3. Deploy the source code to your org:
   ```bash
   sfdx force:source:deploy -p force-app/main/default
   ```

4. Assign the appropriate permission set to your user.

5. Open your Salesforce org and test the application.

---

## 🎨 User Interface Highlights

### Account Data Table
- Displays all Accounts in a neatly styled table.
- 📄 Includes action buttons for each Account.

### Contact Management Modal
- 🏢 Fully responsive modal for Contact creation.
- 🔒 Input validation ensures data integrity.

### Related Contacts View
- Displays all Contacts associated with a selected Account.
- 🔄 Bulk actions available for managing records.

---

## 🔧 Code Snippets

### Apex Controller
```apex
@AuraEnabled(cacheable=true)
public static List<Account> getAllAccount() {
    return [SELECT Id, Name, Industry FROM Account];
}
```

### JavaScript (Dynamic1.js)
```javascript
@wire(getAllAccount)
wiredGetAccounts({ data, error }) {
    if (data) {
        this.accounts = data;
    } else if (error) {
        console.error(error);
    }
}
```

---

## 🔧 Customization
### Adding Emojis and Styles
- Use emojis in the UI to make it more interactive. Example: Add 🔄 for refresh buttons.
- Style components using CSS:
```css
.slds-modal {
    background-color: #f4f6f9;
    border-radius: 8px;
}
```

---

## 🔧 Future Enhancements
- Add pagination for large data sets.
- Implement sorting and filtering options in tables.
- Introduce advanced validations for Contact creation.

---

## 🚀 Get Involved
- Found a bug? Report it via Issues.
- Want to contribute? Fork the repo and create a pull request.

---

## ❤️ Acknowledgments
Special thanks to the Salesforce community and Trailhead for providing resources to build this project.

