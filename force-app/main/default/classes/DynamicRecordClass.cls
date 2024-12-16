public with sharing class DynamicRecordClass {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccount() {
        try {
            return [SELECT Id, Name, Active__c, Industry FROM Account];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void createContact(Contact newContact) {
        try {
            insert newContact;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getAllContacts(ID acid) {
        try {
            return [SELECT Id, Name, Email FROM Contact WHERE AccountId = :acid];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void deleteContacts(List<ID> contactIds) {
        try {
            delete [SELECT Id FROM Contact WHERE Id IN :contactIds];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
