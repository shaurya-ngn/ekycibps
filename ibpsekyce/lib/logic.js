/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
*/


/**
 * @param {ibps.ekyc.create_IBPSekyc} create_IBPSekyc
 * @transaction
 */
async function create_IBPSekyc(tx) {
    const assetRegistry = await getAssetRegistry('ibps.ekyc.IBPSekyc');
    var factory = getFactory();
    var ekyc = factory.newResource('ibps.ekyc','IBPSekyc',tx.identificationNumber);
    ekyc.applicantName = tx.applicantName;
    ekyc.typeOfIdentification = tx.typeOfIdentification;
    ekyc.placeOfIssue = tx.placeOfIssue;
    ekyc.issueDate = tx.issueDate;
    ekyc.expirationDate = tx.expirationDate;
    await assetRegistry.add(ekyc);
}

/**
 * @param {ibps.ekyc.update_IBPSekyc} update_IBPSekyc
 * @transaction
 */
async function update_IBPSekyc(tx) {
    const assetRegistry = await getAssetRegistry('ibps.ekyc.IBPSekyc');
    if(tx.typeOfIdentification){
        tx.IBPSekyc.identificationNumber = tx.identificationNumber;
        tx.IBPSekyc.placeOfIssue = tx.placeOfIssue;
        tx.IBPSekyc.issueDate = tx.issueDate;
        tx.IBPSekyc.expirationDate = tx.expirationDate;
        if(tx.applicantName)
        tx.IBPSekyc.applicantName = tx.applicantName;
    }

    if(tx.typeOfIdentification === undefined && tx.applicantName)
    tx.IBPSekyc.applicantName = tx.applicantName;

    if(tx.typeOfIdentification === undefined && tx.identificationNumber)
        tx.IBPSekyc.identificationNumber = tx.identificationNumber;

    if(tx.typeOfIdentification === undefined && tx.placeOfIssue)
        tx.IBPSekyc.placeOfIssue = tx.placeOfIssue;
    
    if(tx.typeOfIdentification === undefined && tx.issueDate)
        tx.IBPSekyc.issueDate = tx.issueDate;
    
    if(tx.typeOfIdentification === undefined && tx.expirationDate)
        tx.IBPSekyc.expirationDate = tx.expirationDate;
    
    await assetRegistry.update(tx.IBPSekyc)
}