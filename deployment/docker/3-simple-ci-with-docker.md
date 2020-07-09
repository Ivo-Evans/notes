# Adding checks

Adding checks for tests in a Docker image is extremely easy. If any of the commands run during the image build (i.e. following RUN) exit with a non-zero code, the build fails. So you can just put this line in and the build will fail for failing tests:

```
RUN CI=true npm test
```
