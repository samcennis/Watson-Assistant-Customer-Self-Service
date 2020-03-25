# Watson Assistant for Customer Self-Service Sample App

## Infuse AI in Your Solution to Enable Self-Service Support
This repository contains instructions to set up and deploy a sample IBM Solution Partner application that embeds an AI conversational assistant, providing self-service support to clients.

The use case is to accelerate and enhance support for end users. Learn to build an intelligent assistant with Watson Assistant that can ask users for clarity, search for answers in your knowledge base using Watson Discovery, and transfer to a live agent when needed.

This repository includes:
* Sample software solution (ISV) support conversation (Dialog Skill) that can be imported into your Watson Assistant service.
* Sample software solution knowledge base document that can be imported into Watson Discovery and returned as search results using the Watson Assistant Search Skill integration.
* Sample application:
    * Server: Sample Node-RED flow (visual programming tool) to use as a reference for basic API calls needed to integrate Watson Assistant with a solution.
    * Client: Sample client code to use as a UX reference. As a bonus, you can optionally, embed your own Cognos Analytics content (as an iframe) in the page.

Use this sample app to understand the basics of what's needed to augment your application with an engaging AI-infused self-service support experience using Watson Assistant on IBM Cloud.

This webinar walks through demonstrated usage of this application.
[![Alt text](https://img.youtube.com/vi/AKLD_IDBgOg/0.jpg)](https://www.youtube.com/watch?v=AKLD_IDBgOg)

## Register / Login to IBM Cloud
* Create an IBM Cloud account or login to your existing account: https://cloud.ibm.com/login

## Set up Watson Assistant
* Provision a "Lite" plan of the Watson Assistant service: https://cloud.ibm.com/catalog/services/watson-assistant
* To make full use of features (such as digression and intent recommendations), you will need the Plus plan. You can request a 30-day free trial of the Plus plan here: https://watson-assistant.typeform.com/to/yQTfu4
* [Follow instructions](https://cloud.ibm.com/docs/services/assistant-data?topic=assistant-data-skill-dialog-add) to import the sample [Dialog Skill](/import-watson-assistant/acme-dialog-skill.json).

## Set up Watson Discovery
* Provision a "Lite" plan of the Watson Discovery service: https://cloud.ibm.com/catalog/services/discovery
* Follow the instructions in the [Discovery Getting Started tutorial](https://cloud.ibm.com/docs/services/discovery?topic=discovery-getting-started), however instead of uploading the Watson Explorer Getting Started Guide to your Collection, upload the included [Cognos Data Modules Guide](/import-watson-discovery/acme-discovery-doc.pdf).
  * When you go through "Step 4: Annotate your document", the following image is an annotation reference to follow that will provide generally useful results when splitting the document on the "subtitle" field. I recommend submitting as many pages as possible to ensure that the system has learned properly. Under the "Manage Fields", switch off all fields under "Identify fields to index" except for "subtitle", "text", and "title". This will ensure that irrelevant fields are not ingested. ("Copyright IBM Corp. 2015, 2018", which you've annotated as a "footer", would not be a very useful search result).
  ![alt text](doc/images/WatsonDiscovery-DocumentAnnotationReference.png?raw=true)
  ![alt text](doc/images/WatsonDiscovery-ManageFields.png?raw=true)
* Once you've created your Discovery Collection, you can [configure a Search Skill in Watson Assistant](https://cloud.ibm.com/docs/services/assistant?topic=assistant-skill-search-add). The [sample Dialog Skill](import-watson-assistant/acme-dialog-skill.json) will by default direct user questions about Data Modules to a Search Skill in your Assistant. Add you Search Skill to the same Assistant as the sample Dialog Skill.

## Set Up the Sample Application ("ACME Solutions")
Follow these instructions to get the app running in your own IBM Cloud account.
* Clone or download this Github repo to your local machine.
* Provision a Cloudant NoSQL database in your IBM Cloud account. This is used to store the Node-RED flow (JSON) for our app to access. We'll connect to it when running the app locally, then when we push to IBM Cloud our app will be able to access the same flow.
    * Provision Cloudant here: https://cloud.ibm.com/catalog/services/cloudant
        * Call it <YOUR_APP_NAME>-cloudantNoSQLDB (Remember what you choose for <YOUR_APP_NAME>)
        * Make sure to select “Use Legacy and IAM Credentials”
        * Provision the Lite Plan of Cloudant
    * Select "Service Credentials > New Credentials" to create new credentials and copy them into appropriate “credentials” section of the JSON of the vcap-local.json.template file.
* Remove .template from the end of vcap-local.json.template to make it vcap-local.json. This will enable your local dev environment to connect to Cloudant to access and save flows as you work on them.

### Run the Sample Application locally
* With current working directory set as the root of this repo, run:
    * `npm install`
    * `node-red -s bluemix-settings.js`
* You should see the following line, confirming that you’ve successfully connected to the Cloudant database:
    10 Jul 21:59:17 - Using Cloudant service: /^<YOUR_APP_NAME>.cloudantNoSQLDB/ : <YOUR_APP_NAME>
    10 Jul 21:59:19 - [couchstorage] Installing default flow
    10 Jul 21:59:19 - [couchstorage] No default credentials found
* Visit localhost:1880 in your browser
    * Follow the steps in the menu "Welcome to your new Node-RED instance on IBM Cloud"
    * I recommend securing your editor with a username and passcode, (remember this…it’s important), select Next
    * You do not need any of these additional nodes right now, so select Next
    * Select “Finish”
* On the new screen that appears, select “Go to your Node-RED flow editor” then log in with Username and Password you just defined.
* If you aren't already there, visit localhost:1880/red and log in to your editor. You should be at the flow editing page. You can take a look at all the connectors to the left… pretty cool! We can be productive building Node.js apps very quickly using these nodes.
* Select the sandwich menu in the top right to get a drop down menu. Select Import > Clipboard.
* Copy the text contained within the [acme-node-red-flow.json](/import-node-red/acme-node-red-flow.json) file and paste it into the “Paste nodes here” section. Select "new flow". Then click Import. A new tab, "Watson Assistant Sample App" should appear.
* You can delete the "Flow 1" tab if you wish.
* This is the complete app server backend for the application.
* Fill in Watson Assistant credential information for the following nodes:
    * WATSON ASSISTANT CONNECTION INFO: Fill in Watson Assistant apikey, Assistant ID, and Workspace ID (for your Dialog Skill).
    * Both Watson Assistant API Nodes: Fill in the apikey field.
* Click Deploy (upper right) to re-deploy the Node-RED flow.
* The app should now be running locally at localhost:1880.

### Push the Sample Application to run on IBM Cloud
* In [manifest.yml](/manifest.yml)
    * Change "assistant-customer-self-service" to <YOUR_APP_NAME>
* Download the IBM Cloud CLI
    * https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started
* Open a terminal and change your working directory to the root of this project
* Login to IBM Cloud with:
    * `ibmcloud login`
* Target the a Cloud Foundry org and space within your IBM Cloud account.
    * `ibmcloud target --cf`
* Push the app
    * `ibmcloud cf push`
    * This will push the latest local copy of the app to IBM Cloud
* Connect the Cloud Foundry App to you Cloudant database
    * Click on the Cloud Foundry App <YOUR_APP_NAME> on your resources page https://cloud.ibm.com/resources
    * Click "Connections", then "Add Connection", and select the Cloudant database you created earlier.
    * This will restage your application. Wait for the app to be running again.
* Check https://<YOUR_APP_NAME>.mybluemix.net/red to confirm you see the same Node-RED flow as you imported locally. If not, then your app did not successfully conenct to Cloudant.
* The app should now be available at https://<YOUR_APP_NAME>.mybluemix.net

### Optional UI configuration to display
* You can use /public/js/addCognosIFrame.js.template to embed your own Cognos content in an iframe to display in the UI under the "Dashboard tab". Just add the URL to your Cognos Dashboard, and it will display in an iframe. (The URL must be accessible on the public internet.)

### Optional Voice Agent configuration
* You can enable a voice channel for the conversational assistant with the "Voice Agent for Watson" service on IBM Cloud, enabling end users to call a telephone number to communicate with it.
* Follow the [Getting Started instructions](https://cloud.ibm.com/docs/services/voice-agent?topic=voice-agent-getting-started). I recommend following the instructions for creating a SIP trunk with Twilio under Step 2.
