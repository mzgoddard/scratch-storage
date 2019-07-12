/* eslint-env worker */

let jobsActive = 0;
const complete = [];

let intervalId = null;

/**
 * Register a step function.
 *
 * Step checks if there are completed jobs and if there are sends them to the
 * parent. Then it checks the jobs count. If there are no further jobs, clear
 * the step.
 */
const registerStep = function () {
    intervalId = setInterval(() => {
        if (complete.length) {
            // Send our chunk of completed requests and instruct postMessage to
            // transfer the buffers instead of copying them.
            postMessage(
                complete.slice(),
                // Instruct postMessage that these buffers in the sent message
                // should use their Transferable trait. After the postMessage
                // call the "buffers" will still be in complete if you looked,
                // but they will all be length 0 as the data they reference has
                // been sent to the window. This lets us send a lot of data
                // without the normal postMessage behaviour of making a copy of
                // all of the data for the window.
                complete.map(response => response.buffer).filter(Boolean)
            );
            complete.length = 0;
        }
        if (jobsActive === 0) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }, 1);
};

/**
 * Receive a job from the parent and fetch the requested data.
 * @param {object} options.job A job id, url, and options descriptor to perform.
 */
const onMessage = ({data: job}) => {
    if (jobsActive === 0 && !intervalId) {
        registerStep();
    }

    jobsActive++;

    // performance.mark(`FetchWorkerTool:worker(${job.url.split(/\/([^/]*)$/)[1] || job.url}):start`);
    fetch(job.url, job.options)
        .then(response => {
            if (response.ok) {
                // performance.mark(`FetchWorkerTool:download(${job.url.split(/\/([^/]*)$/)[1] || job.url}):start`);
                const reader = response.body.getReader();
                return new Promise((resolve, reject) => {
                    const chunks = [];
                    const step = function () {
                        reader.read().then(({done, value}) => {
                            if (done) {
                                // performance.mark(`FetchWorkerTool:download(${job.url.split(/\/([^/]*)$/)[1] || job.url}):stop`),
                                // performance.measure(`FetchWorkerTool:download(${job.url.split(/\/([^/]*)$/)[1] || job.url})`, `FetchWorkerTool:download(${job.url.split(/\/([^/]*)$/)[1] || job.url}):start`, `FetchWorkerTool:download(${job.url.split(/\/([^/]*)$/)[1] || job.url}):stop`),
                                // performance.mark(`FetchWorkerTool:arrayBuffer(${job.url.split(/\/([^/]*)$/)[1] || job.url}):start`);
                                const uint8 = new Uint8Array(chunks.reduce((carry, chunk) => carry + chunk.length, 0));
                                let position = 0;
                                for (let i = 0; i < chunks.length; i++) {
                                    uint8.set(chunks[i], position);
                                    position += chunks[i].length;
                                }
                                // performance.mark(`FetchWorkerTool:arrayBuffer(${job.url.split(/\/([^/]*)$/)[1] || job.url}):stop`);
                                // performance.measure(`FetchWorkerTool:arrayBuffer(${job.url.split(/\/([^/]*)$/)[1] || job.url})`, `FetchWorkerTool:arrayBuffer(${job.url.split(/\/([^/]*)$/)[1] || job.url}):start`, `FetchWorkerTool:arrayBuffer(${job.url.split(/\/([^/]*)$/)[1] || job.url}):stop`),
                                resolve(uint8.buffer);
                            } else {
                                chunks.push(value);
                                setTimeout(step);
                            }
                        }, reject);
                    };
                    setTimeout(step);
                });
                return response.arrayBuffer();
            }
            throw new Error(`fetch not ok: ${response.statusText}`);
        })
        .then(buffer => (
            // performance.mark(`FetchWorkerTool:worker(${job.url.split(/\/([^/]*)$/)[1] || job.url}):stop`),
            // performance.measure(`FetchWorkerTool:worker(${job.url.split(/\/([^/]*)$/)[1] || job.url})`, `FetchWorkerTool:worker(${job.url.split(/\/([^/]*)$/)[1] || job.url}):start`, `FetchWorkerTool:worker(${job.url.split(/\/([^/]*)$/)[1] || job.url}):stop`),
            buffer.byteLength > 32 * 1024 ?
                postMessage([{id: job.id, buffer}], [buffer]) :
                complete.push({id: job.id, buffer})
        ))
        .catch(error => complete.push({id: job.id, error: {message: error.message, stack: error.stack}}))
        .then(() => jobsActive--);
};

if (self.fetch) {
    postMessage({support: {fetch: true}});
    self.addEventListener('message', onMessage);
} else {
    postMessage({support: {fetch: false}});
    self.addEventListener('message', ({data: job}) => {
        postMessage([{id: job.id, error: new Error('fetch is unavailable')}]);
    });
}
