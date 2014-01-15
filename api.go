package main

import (
	"encoding/json"
	"github.com/akira/go-puppetdb"
	"github.com/codegangsta/martini"
	"net/http"
	"os"
)

func renderJsonResponse(jsonStruct interface{}) (int, string) {
	jsonBytes, _ := json.Marshal(jsonStruct)
	return http.StatusOK, string(jsonBytes[:])
}

type SystemStatJson struct {
	AverageResourcePerNode float64 `json:"average_resource_per_node"`
	NumResources           float64 `json:"num_resources"`
	UnreportedNodes        float64 `json:"unreported_nodes"`
	FailedNodes            float64 `json:"failed_nodes"`
	ChangedNodes           float64 `json:"changed_nodes"`
	NumNodes               float64 `json:"num_nodes"`
}

func main() {
	m := martini.Classic()
	puppetDbServer := os.Getenv("PUPPETDB")
	client := puppetdb.NewClient(puppetDbServer)
	m.Get("/api/nodes", func() (int, string) {
		resp, _ := client.Nodes()
		return renderJsonResponse(resp)
	})
	m.Get("/api/stats", func() (int, string) {
		resp := SystemStatJson{}
		return renderJsonResponse(resp)
	})
	m.Get("/api/nodes/:node/facts", func(params martini.Params) (int, string) {
		resp, _ := client.NodeFacts(params["node"])
		return renderJsonResponse(resp)
	})
	m.Get("/api/node_summaries", func(params martini.Params) (int, string) {
		query, _ := puppetdb.QueryToJson([]string{"=", "latest-report?", "true"})
		resp, _ := client.EventCounts(query, "certname", nil)
		return renderJsonResponse(resp)
	})
	m.Get("/api/nodes/:node/reports", func(params martini.Params) (int, string) {
		query, _ := puppetdb.QueryToJson([]string{"=", "certname", params["node"]})
		extraParams := map[string]string{"limit": "10"}
		resp, _ := client.Reports(query, extraParams)
		return renderJsonResponse(resp)
	})
	m.Get("/api/reports/:report", func(params martini.Params) (int, string) {
		query, _ := puppetdb.QueryToJson([]string{"=", "report", params["report"]})
		resp, _ := client.Events(query, nil)
		return renderJsonResponse(resp)
	})
	m.Get("/api/reports/latest/:node", func(params martini.Params) (int, string) {
		query, _ := puppetdb.QueryToJson([]string{"=", "certname", params["node"]})
		extraParams := map[string]string{"limit": "1"}
		resp, err := client.Reports(query, extraParams)
		if err != nil {
			return http.StatusBadRequest, "{}"
		}
		if resp[0].Hash != "" {
			reportQuery, _ := puppetdb.QueryToJson([]string{"=", "report", resp[0].Hash})
			reports, _ := client.Events(reportQuery, nil)
			return renderJsonResponse(reports)
		}
		return http.StatusOK, "[]"
	})

	m.Run()
}
