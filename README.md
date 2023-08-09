# NATS perf test

**NATS server version**: 2.9.21
```
[17056] 2023/08/09 17:47:17.691879 [INF] Starting nats-server
[17056] 2023/08/09 17:47:17.692931 [INF]   Version:  2.9.21
[17056] 2023/08/09 17:47:17.692931 [INF]   Git:      [b2e7725]
[17056] 2023/08/09 17:47:17.693459 [INF]   Name:     NDDLAYHA256ZGYEFYEIMV6O5AOMU56CPFERN37VVFTMLP5XZYZJUPL3D
[17056] 2023/08/09 17:47:17.693459 [INF]   ID:       NDDLAYHA256ZGYEFYEIMV6O5AOMU56CPFERN37VVFTMLP5XZYZJUPL3D
[17056] 2023/08/09 17:47:17.695019 [INF] Listening for client connections on 0.0.0.0:4222
[17056] 2023/08/09 17:47:17.706678 [INF] Server is ready
```

**NATS lib version:** 2.5.1
**Node.js**: 18.16.0
**OS**: Windows 10

## Test

```bash
node latency.js
```

## Result
```
d:\Work\tmp\nats-perf-test>node latency.js
Connected. Start...
70 req/s
72 req/s
71 req/s
72 req/s
70 req/s
70 req/s
69 req/s
72 req/s
86 req/s
74 req/s
73 req/s
71 req/s
71 req/s
68 req/s
69 req/s
68 req/s
69 req/s
71 req/s
68 req/s
```

## After modified `sendCommand` 500x faster

```
d:\Work\tmp\nats-perf-test>node latency.js
Connected. Start...
28 327 req/s
30 322 req/s
30 784 req/s
30 120 req/s
30 687 req/s
31 142 req/s
31 386 req/s
30 323 req/s
30 786 req/s
30 632 req/s
30 492 req/s
30 895 req/s
30 698 req/s
30 794 req/s
30 704 req/s
30 755 req/s
30 987 req/s
30 567 req/s
30 756 req/s
30 894 req/s
30 322 req/s
```

## Diff in protocol.js

```diff
    sendCommand(cmd, ...payloads) {
        const len = this.outbound.length();
        let buf;
        if (typeof cmd === "string") {
            buf = (0, encoders_1.encode)(cmd);
        }
        else {
            buf = cmd;
        }
        this.outbound.fill(buf, ...payloads);
+       this.flushPending();
-       if (len === 0) {
-           //@ts-ignore: node types timer
-           this.flusher = setTimeout(() => {
-               this.flushPending();
-           });
-       }
-       else if (this.outbound.size() >= this.pendingLimit) {
-           // if we have a flusher, clear it - otherwise in a bench
-           // type scenario where the main loop is dominated by a publisher
-           // we create many timers.
-           if (this.flusher) {
-               //@ts-ignore: node types timer
-               clearTimeout(this.flusher);
-               this.flusher = null;
-           }
-           this.flushPending();
-       }
    }

```