# go-puppetboard

An adaptation of [PuppetBoard](https://github.com/nedap/puppetboard) rewritten in Golang and an AngularJS frontend.


## Installation

Run `go get github.com/akira/go-puppetdb`

Then run: `PUPPETDB=<puppetdb_url> go run api.go`

PUPPETDB environment variable will determine the location of PuppetDB to communicate with.

It will default to port 3000 (unless a PORT env variable is present).

## Disclaimer

Work in progress - parts of the UI are still incomplete.



