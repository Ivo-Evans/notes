# GCP deployment

I'm really sleepy so I'll keep this short:

- Google provides an overwhelming number of services, but the two we're interested in are Cloud Build and Cloud Run, which build and run docker containers, respectively. 
- Sign in to GCP and go the console. Create a new project (or pick one you already have). It must have billing enabled. Only like ~5 projects can have billing enabled at once. A quick and hacky way I found to see if projects have billing enabled is to click on the Google Functions service - if it tells you you need to enable billings you need to enable billings.
- Pin the services you want (for your own sanity). In the bar on the left, hover over the services you want and pin them. They'll go to the top. 
- Switch over to GitHub. Make sure you have the Google Cloud Build GitHub application installed and enabled for your repo. In your repo settings hit integrations. You should see the Google Cloud Build app there. 
- Back to Google Cloud Projects, click on Google Cloud Build. Enable it if required. Then, inside it's menu, press Triggers. At the top there should be Connect Repository
- Configure triggers. These will cause builds based on changes to your github repo
- Bear in mind builds are not runs
- Go to Cloud Run
- First time you have to click Create Service
  - fully managed
  - service name
  - allow unauthenticated invocations because you are not making a high tek api
  - next
  - select container you just made by pressing select
  - create
  - Cloud Run error: Container failed to start. Failed to start and then listen on the port defined by the PORT environment variable. Logs for this revision might contain more information. 
  - this may as well be green text
  - turns out it wasn't working locally either