# CIS470 Activity 10

## Activity Requirements

Build, test, and deploy an AWS Lambda function that can classify triangles.

- Make the needed workflow directory for your project
- Make the YAML file for your project (refer to the steps below)
- Your YAML should contain the Build, Test, and Deploy jobs
- Make the build job
- Make the test job
- Make the deploy job

For the Yaml file, refer to the steps below.

You can refer to the steps from Activity 9 to build and deploy an AWS Lambda function that can classify triangles.

**Notes**<br> 
- You will need to add the secret keys for your AWS account in the github. 
- You will need to make the .github/workflows directory for your project.
- You will need to make the .github/workflows directory for your project.

### Deliverable
- Link to your GitHub repository
- Link to your AWS Lambda function
- Screenshot of your Actions workflow Diagram (The three jobs should be in the order build, test, deploy).


## Workflows Test Deployment

Below are the descriptions on the Jobs and the Steps in the YAML file for .github/workflows.

Refer to Activity 9 for the steps. Make a workflow file, use the steps below in the workflow files. The YAML file should run the workflow, and deploy the code to Lambda.

This line is just the name of the workflow.
```yaml
name: Deploy Lambda
```


### Action on push
This line indicates that the action should be run on push to the main branch. This line can also include other conditions, such run on each pull request.

```
on:
  push:
    branches: [ main ]
```
### Jobs
This line contains the jobs that will be run. Each job has a name and a set of steps.

```
jobs:
```

#### Build

This line contains the build steps. It is a job that runs on the ubuntu-latest platform. The steps are as follows:

```yaml
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install Node.js
        uses: actions/setup-node@v4
        with: 
          node-version: '20'

      - name: Install dependencies
        run: npm install
```

#### Test

Now the build is completed, the next step is the test step.
the ```needs``` keyword indicates that the test step depends on the build step.

The test step will be run on the ubuntu-latest platform, and install jest and run the tests. The steps are as follows:

```yaml
test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run tests
        run: |
          npm install jest
          ./node_modules/.bin/jest --coverage
```



#### Deploy

After the build and test steps are complete, the deploy job will be run.
The ```needs``` keyword indicates that the deploy job depends on the test job. If the tests do not pass, the deploy job will not run.


```yaml
  deploy:
    needs: test
    runs-on: ubuntu-latest
```

The first step in the deploy job is the checkout step (<a href="https://github.com/actions/checkout">Checkout</a>). This step checks out the code from the repository. 

```yaml
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
```

Similar to the Build and Test job, the next step is the install Node.js step. This step installs the Node.js version 20.

```yaml
      - name: Install Node.js
        uses: actions/setup-node@v4
        with: 
          node-version: '20'
```

As our application is a Node.js application, the next step is the install dependencies. This step installs the dependencies for the project.

```yaml

      - name: Install dependencies
        run: npm install
```
In order to deploy to Lambda, we need to zip the deployment package. This step uses the zip command to zip the deployment package.

```yaml
      - name: Zip files
        run: zip -r deployment-package.zip ./*
```
Now that we have the artifact to deploy, we need to deploy it to Lambda. This step uses the update-function-code command from the AWS CLI to deploy the artifact to Lambda.

```yaml
      - name: Deploy to Lambda
        run: |
          aws lambda update-function-code --function-name CIS470-Activity-8 --zip-file fileb://deployment-package.zip
```
the environment variables for AWS credentials are set in the deploy job.

```yaml
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: 'us-east-1'
```
