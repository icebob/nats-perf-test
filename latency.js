import NATS from "nats";

(async function start() {

    const topic = "perf-test";
    let c = 0;

    const nc = await NATS.connect({ servers: ["nats://localhost:4222"] });
    console.log("Connected. Start...");
    function send() {
        nc.publish(topic, Buffer.from("hello " + (++c)));
    }

    let startTime = Date.now();
    setInterval(() => {
        let rps = c / ((Date.now() - startTime) / 1000);
        console.log(Number(rps.toFixed(0)).toLocaleString(), "req/s");
        c = 0;
        startTime = Date.now();
    }, 1000);


    nc.subscribe(topic, {
        callback: (err, msg) => {
            // Buffer.from(msg.data);
            if (!err) send();
        }
    });

    send();

}) ();