// Copyright 2016 Google Inc. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

// [START pubsub_quickstart]
// Sample pubsub-quickstart creates a Google Cloud Pub/Sub topic.
package main

import (
	"fmt"
	"log"
	"encoding/json"
	"time"
	"flag"

	// Imports the Google Cloud Pub/Sub client package.
	"cloud.google.com/go/pubsub"
	"golang.org/x/net/context"
)

var (
	project string
)

func main() {
	flag.StringVar(&project, "project", "", "project name")
	flag.Parse()

	ctx := context.Background()

	// Sets your Google Cloud Platform project ID.

	// Creates a client.
	client, err := pubsub.NewClient(ctx, project)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	// Sets the name for the new topic.
	topic := "hoge"

	// Creates the new topic.
	//topic, err := client.CreateTopic(ctx, topicName)
//	if err != nil {
//		log.Fatalf("Failed to create topic: %v", err)
//	}

	//	fmt.Printf("Topic %v created.\n", topic)




	list := make([]string, 1)
	for idx, _ := range list {
		pubs := struct{
			Name string `json:"name"`
		}{
			Name: fmt.Sprintf("%d回目のPush", idx),
		}		
		byt, err := json.Marshal(pubs)
		if err != nil {}		
		if err := publishWithSettings(client, topic, byt); err != nil {
			log.Fatalf("Failed to publish: %v, No. %d", err, idx)
		}
	}
}

func publishWithSettings(client *pubsub.Client, topic string, msg []byte) error {
	ctx := context.Background()
	// [START publish_settings]
	t := client.Topic(topic)
	t.PublishSettings = pubsub.PublishSettings{
		ByteThreshold:  5000,
		CountThreshold: 10,
		DelayThreshold: 100 * time.Millisecond,
	}
	result := t.Publish(ctx, &pubsub.Message{Data: msg})
	// Block until the result is returned and a server-generated
	// ID is returned for the published message.
	id, err := result.Get(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("Published a message; msg ID: %v\n", id)
	// [END publish_settings]
	return nil
}
