workflow "Add an issue reference to a pull request" {
  on = "pull_request"
  resolves = "Add an issue reference"
}

action "Add an issue reference" {
  uses = "kentaro-m/add-an-issue-reference-action@master"
  secrets = ["ACTION_TOKEN"]
  # branch name prefix
  args = "{\"branch\":\"issue\"}"
}
