# SIH 2025

_Project under construction..._

**roles:**

- @yashika: ai
- @saksham: frontend
- @animesh: database
- @shubham: backend

## tech stack:

- mostly python
- rasa for context recognition
- frontend in react.js

# local testing

- remember to run each python project in their dedicated venv
- tensorflow is a requirement here, so that is the one that will be taking the max amount of time to begin with.

## Stupid error -\_-

- the requirements.txt is in alphabetical order doing `pip install -r requirements`, does exactly that and if there is some dependency issue, as in `pywin32`, `tensorflow-intel`, `tensorflow-io-gcs-filesystem (conflicted with rasa filesystem stuff ... on the main dev pc maybe rasa was installed after tensorflow and hence both dependencies were listed in the requirements.txt)` the installation will be bricked.
  SOLUTION: delete that package from the requirements.txt
