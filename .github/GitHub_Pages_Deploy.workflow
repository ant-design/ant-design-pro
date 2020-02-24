action "Deploy to GitHub Pages" {
  uses = "maxheld83/ghpages@v0.2.1"
  env = {
    BUILD_DIR = "dist/"
  }
  secrets = ["ACTION_TOKEN"]
}
