TOPIC=hoge
BUCKET=
PROJECT=

default:
	gsutilmb gs://$(PROJECT)-shinofara-sub

deploy:
	gcloudbeta functions deploy helloPubSub --stage-bucket $(BUCKET) --trigger-topic $(TOPIC) --project $(PROJECT)

publish:
	gcloud beta pubsub topics publish hoge '{"name":"helloPubSub"}' --project $(PROJECT)

publish-roop:
	fori in `seq 1 7` \
	do\
		gcloudbeta pubsub topics publish hoge '{"name":"helloPubSub"}' --project $(PROJECT); \
	done

npm-install:
	dockerrun --rm -v $(PWD):/work -w /work node:latest npm install

clean:
	gcloud beta pubsub topics delete hoge  --project $(PROJECT)
