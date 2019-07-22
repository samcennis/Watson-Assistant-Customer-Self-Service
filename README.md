# Watson Assistant for Customer Self-Service Sample App

## Infuse AI in Your Solution to Enable Self-Service Support
This repository contains instructions to set up and deploy a sample IBM Solution Partner application that embeds an AI conversational assistant, providing self-service support to the Solution Partner's clients.

The use case is to accelerate and enhance support for end users. Learn to build an intelligent assistant that can ask users for clarity, search for answers in your knowledge base, and transfer to a live agent when needed. Reach your users wherever they need support — in your solution, on the phone, in messaging channels, or in customer service tools.

See how Watson Assistant makes building a conversational assistant productive with tools like a visual dialog editor and intelligent training recommendations based on your support center’s historical chat and call logs. This means you can start building conversational AI fast! Import the existing Dialog Skill to see an example ISV support conversation.

Expand the scope of self-service support even further by intelligently routing your user’s queries to the Watson Discovery insight engine, returning answers from your solution’s support documentation. You’ll see how Watson can understand the structure of your documents, enrich the text with natural language processing (NLP), and surface relevant answers to your end users.

This repository includes:
* Sample software solution support conversation (Dialog Skill) that can be imported into your Watson Assistant service.
* Sample software solution knowledge base document that can be imported into Watson Discovery and returned as search results.
* Sample Node-RED flow (visual programming tool) to use as a reference for basic API calls needed to integrate Watson Assistant with your solution.
* Sample client code to use as a UX reference (Bonus: Optionally, embed your own Cognos Analytics content in the app!)

Use this sample app to understand the basics of what's needed to augment your application with an engaging AI-infused self-service support experience using Watson Assistant on IBM Cloud.

## Register / Login to IBM Cloud
* Login/Register for IBM Cloud account

## Set up Watson Assistant
TODO: Instructions to provision Watson Assistant and import the Assistant Dialog Skill. (/import-watson-assistant) 

## Set up Watson Discovery
TODO: Instructions to set up Watson Discovery, ingest Document, SDU. Go back to Assistant and configure Search Skill. (/import-watson-discovery)

## Set Up the Node-RED App
Follow these instructions to get the app running in your own IBM Cloud account.
* Provision a Cloudant NoSQL database in your IBM Cloud account. This is used to store the Node-RED flows. We'll use it when developing locally as well.
    * Provision here: https://cloud.ibm.com/catalog/services/cloudant
        * Call it <YOUR_APP_NAME>-cloudantNoSQLDB (Remember this name!! It will make connection easier...)
        * Make sure to select “Use Legacy and IAM Credentials”
        * Provision the Lite Plan
    * Get Service Credentials > New Credentials to create new credentials and copy them into appropriate “credentials” section of the JSON of vcap-local.json.template
    * Remove .template from the end of this file so it is just vcap-local.json. This will enable your local dev environment to connect to Cloudant to access and save flows as you work on them.
* Clone or download this Github repo to your local machine.

### Run the app locally and import Node-RED flow (server-side logic)
* `npm install`
* `node-red -s bluemix-settings.js`
* You should see the following line, confirming that you’ve successfully connected to the database:
    ```10 Jul 21:59:17 - Using Cloudant service: /^<YOUR_APP_NAME>.cloudantNoSQLDB/ : <YOUR_APP_NAME>
    10 Jul 21:59:19 - [couchstorage] Installing default flow
    10 Jul 21:59:19 - [couchstorage] No default credentials found```
* Visit `localhost:1880` in your browser
    * TODO: Steps to set up Node-RED editor
* Important: Fill in WA credentials in the Node-RED flow.
* App should now be running.
    
### Push the app to IBM Cloud
* Download the IBM Cloud CLI
    * https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started
* Open terminal and change your working directory to the project
* Login to IBM Cloud with:
    * `ibmcloud login`
* Target the correct Cloud Foundry space with (defaults should be fine)
    * `ibmcloud target --cf`
* Push the app
    1. `ibmcloud cf push`
    2. This will push the latest local copy of the app to IBM Cloud
    3. The app should now be available at https://<YOUR_APP_NAME>.mybluemix.net
* Configure "Connection" to the Cloudant database(?) Restage needed?
 
### Optional configurations
 * Use /public/js/addCognosIFrame.js.template to embed your own Cognos content in an iframe.

### Demo Flow
* Walk-through demo flow.
