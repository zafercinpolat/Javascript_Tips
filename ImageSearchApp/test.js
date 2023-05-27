var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTcyLjE2LjE0LjEwOjkxL3NlY3VyaXR5L3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2ODQzMTg4NjksImV4cCI6MTcxNDMxODg2OSwibmJmIjoxNjg0MzE4ODY5LCJqdGkiOiJwOHFnVkxTNEtpNHBVdUVKIiwic3ViIjoiNDAwIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsInVzZXJfdHlwZSI6InVzZXIiLCJzZXJ2aWNlIjoic2VjdXJpdHkiLCJhcHBsaWNhdGlvbl90eXBlIjoidGVzdCIsIm9yZ2FuaXphdGlvbl90eXBlIjoiZW5kdXNlciIsIm9yZ2FuaXphdGlvbl9pZCI6NDAwLCJvcmdhbml6YXRpb25fdXVpZCI6ImRmZTBiNjg5LWI4YjktNDkzOC1hY2U1LTg3ODllYjJjYWU2OCIsImxvZ2luX3VzZXIiOiJleUpwZGlJNklqZDFjbGg1V2tsaGMwRkZUblp4WkhsTFNreDJVWGM5UFNJc0luWmhiSFZsSWpvaWJsQkNVMEZJWVRsQkx5ODFha04xVUc1TGNFVm5OMGxwVFhOYWRFVXplRE5UWTNWcldWRnRaVVJYZW5JM1dtUmlkRXB6ZG1ad2RrZFlSUzlSVHpsaVNpczNLMVJWY3paNGExQjFkVFZxZW5kMk1USlhjVUoyYkZoSWNFbE5LM2R6YUc4MksyMTJRU3Q1WXk5dlFYSmFWVXN6VEZCd2FEbFFRMkpETmxOUGNrOVZTVWdyU2xoSWJuWjNjMWsxVlZwemVWVjFjRkZSUFQwaUxDSnRZV01pT2lJeE9UazFZMk5pTjJFM1l6aGtaV0psTXpGak9UbGtORGhoWVdFNFl6Rm1OakZqT0dNMU5UWmhaR00xTVdOa05ESTNOamxpTkdGbU9UZ3hNekpsTlRCa0lpd2lkR0ZuSWpvaUluMD0iLCJpbnN0YWxsYXRpb25faWQiOjYsImltYWdlX2luc3RhbGxhdGlvbl9pZCI6MTk3fQ.hs-Rtt4EcO9owNWr4kkXAExvHRnMqKruOIBbVgxXO2U"

url2 = "http://localhost:5000/stream/v1/files/downloadWithFileName/e9497265-adb5-4be8-8b3c-3695a632c525?token="+token
url = "http://localhost:5000/stream/v1/files/download/e9497265-adb5-4be8-8b3c-3695a632c525?token="+token

fetch(url2).then((response) => {
    console.log(response);
    const reader = response.body.getReader();
    console.log(reader);
    var binaryData = [];
    const stream = new ReadableStream({
        start(controller) {
            // The following function handles each data chunk
            function push() {
                // "done" is a Boolean and value a "Uint8Array"
                return reader.read().then(({ done, value }) => {
                    binaryData.push(value);
                    // Is there no more data to read?
                    console.log(done, value);
                    if (done) {
                        // console.log("done", done);
                        // // Tell the browser that we have finished sending data
                        // var blob = new Blob(binaryData, { type: "application/octet-stream" });
                        // const encodedUri = window.URL.createObjectURL(blob);
                        // const link = document.createElement("a");

                        // link.setAttribute("href", encodedUri);
                        // link.setAttribute("download", "test.xlsx");
                        // link.click();
                        // URL.revokeObjectURL(encodedUri);

                        // controller.close();
                        return;
                    }
                    // Get the data and send it to the browser via the controller
                    controller.enqueue(value);
                    push();
                });
            }
            push();
        },
    });



    return new Response(stream, {
        headers: {
            "Content-Type": "text/html", "Authorization":
                "Bearer " + token
        }
    });
});
